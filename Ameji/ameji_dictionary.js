// layout: {
//  type: --. "proper noun", "synonyms" ("it IS (every given symbol IS it)"), "properties"("it HAS (all given symbols contribute towards the meaning. i.e. )"), "basic", "brand"
//  files: for every symbol: [type of file, name, [list with diacritics (if none, don't add a list)] diacritics: verb, gen, lit, sym]
//  meaning: [list of translations (english... )]
//  id: "word identifier"




var ameji_dictionary_JSON = `{
    "hour":{
        "id":"hour",
        "type":"single",
        "files":[["ameji", "hour"]],
        "meaning":["hour"]},
    "sit":{
        "id":"sit",
        "type":"compare",
        "files":[["openmoji", "1FA91.png", ["yes"]], ["openmoji", "1F9CD.png", ["no"]]],
        "meaning":["sit", "sitting"]},
    "rose":{
        "id":"rose",
        "type":"combo",
        "files":[["openmoji","1F339.png",["lit"]],["openmoji", "1F497.png", ["sym"]], ["openmoji","1F490.png",["sym"]],["openmoji", "1F33B.png",["gen"]]],
        "meaning":["rose"]},
    "Belgium":{
        "id":"Belgium",
        "type":"proper noun",
        "files":[["openmoji","1F36B.png"], ["openmoji","1F5FE.png"], ["openmoji","1F9C7.png"],["openmoji","1F37A.png"]],
        "meaning":["Belgium", "country", "Europe", "European Union", "Brussels"]},
    "Lode":{
        "id":"Lode",
        "type":"proper noun",
        "files":[["openmoji","1F954.png"],["openmoji","1F6B2.png"],["ameji","luciebox"]],
        "meaning":["Lode"]},
    "Netherlands":{
        "id":"Netherlands",
        "type":"proper noun",
        "files":[["openmoji","1F5FE.png",["gen"]],["openmoji","1F337.png"],["openmoji","1F6B4-200D-2642-FE0F.png"],["openmoji","1F3D4.png",["no"]],["openmoji","26F5.png",["yes"]]],
        "meaning":["Netherlands", "country", "Europe", "European Union", "Holland","Hup", "Orange"]}
}`