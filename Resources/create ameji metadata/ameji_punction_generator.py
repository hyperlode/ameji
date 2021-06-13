import json

punctuation_files = [
    
    "period.png",
    "comma.png",
    "colon.png",
    "semicolon.png",
    "empty.png",
    "equals.png",
    "dash.png",
    "slash-backward.png",
    "slash-forward.png",
    "double-slash-forward.png",
    "double-slash-backward.png",
    "vertical-line.png",
    "vertical-line-dashed.png",
    "cross-diagonal.png",
    "checkmark.png",
    "bracket-left.png",
    "bracket-square-left.png",
    "bracket-square-right.png",
    "bracket-right.png",
    "questionmark-open-left.png",
    "questionmark-upside-down-open-right.png",

    
    "exclamation-mark-thin.png",
    "exclamation-mark-thin-bracket-left.png",
    "exclamation-mark-thin-bracket-right.png",
    "exclamation-mark-thin-upside-down.png",
    "exclamation-mark-thin-upside-down-bracket-right.png",
    "exclamation-mark-thin-upside-down-bracket-left.png",
    
    "exclamation-mark-hollow.png",
    "exclamation-mark-hollow-upside-down.png",
    "exclamation-mark-lightbulb-top.png",
    "exclamation-mark-lightbulb-top-upside-down.png",
    
    "exclamation-mark-circles.png",
    "exclamation-mark-circles-bracket-left.png",
    "exclamation-mark-circles-bracket-right.png",
    "exclamation-mark-circles-upside-down.png",
    "exclamation-mark-circles-upside-down-bracket-right.png",
    "exclamation-mark-circles-upside-down-bracket-left.png",
    
    "exclamation-mark.png",
    "exclamation-mark-bracket-left.png",
    "exclamation-mark-bracket-right.png",
    "exclamation-mark-upside-down.png",
    "exclamation-mark-upside-down-bracket-right.png",
    "exclamation-mark-upside-down-bracket-left.png",

    "digit-0.png",
    "digit-1.png",
    "digit-2.png",
    "digit-3.png",
    "digit-4.png",
    "digit-5.png",
    "digit-6.png",
    "digit-7.png",
    "digit-8.png",
    "digit-9.png",

    "value-relative-posneg-neg4.png",
    "value-relative-posneg-neg3.png",
    "value-relative-posneg-neg2.png",
    "value-relative-posneg-neg1.png",
    "value-relative-posneg-0.png",
    "value-relative-posneg-1.png",
    "value-relative-posneg-2.png",
    "value-relative-posneg-3.png",
    "value-relative-posneg-4.png",
    
    "value-relative-0.png",
    "value-relative-1.png",
    "value-relative-2.png",
    "value-relative-3.png",
    "value-relative-4.png",
  
    
    "v-right.png",
    "v-right-double.png",
    "v-right-triple.png",
    "v-left.png",
    "v-left-double.png",
    "v-left-triple.png",
    "v-up.png",
    "v-down.png",
    "arrow-left.png",
    "arrow-right.png",
    "arrow-double.png"]


punctuation_metadata = {}
for f in punctuation_files:
    id = f[:-4]
    path_ = f
    # metadata = symbol_meta.format(id, f,id)
    
    symbol_meta = {
        "id":id,
        "type":"punctuation",
        "files":[["ameji-punctuation", path_]],
        "meaning":[id],
    }
    punctuation_metadata[id] = symbol_meta

symbol_meta_json = json.dumps(punctuation_metadata)
with open(r"E:\GIT\ameji\Resources\create ameji metadata\punctuation_metadata.json", "w" ) as f:
    f.write(symbol_meta_json)
print(punctuation_metadata)
    