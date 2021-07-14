// https://thenounproject.com/
// opensymbols.org
// unimoji.com (same ambition, but not much happening...)
// iconji.com . same idea, from 2011, but, catered towards english (e.a. at = @ )
// emojione --> git repo with emoji tools
// openmoji -> open source emoji drawings .
// brand logos -> https://worldvectorlogo.com/
class Ameji {
    constructor() {
        console.log("Ameji loaded");
        this.nouns_library = JSON.parse(nouns_JSON);
        this.emoji_library = JSON.parse(emoji_JSON);
        this.iconji_library = JSON.parse(iconji_JSON);
        this.ameji_punctuation_library = JSON.parse(ameji_punctuation);
        this.ameji_dictionary_library = JSON.parse(ameji_dictionary_JSON);
        this.ameji_diacritics_library = JSON.parse(ameji_diacritics_JSON);
        this.brands_library = JSON.parse(brands_JSON);

        this.allowed_ameji_dictionary_types = ["combo", "proper noun", "name", "compare", "single", "sentence", "expression"];
        
        this.symbol_folders = {
            "ameji":"ameji_basic_618x618",
            "openmoji":"emoji_blackwhite_72x72", 
            "ameji-punctuation":"ameji_punctuation_309x618", 
            "ameji-diacritics":"ameji_diacritics_618x102",
            "iconji":"iconji_32x32",
            "brands":"brands_618x618"
        };

        this.libraries = {
            "ameji":this.nouns_library,
            "ameji-word":this.ameji_dictionary_library,
            "openmoji":this.emoji_library,
            "ameji-punctuation":this.ameji_punctuation_library,
            "ameji-diacritics": this.ameji_diacritics_library,
            "iconji":this.iconji_library,
            "brands":this.brands_library  
        };
        
        this.baseDiv = document.getElementById("base");
        addDiv(this.baseDiv, "saved_sentences", "captured-sentences__base");
        this.saveLoadDiv = addDiv(this.baseDiv, "saveLoad", "sentence-builder__sentence");
        // this.saveLoadDiv.style.display = "none";
        
        this.jsonTextArea = addTextArea(this.saveLoadDiv, "ameji-json", "ameji-json", 5, 100, "json here");
        addBr(this.saveLoadDiv);
        addButton(this.saveLoadDiv, "Save as Text", "btnToText", "btnToText", this.sentence_to_minimal_json_textbox.bind(this));
        addButton(this.saveLoadDiv, "Load from Text", "btnToSentence", "btnToSentence", this.textbox_minimal_json_to_sentence.bind(this));
        addBr(this.saveLoadDiv);
        this.jsonIdTextBox = addTextBoxWithLabel(this.saveLoadDiv, "", "jsonIdTextBox", "jsonIdTextBox", 20, "Id");
        this.jsonTypeTextBox = addTextBoxWithLabel(this.saveLoadDiv, "combo", "jsonTypeTextBox", "jsonTypeTextBox", 20, "type");
        this.jsonMeaningTextBox = addTextBoxWithLabel(this.saveLoadDiv, "", "jsonMeaningTextBox", "jsonMeaningTextBox", 20, "Meaning(csv)");
        addButton(this.saveLoadDiv, "Selection to new Ameji", "btnVisibleToAmejiStandard", "btnVisibleToAmejiStandard", this.selected_symbols_to_ameji_standard.bind(this));
        this.checkBoxDictInsertable = addCheckBox(this.saveLoadDiv,"checkBoxInsertableInDict","checkBoxInsertableInDict",true,"for dictionary insert");
        
        this.sentenceDiv = addDiv(this.baseDiv, "sentence", "sentence-builder__sentence");
        this.sentenceControlsButtonsDiv = addDiv(this.baseDiv, "sentenceControls", "sentence-builder__controls");
        addBr(this.baseDiv);
        

        this.recentDiv = addDiv(this.baseDiv, "recent", "symbol-recent__display");
        this.recentDiv.style.display = "none";
        addBr(this.baseDiv);
        
        
        this.symbolPickerDiv = addDiv(this.baseDiv, "symbolPicker", "sentence-builder__symbol-picker");
        addBr(this.baseDiv);
        
        this.baseDiv.className = "sentence-builder";
        
        addButton(this.sentenceControlsButtonsDiv, "Select all [x]", "btnSelectAll", "btnSelectAll", this.select_all.bind(this),"x");
        addButton(this.sentenceControlsButtonsDiv, "Delete selected [z]", "btnDelete", "btnDelete", this.sentence_delete_selected.bind(this),"z");
        addButton(this.sentenceControlsButtonsDiv, "Unselect all [c]", "btnDeselectAll", "btnDeselectAll", this.deselect_all.bind(this),"c");
        
        addButton(this.sentenceControlsButtonsDiv, "Move < [a]", "btnMoveBackward", "btnMoveBackward", this.move_element_in_sentence_backward.bind(this),"a");
        addButton(this.sentenceControlsButtonsDiv, "< [h]", "btnSelectPrevious", "btnSelectPrevious", this.select_previous_element_in_sentence.bind(this),"h");
        addButton(this.sentenceControlsButtonsDiv, "> [l]", "btnSelectNext", "btnSelectNext", this.select_next_element_in_sentence.bind(this),"l");
        addButton(this.sentenceControlsButtonsDiv, "Move > [r]", "btnMoveForward", "btnMoveForward", this.move_element_in_sentence_forward.bind(this),"r");
        

        addButton(this.sentenceControlsButtonsDiv, "Insert New line", "btnNewLine", "btnNewLine", this.add_new_line_symbol.bind(this));
        addButton(this.sentenceControlsButtonsDiv, "Explode Selected Words", "btnExplode", "btnExplode", this.explode_selection.bind(this));
        addButton(this.sentenceControlsButtonsDiv, "Toggle Recently Used", "btnToggleRecent", "btnToggleRecent", this.toggle_recent_visibility.bind(this));
        addButton(this.sentenceControlsButtonsDiv, "Toggle Save/Load", "btnSaveLoad", "btnSaveLoad", this.toggle_save_load_visibility.bind(this));
        addButton(this.sentenceControlsButtonsDiv, "Save sentence as picture(be scrolled up to top of page).png", "btnSaveToPng", "btnSaveToPng", this.save_sentence_to_picture.bind(this));
        addButton(this.sentenceControlsButtonsDiv, "Debug", "btnDebug", "btnDebug", this.do_debug.bind(this));
        addBr(this.sentenceControlsButtonsDiv);


        
        this.diacriticsTopPickerField = addDiv(this.symbolPickerDiv, "diacriticsTopPicker", "sentence-builder__symbol-picker__diacritics-picker");
        this.diacriticsBottomPickerField = addDiv(this.symbolPickerDiv, "diacriticsBottomPicker", "sentence-builder__symbol-picker__diacritics-picker");
        addBr(this.baseDiv);
        
        this.searchField_quickpick = addTextBox(this.symbolPickerDiv, "", "txtBoxSearchQuickPick", "txtBoxSearchQuickPick", 30);
        this.add_search_at_type_event(this.searchField_quickpick);
        this.quickPickField = addDiv(this.symbolPickerDiv, "quickPicker", "sentence-builder__symbol-picker__quick-picker");
        addBr(this.baseDiv);
        
        this.searchField_punctuation = addTextBox(this.symbolPickerDiv, "", "txtBoxSearchPunctuation", "txtBoxSearchPunctuation", 30);
        this.add_search_at_type_event(this.searchField_punctuation);
        this.punctuationPickerField = addDiv(this.symbolPickerDiv, "punctuationPicker", "sentence-builder__symbol-picker__punctuation-picker");
        addBr(this.baseDiv);
       
        // this.properNounsPickerField = addDiv(this.symbolPickerDiv, "properNounsPicker", "sentence-builder__symbol-picker__proper-nouns-picker");        
        this.searchField_nouns = addTextBox(this.symbolPickerDiv, "", "txtBoxSearchNouns", "txtBoxSearchNouns", 30);
        this.add_search_at_type_event(this.searchField_nouns);
        this.nounPickerField = addDiv(this.symbolPickerDiv, "nounPicker", "sentence-builder__symbol-picker__noun-picker");
        
        this.searchField_dictionary = addTextBox(this.symbolPickerDiv, "", "txtBoxSearchDictionary", "txtBoxSearchDictionary", 30);
        this.add_search_at_type_event(this.searchField_dictionary);
        this.amejiDictionaryPickerField = addDiv(this.symbolPickerDiv, "amejiDictionary", "sentence-builder__symbol-picker__word-picker");

        this.searchField_emoji = addTextBox(this.symbolPickerDiv, "search", "txtBoxSearchEmoji", "txtBoxSearchEmoji", 30);
        this.add_search_at_type_event(this.searchField_emoji);
        this.emojiPickerField = addDiv(this.symbolPickerDiv, "emojiPicker", "sentence-builder__symbol-picker__noun-picker");
        
        this.populate_punctuation_picker();
        this.populate_diacritics_top_picker();
        this.populate_diacritics_bottom_picker();

        this.populate_quick_picker()
        this.populate_noun_picker();
        this.populate_emoji_picker();
        this.populate_ameji_dictionary_picker();

        this.sentence_element_count = 0;
        this.sentence_selected_ids = [];
        this.sentence_symbol_sequence = [];
        this.recent_symbols_sequence_ids = [];
        this.saved_sentences_count = 0;

        this.load_local_file("file:///C:/temp/test.txt");

        let example_sentence_json = `[
            ["ameji","circle-60degrees-cutout",["blank","blank"]],
            ["openmoji","1F497.png",["blank","blank"]],
            ["ameji-punctuation","value-relative-posneg-3"],
            ["openmoji","2600.png",["is","combo"]],
            ["openmoji","2614.png",["is","combo"]],
            ["openmoji","2744.png",["is","combo"]],
            ["openmoji","26C5.png",["is","combo"]],
            ["ameji-punctuation","bracket-left"],
            ["openmoji","1F321.png",["blank","blank"]],
            ["ameji-punctuation","value-relative-3"],
            ["ameji-punctuation","comma"],
            ["openmoji","2600.png",["blank","blank"]],
            ["ameji-punctuation","value-relative-0"],
            ["ameji-punctuation","bracket-right"]
            ]`
        this.minimal_json_to_sentence(example_sentence_json);
        this.save_sentence_to_picture();
    }

    selected_symbols_to_ameji_standard(){

        let word_data = {
            "id":this.jsonIdTextBox.value,
            "meaning":this.jsonMeaningTextBox.value.split(","),
            "type":this.jsonTypeTextBox.value
        };

        if (!this.allowed_ameji_dictionary_types.includes(word_data["type"])){
            alert("type " +  + "not allowed. Choose from: " + this.allowed_ameji_dictionary_types.join(", "));
        }
        
        let all_symbols_files = [];
        for (let i=0;i<this.sentence_selected_ids.length;i++){
            
            let id = this.sentence_selected_ids[i];
            let full_name = document.getElementById(id).name;
            let element_metadata = this.get_sentence_element_metadata(id);
            console.log(full_name);
            let original_symbol_data = this.full_name_to_dictionary_data(full_name);
            let symbol_id = original_symbol_data["id"];
            let files_data = original_symbol_data["files"][0];
            files_data[1] = symbol_id;

            // replace original diacritics with sentence diacritics
            let diacritics= this.get_diacritcs_as_array_from_metadata(element_metadata);
            
            if (diacritics !== undefined){
                files_data[2] = diacritics;
            }
            
            all_symbols_files.push(files_data);
            
        }
        word_data["files"] = all_symbols_files;

        if (this.checkBoxDictInsertable.checked){
            word_data = {"id":word_data};
        }

        let json_string = JSON.stringify(word_data);

        if (this.checkBoxDictInsertable.checked){
            json_string += ",";
        }

        this.jsonTextArea.value = json_string;
    }

    sentence_to_minimal_json_textbox(){
        let json_string = this.sentence_to_minimal_json()
        this.text_to_json_textbox(json_string);
    }
    
    text_to_json_textbox(text){
        this.jsonTextArea.value = "";
        this.jsonTextArea.value = text;

    }

    sentence_to_minimal_json(){
        console.log("to sentence");

        if (this.is_sentence_altered()){
            console.log("WARNING: Diacritics in symbols in the sentence were altered. Restoring the result will differ from this sentence. Use JSON to save exactly.")
        };

        let json_strings = [];
        for(var i=0;i<this.sentence_symbol_sequence.length;i++){
            let id = this.sentence_symbol_sequence[i];
            let element_metadata = this.get_sentence_element_metadata(id);
            // console.log(element_metadata);
            let files_data_json = this.metadata_to_minimal_json(element_metadata);
            json_strings.push(files_data_json);
        }
        return "[\n" + json_strings.join(",\n") + "\n]";
    }
    
    metadata_to_minimal_json(element_metadata){
        // metadata must contain "minimal_display_info"
        // which is an array: [library, name , [diacritictop, diacriticbottom]] // diacritics array optional
        let metadata_array = element_metadata["minimal_display_info"];
        return JSON.stringify(metadata_array);
    }

    sentence_minimal_json_to_metadata(json_string){
        let sentence = JSON.parse(json_string);

        let sentence_elements_metadata = [];

        for (let i=0;i<sentence.length;i++){
            let minimal_info_array = sentence[i];
            let element_metadata = this.minimal_info_array_to_metadata(minimal_info_array);
            sentence_elements_metadata.push(element_metadata);
        }
        return sentence_elements_metadata;
    }

    textbox_minimal_json_to_sentence(){
        let json_string = this.jsonTextArea.value;
        this.minimal_json_to_sentence(json_string);

    }

    minimal_json_to_sentence(json_string){
        let sentence_elements = this.sentence_minimal_json_to_metadata(json_string);

        for (let i=0;i<sentence_elements.length; i++){
            let element_metadata = sentence_elements[i]
            this.add_to_sentence_by_element_metadata(element_metadata);
        }
    }
  
    toggle_recent_visibility(){
        if (this.recentDiv.style.display === "none") {
            this.recentDiv.style.display = "block";
        } else {
            this.recentDiv.style.display = "none";
        }
    }

    toggle_save_load_visibility(){
        console.log("jief");
        if (this.saveLoadDiv.style.display === "none") {
            this.saveLoadDiv.style.display = "block";
        } else {
            this.saveLoadDiv.style.display = "none";
        }
    }

    do_debug(){
        // this.move_element_in_sentence();
    }

    move_element_in_sentence_backward(){
        this.move_element_in_sentence(false);
    }

    move_element_in_sentence_forward(){
        this.move_element_in_sentence(true);
    }

    move_element_in_sentence(forwardElseBackward){
        // record
        
        this.sentence_select_last_if_none_selected();

        let selected_id = this.sentence_selected_ids[this.sentence_selected_ids.length-1];
        
        let element_metadata = this.get_sentence_element_metadata(selected_id);

        let insert_before_else_after = undefined;
        // move selection
        if (forwardElseBackward){
            insert_before_else_after = false;
            this.select_next_element_in_sentence();
        }else{
            insert_before_else_after = true;
            this.select_previous_element_in_sentence();
        }
        // delete
        this.sentence_delete_element(selected_id);

        // add after selected
        this.add_to_sentence_by_element_metadata(element_metadata, insert_before_else_after);
    }


    // ------------------------------- CAPTURE ----------------------------
    save_sentence_to_picture(){
        let sentence_element = document.getElementById("sentence");

        sentence_element.classList.remove("sentence-builder__sentence");
        sentence_element.classList.add("sentence-builder__sentence-picture-saving");
        document.documentElement.scrollTop = 0;

        // https://stackoverflow.com/questions/22710627/tainted-canvases-may-not-be-exported
        html2canvas(sentence_element,  {useCORS: true}).then(
            function(canvas){
                // window.scrollTop=0; // necessary, because 
                canvas.id = "capture_canvas_" + this.saved_sentences_count;
                
                let saved_sentences_field = document.getElementById("saved_sentences");
                
                let capture_div = this.create_sentence_as_picture_div(
                    canvas,
                    this.saved_sentences_count,
                    this.sentence_to_minimal_json(),
                    "Meaning of the sentence"
                );
                saved_sentences_field.appendChild(capture_div);
                this.saved_sentences_count++;
                //https://weworkweplay.com/play/saving-html5-canvas-as-image/
                // let dataURL = canvas.toDataURL('image/png');
                // document.getElementById("buttonDownload").href = dataURL;
            }.bind(this)
        )
        
        sentence_element.classList.remove("sentence-builder__sentence-picture-saving");
        sentence_element.classList.add("sentence-builder__sentence");
    }

    create_sentence_as_picture_div(canvas, id, minimal_json, meaning){
        
        let capture_div = document.createElement("div");
        capture_div.id =  "capture_" + id;
        capture_div.className = "captured-sentences__capture";
        capture_div.name = capture_div.id;
        
        canvas.id = "capture_canvas_" + id;
        capture_div.appendChild(canvas);
        
        
        let capture_controls_div = document.createElement("div");
        capture_controls_div.id =  "capture_controls_" + id;
        capture_controls_div.className = "captured-sentences__capture-controls";
        
        capture_div.appendChild(capture_controls_div);
        addButtonToExecuteGeneralFunction(capture_controls_div,"delete","capture_delete_" + id, "capture_delete_" + id,this.delete_capture_div,capture_div.id);
        addButtonToExecuteGeneralFunction(capture_controls_div,"edit","capture_show-json_" + id, "capture_show-json_" + id,this.capture_show_json.bind(this),minimal_json);
        addButton(capture_controls_div,"share","capture_share_" + id, "capture_share_" + id,undefined);
        
		addLabel(capture_controls_div, "capture_label_meaning_" + id, meaning);

        return capture_div;
    }

    // add_delete_capture_div_click_event(elementToAttachTo){
    //     elementToAttachTo.addEventListener(
    //         "click",
    //         function (event) {
    //             let id = event.currentTarget.id;
    //             console.log(id);
    //             // this.add_to_sentence_by_full_name(name);
    //         }.bind(this)
    //     );
    // }
    delete_capture_div(id){
        console.log(id);
        let element = document.getElementById(id);
        element.remove();
    }

    capture_show_json(minimal_json){
        this.text_to_json_textbox(minimal_json);

        this.minimal_json_to_sentence(minimal_json);
    }

    // ---------------- SYMBOL PICKER ------------------------------

    load_local_file(file_path){
        async function loadFile(file_path) {
            let text = await file.text();
            console.log(text);
          }
    }

    add_search_at_type_event(elementToAttachTo) {
        elementToAttachTo.addEventListener("change",
            function (event) {
                
                this.populate_quick_picker();
                this.populate_noun_picker();
                this.populate_punctuation_picker();
                this.populate_emoji_picker();
                this.populate_ameji_dictionary_picker();

            }.bind(this)
        );
    }
  
    populate_diacritics_top_picker() {
   
        this.populate_diacritics_picker(this.diacriticsTopPickerField, "diacritic_top_");
    }
    
    populate_diacritics_bottom_picker() {
   
        this.populate_diacritics_picker(this.diacriticsBottomPickerField, "diacritic_bottom_");
    }

    populate_diacritics_picker(elementToPopulate, diacriticsPosition){
        for (let diacritic_name in this.ameji_diacritics_library){
            let diacritic = this.ameji_diacritics_library[diacritic_name];
            let symbolElement = this.add_diacritic_independent(elementToPopulate, diacriticsPosition + "_" + diacritic_name, "ameji-diacritics_" + diacritic_name);
            
            this.add_diacritic_click_event(symbolElement);
        }
    }
    
    populate_punctuation_picker() {
        this.populate_picker(this.punctuationPickerField,["ameji-punctuation"],this.searchField_punctuation,true);
    }
    
    populate_ameji_dictionary_picker(){
        // this.populate_word_picker(this.amejiDictionaryPickerField, this.searchField_dictionary );
        this.populate_picker(this.amejiDictionaryPickerField,["ameji-word"],this.searchField_dictionary,true);
    }
    
    populate_quick_picker() {
        this.populate_picker(this.quickPickField, ["openmoji", "iconji", "brands", "ameji", "ameji-word", "ameji-punctuation"], this.searchField_quickpick, false);
    }

    populate_noun_picker() {
        this.populate_picker(this.nounPickerField, ["ameji"], this.searchField_nouns, true);
    }
    
    populate_emoji_picker() {
        this.populate_picker(this.emojiPickerField, ["openmoji", "iconji", "brands"], this.searchField_emoji, true);
    }
       
    populate_picker(elementToPopulate, library_names, searchField, show_all_if_empty_search){
        
        elementToPopulate.innerHTML = "";
        let search_string = searchField.value.toLowerCase();
        
        if (searchField.value === "" && !show_all_if_empty_search){
            return;
        }

        for (let library_index in library_names){
            let library_name = library_names[library_index];
            
            let library = this.libraries[library_name];
            
            for (var id in library){
                let full_name = library_name + "_" + id;
                let all_meanings = full_name + this.full_name_to_meaning(full_name, true).join("").toLowerCase();

                if (all_meanings.includes(search_string) ) {

                    if (["ameji","openmoji", "iconji"].includes(library_name)){
                        this.add_noun_to_picker(elementToPopulate, full_name);

                    }else if (library_name === "ameji-word"){
                        this.add_word_to_picker(elementToPopulate, full_name);
                        // separate every word with punctuation
                         this.add_punctuation_independent(elementToPopulate,"divider","ameji-punctuation_empty");
                        
                    }else if (library_name === "ameji-punctuation"){
                        this.add_punctuation_to_picker(elementToPopulate, full_name);
                        console.log("eieiej");
                    }
                }
            }
        }
    }

    add_punctuation_to_picker(elementToAttachTo, full_name){
        let symbolElement = this.add_punctuation_independent(elementToAttachTo, full_name, full_name, true);
        this.add_punctuation_click_event(symbolElement);
    }

    add_word_to_picker(elementToAttachTo, full_name){
        let wordDiv = this.ameji_word_name_to_div(full_name);
        
        let meaning = this.full_name_to_meaning(full_name, false);
        wordDiv.setAttribute("data-tooltip", meaning);
        
        this.add_word_click_event(wordDiv);
        elementToAttachTo.appendChild(wordDiv);
    }

    add_noun_to_picker(elementToAttachTo, full_name){
        let symbolElement = this.add_noun_independent(
            elementToAttachTo,
            full_name,
            full_name
            )
        this.add_noun_click_event(symbolElement);
    }

    // ---------------- GENERAL --------------------
    split_full_name_to_library_and_name(name){
        // split full_name into components. library_symbolname-efijesf
        // splits at first _
        // if no underscore present, will only return "element_name"

        let split_name = {};
        
        let [library_name, ...symbol_name] = name.split('_');
        symbol_name = symbol_name.join('_');

        if (symbol_name === ""){
            symbol_name = library_name;
            split_name["element_name"] = symbol_name;    
        }else{
            split_name["library_name"] = library_name;
            split_name["element_name"] = symbol_name;
        }
        return split_name;
    }

    full_name_to_dictionary_data(full_name){

        // full_name has the library as its precursor
        // e.a. ameji_hour  =    library ameji, name hour
        
        let split_name = this.split_full_name_to_library_and_name(full_name);

        let library_name = split_name["library_name"];
        let element_name = split_name["element_name"];

        let library = this.libraries[library_name];
        
        if (library === undefined){
            console.log("library: " + library_name + " not found. (" + full_name +")" );
        }
        let element_data = library[element_name];

        if (element_data === undefined){
            console.log("ERROR: no matching data for " + element_name + "(full name: " + full_name + " )");
        }
     
        return element_data;
    }

    full_name_to_metadata(full_name){
        let split_name = this.split_full_name_to_library_and_name(full_name);
        let metadata = {"full_name":full_name, "library_name":split_name["library_name"], "element_name":split_name["element_name"]}
        
        let library = this.libraries[metadata["library_name"]];
        let library_metadata  = library[metadata["element_name"]];
        
        return {...metadata, ...library_metadata};
    }

    full_name_to_meaning(full_name, as_array){

        let meanings = this.full_name_to_metadata(full_name)["meaning"];
        if (as_array){
            return meanings;
        }else{
            return meanings.join(", ");
        }
    }
    
    // -------------------- ELEMENT -------------------
    create_element_by_element_metadata(element_metadata){
        let element = undefined;
        let full_name = element_metadata["full_name"];
        let library = element_metadata["library_name"];

        if (library === "ameji-word"){
            element = this.ameji_word_name_to_div(full_name);

        }else if (library === "ameji-punctuation"){
            
            element = this.create_punctuation(full_name, full_name);
            
        }else{
            element = this.create_noun(full_name, full_name, element_metadata["diacritic_top_name"], element_metadata["diacritic_bottom_name"]);
        }
        return element;
    }

    minimal_info_array_to_metadata(minimal_info){
        // accepts: [library, name, [dia_top, dia_bottom]] --> [dia_top, dia_bottom] = optional
        let element_metadata = {};


        element_metadata["library_name"] = minimal_info[0];
        element_metadata["element_name"] = minimal_info[1];
        element_metadata["full_name"] = minimal_info[0] + "_" + minimal_info[1];

        if (minimal_info[2]!==undefined){
            if (minimal_info[2][0] !== undefined){
                element_metadata["diacritic_top_name"] = minimal_info[2][0];
            }
            if (minimal_info[2][1] !== undefined){
                element_metadata["diacritic_bottom_name"] = minimal_info[2][1];
            }
        }
        return element_metadata;
    }

    replace_diacritic_to_metadata(element_metadata, diacritic_name, top_else_Bottom ){
        
        let position_name = "diacritic_bottom_name";
        if (top_else_Bottom){
            position_name = "diacritic_top_name";
        }
        
        element_metadata[position_name] = diacritic_name;
    }

    get_diacritcs_as_array_from_metadata(element_metadata){
        // element_metadata = dict with all metadata
        
        // returns short names
        // console.log(element_metadata);

        let diacritics = [];
        if (element_metadata["diacritic_top_name"]!== undefined ){
            if (element_metadata["diacritic_top_name"]!== "blank" ){

                let diacritic_name = this.split_full_name_to_library_and_name(element_metadata["diacritic_top_name"])["element_name"];
                diacritics.push(diacritic_name);
            }
        }
        if (element_metadata["diacritic_bottom_name"]!== undefined){
            if (element_metadata["diacritic_bottom_name"]!== "blank" ){

                if (diacritics.length === 0){
                    diacritics.push("blank");
                }
                let diacritic_name = this.split_full_name_to_library_and_name(element_metadata["diacritic_bottom_name"])["element_name"];
                console.log(diacritic_name);
                diacritics.push(diacritic_name);

            }
        }
        if (diacritics.length === 0){
            diacritics = undefined;
        }
        return diacritics;
    }

    // ----------------RECENT ----------------------
    
    add_word_to_recent(word_name){
        // word without library prefix
        let word_element = this.ameji_word_name_to_div(word_name);
        this.add_element_to_recent(word_element);        
    }
    
    add_symbol_to_recent(symbol_name){
        let symbol_data = this.full_name_to_dictionary_data(symbol_name);
        let symbol_element = this.create_noun(symbol_data["id"], symbol_name);
        this.add_element_to_recent(symbol_element);        
    }

    add_element_to_recent(element){
        if (this.recent_symbols_sequence_ids.indexOf(element.name) !== -1){
            // symbol already added
            return; 
        }
        
        this.recentDiv.appendChild(element);
        this.add_recent_elements_click_event(element);
        element.id = this.recent_symbols_sequence_ids.length;
        this.recent_symbols_sequence_ids.push(element.name);
    }

    add_recent_elements_click_event(elementToAttachTo){
        elementToAttachTo.addEventListener(
            "click",
            function (event) {
                let name = event.currentTarget.name;
            this.add_to_sentence_by_full_name(name);
            }.bind(this)
        );
    }
    
    // ----------------SENTENCE ----------------------

    get_components_for_all_sentence_elements(){
        let sentence_components = [];
        for (let i=0; i< this.sentence_symbol_sequence.length; i++){
            let id = this.sentence_symbol_sequence[i];
            let element_metadata = this.get_sentence_element_metadata(id);
            if (element_metadata!== undefined){
                sentence_components.push(element_metadata);
            }
        }
        return sentence_components;
    }
    
    explode_selection(){
        if (this.sentence_selected_ids.length == 0){
            alert("Please select words to explode.");
        };

        let selection_memory = [...this.sentence_selected_ids];

        for (let i=0; i < selection_memory.length;i++){
            let element_in_sentence_id = selection_memory[i];
            let element = document.getElementById(element_in_sentence_id);
            let full_name = element.name;
            let name_data = this.split_full_name_to_library_and_name(full_name);
            
            if (name_data["library_name"] === "ameji-word"){
                let element_data = this.get_sentence_element_metadata(element_in_sentence_id);
                let word_data = element_data["word_data"];
                let word_components = word_data["word_components"];
                for (let i=0; i<word_components.length; i++){
                    let symbol_components = word_components[i];
                    this.add_to_sentence_by_element_metadata(symbol_components);
                }
                this.sentence_delete_element(element_in_sentence_id);
            }
        }
    }

    is_sentence_altered(){
        for (let id in this.sentence_symbol_sequence){
            let is_altered = this.is_sentence_element_altered(this.sentence_symbol_sequence[id]);
            if (is_altered){
                return true;
            }
        }
        return false;
    }

    is_sentence_element_altered(sentence_element_id){
        // in reality, we're looking for changed diacritics.
        // false if not different from original symbol.

        // let sentence_element = document.getElementById(sentence_id);
        
        
        let sentence_symbol_data = this.get_sentence_element_metadata(sentence_element_id);

        let full_name = sentence_symbol_data["full_name"];
       


        let immutable_libraries = ["ameji-word","ameji-punctuation", "ameji-diacritics"];

        if (immutable_libraries.includes(sentence_symbol_data["library_name"]) ){
            // console.log("Cannot be altered. So, we're good.");
            return false;
        }

        let original_diacritics_data = this.get_diacritics_from_dictionary_symbol(full_name);

        if (sentence_symbol_data["diacritic_top_name"] !== original_diacritics_data["diacritic_top_name"]){
            console.log("Top diff.");
            return true;
        }
        if (sentence_symbol_data["diacritic_bottom_name"] !== original_diacritics_data["diacritic_bottom_name"]){
            console.log("bottom diff");
            return true;
        }

        return false;
    }

    get_sentence_word_to_symbols(sentence_element){
        // will take dictionary info from full_name.
        
        // let components = {"full_name": sentence_element.name};
        
        let word_data = {};
        
        // get word data
        let word_name_and_library = this.split_full_name_to_library_and_name ( sentence_element.name );
        word_data["word_metadata"] = [word_name_and_library["library_name"], word_name_and_library["element_name"]];
        

        let word_symbols_components = [];
        // get word components data
        let word_component_elements = sentence_element.children;
        for (let i=0; i<word_component_elements.length; i++){
            let element = word_component_elements[i];
            let element_metadata = this.split_full_name_to_library_and_name(element.name);
            let components = undefined;
            if (["ameji", "openmoji"].includes(element_metadata["library_name"])){
                components = this.get_noun_name_and_diacritics(element);
            }else if(["ameji-punctuation"].includes(element_metadata["library_name"])) {
                components = this.get_punctuation_components(element);
            }else{
                console.log("no match found for : "+ element);
            }
            if (components !== undefined){
                word_symbols_components.push(components);
            }
        }
        word_data["word_components"] = word_symbols_components;
        return word_data;
        
    }

    get_sentence_element_library_name(sentence_element_id){
        let sentence_element = document.getElementById(sentence_element_id);
        return this.split_full_name_to_library_and_name(sentence_element.name)["library_name"];
    }

    get_sentence_element_metadata(sentence_element_id){

        // Not from the dictionary symbol, but as the symbol is in the sentence.
        // for non combined symbols (e.a. not a word)
        // return return object with:
        // full_name, diacritic_top_name and diacritic_bottom_name

        let sentence_element = document.getElementById(sentence_element_id);
        let full_name = sentence_element.name;

        
        let split_element_name = this.split_full_name_to_library_and_name(full_name);
        
        
        let library_name = split_element_name["library_name"];
        let element_name = split_element_name["element_name"];
        
        let element_data = {
            "full_name":full_name,
            "library_name":library_name,
            "element_name":element_name
        };
        
        element_data["minimal_display_info"] = [library_name, element_name];
        
        if (element_name === "newline"){
            element_data["element_name"] = "newline";
            element_data["library_name"] = "ameji-punctuation";
            element_data["full_name"] = "ameji-punctuation_newline";
            element_data["minimal_display_info"] = [element_data["library_name"], element_data["element_name"]];

        }else if (library_name === "ameji-word"){

            // add all symbols (symbol + diacritics.)
            
            element_data["word_data"] = this.get_sentence_word_to_symbols(sentence_element);


        }else if (library_name === "ameji-punctuation"){
            
            
        }else if (["ameji","openmoji", "iconji"].includes(library_name)){
            var all_data =  this.get_noun_name_and_diacritics(sentence_element);
            // element_data = [library_name,element_name,[all_data["diacritic_top_name"],all_data["diacritic_bottom_name"]]];
            element_data["diacritic_top_name"] = all_data["diacritic_top_name"];
            element_data["diacritic_bottom_name"] = all_data["diacritic_bottom_name"];
            element_data["minimal_display_info"] = [library_name, element_name,[all_data["diacritic_top_name"],all_data["diacritic_bottom_name"]]];

        }else if (library_name === "ameji-diacritics"){
            console.log("not applicable");
        }

        if (element_data === undefined){
            console.log("ERROR: no matching data for sentence element " +  sentence_element.name);
        }
        
        // console.log(element_data);
        return element_data;
    }
    
    add_to_sentence_by_minimal_display_info(minimal_info_array){

        let element_metadata = this.minimal_info_array_to_metadata(minimal_info_array);
        this.add_to_sentence_by_element_metadata(element_metadata);
    }
    
    add_to_sentence_by_element_metadata(element_metadata, insertBeforeElseAfter){
        // for one symbol (or word)
        // components: object with full_name and (if applicable diacritics)
      
        let element = this.create_element_by_element_metadata(element_metadata);
        this.add_element_to_sentence(element, "sentence-element", insertBeforeElseAfter);
    }

    // add_to_sentence_by_element_metadata(element_metadata){
    //     // for one symbol (or word)
    //     // components: object with full_name and (if applicable diacritics)

    //     let element = undefined;
    //     let full_name = element_metadata["full_name"];
    //     let library = element_metadata["library_name"];

    //     if (library === "ameji-word"){
    //         element = this.ameji_word_name_to_div(full_name);

    //     }else if (library === "ameji-punctuation"){
    //         element = this.create_punctuation(full_name, full_name);
            
    //     }else{
    //         element = this.create_noun(full_name, full_name, element_metadata["diacritic_top_name"], element_metadata["diacritic_bottom_name"]);
    //     }

    //     this.add_element_to_sentence(element, "sentence-element");
    // }

    add_element_by_full_name(elementToAttachTo, full_name){
        let element_metadata = this.full_name_to_metadata(full_name);
        let element = this.create_element_by_element_metadata(element_metadata);
        elementToAttachTo.appendChild(element);
    }

    add_to_sentence_by_full_name(full_name){
        // full name includes libary and name separated by an underscore.  (e.a. ameji_hour)
        // will take from library.

        let split_name = this.split_full_name_to_library_and_name(full_name);
        let metadata = this.full_name_to_metadata(full_name);
        this.add_to_sentence_by_element_metadata( metadata);
    }

    add_punctuation_to_sentence(punctuation_name) {
        let sentence_element = this.create_punctuation(
            this.sentence_element_count,
            punctuation_name
        );
        this.add_element_to_sentence(sentence_element, "sentence-element");
    }

    add_newline_to_sentence(){
        var symbol = document.createElement("div");
        symbol.id =  this.sentence_element_count;
        symbol.name = "newline"
        symbol.className = "sentence-builder__newline";

        this.add_element_to_sentence_filtered(symbol, "sentence-builder__newline");
    }

    add_space_to_sentence(){
        let sentence_element = this.create_punctuation(
            this.sentence_element_count,
            "ameji-punctuation_empty"
        );
        this.add_element_to_sentence_filtered(sentence_element, "sentence-element");
    }
    
    add_element_to_sentence(element_to_add, classname, insertBeforeElseAfter){
        // make exceptions for newline, newpage and other future layout options. 
        // e.a. a newline character is just a symbol, but, once inserted, it behaves differently. This is the only place to do it. We don't want to insert an actual newline in the symbolpicker or anywhere else but in the sentence itself.

        if (element_to_add.name == "ameji-punctuation_newline"){
            this.add_newline_to_sentence();
        }else if (element_to_add.name == "ameji-punctuation_space"){
            this.add_space_to_sentence();
        }else{
            this.add_element_to_sentence_filtered(element_to_add, classname, insertBeforeElseAfter);
        }
    }

    add_element_to_sentence_filtered(element_to_add, classname, insertBeforeElseAfter){
        // use add_element_to_sentence. This is after triage of layout symbols.

        insertBeforeElseAfter = typeof insertBeforeElseAfter !== 'undefined' ? insertBeforeElseAfter : false;
        
        element_to_add.id = "sentence_element_" + this.sentence_element_count;
        let id = element_to_add.id;


        if (this.sentence_selected_ids.length === 0){
            // No selection --> append to sentence
            this.sentenceDiv.appendChild(element_to_add);
            this.sentence_symbol_sequence.push(id);

            element_to_add.classList.add(classname);
            this.add_sentence_element_click_event(element_to_add);
            this.sentence_element_count += 1;

        }else{


            let selected_element_id = this.sentence_selected_ids[this.sentence_selected_ids.length - 1];

            let insert_index = this.sentence_symbol_sequence.indexOf(selected_element_id);
            this.deselect_element_in_sentence(selected_element_id);
            
            let selected_element = document.getElementById(selected_element_id);
            
            
            if (insertBeforeElseAfter){
                this.sentenceDiv.insertBefore(element_to_add, selected_element);
                this.sentence_symbol_sequence.splice(insert_index,0,id);
                
            }else{
                this.sentenceDiv.insertBefore(element_to_add, selected_element.nextSibling);
                this.sentence_symbol_sequence.splice(insert_index + 1,0,id);

            }
            
            this.select_element_in_sentence(id);
            
            // INSERT BEFORE:
            // let insert_index = this.sentence_selected_index
            // this.deselect_element_in_sentence();
            
            // let selected_element_id = this.sentence_symbol_sequence[insert_index];
            // let selected_element = document.getElementById(selected_element_id);
            // this.sentenceDiv.insertBefore(element_to_add, selected_element);
            // this.sentence_symbol_sequence.splice(insert_index,0,element_to_add.id);
            // this.select_element_in_sentence(insert_index);
            
            element_to_add.classList.add(classname);
            this.add_sentence_element_click_event(element_to_add);
            this.sentence_element_count += 1;
        }
    }

    add_sentence_element_click_event(elementToAttachTo) {
        elementToAttachTo.addEventListener(
            "click",
            function (event) {
                // current target = element where the eventtrigger was attached to
                let id = event.currentTarget.id;
                // if clicked element already selected, deselect.
                if (this.sentence_selected_ids.includes(id)){
                    this.deselect_element_in_sentence(id);
                }else{
                    this.select_element_in_sentence(id);
                }
            }.bind(this)
        );
    }
    
    select_all(){
        this.deselect_all();
        for (let i=0;i<this.sentence_symbol_sequence.length;i++){
            this.select_element_in_sentence(this.sentence_symbol_sequence[i]);
        }
    }

    deselect_all(){
        let done = false;
        while (!done){
            if (this.sentence_selected_ids.length === 0){
                done = true;
            }else{
                this.deselect_element_in_sentence(this.sentence_selected_ids[0]);   
            }
        }
    }

    deselect_element_in_sentence(id){
       
        if (this.sentence_selected_ids.includes(id)){
            document.getElementById(id).classList.remove('symbol-selected');
            this.sentence_selected_ids.splice(this.sentence_selected_ids.indexOf(id),1); 
        }
    }
        
    select_next_element_in_sentence(){
        // only move last element in selection
        let index = 0;
        
        for (let i=this.sentence_symbol_sequence.length - 2 ;i>=0;i--){
            // - 2 because if last element is selected, we can do anything. 
            if (this.sentence_symbol_sequence[i] == this.sentence_selected_ids[this.sentence_selected_ids.length-1]){
                this.deselect_element_in_sentence(this.sentence_symbol_sequence[i]);
                this.select_element_in_sentence(this.sentence_symbol_sequence[i+1]);
            }
        } 
    }

    select_previous_element_in_sentence(){
        // only move last element in selection
        let index = 0;
        
        for (let i=1; i<this.sentence_symbol_sequence.length; i++){
            // start not with first element, it can't be moved anyways...
            if (this.sentence_symbol_sequence[i] == this.sentence_selected_ids[this.sentence_selected_ids.length-1]){
                this.deselect_element_in_sentence(this.sentence_symbol_sequence[i]);
                this.select_element_in_sentence(this.sentence_symbol_sequence[i-1]);
            }
        } 
    }

    select_element_in_sentence(element_id){
        // index of element in the symbols array of the sentence 
        if (this.sentence_symbol_sequence.length === 0){
            this.sentence_selected_ids = [];
            return ;
        }
        
        if (this.sentence_selected_ids.includes(element_id)){
            // already selected.
            return;
        }
        let selected_element = document.getElementById(element_id);
        
        selected_element.classList.add('symbol-selected');
        
        this.sentence_selected_ids.push(element_id);
        
       
    }

    add_new_line_symbol() {
        this.add_newline_to_sentence();
    }

    sentence_select_last_if_none_selected(){
        // will select last element in sentence if none were selected
        // return true if possible, false if empty sentence

        if (this.sentence_selected_ids.length === 0){
            if (this.sentence_symbol_sequence.length > 0){
                let last_element_id = this.sentence_symbol_sequence[this.sentence_symbol_sequence.length - 1];
                this.select_element_in_sentence(last_element_id);
                console.log("No symbol selected, will select the last one.");
            }else{
                return false;
            }

        }
        return true
    }

    sentence_delete_selected() {
        
        if (!this.sentence_select_last_if_none_selected()){
            return;
        }

        if (this.sentence_selected_ids.length > 1){
            while (this.sentence_selected_ids.length > 0){
                this.sentence_delete_element(this.sentence_selected_ids[0]);
            }

        }else if (this.sentence_selected_ids.length === 1){
            let id_to_delete = this.sentence_selected_ids[0];
            this.select_next_element_in_sentence();
            this.sentence_delete_element(id_to_delete);
        }
    }

    sentence_delete_element(sentence_element_id){

        let index = this.sentence_symbol_sequence.indexOf(sentence_element_id);
        if (index === -1) {
            console.log("ASSERT ERROR: element not in sentence.");
        }
        
        // ok if not selected
        this.deselect_element_in_sentence(sentence_element_id);
        let element = document.getElementById(sentence_element_id);
        let full_name = element.name;
        
        this.sentence_symbol_sequence.splice(index, 1);
        element.remove();
    }


    
    // -------------------- WORDS ----------------------
    

    word_name_to_metadata(full_name){
        let split_name = this.split_full_name_to_library_and_name(full_name);
        if (split_name["library_name"] != "ameji-word"){
            console.log("ASSERT ERROR. only ameji words tested.")
        }
        let word_data = this.ameji_dictionary_library[split_name["element_name"]];

        word_data["library_name"] = split_name["library_name"];           
        word_data["element_name"] = split_name["element_name"];           
        word_data["full_name"] = full_name;           
        let files = word_data["files"];           
        let symbols = []
        for (let symbol_index=0;symbol_index<files.length;symbol_index++){
            let symbol_metadata = this.minimal_info_array_to_metadata(files[symbol_index]);
            symbols.push(symbol_metadata);
        }
        
        word_data["symbols_metadata"] = symbols;
        return word_data;
    }

    ameji_word_name_to_div(full_name){
        // word_id --> only the word itself. 

        // let split_name = this.split_full_name_to_library_and_name(full_name);
       
        let word_data = this.word_name_to_metadata(full_name);

        let word_start_punctuation = undefined;
        let word_divider_punctuation = undefined;
        let word_stop_punctuation = undefined;

        if (word_data["type"] == "combo"){
            
            for(let i=0;i<word_data["symbols_metadata"].length;i++){
                
                this.replace_diacritic_to_metadata(word_data["symbols_metadata"][ i], "combo", false);
            }
        }
        else if (word_data["type"] == "compare"){
            word_start_punctuation = "ameji-punctuation_bracket-square-left";
            word_divider_punctuation = "ameji-punctuation_colon";
            word_stop_punctuation = "ameji-punctuation_bracket-square-right";
        }

        else if (word_data["type"] == "proper noun"){
            for(let i=0;i<word_data["symbols_metadata"].length;i++){
                
                this.replace_diacritic_to_metadata(word_data["symbols_metadata"][ i], "name", false);
            }
        }
        
        else if (this.allowed_ameji_dictionary_types.includes(word_data["type"])){
            // other types of inputs. 
        }
        
        return this.create_word(word_data, word_start_punctuation, word_divider_punctuation, word_stop_punctuation);
    }
    
    add_word_click_event(elementToAttachTo){
        elementToAttachTo.addEventListener(
            "click",
            function (event) {
                let full_name = event.currentTarget.name;
                
                let wordDiv = this.ameji_word_name_to_div(full_name);
                this.add_element_to_sentence(wordDiv,"sentence-element");
                this.add_word_to_recent(full_name);
            }.bind(this)
        );
    }

    create_word(word_data , start_punctuation, divider_punctuation, stop_punctuation){
        
        let id = word_data["element_name"];
        let library =  word_data["library_name"]; // "ameji-word", 
        var wordDiv = document.createElement("div");
        wordDiv.id = id;
        wordDiv.name = library + "_" + id;
        wordDiv.className = "word";

        if (start_punctuation !== undefined){
            this.add_punctuation_independent(wordDiv, "Start", start_punctuation);
        }
        
        let symbols = word_data["symbols_metadata"];
        for(var i=0;i<symbols.length;i++){
            if (i!==0 && divider_punctuation !== undefined){
                this.add_punctuation_independent(wordDiv, "divider", divider_punctuation);
            }
            let symbol_metadata = symbols[i];
            let element = this.create_element_by_element_metadata(symbol_metadata);
            wordDiv.appendChild(element);
        }

        if (stop_punctuation !== undefined){
            this.add_punctuation_independent(wordDiv, "Stop", stop_punctuation);
        }

        return wordDiv;
    }

    // -------------------- NOUNS --------------------
    
    get_noun_name_and_diacritics(symbol){
        // provide actual symbol.

        // not sending files data, just its name and actual (possibly overruling if in a sentence diactrics
               
        let components = {"full_name": symbol.name};

        // let libraries_to_exclude = ["ameji-word", "ameji-punctuation", "ameji-diacritics"];
        // let library = this.split_full_name_to_library_and_name(full_name)["library_name"];
        // if (libraries_to_exclude.includes(library)){
        //     console.log("ASSERT ERROR, only works for noun symbols.");
        // }

        let diacritic_top_element = symbol.getElementsByClassName("noun_diacritic_top")[0];
        ;
        components["diacritic_top_name"] = this.split_full_name_to_library_and_name(diacritic_top_element.name)["element_name"];

        let diacritic_bottom_element = symbol.getElementsByClassName("noun_diacritic_bottom")[0];
        components["diacritic_bottom_name"] = this.split_full_name_to_library_and_name(diacritic_bottom_element.name)["element_name"];
        return components;
    }

    add_noun_click_event(elementToAttachTo){
        
        elementToAttachTo.addEventListener(
            "click",
            function (event) {
                let name = event.currentTarget.name;
                this.add_to_sentence_by_full_name(name);
                this.add_symbol_to_recent(name);
            }.bind(this)
            );
        }
    
    add_noun_independent(divToAttachTo, id, full_name) {
        // diacritic_top, diacritic_bottom : can be undefined
        let noun = this.create_noun(id, full_name);
        let meaning_info = this.full_name_to_meaning(full_name, false);
        noun.setAttribute("data-tooltip",  id + " " + meaning_info);
        divToAttachTo.appendChild(noun);
        return noun;
    }
        
    create_noun(id, full_name, diacritic_top_override, diacritic_bottom_override){

        // diacritic overrides, convert to short form if needed
        if (diacritic_top_override !== undefined){
            if (diacritic_top_override.includes("ameji-diacritics_")){
                diacritic_top_override = this.split_full_name_to_library_and_name(diacritic_top_override)["element_name"];
            }
        }
        if (diacritic_bottom_override !== undefined){
            if (diacritic_bottom_override.includes("ameji-diacritics_")){
                diacritic_bottom_override = this.split_full_name_to_library_and_name(diacritic_bottom_override)["element_name"];
            }
        }

        let diacritic_top = undefined;
        let diacritic_bottom = undefined;
        
        let symbol_data = this.full_name_to_dictionary_data(full_name);
        let image_path = undefined;
        if (symbol_data !== undefined){
            let symbol_file_properties = symbol_data["files"][0];
            let symbol_folder = this.symbol_folders[symbol_file_properties[0]];
            let symbol_file_name = symbol_file_properties[1];
            if (symbol_file_properties[2] !== undefined){
                diacritic_top = symbol_file_properties[2][0];  // can be undefined
                diacritic_bottom = symbol_file_properties[2][1]; // can be undefined
            }
            image_path = symbol_folder + "/" + symbol_file_name;

        }else{
            // image_path = name;
            console.log("ASSERT ERROR: symbol data needs to be present. All the rest is not available anymre..");
        }
        
        var noun = document.createElement("div");
        noun.id = id;
        noun.name = full_name;
        noun.className = "noun";

        if (diacritic_top_override !== undefined){
            diacritic_top = diacritic_top_override;
        }
        if (diacritic_bottom_override !== undefined){
            diacritic_bottom = diacritic_bottom_override;
        }

        // if still undefined, it's all blank
        if (diacritic_top === undefined){
            diacritic_top = "blank";
        }
        if (diacritic_bottom === undefined){
            diacritic_bottom = "blank";
        }
        
        let diacritic_top_name = "ameji-diacritics_" + diacritic_top;
        let diacritic_bottom_name = "ameji-diacritics_" + diacritic_bottom;
        // let diacritic_top_name = diacritics_to_file[diacritic_top];
        // let diacritic_bottom_name = diacritics_to_file[diacritic_bottom];


        
        let img = document.createElement("Img");
        
        img.src = "symbols/" + image_path;
        img.id = image_path;
        img.classList.add("noun_image");
        // img.crossOrigin  = "Anonymous"; // local files will not work with CORS policy.
        
        let diacritic_1 = this.create_diacritic_image(diacritic_top_name,"top");
        let diacritic_2 = this.create_diacritic_image(diacritic_bottom_name,"bottom");
        
        noun.appendChild(img);
        noun.appendChild(diacritic_1);
        noun.appendChild(diacritic_2);
        return noun;
    }

    // -------------------- PUNCTUATION --------------------

    get_punctuation_components(element){
        return {"full_name":element.name};
    }

    add_punctuation_independent(divToAttachTo, id, full_name, show_tooltip) {
        show_tooltip = typeof show_tooltip !== 'undefined' ? show_tooltip : false;

        let punctuation = this.create_punctuation(id, full_name);
        if (show_tooltip){
            let symbol_data = this.full_name_to_dictionary_data(full_name);
            let all_meanings = this.full_name_to_meaning(full_name, false);
            punctuation.setAttribute("data-tooltip", all_meanings);
            
        }
        divToAttachTo.appendChild(punctuation);
        return punctuation;
    }
    
    create_punctuation(id, full_name){
      

        let symbol_data = this.full_name_to_dictionary_data(full_name);
        let symbol_file_properties = symbol_data["files"][0];

        let img = document.createElement("Img");
        let img_path = this.symbol_folders[symbol_file_properties[0]] + "/" + symbol_file_properties[1];
        img.src = "symbols/" + img_path;
        img.id = img_path;
        img.classList.add("punctuation_image");

        var symbol = document.createElement("div");
		symbol.id = id;

        symbol.name =  full_name;
		symbol.className = "punctuation";
        // img.crossOrigin  = "Anonymous";  // local files will not work with CORS policy.
        symbol.appendChild(img);
        return symbol;
    }
    
    add_punctuation_click_event(elementToAttachTo) {
        elementToAttachTo.addEventListener(
            "click",
            function (event) {
                let punctuation_name = event.currentTarget.name;
                this.add_punctuation_to_sentence(punctuation_name);
            }.bind(this)
        );
    }

    // -------------------- DIACRITICS --------------------

    get_diacritics_from_dictionary_symbol(full_name){
        
        // in a dictionary, blank diacritics are not indicated. Here, always return two diacritics (which can be blank)
        // returns short names

        let diacritic_top = undefined;
        let diacritic_bottom = undefined;

        let symbol_data = this.full_name_to_dictionary_data(full_name);
        let diacritics = symbol_data["files"][0][2];

        if (diacritics !== undefined){
            diacritic_top = diacritics[0];  // can be undefined
            diacritic_bottom = diacritics[1]; // can be undefined
        }

        // if still undefined, but down nothing.
        if (diacritic_top === undefined){
            diacritic_top = "blank";
        }
        if (diacritic_bottom === undefined){
            diacritic_bottom = "blank";
        }
        // diacritic_top = "ameji-diacritics_" + diacritic_top;
        // diacritic_bottom = "ameji-diacritics_" + diacritic_bottom;

        return {"diacritic_top_name":diacritic_top, "diacritic_bottom_name":diacritic_bottom};
    }

    add_diacritic_click_event(elementToAttachTo) {
        elementToAttachTo.addEventListener(
            "click",
            function (event) {
                if (!this.sentence_select_last_if_none_selected()){
                    return;
                }
                
                for (let i=0; i<this.sentence_selected_ids.length; i++){
                    // if multiple symbols are selected, add to each selected symbol

                    let selected_id = this.sentence_selected_ids[i];
                    
                    let selected_sentence_symbol = document.getElementById(selected_id);
                    
                    let selected_class_names = selected_sentence_symbol.classList;
                    let symbol_is_noun = false;
                    for (let i = 0; i < selected_class_names.length; i++) {
                        if (selected_class_names[i] == "noun") {
                            symbol_is_noun = true;
                        }
                    }
                    if (symbol_is_noun) {
                        // check if top or bottom diacritic
                        let diacritic_field_id = event.currentTarget.id;
                        let position = "top";
                        let offset = 1;
                        if (diacritic_field_id.includes("bottom")) {
                            position = "bottom";
                            offset = 2;
                            
                        } else if (!diacritic_field_id.includes("top")) {
                            console.log("ASSERT ERROR: diacritic in field id should contain bottom or top to determine position in symbol.");
                        }

                        // create diacritic
                        let diacritic_full_name = event.currentTarget.name;
                        let new_diacritic = this.create_diacritic_image(diacritic_full_name, position);
                        
                        // replace diacritic in sentence
                        let children_of_selected_sentence_element = selected_sentence_symbol.children;
                        selected_sentence_symbol.insertBefore(new_diacritic, children_of_selected_sentence_element[offset]);
                        children_of_selected_sentence_element[offset+1].remove();

                    }
                }
            }.bind(this)
        );
    }

    create_diacritic_image(full_name, position){

        // position: top, bottom, independent
        let symbol_data = this.full_name_to_dictionary_data(full_name);
        let symbol_file_properties = symbol_data["files"][0];

        let image_path = "symbols/" + this.symbol_folders[symbol_file_properties[0]] + "/" + symbol_file_properties[1];
        
        let diacritic = document.createElement("Img");
        diacritic.src = image_path;
        diacritic.name = full_name;

        var position_to_class = {"top":"noun_diacritic_top", "bottom":"noun_diacritic_bottom", "independent":"diacritic_image"};
        let class_name = position_to_class[position];
        if (class_name === undefined){
            console.log("ASSERT ERROR no position given.");
        }

        diacritic.classList.add(class_name);
        // diacritic_1.crossOrigin  = "Anonymous";
        return diacritic;
    }

    add_diacritic_independent(divToAttachTo, id, full_name) {

        let symbol = addDiv(divToAttachTo, id, "diacritic-independent");
        symbol.name = full_name;
        let img = this.create_diacritic_image(full_name, "independent");
        
        let all_meanings = this.full_name_to_meaning(full_name, false);
        symbol.setAttribute("data-tooltip", all_meanings);
        
        symbol.appendChild(img);
        
        return symbol;
    }
}