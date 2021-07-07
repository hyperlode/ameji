
import itertools 

dictionary_punctuation_template = '''"{0}": {{
    "id": "{0}", 
    "type": "punctuation", 
    "files": [["ameji-punctuation", "{0}.png"]], 
    "meaning": {1}
    }},'''



'''
"hyper-bracket-{1}-{0}": {
    "id": "hyper-bracket-{1}-{0}", 
    "type": "punctuation", 
    "files": [["ameji-punctuation", "hyper-bracket-{2}{1}-{0}.png"]], 
    "meaning": ["hyper bracket {1}", "parenthesis", "braces"]
    },
'''


def generate_binary_strings(bit_count):
    binary_strings = []
    def genbin(n, bs=''):
        if len(bs) == n:
            binary_strings.append(bs)
        else:
            genbin(n, bs + '0')
            genbin(n, bs + '1')


    genbin(bit_count)
    return binary_strings

binary_strings = generate_binary_strings(5)

binary_strings.remove("00000")
directions = ["-left", "-right"]
aiding_points = ["","-aidingpoints"]


all_combinations = [(b,d,p) for p in aiding_points for b in binary_strings for d in directions ]

hyper_bracket_name_template = "hyper-bracket{2}{1}-{0}"
hyper_bracket_meaning_template = '["hyper bracket {0}", "parenthesis", "curly braces", "brackets"]'

for combination in all_combinations:
    id = hyper_bracket_name_template.format(
        combination[0],
        combination[1],
        combination[2],
        )
    meaning = hyper_bracket_meaning_template.format(id)

    dict_entry = dictionary_punctuation_template.format(
        id,
        meaning,
    )
    print(dict_entry)
