// https://thenounproject.com/
// opensymbols.org
// unimoji.com (same ambition, but not much happening...)
// iconji.com . same idea, from 2011, but, catered towards english (e.a. at = @ )
// emojione --> git repo with emoji tools
//openmoji -> open source emoji drawings .


// "-" = none
// "lit" = literal
// "sym" = symbolic
// "gen" = generalized
var diacritics_to_file = {
    "gen": "dot.png",
    "gen2": "dot-double.png",
    "verb": "arrow-right.png",
    "verb2": "arrow-double.png",
    "sym": "squiggle.png",
    "lit": "line.png",
    "-": "empty.png"
}

var nouns_JSON = `[
    {"file":"hourglass.png",
     "meaning":{
            "time value":{
                "synonyms":["period","amound of time"],
                "value":"-", "dia_top":"-", "dia_bot":"-"},
            "hourglass":{
                "synonyms":["sandglass","clepsydra","clock","timepiece","timer", "chronometer", "timekeeper"],
                "value":"-", "dia_top":"lit", "dia_bot":"-"}
    }},
    {"file":"clock-face.png", "meaning":{
        "time stamp":{
            "synonyms":["timestamp", "time marker", "point in time", "absolute time"],
            "value":"-", "dia_top":"-", "dia_bot":"-"}
    }},
   
    {"file":"loop.png", "meaning":{
        "periodicity":{
            "synonyms":["frequency", 
                "continuously", "all the time", "once", "a few times", "when used with absolute or relative quantity", 
                "never", "often", "sometimes", "always", "when used with probability"], 
            "value":"-", "dia_top":"-", "dia_bot":"-"}
    }},
   
    {"file":"dice_pips_9.png", "meaning":{
        "9":{
            "synonyms":["number", "nine", "dice", "die", "pips"], 
            "value":"-", "dia_top":"-", "dia_bot":"-"}
    }},
   
    {"file":"dice_pips_8.png", "meaning":{
        "8":{
            "synonyms":["number", "dice", "die", "pips","eight"], 
            "value":"-", "dia_top":"-", "dia_bot":"-"}
    }},
    {"file":"dice_pips_7.png", "meaning":{
        "7":{
            "synonyms":["number", "dice", "die", "pips","seven"], 
            "value":"-", "dia_top":"-", "dia_bot":"-"}
    }},
    {"file":"dice_pips_6.png", "meaning":{
        "6":{
            "synonyms":["number", "dice", "die", "pips","six"], 
            "value":"-", "dia_top":"-", "dia_bot":"-"}
    }},
    {"file":"dice_pips_5.png", "meaning":{
        "5":{
            "synonyms":["number", "dice", "die", "pips","five"], 
            "value":"-", "dia_top":"-", "dia_bot":"-"}
    }},
    {"file":"dice_pips_4.png", "meaning":{
        "4":{
            "synonyms":["number", "dice", "die", "pips","four"], 
            "value":"-", "dia_top":"-", "dia_bot":"-"}
    }},
    {"file":"dice_pips_3.png", "meaning":{
        "3":{
            "synonyms":["number", "dice", "die", "pips","three"], 
            "value":"-", "dia_top":"-", "dia_bot":"-"}
    }},
    {"file":"dice_pips_2.png", "meaning":{
        "2":{
            "synonyms":["number", "dice", "die", "pips","two"], 
            "value":"-", "dia_top":"-", "dia_bot":"-"}
    }},
    {"file":"dice_pips_1.png", "meaning":{
        "1":{
            "synonyms":["number", "dice", "die", "pips","one"], 
            "value":"-", "dia_top":"-", "dia_bot":"-"}
    }},
    {"file":"dice_pips_0.png", "meaning":{
        "0":{
            "synonyms":["number", "dice", "die", "pips","zero"], 
            "value":"-", "dia_top":"-", "dia_bot":"-"}
    }},

    {"file":"set-0-in-7-out.png", "meaning":{
        "0 in set":{
            "synonyms":["set", "quantitative determininer", "none", "empty", "all outside"], 
            "value":"-", "dia_top":"-", "dia_bot":"-"}
    }},
    {"file":"set-1-in-6-out.png", "meaning":{
        "1 in set":{
            "synonyms":["set", "quantitative determininer","one", "solo", "rare", "curiosity", "rarity", "almost empty", "almost none"], 
            "value":"-", "dia_top":"-", "dia_bot":"-"}
    }},
    {"file":"set-2-in-5-out.png", "meaning":{
        "2 in set":{
            "synonyms":["set", "quantitative determininer", "two", "some", "a few", "a couple"], 
            "value":"-", "dia_top":"-", "dia_bot":"-"}
    }},
    {"file":"set-3-in-4-out.png", "meaning":{
        "3 in set":{
            "synonyms":["set", "quantitative determininer","three", "quite a bit", "a few", "not insignificant"], 
            "value":"-", "dia_top":"-", "dia_bot":"-"}
    }},
    {"file":"set-4-in-3-out.png", "meaning":{
        "4 in set":{
            "synonyms":["set", "quantitative determininer", "four", "more than half", "half", "quite a lot", "over half", "significant", "quite a few"], 
            "value":"-", "dia_top":"-", "dia_bot":"-"}
    }},
    {"file":"set-5-in-2-out.png", "meaning":{
        "5 in set":{
            "synonyms":["set", "quantitative determininer", "five", "a lot", "many", "significant"], 
            "value":"-", "dia_top":"-", "dia_bot":"-"}
    }},
    {"file":"set-6-in-1-out.png", "meaning":{
        "6 in set":{
            "synonyms":["set", "quantitative determininer", "six", "a lot", "many", "almost all", "almost full"], 
            "value":"-", "dia_top":"-", "dia_bot":"-"}
    }},
    {"file":"set-7-in-0-out.png", "meaning":{
        "7 in set":{
            "synonyms":["set", "quantitative determininer", "seven", "all", "full", "everything"], 
            "value":"-", "dia_top":"-", "dia_bot":"-"}
    }},
   
    {"file":"earth-encircles-sun.png", "meaning":{
        "year":{
            "synonyms":["12 months","annus"],
            "value":"-", "dia_top":"-", "dia_bot":"-"},
        "earth around sun":{
            "synonyms":[],
            "value":"-", "dia_top":"lit", "dia_bot":"-"}
    }},
    {"file":"moon-encircles-earth.png", "meaning":{
        "month":{
            "synonyms":[],
            "value":"-", "dia_top":"-", "dia_bot":"-"},
        "moon around earth":{
            "synonyms":[],
            "value":"-", "dia_top":"lit", "dia_bot":"-"}
    }},
    {"file":"earth-spin.png", "meaning":{
        "day":{
            "synonyms":["24 hours","days"],
            "value":"-", "dia_top":"-", "dia_bot":"-"},
        "earth spin":{
            "synonyms":[],
            "value":"-", "dia_top":"lit", "dia_bot":"-"}
    }},
    {"file":"clock-hour-one.png", "meaning":{
        "hour":{
            "synonyms":["1 hour","60 minutes"],
            "value":"-", "dia_top":"-", "dia_bot":"-"}
    }},
    {"file":"clock-minute-one.png", "meaning":{
        "minute":{
            "synonyms":["1 minute","60 seconds"],
            "value":"-", "dia_top":"-", "dia_bot":"-"}
    }},
    {"file":"clock-second-one.png", "meaning":{
        "minute":{
            "synonyms":["1 second"],
            "value":"-", "dia_top":"-", "dia_bot":"-"}
    }},
    {"file":"luciebox.png", "meaning":{
        "luciebox":{
            "synonyms":["pretbak","busybox"],
            "value":"-", "dia_top":"-", "dia_bot":"-"},
        "electronic toy":{
            "synonyms":["toy", "electronic device"],
            "value":"-", "dia_top":"gen", "dia_bot":"-"}
    }},
    {"file":"circle-full.png", "meaning":{
        "full":{
            "synonyms":["circle","quarters","eights","everything"],
            "value":"-", "dia_top":"-", "dia_bot":"-"}
    }},
    {"file":"circle-quarters-three.png", "meaning":{
        "three-quarters":{
            "synonyms":["circle","quarter","4","3"],
            "value":"-", "dia_top":"-", "dia_bot":"-"}
    }},
    {"file":"circle-half.png", "meaning":{
        "half":{
            "synonyms":["circle","half","2","medium"],
            "value":"-", "dia_top":"-", "dia_bot":"-"}
    }},
    {"file":"circle-eights-three.png", "meaning":{
        "three-eights":{
            "synonyms":["circle","eights","8","3"],
            "value":"-", "dia_top":"-", "dia_bot":"-"}
    }},
    {"file":"circle-quarters-one.png", "meaning":{
        "quarter":{
            "synonyms":["circle","quarter","4","1"],
            "value":"-", "dia_top":"-", "dia_bot":"-"}
    }},
    {"file":"circle-eights-one.png", "meaning":{
        "one-eight":{
            "synonyms":["circle","eights","8","1"],
            "value":"-", "dia_top":"-", "dia_bot":"-"}
    }},
    
    {"file":"meter_relative_0.png", "meaning":{
        "value 0":{
            "synonyms":["zero","null","none"],
            "value":"-", "dia_top":"-", "dia_bot":"-"}
    }},
    {"file":"meter_relative_1.png", "meaning":{
        "value 1":{
            "synonyms":["low"],
            "value":"-", "dia_top":"-", "dia_bot":"-"}
    }},
    {"file":"meter_relative_2.png", "meaning":{
        "value 2":{
            "synonyms":["average"],
            "value":"-", "dia_top":"-", "dia_bot":"-"}
    }},
    {"file":"meter_relative_3.png", "meaning":{
        "value 3":{
            "synonyms":["high"],
            "value":"-", "dia_top":"-", "dia_bot":"-"}
    }},
    {"file":"meter_relative_4.png", "meaning":{
        "value 4":{
            "synonyms":["extreme"],
            "value":"-", "dia_top":"-", "dia_bot":"-"}
    }},
    {"file":"pin-on-map.png", "meaning":{
        "location":{
            "synonyms":["position"],
            "value":"-", "dia_top":"-", "dia_bot":"-"}
    }},
    {"file":"head_profile_mouth_closed.png", "meaning":{
        "you":{
            "synonyms":["listener"],
            "value":"-", "dia_top":"-", "dia_bot":"-"},
        "head closed mouth":{
            "synonyms":["head profile person mouth closed"],
            "value":"-", "dia_top":"lit", "dia_bot":"-"}
    }},
    {"file":"circle-half-strikethrough-horizontal.png", "meaning":{
        "you":{
            "synonyms":["listener"],
            "value":"-", "dia_top":"-", "dia_bot":"-"},
        "head closed mouth":{
            "synonyms":["head profile person mouth closed"],
            "value":"-", "dia_top":"lit", "dia_bot":"-"}
    }},
    {"file":"circle-60degrees-cutout.png", "meaning":{
        "I":{
            "synonyms":["me","narrator", "head profile person"],
            "value":"-", "dia_top":"-", "dia_bot":"-"}
    }},
    {"file":"circle-half-strikethrough-horizontal.png", "meaning":{
        "you":{
            "synonyms":["you", "listener"],
            "value":"-", "dia_top":"-", "dia_bot":"-"}
    }},
    {"file":"circle-60degrees-cutout-with-half-strikethrough-horizontal.png", "meaning":{
        "we":{
            "synonyms":["we", "talker and listener  "],
            "value":"-", "dia_top":"-", "dia_bot":"-"}
    }},
    {"file":"circle-half-strikethrough-vertical.png", "meaning":{
        "he":{
            "synonyms":["he","her","his","hers","it"],
            "value":"-", "dia_top":"-", "dia_bot":"-"}
    }},
    {"file":"circle-double-strikethrough-horizontal.png", "meaning":{
        "you":{
            "synonyms":["you"],
            "value":"-", "dia_top":"-", "dia_bot":"-"}
    }},
    {"file":"circle-double-strikethrough-vertical.png", "meaning":{
        "he":{
            "synonyms":["they","their","theirs"],
            "value":"-", "dia_top":"-", "dia_bot":"-"}
    }},
    {"file":"dot-space.png", "meaning":{
        "period":{
            "synonyms":["dot period with space for end of senctence"],
            "value":"-", "dia_top":"-", "dia_bot":"-"}
    }},
    {"file":"star-lines.png", "meaning":{
       
        "this":{
            "synonyms":["the","it","that"],
            "value":"-", "dia_top":"-", "dia_bot":"-"}
    }},
    {"file":"cube.png", "meaning":{
       
        "cube":{
            "synonyms":[""],
            "value":"-", "dia_top":"lit", "dia_bot":"-"},
        "thing":{
            "synonyms":["object"],
            "value":"-", "dia_top":"gen", "dia_bot":"-"},
        "materialistic":{
            "synonyms":["3D","real world", "tangible", "square", "blocky"],
            "value":"-", "dia_top":"sym", "dia_bot":"-"}
    }},
    {"file":"sphere.png", "meaning":{
        "sphere":{
            "synonyms":["ball", "globe"],
            "value":"-", "dia_top":"-", "dia_bot":"-"},
        "thing":{
            "synonyms":["object"],
            "value":"-", "dia_top":"gen", "dia_bot":"-"},
        "materialistic":{
            "synonyms":["3D","real world", "tangible", "round", "spherical", "circle"],
            "value":"-", "dia_top":"sym", "dia_bot":"-"}
    }},
    {"file":"head_profile_mouth_open.png", "meaning":{
        "I":{
            "synonyms":["me","narrator", "head profile person"],
            "value":"-", "dia_top":"-", "dia_bot":"-"},
        "head open mouth":{
            "synonyms":["head profile person"],
            "value":"-", "dia_top":"lit", "dia_bot":"-"}
    }}
]`;

var punctuation = [
    
    "period.png",
    "comma.png",
    "colon.png",
    "semicolon.png",
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
    "arrow-double.png"
]

var diacritics_top = [
    "empty.png",
    "arrow-left.png",
    "arrow-right.png",
    "arrow-double.png",
    "line.png",
    "line-full-width.png",
    "dot.png",
    "dot-double.png",
    "squiggle.png",
    "cross-diagonal.png",
    "checkmark.png"
]
var diacritics_bottom = [
    "empty.png",
    "arrow-left.png",
    "arrow-right.png",
    "arrow-double.png",
    "line.png",
    "line-full-width.png",
    "dot.png",
    "dot-double.png",
    "squiggle.png",
    "cross-diagonal.png",
    "checkmark.png"
]

class Ameji {
    constructor() {
        console.log("Ameji loaded");
        this.nouns_library = JSON.parse(nouns_JSON);
        this.emoji_library = JSON.parse(emoji_JSON);
        
        this.baseDiv = document.getElementById("base");
        this.sentenceDiv = addDiv(this.baseDiv, "sentence", "sentence-builder__sentence");
        this.sentenceControlsButtonsDiv = addDiv(this.baseDiv, "sentenceControls", "sentence-builder__controls");
        addBr(this.baseDiv);

        this.recentDiv = addDiv(this.baseDiv, "recent", "symbol-recent__display");
        // this.sentenceControlsButtonsDiv = addDiv(this.baseDiv, "recentControls", "symbol_recent__controls");
        this.recentDiv.style.display = "none";
        addBr(this.baseDiv);

        this.symbolPickerDiv = addDiv(this.baseDiv, "symbolPicker", "sentence-builder__symbol-picker");
        addBr(this.baseDiv);

        this.baseDiv.className = "sentence-builder";

        addButton(this.sentenceControlsButtonsDiv, "Deselect all", "btnDeselectAll", "btnDeselectAll", this.deselect_all.bind(this));
        addButton(this.sentenceControlsButtonsDiv, "Select all", "btnSelectAll", "btnSelectAll", this.select_all.bind(this));
        addButton(this.sentenceControlsButtonsDiv, "Delete selected", "btnDelete", "btnDelete", this.sentence_delete_selected.bind(this));
        addButton(this.sentenceControlsButtonsDiv, "Insert New line", "btnNewLine", "btnNewLine", this.add_new_line_symbol.bind(this));
        addButton(this.sentenceControlsButtonsDiv, "Recently used symbols", "btnToggleRecent", "btnToggleRecent", this.toggle_recent_visibility.bind(this));
        addButton(this.sentenceControlsButtonsDiv, "Save sentence as picture.png", "btnSaveToPng", "btnSaveToPng", this.save_sentence_to_picture.bind(this));
        addButton(this.sentenceControlsButtonsDiv, "Debug", "btnDebug", "btnDebug", this.do_debug.bind(this));
        // addButton(this.sentenceControlsButtonsDiv, "Download as picture.png", "btnSaveToPng", "btnSaveToPng", this.download_sentence.bind(this));

        // var button = document.createElement("input");
	    // button.type = "button";
	    // button.value = caption;
		// button.id = id;


        this.punctuationPickerField = addDiv(this.symbolPickerDiv, "punctuationPicker", "sentence-builder__symbol-picker__punctuation-picker");
        this.diacriticsTopPickerField = addDiv(this.symbolPickerDiv, "diacriticsTopPicker", "sentence-builder__symbol-picker__diacritics-picker");
        this.diacriticsBottomPickerField = addDiv(this.symbolPickerDiv, "diacriticsBottomPicker", "sentence-builder__symbol-picker__diacritics-picker");
        
        
        this.properNounsPickerField = addDiv(this.symbolPickerDiv, "properNounsPicker", "sentence-builder__symbol-picker__proper-nouns-picker");        
        this.searchField_nouns = addTextBox(this.symbolPickerDiv, "", "txtBoxSearchNouns", "txtBoxSearchNouns", 30);
        this.add_search_at_type_event(this.searchField_nouns);
        this.nounPickerField = addDiv(this.symbolPickerDiv, "nounPicker", "sentence-builder__symbol-picker__noun-picker");
        
        

        this.searchField_emoji = addTextBox(this.symbolPickerDiv, "search", "txtBoxSearchEmoji", "txtBoxSearchEmoji", 30);
        this.add_search_at_type_event(this.searchField_emoji);
        this.emojiPickerField = addDiv(this.symbolPickerDiv, "emojiPicker", "sentence-builder__symbol-picker__noun-picker");
        
        this.populate_noun_picker();
        this.populate_emoji_picker();
        this.populate_punctuation_picker();
        this.populate_diacritics_top_picker();
        this.populate_diacritics_bottom_picker();

        this.sentence_element_count = 0;
        this.punctuation_count = 0;
        this.noun_count = 0;
        this.sentence_selected_index = -1;
        this.sentence_selected_symbol_indeces = [];

        this.sentence_symbol_sequence = [];
        
        // this.recent_symbols_sequence = [];
        this.recent_symbols_sequence_ids = [];

        this.newline_symbol = "newline.png"; 

        this.load_local_file("file:///C:/temp/test.txt");
    }

    toggle_recent_visibility(){
        if (this.recentDiv.style.display === "none") {
            this.recentDiv.style.display = "block";
        } else {
            this.recentDiv.style.display = "none";
        }
    }

    do_debug(){
        console.log(this.sentence_selected_symbol_indeces);
    }

    save_sentence_to_picture(){
        let sentence_element = document.getElementById("sentence");

        // https://stackoverflow.com/questions/22710627/tainted-canvases-may-not-be-exported
        html2canvas(sentence_element,  {useCORS: true}).then(
            function(canvas){
                canvas.id = "capture_test";
                console.log(this.sentence_element_count);
                document.body.appendChild(canvas);
                //https://weworkweplay.com/play/saving-html5-canvas-as-image/
                let dataURL = canvas.toDataURL('image/png');
                document.getElementById("buttonDownload").href = dataURL;
            }.bind(this)
        )
    }

    load_local_file(file_path){
        async function loadFile(file_path) {
            let text = await file.text();
            console.log(text);
          }
    }

    add_search_at_type_event(elementToAttachTo) {
        elementToAttachTo.addEventListener("change",
            function (event) {
                console.log(this.searchField_nouns.value);
                this.populate_noun_picker();
                this.populate_emoji_picker();

            }.bind(this)
        );
    }
  
    populate_diacritics_top_picker() {
        for (let i = 0; i < diacritics_top.length; i++) {
            let name = diacritics_top[i];
            let symbolElement = this.add_diacricit_independent(this.diacriticsTopPickerField, "diacritic_top_" + i, name);
            this.add_diacritic_click_event(symbolElement);
        }
    }

    populate_diacritics_bottom_picker() {
        for (let i = 0; i < diacritics_bottom.length; i++) {
            let name = diacritics_bottom[i];
            let symbolElement = this.add_diacricit_independent(this.diacriticsBottomPickerField, "diacritic_bottom_" + i, name);
            this.add_diacritic_click_event(symbolElement);
        }
    }

    populate_punctuation_picker() {
        for (let i = 0; i < punctuation.length; i++) {
            let name = punctuation[i];
            let symbolElement = this.add_punctuation(this.punctuationPickerField, "punctuation" + i, name, "diacritic_empty.png", "diacritic_empty.png")
            this.add_punctuation_click_event(symbolElement);
        }
    }

    populate_noun_picker() {
        
        this.populate_basic_symbol_picker(this.nounPickerField, this.nouns_library, "ameji_basic_618x618", this.searchField_nouns);
        // this.populate_basic_symbol_picker(this.nounPickerField, this.nouns_library, "ameji_basic_618x618", this.searchField_nouns);
    }
    
    populate_emoji_picker() {
        // this.populate_basic_symbol_picker(this.emojiPickerField, this.emoji_library, "emoji", this.searchField_emoji );
        this.populate_basic_symbol_picker(this.emojiPickerField, this.emoji_library, "emoji_blackwhite_72x72", this.searchField_emoji );
        // this.populate_basic_symbol_picker(this.emojiPickerField, this.emoji_library, "emoji_blackwhite_618x618  ", this.searchField_emoji );

    }

    populate_basic_symbol_picker(elementToPopulate, library, symbol_folder, searchField){
        elementToPopulate.innerHTML = "";
        let search_string = searchField.value;

        for (let symbol_index = 0; symbol_index < library.length; symbol_index++) {
            let symbol = library[symbol_index];
            let symbol_file_name = symbol["file"];

            for (var meaning in symbol["meaning"]) {
                let synonyms = symbol["meaning"][meaning]["synonyms"];
                let all_meanings = meaning + " " + synonyms.join(" ");

                if (all_meanings.includes(search_string) || searchField.value === "") {

                    let diacritic_top = symbol["meaning"][meaning]["dia_top"];
                    let diacritic_bottom = symbol["meaning"][meaning]["dia_bot"];
                    let value = symbol["meaning"][meaning]["value"];
                    let id = meaning + ", " + synonyms.join(", ");

                    let symbolElement = this.add_noun(
                        elementToPopulate,
                        id,
                        symbol_folder + "/" + symbol_file_name,
                        diacritic_top,
                        diacritic_bottom
                    )

                    this.add_noun_click_event(symbolElement);
                }
            }
        }
    }

    add_noun_to_sentence(noun_name, diacritic_top, diacritic_bottom) {

        let sentence_element = this.create_noun(
            this.sentence_element_count,
            noun_name,
            diacritic_top,
            diacritic_bottom
        );
        this.add_symbol_to_sentence(sentence_element, "sentence-element");
    }

    add_punctuation_to_sentence(punctuation_name) {
        let sentence_element = this.create_punctuation(
            this.sentence_element_count,
            punctuation_name
        );
        this.add_symbol_to_sentence(sentence_element, "sentence-element");
    }

    add_newline_to_sentence(){

        // two divs need to be added. As we can't state that it should do a linebrake AFTER the current element. 
        // So, first, there is a dummy, visual linebreak. Then, the real one as a zero size div.
        let sentence_element = this.create_punctuation(
            this.sentence_element_count + "_newline",
            this.newline_symbol
            );
        this.add_symbol_to_sentence(sentence_element, "sentence-element");

        var symbol = document.createElement("div");
        symbol.id =  this.sentence_element_count;
        symbol.className = "sentence-builder__newline";

        this.add_symbol_to_sentence(symbol, "sentence-builder__newline");
    }
    
    add_symbol_to_recent( symbol_id ){

        if (this.recent_symbols_sequence_ids.indexOf(symbol_id) !== -1){
            // symbol already added
            return; 
        }

        let symbol_element = this.create_noun(symbol_id, symbol_id,"-","-");

        symbol_element.id = this.recent_symbols_sequence_ids.length;
        this.recentDiv.appendChild(symbol_element);
        
        this.add_recent_symbols_click_event(symbol_element);

        // this.recent_symbols_sequence.push(symbol_element);
        this.recent_symbols_sequence_ids.push(symbol_id);
        console.log(symbol_element.id);
        symbol_element.id = this.recent_symbols_sequence_ids.length - 1;

    }
  
    add_symbol_to_sentence(sentence_element, classname){
        sentence_element.id = this.sentence_element_count;
        // sentence_element.id = 666;
        
        if (this.sentence_selected_symbol_indeces.length === 0){
            this.sentenceDiv.appendChild(sentence_element);
            this.sentence_symbol_sequence.push(sentence_element.id);
            // this.add_symbol_after_sentence_index(sentence_element, classname, index )

            sentence_element.classList.add(classname);
            this.add_sentence_element_click_event(sentence_element);
            this.sentence_element_count += 1;

        }else{
            // for (let i=0; i<this.sentence_selected_symbol_indeces.length; i++){
            
            // let insert_index = this.sentence_selected_symbol_indeces[this.sentence_selected_symbol_indeces.length - 1];
            let insert_index = Math.max.apply(null, this.sentence_selected_symbol_indeces); //[this.sentence_selected_symbol_indeces.length - 1];
            
            this.deselect_selected_element_in_sentence(insert_index);

            let selected_element_id = this.sentence_symbol_sequence[insert_index];
            let selected_element = document.getElementById(selected_element_id);
            this.sentenceDiv.insertBefore(sentence_element, selected_element.nextSibling);
            this.sentence_symbol_sequence.splice(insert_index + 1,0,sentence_element.id);
            
            this.select_element_in_sentence(insert_index + 1);

            
            // INSERT BEFORE:
            // let insert_index = this.sentence_selected_index
            // this.deselect_selected_element_in_sentence();
            
            // let selected_element_id = this.sentence_symbol_sequence[insert_index];
            // let selected_element = document.getElementById(selected_element_id);
            // this.sentenceDiv.insertBefore(sentence_element, selected_element);
            // this.sentence_symbol_sequence.splice(insert_index,0,sentence_element.id);
            // this.select_element_in_sentence(insert_index);
            
            sentence_element.classList.add(classname);
            this.add_sentence_element_click_event(sentence_element);
            this.sentence_element_count += 1;
    
            // }
        }
        
    }

    add_diacritic_click_event(elementToAttachTo) {
        elementToAttachTo.addEventListener(
            "click",
            function (event) {
                if (!this.sentence_select_last_if_none_selected()){
                    return;
                }
                
                for (let i=0; i<this.sentence_selected_symbol_indeces.length; i++){
                    // if multiple symbols are selected, add to each selected symbol

                    let symbol_index = this.sentence_selected_symbol_indeces[i];

                    let selected_id = this.sentence_symbol_sequence[symbol_index];
                    
                    
                    let selected_sentence_symbol = document.getElementById(selected_id);
                    
                    let selected_class_names = selected_sentence_symbol.classList;
                    let symbol_is_noun = false;
                    for (let i = 0; i < selected_class_names.length; i++) {
                        if (selected_class_names[i] == "noun") {
                            symbol_is_noun = true;
                        }
                    }
                    if (symbol_is_noun) {

                        let el = event.currentTarget.querySelector('.diacritic_image');

                        let diacritic_field_id = event.currentTarget.id;
                        let diacritic_position_is_top = true;

                        if (diacritic_field_id.includes("bottom")) {
                            diacritic_position_is_top = false;

                        } else if (!diacritic_field_id.includes("top")) {
                            console.log("ASSERT ERROR: diacritic in field id should contain bottom or top to determine position in symbol.");
                        }

                        let replace_class_name = ".noun_diacritic_bottom";
                        if (diacritic_position_is_top) {
                            replace_class_name = ".noun_diacritic_top";
                        }

                        let diacritic_im = selected_sentence_symbol.querySelector(replace_class_name);

                        diacritic_im.src = "symbols/ameji_diacritics_618x102/" + el.id;
                    }
                }
            }.bind(this)
        );
    }

    add_punctuation_click_event(elementToAttachTo) {
        elementToAttachTo.addEventListener(
            "click",
            function (event) {
                let punctuation_image_element = event.currentTarget.querySelector('.punctuation_image');
                let punctuation_image_name = punctuation_image_element.id;

                this.add_punctuation_to_sentence(punctuation_image_name, "", "");

            }.bind(this)
        );
    }

    add_noun_click_event(elementToAttachTo) {

        elementToAttachTo.addEventListener(
            "click",
            function (event) {
                let noun_image_element = event.currentTarget.querySelector('.noun_image');
                let noun_image_name = noun_image_element.id;

                let diacricit_top_element = event.currentTarget.querySelector('.noun_diacritic_top');
                let diacritic_top = diacricit_top_element.id;

                let diacricit_bottom_element = event.currentTarget.querySelector('.noun_diacritic_bottom');
                let diacritic_bottom = diacricit_bottom_element.id;

                this.add_noun_to_sentence(noun_image_name, diacritic_top, diacritic_bottom);
                
                this.add_symbol_to_recent(noun_image_name);
            }.bind(this)
        );
    }
    
    add_recent_symbols_click_event(elementToAttachTo){
        elementToAttachTo.addEventListener(
            "click",
            function (event) {
                let recent_id = event.currentTarget.id;
                let index = parseInt(recent_id)
                let symbol_id = this.recent_symbols_sequence_ids[index];
                let symbol_element = this.create_noun(symbol_id, symbol_id, "-","-");
                this.add_symbol_to_sentence(symbol_element, "sentence-element");

            }.bind(this)
        );
    }

    add_sentence_element_click_event(elementToAttachTo) {
        elementToAttachTo.addEventListener(
            "click",
            function (event) {
                // current target = element where the eventtrigger was attached to
                let id = event.currentTarget.id;

                let selected_element_index = this.sentence_symbol_sequence.indexOf(id);
            
                // if clicked element selected, deselect.
                if (this.sentence_selected_symbol_indeces.includes(selected_element_index)){
                    this.deselect_selected_element_in_sentence(selected_element_index);
                }else{
                    this.select_element_in_sentence(selected_element_index);
                }
                
                console.log(this.sentence_selected_symbol_indeces);
            }.bind(this)
        );
    }
    
    select_all(){
        this.deselect_all();
        for (let i=0;i<this.sentence_symbol_sequence.length;i++){
            this.select_element_in_sentence(i);
        }
    }

    deselect_all(){
        let done = false;
        while (!done){
            if (this.sentence_selected_symbol_indeces.length === 0){
                done = true;
            }else{
                this.deselect_selected_element_in_sentence(this.sentence_selected_symbol_indeces[0]);   
            }
        }
    }

    deselect_selected_element_in_sentence(index){
        if (this.sentence_selected_symbol_indeces.includes(index)){
            let id = this.sentence_symbol_sequence[index];
            document.getElementById(id).classList.remove('symbol-selected');
            this.sentence_selected_symbol_indeces.splice(this.sentence_selected_symbol_indeces.indexOf(index),1); 
        }
    }
        
    select_element_in_sentence(index){
        // index of element in the symbols array of the sentence 
        if (this.sentence_symbol_sequence.length === 0){
            this.sentence_selected_symbol_indeces = [];
            return ;
        }
        if (index >= this.sentence_symbol_sequence.length){
            index = this.sentence_symbol_sequence.length -1;
        }

        if (index < 0){
            return;
        }

        let id = this.sentence_symbol_sequence[index];
        let selected_element = document.getElementById(id);
        selected_element.classList.add('symbol-selected');

        this.sentence_selected_symbol_indeces.push(index);
    }

    add_new_line_symbol() {
        this.add_newline_to_sentence();
    }

    sentence_select_last_if_none_selected(){
        // will select last element in sentence if none were selected
        // return true if possible, false if empty sentence
        if (this.sentence_selected_symbol_indeces.length === 0){
            if (this.sentence_symbol_sequence.length > 0){
                this.select_element_in_sentence(this.sentence_symbol_sequence.length-1);
                console.log("No symbol selected, will select the last one.");
            }else{
                return false;
            }
        }
        return true;
    }

    sentence_delete_selected() {
        
        if (!this.sentence_select_last_if_none_selected()){
            return;
        }

        let first_deleted_symbol_index = -1 ;
        for (let i=0; i<this.sentence_selected_symbol_indeces.length; i++){
            let sentence_index = this.sentence_selected_symbol_indeces[i];

            if (first_deleted_symbol_index === -1){
                // let selected_id = this.sentence_symbol_sequence[sentence_index];
                // first_deleted_symbol_index = this.sentence_symbol_sequence.indexOf(selected_id);;
                first_deleted_symbol_index = sentence_index ;
                
            }

            let id  = this.sentence_symbol_sequence[sentence_index];

            if (id.includes("newline")){
                this.sentence_selected_symbol_indeces.push(sentence_index + 1);
                console.log("Newline deletion, as this is a double symbol, it will remove the second invisible part too.");
            }

            let element_to_remove = document.getElementById(id);
            element_to_remove.remove();
        }

        // build up new sentence sequence. We don't want to interfere with it during deletion.
        let new_sentence_sequence = [];
        for (let i=0; i<this.sentence_symbol_sequence.length; i++){
            let symbol_id = this.sentence_symbol_sequence[i];
            if (! (this.sentence_selected_symbol_indeces.includes(i))){
                new_sentence_sequence.push(symbol_id);
            }
        }

        this.sentence_symbol_sequence = new_sentence_sequence;


        this.sentence_selected_symbol_indeces = [];
        console.log(first_deleted_symbol_index);
        this.select_element_in_sentence(first_deleted_symbol_index);
    }

    add_diacricit_independent(divToAttachTo, id, image_name) {
        let symbol = addDiv(divToAttachTo, id, "diacritic-independent");
        let img = document.createElement("Img");
        img.src = "symbols/ameji_diacritics_618x102/" + image_name;
        img.id = image_name;
        img.classList.add("diacritic_image");
        symbol.appendChild(img);
        return symbol;
    }
    
    add_punctuation(divToAttachTo, id, image_name) {
        let punctuation = this.create_punctuation(id, image_name);
        divToAttachTo.appendChild(punctuation);
        return punctuation;
    }
    
    create_punctuation(id, image_name){
        var symbol = document.createElement("div");
		symbol.id = id;
		symbol.className = "punctuation";
    
        let img = document.createElement("Img");
        img.src = "symbols/ameji_punctuation_309x618/" + image_name;
        img.id = image_name;
        img.classList.add("punctuation_image");
        // img.crossOrigin  = "Anonymous";  // local files will not work with CORS policy.
        symbol.appendChild(img);
        return symbol;
    }

    add_noun(divToAttachTo, id, image_name, diacritic_top, diacritic_bottom) {
        let noun = this.create_noun(id, image_name, diacritic_top, diacritic_bottom);
        divToAttachTo.appendChild(noun);
        return noun;
    }
    
    create_noun(id, image_name,  diacritic_top, diacritic_bottom){
        var noun = document.createElement("div");
		noun.id = id;
		noun.className = "noun";

        let diacritic_top_name = diacritics_to_file[diacritic_top];
        let diacritic_bottom_name = diacritics_to_file[diacritic_bottom];

        noun.setAttribute("data-tooltip",  id + " " + image_name);

        let img = document.createElement("Img");

        img.src = "symbols/" + image_name;
        img.id = image_name;
        img.classList.add("noun_image");
        // img.crossOrigin  = "Anonymous"; // local files will not work with CORS policy.

        let diacritic_1 = document.createElement("Img");
        diacritic_1.src = "symbols/ameji_diacritics_618x102/" + diacritic_top_name;
        diacritic_1.id = diacritic_top;
        diacritic_1.classList.add("noun_diacritic_top");
        // diacritic_1.crossOrigin  = "Anonymous";

        let diacritic_2 = document.createElement("Img");
        diacritic_2.src = "symbols/ameji_diacritics_618x102/" + diacritic_bottom_name;
        diacritic_2.id = diacritic_bottom;
        diacritic_2.classList.add("noun_diacritic_bottom");
        // diacritic_2.crossOrigin  = "Anonymous";

        noun.appendChild(img);
        noun.appendChild(diacritic_1);
        noun.appendChild(diacritic_2);
        return noun;
    }

}