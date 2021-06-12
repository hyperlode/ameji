// layout: {
//  type: --. "proper noun", "synonyms" ("it IS (every given symbol IS it)"), "properties"("it HAS (all given symbols contribute towards the meaning. i.e. )"), "basic", "brand"
//  files: for every symbol: [type of file, name, [list with diacritics (if none, don't add a list)] diacritics: verb, gen, lit, sym]
//  meaning: [list of translations (english... )]
//  id: "word identifier"




var ameji_dictionary_JSON = `{
    "hour":{
        "id":"hour",
        "type":"single",
        "files":[["ameji", "clock-hour-one.png"]],
        "meaning":["hour"]},
    "sit":{
        "id":"sit",
        "type":"compare",
        "files":[["openmoji", "1fa91.png", ["yes"]], ["openmoji", "1f9cd.png", ["no"]]],
        "meaning":["sit", "sitting"]},
    "rose":{
        "id":"rose",
        "type":"combo",
        "files":[["openmoji","1f339.png",["lit"]],["openmoji", "1f497.png", ["sym"]], ["openmoji","1f490.png",["sym"]],["openmoji", "1f33b.png",["gen"]]],
        "meaning":["rose"]},
    "Belgium":{
        "id":"Belgium",
        "type":"proper noun",
        "files":[["openmoji","1f36b.png"], ["openmoji","1f5fe.png"], ["openmoji","1f9c7.png"],["openmoji","1f37a.png"]],
        "meaning":["Belgium", "country", "Europe", "European Union", "Brussels"]},
    "Lode":{
        "id":"Lode",
        "type":"proper noun",
        "files":[["openmoji","1F954.png"],["openmoji","1f6b2.png"],["ameji","luciebox.png"]],
        "meaning":["Lode"]}
}`