
import json 
import xml.etree.ElementTree as ET
from pathlib import Path

BASE_PATH = r"E:\GIT\ameji\Resources\unicode"
UNICODE_ALL_CODE_POINTS = Path(BASE_PATH, "ucd.all.flat.xml")

# UNICODE_DESCRIPTION_INPUT = r"E:\GIT\ameji\Resources\unicode\NamesList.txt"
UNICODE_WITH_DESCRIPTION_INPUT = Path(BASE_PATH, "DerivedName.txt")
UNICODE_AMEJI_OUTPUT = Path(BASE_PATH, "unicode_ameji_standard.txt" )
UNICODE_AMEJI_OUTPUT_TEST = Path(BASE_PATH, "unicode_parse_test.txt" )


def full_unicode_to_metadata():
    all_metadata = {}

    unicode_code_points = ET.parse(UNICODE_ALL_CODE_POINTS).getroot()

    for i, element in enumerate(unicode_code_points.iter()):
        attributes = element.attrib

        if ("cp" in list(attributes) and "na" in list(attributes) and "blk" in list(attributes)):

           
            codepoint = attributes["cp"]
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


if __name__ == "__main__":
    # all_metadata = get_metadata_reduced_list()
    all_metadata = full_unicode_to_metadata()

    
    symbols_json = json.dumps(all_metadata)

    # with open(UNICODE_AMEJI_OUTPUT,"w", encoding='utf-8') as f:
    #     for line in lines:
    #         f.write(line)

    with open(UNICODE_AMEJI_OUTPUT,"w", encoding='utf-8') as f:
        f.write(symbols_json)
















    
# def bytes_from_file(filename, chunksize=8192):
#     with open(filename, "rb") as f:
#         while True:
#             chunk = f.read(chunksize)
#             if chunk:
#                 for b in chunk:
#                     yield b
#             else:
#                 break

# line = ""
# lines = ""
# new_line = True
# valid_line = True
# for i,b in enumerate(bytes_from_file(UNICODE_DESCRIPTION_INPUT,8192)):
#     # if i>52:
#     #     break
#     # if (b == 32):
#     #     print(i)

#     # 10 = newline
#     # 9 = tab

#     if new_line :
#         if b == 9:
#             # do not record lines starting with a tab
#             valid_line = False
#         new_line = False
#     line+= chr(b)

#     if (b == 10):
#         # end of line actions
#         if valid_line:
#             lines+="{}".format(line)
#         #     print("valid:")
#         # print(line)

#         line = ""
#         #check for first line char
#         new_line = True
#         valid_line = True
   

# lines = ""
# with open(UNICODE_DESCRIPTION_INPUT,"rb") as f:
#     i=0
#     while True:
#         chunck = f.read(10000000000)
#         i+=1
#         print(i)
#         # if i%10000:
#         #     print(byte)
#         # if byte == "":
#         #     break
#     # for i,line in enumerate(f):

#         # try:
#         #     if line[0].decode() != "\t":
#         #         line= "{}\n".format(line) 
#         #         print(line)
#         #         lines += line
#         # except:
#         #     print(line[0].decode())
#         #     print(i)


#         # if i>100:
#         #     break

