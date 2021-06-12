from bs4  import BeautifulSoup  # pip install beautifulsoup4
import requests
from pathlib import Path
import json
import re
from collections import defaultdict



SAVE_FOLDER = r"E:\GIT\ameije.com\Ameji\symbols\emoji"
def load_html(path):
    
    with open(path,"r", encoding="utf8") as f:
        raw = f.read()
    parsed_html = BeautifulSoup (raw, features="html.parser")

    return parsed_html

# def download_url(url,  save_folder):
#     # url = "http://i3.ytimg.com/vi/J---aiyznGQ/mqdefault.jpg"
#     # url = "http://lode.ameije.com/images/set_icon.png"
#     r = requests.get(url)
#     # r =  urllib3.1(url)

#     filename = Path(url).name
#     save_path = Path(save_folder, filename)
#     with open(save_path, "wb") as f:
#         f.write(r.content)

def parse_openmoji_unicode_to_description(path_to_file):
    # link unicode with a basic description. I found his is in a specific html file.

    # parsed_html = load_html(r"E:\GIT\ameije.com\Ameji\tools\openmoji\openmoji_unicode_to_description.html")
    parsed_html = load_html(path_to_file)
    grid = parsed_html.find_all("div", {"class":"emoji_grid"})
    '''
    <div class="emoji_single" id="1F600">
        <div class="emoji-container">
            <img alt="grinning face" class="lazy loaded" data-ll-status="loaded" data-src="../data/color/svg/1F600.svg" src="../data/color/svg/1F600.svg"/>
        </div>
        <div>
            <h3>grinning face</h3><p>1F600</p>
        </div>
    </div>
    '''

    unicode_to_description = {}
    all_emoji_items = grid[0].find_all("div",{"class":"emoji_single"})
    for item in all_emoji_items:
        unicode = item.find("p").contents
        unicode = unicode[0]
        unicode = unicode.lower()

        description = item.find("h3").contents
        description = description[0]
        description = description.lower()
        
        unicode_to_description[unicode] = description
    return unicode_to_description

def muan_emojilib_to_tags(muan_emojilib_path):
    with open(muan_emojilib_path, "r", encoding="utf8") as f:
        metadata = f.read()

    all_metadata = json.loads(metadata)
    all_metadata_unicode = {}
    for emoji, description in all_metadata.items():
        unicode = emoji.encode('unicode-escape').decode('ascii')
        unicode = unicode.lower()
        unicode_codepoints = unicode.split(r"\u")
        
        v = description
        unicode = []
        for codepoint in unicode_codepoints[1:]:
            unicode.append(codepoint.lstrip("0"))

        all_metadata_unicode["-".join(unicode)] = v
    
    return all_metadata_unicode

def ummoji_metadata_to_tags(ummoji_metadata_path):
    with open(ummoji_metadata_path,"r",encoding="utf8") as f:
        metadata = f.read()

    all_metadata = json.loads(metadata)
    all_symbols_tags = defaultdict(list)

    for m in all_metadata:
        tags = m["name"].split(" ") 
        keywords_list = m["keywords"]
        tags.extend(keywords_list)

        tags_lower = []
        b = False
        for tag in tags:
            if tag == "COLD":
                b = True
            tags_lower.append(tag.lower())
        tags = tags_lower
        # if b:
            # print(tags)

        unicodes = m["unified"].lower()  # hex was in uppercase

        # sometimes multiple unicodes.
        unicodes = unicodes.split("-")
        for unicode in unicodes:
            # all_symbols_tags[unicode] = tags
            all_symbols_tags[unicode].append(tags)

    filtered_tags = {}
    normal_count = 0
    multitagslistcount = 0
    multi_unicodes = []
    for unicode, multitagslist in all_symbols_tags.items():
        if len(multitagslist) > 1:
            # these are often modifiers. Like: 1f1f8 (not sure what to do with them, throw them out! )
            multitagslistcount += 1
            multi_unicodes.append(unicode)
        else:
            normal_count += 1
            filtered_tags[unicode] = multitagslist[0]
    
    print("unicode multiple times appearance(modifiers): {} ({}) these multiples are DISCARDED, unique unicode: {}".format(
        multitagslistcount,
        multi_unicodes,
        normal_count,
        ))
    # print(filtered_tags["1f3cc"])
    # print(list(filtered_tags)[0])
    # print("1f3cc" in list (filtered_tags))
    return filtered_tags

def create_ameji_metadata_from_emoji(folder, unicode_to_tags):

    '''
    // layout: {
    //  type: --. "proper noun", "synonyms" ("it IS (every given symbol IS it)"), "properties"("it HAS (all given symbols contribute towards the meaning. i.e. )"), "basic", "brand"
    //  files: for every symbol: [type of file, name, [list with diacritics (if none, don't add a list)] diacritics: verb, gen, lit, sym]
    //  meaning: [list of translations (english... )]
    //  id: "word identifier"
    '''

    got_extra_tags = 0

    files = sorted(Path(folder).glob('*.*'))
    

    symbols = []
    for file in files:
        filename = Path(file).name
        name = Path(file).stem

        if ("skin-tone" in name):
            continue

        name_parts = re.split('-|_', name)  # https://stackoverflow.com/questions/4998629/split-string-with-multiple-delimiters-in-python
        
        main_name = name_parts[0]

        # unicode = name_parts[-1]

        tags = name_parts
        
        for unicode_to_test in name_parts:
            # try each part as its unicode 
            # if "1f436" == unicode_to_test:
            #     print("ahola")
            if unicode_to_test in list(unicode_to_tags):
                got_extra_tags+=1

                tags.extend(unicode_to_tags[unicode_to_test])

        symbol_meta = {"file":filename, "meaning":{main_name : {"synonyms":tags, "value":"-", "dia_top":"-", "dia_bot":"-"}}}
        symbols.append(symbol_meta)

        symbol_meta = {"file":filename, "meaning":{main_name : {"synonyms":tags, "value":"-", "dia_top":"-", "dia_bot":"-"}}}
        
       
    print("got extra tags: {}".format(got_extra_tags))
    symbols_json = json.dumps(symbols)
    with open(Path(folder,"metadata.json"),"w") as f:
        f.write(symbols_json)

def create_ameji_from_emoji_files(output_folder, emoji_folder, unicode_to_tags, disregard_modifiers=True):

    '''
    FORMAT, list of:
    {"file":"time_relative-time_hourglass.png",
            "meaning":{
                    "time relative":{
                        "synonyms":[],
                        "value":"-", "dia_top":"-", "dia_bot":"-"},
                    "hourglass":{
                        "synonyms":["sandglass","clepsydra","clock","timepiece","timer", "chronometer", "timekeeper"],
                        "value":"-", "dia_top":"lit", "dia_bot":"-"}
            }},
    '''

    files = sorted(Path(emoji_folder).glob('*.*'))

    symbols = {}
    disregarded_files = []
    got_extra_tags = []
    got_extra_tags = set(got_extra_tags)

    for file in files:

        filename = Path(file).name
        name = Path(file).stem

        # name_parts = re.split('-|_', name)  # https://stackoverflow.com/questions/4998629/split-string-with-multiple-delimiters-in-python
        name = name.lower()
        name_parts = re.split('-|_', name)  # https://stackoverflow.com/questions/4998629/split-string-with-multiple-delimiters-in-python
        
        main_name = name_parts[0]
        tags = name_parts
        ok_to_add = True

        # every part is a unicode code point
        for unicode_to_test in name_parts:
            if disregard_modifiers:
                if unicode_to_test in ["1f3fb","1f3fc","1f3fd","1f3fe","1f3ff"]:
                    # multi skin color (which is silly in black and white)
                    ok_to_add = False
                    disregarded_files.append(name)

            if unicode_to_test in list(unicode_to_tags):
                got_extra_tags.add(name)
                tags.extend(unicode_to_tags[unicode_to_test])


        # symbol_meta = {"file":filename, "meaning":{main_name : {"synonyms":tags, "value":"-", "dia_top":"-", "dia_bot":"-"}}}
        # if ok_to_add:
        #     symbols.append(symbol_meta)
        
        symbol_meta = {
            "id":filename,
            "type":"single",
            "files":[["openmoji", filename]],
            "meaning":tags,
        }

        if ok_to_add:
            symbols[filename] = symbol_meta


    
    print("Got extra tags: {}\nDisregarded (because of modifiers): {}\nTotal emoji:{}\n".format(
        len(got_extra_tags),
        len(disregarded_files),
        len(list(symbols)),
        ))
    symbols_json = json.dumps(symbols)
    with open(Path(output_folder,"metadata.json"),"w") as f:
        f.write(symbols_json)


def create_metadata():
    BASE_PATH = r"E:\GIT\ameji\Resources\create ameji metadata"
    EMOJI_FOR_CODES_PATH = r"E:\GIT\ameji\Resources\openmoji\openmoji-618x618-black"
    
    UMMOJI_METADATA_PATH  = Path(r"E:\GIT\ameji\Resources\ummoji\emoji_metadata_ummoji-client.txt")
    PATH_HTML_PAGE_WITH_UNICODE_TO_DESCRIPTION = r"E:\GIT\ameji\Resources\openmoji\openmoji_unicode_to_description.html"
    PATH_MUAN_EMOJILIB_TAGS = r"E:\GIT\ameji\Resources\muan_emojilib\emoji-en-US.json"
    
    PATH_METADATA_OUTPUT = BASE_PATH

    # tags_from_filenames(EMOJI_FOR_CODES_PATH)
    
    unicode_tagged = ummoji_metadata_to_tags(UMMOJI_METADATA_PATH)
    emoji_unicode_to_description = parse_openmoji_unicode_to_description(PATH_HTML_PAGE_WITH_UNICODE_TO_DESCRIPTION)
    emoji_manually_tagged = muan_emojilib_to_tags(PATH_MUAN_EMOJILIB_TAGS)
   
    
    # for uni, desc in emoji_unicode_to_description.items():
    #     if uni not in list(unicode_tagged):
    #         unicode_tagged[uni] = [desc]
    #         # print(unicode_tagged[uni])
    #     else:
    #         unicode_tagged[uni].append(desc)

    print("emoji count: {}".format(len(list(unicode_tagged))))
    unicode_tagged = merge_emoji_descriptions(unicode_tagged, emoji_unicode_to_description)
    unicode_tagged = merge_emoji_descriptions(unicode_tagged, emoji_manually_tagged)

    
    for uni, desc in emoji_manually_tagged.items():
        if uni == "2640":
            print("yeeesoeps ")
        pass
        # if uni not in list(unicode_tagged):
        #     unicode_tagged[uni] = [desc]
        #     # print(unicode_tagged[uni])
        #     print(uni)
        # else:
        #     unicode_tagged[uni].append(desc)
    


    # print("{}:{} "unicode_tagged)

    # print(unicode_to_tags)

    codes = [
    "2640",
    "1f3cc",
    "1f629",
    "2b2f",
    "1f935"]
    for code in codes:
        if code in list(unicode_tagged):
            print("{}:{}".format(code, unicode_tagged[code])
            )
    
    create_ameji_from_emoji_files(PATH_METADATA_OUTPUT, EMOJI_FOR_CODES_PATH, unicode_tagged, True)

def merge_emoji_descriptions(tagged_1, tagged_2):
    # merge tagged_2 into tagged_1 
    # inputs: dicts of lists. 
    tagged_1 = defaultdict(list, tagged_1)
    size_start = len(list(tagged_1))
    # print(list(tagged_1))
    for k, v in tagged_2.items():
        if type(v) is list:

            tagged_1[k].extend(v)
        else:
            tagged_1[k].append(v)
        
    size_end = len(list(tagged_1))

    print("number of new elements added: {}".format(size_end - size_start))    
    return tagged_1

if __name__ == "__main__":
    create_metadata();

    # print(len(uni_to_desc))
    # for k,v in uni_to_desc.items():
    #     print("{}:{}".format(k,v))
    # DEPRECATED, just download package from the openemoji website!
    # parse_and_download_emojipedia()





