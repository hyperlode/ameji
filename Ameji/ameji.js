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
    "gen2": "dot-dot.png",
    "verb": "arrow-right.png",
    "verb2": "double-headed-arrow.png",
    "sym": "squiggle.png",
    "lit": "line.png",
    "-": "diacritic_empty.png"
}

var nouns_JSON = `[
    {"file":"hourglass.png",
     "meaning":{
            "time relative":{
                "synonyms":[],
                "value":"-", "dia_top":"-", "dia_bot":"-"},
            "hourglass":{
                "synonyms":["sandglass","clepsydra","clock","timepiece","timer", "chronometer", "timekeeper"],
                "value":"-", "dia_top":"lit", "dia_bot":"-"}
    }},
    {"file":"luciebox.png", "meaning":{
        "luciebox":{
            "synonyms":["pretbak","busybox"],
            "value":"-", "dia_top":"-", "dia_bot":"-"},
        "electronic toy":{
            "synonyms":["toy", "electronic device"],
            "value":"-", "dia_top":"gen", "dia_bot":"-"}
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
    {"file":"clock-face.png", "meaning":{
        "time":{
            "synonyms":["absolute time"],
            "value":"-", "dia_top":"-", "dia_bot":"-"}
    }},
    {"file":"dot-space.png", "meaning":{
        "period":{
            "synonyms":["dot period end of senctence"],
            "value":"-", "dia_top":"-", "dia_bot":"-"}
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
    
    "colon.png",
    "comma.png",
    "comma_left.png",
    "slash-backward.png",
    "slash-forward.png",
    "double-slash-forward.png",
    "double-slash-backward.png",
    "equals.png",
    "cross-diagonal.png",
    "checkmark.png",
    "bracket-open-right.png",
    "bracket-open-left.png",
    "dot.png",
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
    "exclamation-mark-hollow-top.png",
    "exclamation-mark-hollow-top-upside-down.png",
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
    "semicolon.png",
    "semi_colon.png",

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

    "value_posneg_relative_-1.png",
    "value_posneg_relative_-2.png",
    "value_posneg_relative_-3.png",
    "value_posneg_relative_-4.png",
    "value_posneg_relative_0.png",
    "value_relative_0.png",
    "value_relative_1.png",
    "value_relative_2.png",
    "value_relative_3.png",
    "value_relative_4.png",
    "bar-zero-bottom-empty.png",
    "newline.png",
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
    "arrow-left.png",
    "arrow-right.png",
    "diacritic_empty.png",
    "diacritic_squiggle.png",
    "diacritic_verb.png",
    "dirlist.txt",
    "dot-dot.png",
    "dot.png",
    "double-headed-arrow.png",
    "line.png",
    "noun_Arrow_3044619.png",
    "noun_bump_37451.png",
    "noun_flex_195062.png",
    "noun_line_2668102.png",
    "squiggle.png"
]
var diacritics_bottom = [
    "arrow-left.png",
    "arrow-right.png",
    "diacritic_empty.png",
    "diacritic_squiggle.png",
    "diacritic_verb.png",
    "dot-dot.png",
    "dot.png",
    "double-headed-arrow.png",
    "line.png",
    "noun_Arrow_3044619.png",
    "noun_bump_37451.png",
    "noun_flex_195062.png",
    "noun_line_2668102.png",
    "squiggle.png"
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

        this.symbolPickerDiv = addDiv(this.baseDiv, "symbolPicker", "sentence-builder__symbol-picker");
        addBr(this.baseDiv);

        this.baseDiv.className = "sentence-builder";

        addButton(this.sentenceControlsButtonsDiv, "delete selected", "btnDelete", "btnDelete", this.sentence_delete_selected.bind(this));
        addButton(this.sentenceControlsButtonsDiv, "new line", "btnNewLine", "btnNewLine", this.add_new_line_symbol.bind(this));
        addButton(this.sentenceControlsButtonsDiv, "Save sentence as picture.png", "btnSaveToPng", "btnSaveToPng", this.save_sentence_to_picture.bind(this));
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

        this.selected_symbol_index = null;
        this.sentence_symbol_sequence = [];

        this.newline_symbol = "newline.png"; 

        this.load_local_file("file:///C:/temp/test.txt");
    }

    // download_sentence(){
    //     this.save_sentence_to_picture();
    //     console.log(document.getElementById("capture_test"));

    // }

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
        
        this.populate_basic_symbol_picker(this.nounPickerField, this.nouns_library, "nouns", this.searchField_nouns);
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
    
    add_symbol_to_sentence(sentence_element, classname){
        
        if (this.sentence_selected_index === -1){
            this.sentenceDiv.appendChild(sentence_element);
            this.sentence_symbol_sequence.push(sentence_element.id);

        }else{
            let insert_index = this.sentence_selected_index
            this.deselect_selected_element_in_sentence();

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
        }

        sentence_element.classList.add(classname);
        this.add_sentence_element_click_event(sentence_element);
        this.sentence_element_count += 1;
    }

    add_diacritic_click_event(elementToAttachTo) {
        elementToAttachTo.addEventListener(
            "click",
            function (event) {

                
                if (this.sentence_selected_index === -1) {
                    alert("Select a symbol in the sentence.");
                    return;
                }       
                let selected_id = this.sentence_symbol_sequence[this.sentence_selected_index];
                let selected_sentence_symbol = document.getElementById(selected_id);
                
                
                let selected_class_names = selected_sentence_symbol.classList;
                let symbol_is_noun = false;
                for (let i = 0; i < selected_class_names.length; i++) {
                    if (selected_class_names[i] == "noun") {
                        symbol_is_noun = true;
                    }
                }
                if (!symbol_is_noun) {
                    return;
                }

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
                diacritic_im.src = "symbols/diacritics/" + el.id;
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

            }.bind(this)
        );
    }

    add_sentence_element_click_event(elementToAttachTo) {
        elementToAttachTo.addEventListener(
            "click",
            function (event) {
                // current target = element where the eventtrigger was attached to
                let id = event.currentTarget.id;
                console.log("id:" + id);

                let selected_element_index = this.sentence_symbol_sequence.indexOf(id);
                
                // if a selected element is clicked, leave deselected
                console.log(selected_element_index);
                console.log(this.sentence_selected_index);
                
                if (selected_element_index === this.sentence_selected_index) {
                    // first deselect selected symbols.
                    this.deselect_selected_element_in_sentence();
                    return;
                }
                
                this.deselect_selected_element_in_sentence();

                // let selected_element = event.currentTarget
                this.select_element_in_sentence(selected_element_index);

                console.log(this.sentence_selected_index);
            }.bind(this)
            );
        }
        
    deselect_selected_element_in_sentence(){
        if (this.sentence_selected_index !== -1) {
            let id = this.sentence_symbol_sequence[this.sentence_selected_index];
            document.getElementById(id).classList.remove('symbol-selected');
        }
        this.sentence_selected_index = -1;
        
    }
        
    select_element_in_sentence(index){

        if (this.sentence_symbol_sequence.length === 0){
            this.sentence_selected_index = -1;
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
        this.sentence_selected_index = index;

    }

    add_new_line_symbol() {
        this.add_newline_to_sentence();
    }

    sentence_delete_selected() {

        if (this.sentence_selected_index == -1){
            if (this.sentence_symbol_sequence.length > 0){
                this.select_element_in_sentence(this.sentence_symbol_sequence.length-1);
            }else{
                return ;
            }
        }

        console.log(this.sentence_selected_index);

        let id  = this.sentence_symbol_sequence[this.sentence_selected_index];
        
        let remove_next = false;
        if (id.includes("newline")){
            remove_next = true;
            console.log("newline deletion");
        }
        let element_to_remove = document.getElementById(id);

        element_to_remove.remove();
        

        this.sentence_symbol_sequence.splice(this.sentence_selected_index,1);

        this.select_element_in_sentence(this.sentence_selected_index );

        if (remove_next){
            this.sentence_delete_selected();
        }
    }


    add_diacricit_independent(divToAttachTo, id, image_name) {
        let symbol = addDiv(divToAttachTo, id, "diacritic-independent");
        let img = document.createElement("Img");
        img.src = "symbols/diacritics/" + image_name;
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
        img.src = "symbols/ameji_punctuation_308x618/" + image_name;
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

        // let noun = addDiv(divToAttachTo, id, "noun");

        noun.setAttribute("data-tooltip", id);
        // noun.setAttribute("data-tooltip-persistent","");

        let img = document.createElement("Img");

        // img.src = "symbols/nouns/" + image_name;
        // img.src = "symbols/emoji/" + image_name;
        img.src = "symbols/" + image_name;
        img.id = image_name;
        img.classList.add("noun_image");
        // img.crossOrigin  = "Anonymous"; // local files will not work with CORS policy.

        let diacritic_1 = document.createElement("Img");
        diacritic_1.src = "symbols/diacritics/" + diacritic_top_name;
        diacritic_1.id = diacritic_top;
        diacritic_1.classList.add("noun_diacritic_top");
        // diacritic_1.crossOrigin  = "Anonymous";

        let diacritic_2 = document.createElement("Img");
        diacritic_2.src = "symbols/diacritics/" + diacritic_bottom_name;
        diacritic_2.id = diacritic_bottom;
        diacritic_2.classList.add("noun_diacritic_bottom");
        // diacritic_2.crossOrigin  = "Anonymous";

        noun.appendChild(img);
        noun.appendChild(diacritic_1);
        noun.appendChild(diacritic_2);
        return noun;
    }

}