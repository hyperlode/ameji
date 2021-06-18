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
        "files":[["openmoji","1F5FE.png",["gen"]],["openmoji","1F36B.png"],  ["openmoji","1F9C7.png"],["openmoji","1F37A.png"]],
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
        "meaning":["Netherlands", "country", "Europe", "European Union", "Holland","Hup", "Orange"]},
    "Canada":{"id":"Canada","meaning":["Canada", "Country"],"type":"proper noun","files":[["openmoji","1F5FE.png",["gen","name"]],["openmoji","1F341.png",["blank","name"]],["openmoji","1F43B-200D-2744-FE0F.png",["blank","name"]],["openmoji","1F3D2.png",["blank","name"]]]},
    "Shane":{"id":"Shane","meaning":[],"type":"proper noun","files":[["openmoji","1F436.png",["blank","name"]],["openmoji","1F436.png",["blank","name"]],["openmoji","1F469-200D-1F9B1.png",["blank","name"]]]},
    "Sung":{"id":"Sung","meaning":[""],"type":"name","files":[["openmoji","1F468-200D-1F9B0.png",["blank","name"]],["openmoji","2797.png",["combo","name"]],["openmoji","2716.png",["combo","name"]],["openmoji","1F4D0.png",["combo","name"]],["openmoji","1F3AD.png",["blank","name"]],["openmoji","1F38D.png",["blank","name"]]]},
    "id":{"id":"","meaning":[""],"type":"combo","files":[["ameji","circle-60degrees-cutout"],["openmoji","1F60A.png",["sym"]],["ameji-punctuation","value-relative-posneg-4"],["openmoji","1F91D.png"],["ameji","circle-half-strikethrough-horizontal"]]},
    "Andi":{"id":"Andi","meaning":["Andi", "Andrea", "Passmore"],"type":"proper noun","files":[["openmoji","1F469-200D-1F52C.png",["blank","name"]],["openmoji","1F3C6.png",["blank","name"]],["openmoji","1F3B9.png",["blank","name"]],["openmoji","1F469-200D-1F393.png",["combo","name"]],["openmoji","1F4AF.png",["combo","name"]],["openmoji","1F94F.png",["blank","name"]]]}
    
}`