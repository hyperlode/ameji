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

def download_url(url,  save_folder):
    # url = "http://i3.ytimg.com/vi/J---aiyznGQ/mqdefault.jpg"
    # url = "http://lode.ameije.com/images/set_icon.png"
    r = requests.get(url)
    # r =  urllib3.1(url)

    filename = Path(url).name
    save_path = Path(save_folder, filename)
    with open(save_path, "wb") as f:
        f.write(r.content)

def parse_openmoji_unicode_to_description():

    parsed_html = load_html(r"E:\GIT\ameije.com\Ameji\tools\openmoji\openmoji_unicode_to_description.html")
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


def parse_emojipedia():
    parsed_html = load_html(r"E:\GIT\ameije.com\Ameji\tools\openMoji_symbols.html")
    # print(result)

    grid = parsed_html.find_all("ul", {"class":"emoji-grid"})
    # print(grid.find_all("img"))
    print(type(grid))
    all_emoji_items = grid[0].find_all("li")

    urls = []
    for item in all_emoji_items:
        src = item.find("img")["src"]
        if (src == r"/static/img/lazy.svg"):
            src = item.find("img")["data-src"]
        
        print(src)
        urls.append(src)
        print(item.find("img")["title"])

    
    return urls

def parse_and_download_emojipedia():

    # NOT NEEDED
    # EASY TO DOWNLOAD FROM THE WEBSITE
    
    urls = parse_emojipedia()
    for url in urls:
        print(url)
        download_url(url, SAVE_FOLDER)


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

    return filtered_tags

def create_ameji_metadata_from_emoji(folder, unicode_to_tags):

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
    
    print("got extra tags: {}".format(got_extra_tags))
    symbols_json = json.dumps(symbols)
    with open(Path(folder,"metadata.json"),"w") as f:
        f.write(symbols_json)

def create_ameji_black_white_metadata_from_color_emoji(folder, unicode_to_tags):

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

    got_extra_tags = 0

    files = sorted(Path(folder).glob('*.*'))

    symbols = []
    for file in files:
        filename = Path(file).name
        name = Path(file).stem

        # if ("skin-tone" in name):
        #     continue
        

        # filename = filename.split("_")[-1]

        # name_parts = re.split('-|_', name)  # https://stackoverflow.com/questions/4998629/split-string-with-multiple-delimiters-in-python
        name = name.lower()
        name_parts = re.split('-|_', name)  # https://stackoverflow.com/questions/4998629/split-string-with-multiple-delimiters-in-python
        
        main_name = name_parts[0]



        tags = name_parts
        
        ok_to_add = True
        for unicode_to_test in name_parts:

            if unicode_to_test in ["1f3fb","1f3fc","1f3fd","1f3fe","1f3ff"]:
                # multi skin color (which is silly in black and white)
                ok_to_add = False

            if unicode_to_test in list(unicode_to_tags):
                got_extra_tags+=1

                tags.extend(unicode_to_tags[unicode_to_test])


        symbol_meta = {"file":filename, "meaning":{main_name : {"synonyms":tags, "value":"-", "dia_top":"-", "dia_bot":"-"}}}
        
        if ok_to_add:
            symbols.append(symbol_meta)
    
    print("got extra tags: {}".format(got_extra_tags))
    symbols_json = json.dumps(symbols)
    with open(Path(folder,"metadata.json"),"w") as f:
        f.write(symbols_json)


def create_metadata():
    emoji_folder = r"E:\GIT\ameije.com\Ameji\symbols\emoji"
    ummoji_metadata_path =  Path(emoji_folder, "emoji_metadata_ummoji-client.txt")

    emoji_folder = r"E:\GIT\ameije.com\Ameji\symbols\emoji_blackwhite"
    unicode_to_tags = ummoji_metadata_to_tags(ummoji_metadata_path)
    
    emoji_unicode_to_description = parse_openmoji_unicode_to_description()
    
    for uni, desc in emoji_unicode_to_description.items():
        if uni not in list(unicode_to_tags):
            unicode_to_tags[uni] = [desc]
        # unicode_to_tags[uni].append(desc)

    # print(unicode_to_tags)
    print(unicode_to_tags["1f3cc"])
    print(unicode_to_tags["1f629"])
    # create_ameji_metadata_from_emoji(emoji_folder, unicode_to_tags);
    create_ameji_black_white_metadata_from_color_emoji(emoji_folder, unicode_to_tags)

if __name__ == "__main__":
    create_metadata();

    # print(len(uni_to_desc))
    # for k,v in uni_to_desc.items():
    #     print("{}:{}".format(k,v))
    # DEPRECATED, just download package from the openemoji website!
    # parse_and_download_emojipedia()





