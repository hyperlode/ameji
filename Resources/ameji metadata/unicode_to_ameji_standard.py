
import json 
import xml.etree.ElementTree as ET
from pathlib import Path

from bs4  import BeautifulSoup  # pip install beautifulsoup4

from collections import defaultdict



BASE_PATH = r"E:\GIT\ameji\Resources\ameji metadata"
UCD_UNICODE_ALL_CODE_POINTS = Path(BASE_PATH,"sources", "ucd.all.flat.xml")
UCD_UNICODE_NO_UNIHAN_CODE_POINTS = Path(BASE_PATH,"sources", "ucd.nounihan.flat.xml")

# UNICODE_DESCRIPTION_INPUT = r"E:\GIT\ameji\Resources\unicode\NamesList.txt"
UNICODE_WITH_DESCRIPTION_INPUT = Path(BASE_PATH, "DerivedName.txt")
UNICODE_AMEJI_OUTPUT = Path(BASE_PATH, "unicode_ameji_standard.txt" )
UNICODE_AMEJI_OUTPUT_TEST = Path(BASE_PATH, "unicode_parse_test.txt" )

# metadata files
UMMOJI_METADATA_PATH  = Path(BASE_PATH, "sources", r"ummoji\emoji_metadata_ummoji-client.txt")
PATH_MUAN_EMOJILIB_TAGS = Path(BASE_PATH, "sources", r"muan_emojilib\emoji-en-US.json")
PATH_HTML_PAGE_WITH_UNICODE_TO_DESCRIPTION = r"E:\GIT\ameji\Resources\symbols_svg\openmoji\openmoji_unicode_to_description.html"

def ucd_unicode_to_metadata(ucd_file):
    all_metadata = {}

    unicode_code_points = ET.parse(ucd_file).getroot()

    for i, element in enumerate(unicode_code_points.iter()):
        attributes = element.attrib

        if ("cp" in list(attributes) and "na" in list(attributes) and "blk" in list(attributes)):

           
            codepoint = attributes["cp"].lower()
            # print(type(codepoint))
            
            name = attributes["na"]
            block = attributes["blk"]
            meta_data = {
                    "unicode":[codepoint],
                    "id": codepoint,
                    "type":"unicode",
                    "files":[["unicode", codepoint]],
                    "meaning":[name],
                }

            all_metadata[codepoint] = meta_data
            if type(name) == "tuple":
                meta_data

            # print(meta_data)
        # if i>1000:
        #     break
    return all_metadata

    

def load_html(path):
    
    with open(path,"r", encoding="utf8") as f:
        raw = f.read()
    parsed_html = BeautifulSoup (raw, features="html.parser")

    return parsed_html

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


def full_unicode_to_file():
    unicode_code_points = ET.parse(UNICODE_ALL_CODE_POINTS).getroot()
    
    with open(UNICODE_AMEJI_OUTPUT_TEST,"w") as f:
        invalid_tags = 0
        invalids = ""
        for i, element in enumerate(unicode_code_points.iter()):
            #print("{}:{}".format(element.cp,element.na))
            attributes = element.attrib
            # print(type(attributes))
            # print(list(attributes))
            if ("cp" in list(attributes) and "na" in list(attributes) and "blk" in list(attributes)):
                # print(attributes["cp"])

                line = "{},{},{}\n".format(
                    attributes["cp"],
                    attributes["na"],
                    attributes["blk"],
                )

                f.write(line)
            else:
                invalid_tags += 1
                invalids += "{}\n".format(attributes)
        # f.write(invalids)
        print(invalid_tags)
            # if i>100:
            #     break

    # with open(UNICODE_AMEJI_OUTPUT_TEST,"w") as f:
    #     invalid_tags = 0
    #     invalids = ""
    #     for i, element in enumerate(unicode_code_points.iter()):
    #         #print("{}:{}".format(element.cp,element.na))
    #         attributes = element.attrib
    #         # print(type(attributes))
    #         # print(list(attributes))
    #         if ("cp" in list(attributes) and "na" in list(attributes) and "blk" in list(attributes)):
    #             # print(attributes["cp"])

    #             line = "{},{},{}\n".format(
    #                 attributes["cp"],
    #                 attributes["na"],
    #                 attributes["blk"],
    #             )

    #             f.write(line)
    #         else:
    #             invalid_tags += 1
    #             invalids += "{}\n".format(attributes)
    #     # f.write(invalids)
    #     print(invalid_tags)
    #         # if i>100:
    #         #     break

# example

# "0023-FE0F-20E3.png": {
#   "unicode": ["0023", "fe0f", "20e3"], 
#   "id": "0023-FE0F-20E3.png", 
#   "type": "single", 
#   "files": [["openmoji", "0023-FE0F-20E3.png"]], 
#   "meaning": ["0023", "fe0f", "20e3", "hash", "key", "sign", "emblem", "token", "badge", "mark", "figure", "indication", "logo", "numeral", "insignia", "character", "image", "logotype", "flag", "icon", "device", "cipher", "type", "attribute", "crest", "tweet", "peep", "chirp", "cheep", "chirrup", "trill", "chitter", "titter", "chatter", "giggle", "flutter", "warble", "quiver", "shake", "snicker", "snigger", "tremble", "squeak", "cackle", "pipe", "registered", "alphabet", "circle"]
# },

# "hyper-bracket-left-00001": {
#     "id": "hyper-bracket-left-00001", 
#     "type": "punctuation", 
#     "files": [["ameji-punctuation", "hyper-bracket-left-00001.png"]], 
#     "meaning": ["hyper bracket hyper-bracket-left-00001", "parenthesis", "curly braces", "brackets"]
#     },

# symbol_meta = {
#     "unicode":unicode_points,
#     "id":filename,
#     "type":"single",
#     "files":[["openmoji", filename]],
#     "meaning":tags,
# }



def get_metadata_reduced_list():

    lines = ""
    all_metadata = {}
    with open(UNICODE_WITH_DESCRIPTION_INPUT,"r",encoding='utf-8') as f:
        try:

            for i,line in enumerate(f):
                # if i > 100:
                #     break
                lines += line
                if line[0] == "#":
                    continue
                name_description = line.split(";")
                if (len(name_description) != 2):
                    print("ASSERT ERROR: {} at {}".format(name_description, i))
                    continue
                
                name, description = name_description
                name = name.strip()
                description = description.strip()
                # print ("---{}---".format(name))
                # print(description)
                meta_data = {
                    "unicode":[name],
                    "id": name,
                    "type":"unicode",
                    "files":[["unicode", name]],
                    "meaning":[description],
                }

                all_metadata[name] = meta_data

        except Exception as e:
            print(e)
            print(i)
            print(line)
            print(len(lines))
    return meta_data

def font_lookup(unicode, description):
    
    description = "".join([el.lower() for el in description])
    if "duployan" in description:
        return "Noto Sans Duployan"

    elif "pahawh" in description:
        return "Noto Sans Pahawh Hmong"

    elif "anatolian" in description:
        return "Noto Sans Anatolian Hieroglyphs"

    else:
        return ""

if __name__ == "__main__":
    '''
    The description of the symbols follows a standard format 

    FORMAT, dict with unicode points as keys. Values:
    {"files":["unicode",unicodepoint],
            "meaning":["list","of","descriptions"],
        "id":unicodepoint,
        "type":unicode,
    },
    '''



    # all_metadata = get_metadata_reduced_list()
    unicode_points_as_ameji_metadata = ucd_unicode_to_metadata(UCD_UNICODE_NO_UNIHAN_CODE_POINTS)


    unmoji_tagged = ummoji_metadata_to_tags(UMMOJI_METADATA_PATH)
    emoji_unicode_to_description = parse_openmoji_unicode_to_description(PATH_HTML_PAGE_WITH_UNICODE_TO_DESCRIPTION)
    emoji_manually_tagged = muan_emojilib_to_tags(PATH_MUAN_EMOJILIB_TAGS)

    tag_sources = [unmoji_tagged, emoji_unicode_to_description, emoji_manually_tagged]
    
    print(len(unmoji_tagged))
    print(len(emoji_unicode_to_description))
    print(len(emoji_manually_tagged))
    i = 0
    for codepoint, metadata in unicode_points_as_ameji_metadata.items():
        # if i>10:
            # break
        for tags in tag_sources:

            # print(type(codepoint))
            # print(codepoint)
            # print(list(tags))
            if codepoint in list(tags):
                i+= 1       
                tag_words = tags[codepoint]
                if type(tag_words) == list:
                    metadata["meaning"].extend(tag_words)
                else:
                    metadata["meaning"].append(tag_words)
    
        # fonts
        font = font_lookup(codepoint, metadata["meaning"])
        # if font != "":
        #     print(font)
        #     print(codepoint)

        metadata["font"] = font

     
      
    print(i)
    print(len(metadata))
    # print(list(unicode_tagged)[5])
    #exit()
    # symbols_json = json.dumps(unmoji_tagged)
    symbols_json = json.dumps(unicode_points_as_ameji_metadata)

    with open(UNICODE_AMEJI_OUTPUT,"w", encoding='utf-8') as f:
        f.write(symbols_json)


