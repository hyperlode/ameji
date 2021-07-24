from bs4 import BeautifulSoup
from pathlib import Path
import json
import re

def load_html(path):
    
    with open(path,"r", encoding="utf8") as f:
        raw = f.read()
    parsed_html = BeautifulSoup (raw, features="html.parser")

    return parsed_html

def parse_iconji(path_to_file):
    # link unicode with a basic description. I found his is in a specific html file.

    # parsed_html = load_html(r"E:\GIT\ameije.com\Ameji\tools\openmoji\openmoji_unicode_to_description.html")
    parsed_html = load_html(path_to_file)
    grid = parsed_html.find_all("div", {"style":"float: left;"})
    '''
    <div style="float: left;">
        <img alt="6, six" src="./iConji. Connecting the world._files/6.png" title="6, six">
    </div>
    '''
    items = []
    for item in grid:

        src = item.find("img")['src']
        tag = item.find("img")['alt']

#         description = description[0]
#         description = description.lower()
        src = Path(src).name
        img = (src,tag)
        # print(img.alt)
#         unicode_to_description[unicode] = description
#     return unicode_to_description

        items.append(img)
# grid = parsed_html.find_all("div", {"class":"emoji_grid"})
    return items

def symbols_with_tags_to_ameji(symbols_data):

    '''
    list with tuples of the kind: (lode.png,["person", "human", "guru", "lode"])
    '''
    symbols = {}
    for filename, tags in symbols_data:
        name_parts = re.split(',', tags)  # https://stackoverflow.com/questions/4998629/split-string-with-multiple-delimiters-in-python
        
        symbol_meta = {
            "id":filename,
            "type":"single",
            "files":[["iconji", filename]],
            "meaning":name_parts,
        }
        symbols[filename] = symbol_meta
    return symbols
        
def object_to_file(object_to_dump, file_out):
    json_encoded = json.dumps(object_to_dump)
    with open(Path(file_out),"w") as f:
        f.write(json_encoded)

    
if __name__ == "__main__":

    to_parse_path = r"E:\GIT\ameji\Resources\iconji\iConji. Connecting the world..html"
    parsed = parse_iconji(to_parse_path)
    for p in parsed:
         print("----{}\n".format(p))
    ameji_array = symbols_with_tags_to_ameji(parsed)
    object_to_file(ameji_array, r"E:\GIT\ameji\Resources\iconji\iconji.json")
