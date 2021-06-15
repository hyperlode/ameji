// https://thenounproject.com/
// opensymbols.org
// unimoji.com (same ambition, but not much happening...)
// iconji.com . same idea, from 2011, but, catered towards english (e.a. at = @ )
// emojione --> git repo with emoji tools
//openmoji -> open source emoji drawings .
class Ameji {
    constructor() {
        console.log("Ameji loaded");
        this.nouns_library = JSON.parse(nouns_JSON);
        this.emoji_library = JSON.parse(emoji_JSON);
        this.ameji_punctuation_library = JSON.parse(ameji_punctuation);
        this.ameji_dictionary_library = JSON.parse(ameji_dictionary_JSON);
        this.ameji_diacritics_library = JSON.parse(ameji_diacritics_JSON);

        this.symbol_folders = {"ameji":"ameji_basic_618x618","openmoji":"emoji_blackwhite_72x72", "ameji-punctuation":"ameji_punctuation_309x618", "ameji-diacritics":"ameji_diacritics_618x102"};
        
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
        addButton(this.sentenceControlsButtonsDiv, "Select Next", "btnSelectNext", "btnSelectNext", this.select_next_element_in_sentence.bind(this));
        addButton(this.sentenceControlsButtonsDiv, "Delete selected", "btnDelete", "btnDelete", this.sentence_delete_selected.bind(this));
        addButton(this.sentenceControlsButtonsDiv, "Insert New line", "btnNewLine", "btnNewLine", this.add_new_line_symbol.bind(this));
        addButton(this.sentenceControlsButtonsDiv, "Explode word", "btnExplode", "btnExplode", this.explode_word.bind(this));
        addButton(this.sentenceControlsButtonsDiv, "Recently used symbols", "btnToggleRecent", "btnToggleRecent", this.toggle_recent_visibility.bind(this));
        addButton(this.sentenceControlsButtonsDiv, "Save sentence as picture.png", "btnSaveToPng", "btnSaveToPng", this.save_sentence_to_picture.bind(this));
        addButton(this.sentenceControlsButtonsDiv, "Debug", "btnDebug", "btnDebug", this.do_debug.bind(this));
        addBr(this.sentenceControlsButtonsDiv);
        
        this.jsonTextArea = addTextArea(this.sentenceControlsButtonsDiv, "ameji-json", "ameji-json", 5, 100, "json here");
        addBr(this.sentenceControlsButtonsDiv);
        addButton(this.sentenceControlsButtonsDiv, "Sentence To Text", "btnToText", "btnToText", this.sentence_to_names.bind(this));
        addButton(this.sentenceControlsButtonsDiv, "Text To Sentence", "btnToSentence", "btnToSentence", this.names_to_sentence.bind(this));
        addButton(this.sentenceControlsButtonsDiv, "Sentence To JSON", "btnToJSON", "btnToJSON", this.sentence_to_json.bind(this));
        addButton(this.sentenceControlsButtonsDiv, "One Selected symbol to Ameji Standard ", "btnVisibleToAmejiStandard", "btnVisibleToAmejiStandard", this.selected_symbol_to_ameji_standard.bind(this));
        addButton(this.sentenceControlsButtonsDiv, "Selected symbols to Ameji Standard Word ", "btnVisibleToAmejiStandard", "btnVisibleToAmejiStandard", this.selected_symbols_to_ameji_standard_word.bind(this));

        this.punctuationPickerField = addDiv(this.symbolPickerDiv, "punctuationPicker", "sentence-builder__symbol-picker__punctuation-picker");
        this.diacriticsTopPickerField = addDiv(this.symbolPickerDiv, "diacriticsTopPicker", "sentence-builder__symbol-picker__diacritics-picker");
        this.diacriticsBottomPickerField = addDiv(this.symbolPickerDiv, "diacriticsBottomPicker", "sentence-builder__symbol-picker__diacritics-picker");
        
        
        this.properNounsPickerField = addDiv(this.symbolPickerDiv, "properNounsPicker", "sentence-builder__symbol-picker__proper-nouns-picker");        
        this.searchField_nouns = addTextBox(this.symbolPickerDiv, "", "txtBoxSearchNouns", "txtBoxSearchNouns", 30);
        this.add_search_at_type_event(this.searchField_nouns);
        this.nounPickerField = addDiv(this.symbolPickerDiv, "nounPicker", "sentence-builder__symbol-picker__noun-picker");
        
        this.searchField_dictionary = addTextBox(this.symbolPickerDiv, "Belgium", "txtBoxSearchDictionary", "txtBoxSearchDictionary", 30);
        this.add_search_at_type_event(this.searchField_dictionary);
        this.amejiDictionaryPickerField = addDiv(this.symbolPickerDiv, "amejiDictionary", "sentence-builder__symbol-picker__word-picker");

        this.searchField_emoji = addTextBox(this.symbolPickerDiv, "search", "txtBoxSearchEmoji", "txtBoxSearchEmoji", 30);
        this.add_search_at_type_event(this.searchField_emoji);
        this.emojiPickerField = addDiv(this.symbolPickerDiv, "emojiPicker", "sentence-builder__symbol-picker__noun-picker");
        
        
        this.populate_punctuation_picker();
        this.populate_diacritics_top_picker();
        this.populate_diacritics_bottom_picker();

        this.populate_noun_picker();
        this.populate_emoji_picker();
        this.populate_ameji_dictionary_picker();

        this.sentence_element_count = 0;
        this.punctuation_count = 0;
        this.noun_count = 0;
        
        this.sentence_selected_ids = [];

        this.sentence_symbol_sequence = [];
        
        this.recent_symbols_sequence_ids = [];

        // this.newline_symbol = "ameji-punctuation_newline"; 

        this.load_local_file("file:///C:/temp/test.txt");
    }


    selected_symbols_to_ameji_standard_word()
    {

        let word_data = {"id":"XXXXXXX", "meaning":[],"type":"combo"};
        let all_symbols_files = [];
        for (let i=0;i<this.sentence_selected_ids.length;i++){
           
            let id = this.sentence_selected_ids[i];
            let full_name = document.getElementById(id).name;
            let element_components = this.get_sentence_element_components(id);

            let original_symbol_data = this.symbol_name_to_data(full_name);
            let files_data = original_symbol_data["files"][0];

            // replace original diacritics with sentence diacritics
                        
            let diacritics= this.get_diacritics_from_symbol_components(element_components);
            if (diacritics.length>0){
                files_data[2] = diacritics;
            }
            
            all_symbols_files.push(files_data);
        }
        word_data["files"] = all_symbols_files;


        let json_string = JSON.stringify(word_data);
        this.jsonTextArea.value = json_string;

    }

    selected_symbol_to_ameji_standard()
    {
           
        if (this.sentence_selected_ids.length !== 1){
            alert("please select one and only one symbol");
            return;
        }
        let id = this.sentence_selected_ids[0];
        let full_name = document.getElementById(id).name;
        let element_components = this.get_sentence_element_components(id);
        
        let library_name = this.get_sentence_element_library_name(id);
        let standard = this.element_data_to_ameji_standard(library_name, full_name, element_components);
        
        let json_string = JSON.stringify(standard);
        this.jsonTextArea.value = json_string;
    }

    element_data_to_ameji_standard (library_name, full_name, element_components){

        let element_data = undefined;
        let symbol_data = {};
        
        let temp_symbol_data = this.symbol_name_to_data(full_name);
        symbol_data["id"] = temp_symbol_data["id"];
        symbol_data["meaning"] = temp_symbol_data["meaning"];

        // if (library_name === "ameji-word"){
        //     element_data = this.get_sentence_word_to_symbols(sentence_element);
        //     console.log("not applicable");
            
        // }else 
        if (library_name === "ameji-punctuation"){
            
            // let d = this.symbol_name_to_library_and_name(full_name);

            symbol_data["files"] = temp_symbol_data["files"];
            symbol_data["type"] = "punctuation";
            
        }else if (["ameji", "openmoji"].includes(library_name)){
            let diacritics= this.get_diacritics_from_symbol_components(element_components)
            
            symbol_data["files"] = temp_symbol_data["files"];
            symbol_data["files"][0][2] = diacritics;

            symbol_data["type"] = "single";
            
        }
        // else if (library_name === "ameji-diacritics"){
        //     console.log("not applicable");
            
        // }
        return symbol_data;
    }

    sentence_to_names(){
        console.log("to sentence");
        this.jsonTextArea.value = "";

        if (this.is_sentence_altered()){
            alert("WARNING: Diacritics in symbols in the sentence were altered. Restoring the result will differ from this sentence. Use JSON to save exactly.")
        };

        
        let name_strings = [];
        for(var i=0;i<this.sentence_symbol_sequence.length;i++){
            let id = this.sentence_symbol_sequence[i];
            let el = document.getElementById(id)
            name_strings.push("\"" + el.name + "\"");
        }
        let json_string = "[" + name_strings.join(",") + "]";
        this.jsonTextArea.value = json_string;
    }

    names_to_sentence(){
        let json_string = this.jsonTextArea.value;
        let ameji_elements = JSON.parse(json_string);
        for (let element in ameji_elements){
            console.log(ameji_elements[element]);
            this.add_to_sentence_by_full_name(ameji_elements[element]);
        }
    }

    json_to_sentence(){
        let json_string = this.jsonTextArea.value;
        let ameji_elements = JSON.parse(json_string);
        for (let element in ameji_elements){
            console.log(ameji_elements[element]);
        }
    }

    sentence_to_json(){
        console.log("to sentence");
        this.jsonTextArea.value = "";
        
        let json_elements_strings = [];
        for(var i=0;i<this.sentence_symbol_sequence.length;i++){
            let id = this.sentence_symbol_sequence[i];
            let el = document.getElementById(id)
            let element_data = this.symbol_name_to_data(el.name);
            let element_json = JSON.stringify(element_data);
            json_elements_strings.push(element_json);
        }

        let json_string = "[\n" + json_elements_strings.join(",\n") + "\n]";
        this.jsonTextArea.value = json_string;

    }

    toggle_recent_visibility(){
        if (this.recentDiv.style.display === "none") {
            this.recentDiv.style.display = "block";
        } else {
            this.recentDiv.style.display = "none";
        }
    }

    do_debug(){
    //    this.get_components_for_all_sentence_elements();
        this.select_next_element_in_sentence();
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
        for (var punctuation in  this.ameji_punctuation_library){
            // console.log(this.ameji_punctuation_library[punctuation].id);
            let full_name = "ameji-punctuation_" + punctuation;
            let symbolElement = this.add_punctuation(this.punctuationPickerField, full_name, full_name);
            this.add_punctuation_click_event(symbolElement);
        }
    }
    
    populate_word_picker(elementToPopulate, searchField){
        elementToPopulate.innerHTML = "";
        let search_string = searchField.value.toLowerCase();
        
        for (var word_id in this.ameji_dictionary_library){
            let all_meanings = "";
            let word = this.ameji_dictionary_library[word_id];
            let full_name = "ameji-word_" + word_id;

            for (var i=0;i<word["meaning"].length;i++){
                all_meanings += word["meaning"][i].toLowerCase();
            }

            if (all_meanings.includes(search_string) || searchField.value === "") {
                
                let wordDiv = this.ameji_word_name_to_div(full_name);
                wordDiv.setAttribute("data-tooltip", word_id);
                this.add_word_click_event(wordDiv);
                elementToPopulate.appendChild(wordDiv);

                // separate every word with punctuation
                this.add_punctuation(elementToPopulate,"divider","ameji-punctuation_empty");
            }
        }
    }
    
    populate_noun_picker() {
        this.populate_basic_symbol_picker(this.nounPickerField, "ameji", this.nouns_library, this.searchField_nouns);
    }
    
    populate_emoji_picker() {
        this.populate_basic_symbol_picker(this.emojiPickerField, "openmoji", this.emoji_library, this.searchField_emoji );
    }
    
    populate_ameji_dictionary_picker(){
        this.populate_word_picker(this.amejiDictionaryPickerField, this.searchField_dictionary );
    }
    
    
    populate_basic_symbol_picker(elementToPopulate, library_name, library, searchField){
        
        elementToPopulate.innerHTML = "";
        let search_string = searchField.value.toLowerCase();
        
        for (var symbol_id in library){
            let symbol = library[symbol_id];
            
            let name = library_name + "_" + symbol["id"];
            
            
            let symbol_file_properties = symbol["files"][0];
            let symbol_folder = this.symbol_folders[symbol_file_properties[0]];
            let symbol_file_name = symbol_file_properties[1];
            let diacritics = symbol_file_properties[2];
            
            let meanings = symbol["meaning"];
            let all_meanings = symbol["id"].toLowerCase() + " " + meanings.join(" ").toLowerCase();
            if (all_meanings.includes(search_string) || searchField.value === "") {

                let diacritic_top = undefined;
                let diacritic_bottom = undefined;

                if (diacritics !== undefined){
                    diacritic_top = diacritics[0];
                    diacritic_bottom = diacritics[1];
                }
                
                let symbolElement = this.add_noun(
                    elementToPopulate,
                    symbol_file_name,
                    name,
                    symbol_folder + "/" + symbol_file_name,
                    diacritic_top,
                    diacritic_bottom
                    )
                    
                this.add_noun_click_event(symbolElement);
            }
        }
    }

    // ---------------- GENERAL --------------------
    symbol_name_to_library_and_name(name){
        let split_name = {"library_name":"", "symbol_name":""};
        
        let [library_name, ...symbol_name] = name.split('_');
        symbol_name = symbol_name.join('_');
       
        split_name["library_name"] = library_name;
        split_name["symbol_name"] = symbol_name;
        return split_name;
    }

    symbol_name_to_data(full_name){

        // full_name has the library as its precursor
        // e.a. ameji_hour  =    library ameji, name hour
        // "good_luck_buddy".split('_').slice(1).join('_')
        // let [library_name, ...symbol_name] = full_name.split('_');


        // symbol_name = symbol_name.join('_');
       
        let split_name = this.symbol_name_to_library_and_name(full_name);

        let library_name = split_name["library_name"];
        let symbol_name = split_name["symbol_name"];

        let element_data = undefined;
        if (library_name === "ameji-word"){
            element_data = this.ameji_dictionary_library[symbol_name];
            
        }else if (library_name === "ameji-punctuation"){
            element_data = this.ameji_punctuation_library[symbol_name];

        }else if (library_name === "ameji"){
            element_data = this.nouns_library[symbol_name];

        }else if (library_name === "ameji-diacritics"){
            element_data = this.ameji_diacritics_library[symbol_name];

        }else if (library_name === "openmoji"){
            element_data = this.emoji_library[symbol_name];
        }
        if (element_data === undefined){
            console.log("ERROR: no matching data for " + symbol_name + "(full name: " + full_name + " )");
        }
     
        return element_data;
    }

    // ----------------RECENT ----------------------
    
    add_word_to_recent(word_name){
        // word without library prefix
        let word_element = this.ameji_word_name_to_div(word_name);
        this.add_element_to_recent(word_element);        
    }
    
    add_symbol_to_recent(symbol_name){
        let symbol_data = this.symbol_name_to_data(symbol_name);
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
            let element_components = this.get_sentence_element_components(id);
            if (element_components!== undefined){
                sentence_components.push(element_components);
            }
        }
        return sentence_components;
    }
    
    explode_word(){
        if (this.sentence_selected_ids.length == 0){
            alert("Please select words to explode.");
        };

        for (let i=0; i < this.sentence_selected_ids.length;i++){
            let element_in_sentence_id = this.sentence_selected_ids[i];
            let element = document.getElementById(element_in_sentence_id);
            let full_name = element.name;
            let name_data = this.symbol_name_to_library_and_name(full_name);

            if (name_data["library_name"] === "ameji-word"){
                let word_components = this.get_sentence_element_components(element_in_sentence_id);
                for (let i=0; i<word_components.length; i++){
                    let symbol_components = word_components[i];
                    this.add_to_sentence_by_element_components(symbol_components);
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
        // console.log(sentence_element);
        let sentence_symbol_data = this.get_sentence_element_components(sentence_element_id);

        let full_name = sentence_symbol_data["full_name"];

        let immutable_libraries = ["ameji-word","ameji-punctuation", "ameji-diacritics"];
        let library = this.get_sentence_element_library_name(sentence_element_id);

        // console.log(library);
        if (immutable_libraries.includes(library) ){
            // console.log("Cannot be altered. So, we're good.");
            return false;
        }
        let original_diacritics_data = this.get_diacritics_from_dictionary_symbol(full_name);
        if (sentence_symbol_data["diacritic_top_name"] !== original_diacritics_data["top"]){
            console.log("Top diff.");
            return true;
        }
        if (sentence_symbol_data["diacritic_bottom_name"] !== original_diacritics_data["bottom"]){
            console.log("bottom diff");
            return true;
        }

        return false;
    }

    get_sentence_word_to_symbols(sentence_element){
        // will take dictionary info from full_name.
        
        // let components = {"full_name": sentence_element.name};
        let word_component_elements = sentence_element.children;

        let word_symbols_components = [];
        for (let i=0; i<word_component_elements.length; i++){
            let element = word_component_elements[i];
            let element_metadata = this.symbol_name_to_library_and_name(element.name);
            let components = undefined;
            if (["ameji", "openmoji"].includes(element_metadata["library_name"])){
                components = this.get_noun_components(element);
            }else if(["ameji-punctuation"].includes(element_metadata["library_name"])) {
                components = this.get_punctuation_components(element);
            }else{
                console.log("no match found for : "+ element);
            }
            if (components !== undefined){
                word_symbols_components.push(components);
            }
        }
        return word_symbols_components;
        
    }

    get_sentence_element_library_name(sentence_element_id){
        let sentence_element = document.getElementById(sentence_element_id);
        return this.symbol_name_to_library_and_name(sentence_element.name)["library_name"];
    }

    get_sentence_element_components(sentence_element_id){
        // Not from the dictionary symbol, but as the symbol is in the sentence.
        // for non combined symbols (e.a. not a word)
        // return return object with:
        // full_name, diacritic_top_name and diacritic_bottom_name
        let sentence_element = document.getElementById(sentence_element_id);
        
        // check type
        let library_name = this.get_sentence_element_library_name(sentence_element_id);
        
        let element_data = undefined;
        if (library_name === "ameji-word"){
            element_data = this.get_sentence_word_to_symbols(sentence_element);
            
        }else if (library_name === "ameji-punctuation"){
            element_data = this.get_punctuation_components(sentence_element);
            
        }else if (library_name === "ameji"){
            element_data =  this.get_noun_components(sentence_element);
            
        }else if (library_name === "ameji-diacritics"){
            console.log("not applicable");
            
        }else if (library_name === "openmoji"){
            element_data =  this.get_noun_components(sentence_element);
            console.log(element_data);
        }

        if (element_data === undefined){
            console.log("ERROR: no matching data for sentence element " +  sentence_element.name);
        }
     
        return element_data;
    }

    add_to_sentence_by_element_components(element_components){
        // for one symbol (or word)
        // components: object with full_name and (if applicable diacritics)

        let element = undefined;
        let full_name = element_components["full_name"];
        let library = this.symbol_name_to_library_and_name(full_name)["library_name"];

        if (library === "ameji-word"){
            element = this.ameji_word_name_to_div(full_name);

        }else if (library === "ameji-punctuation"){
            element = this.create_punctuation(full_name, full_name);
            
        }else{
            console.log(element_components);
            element = this.create_noun(full_name, full_name, element_components["diacritic_top_name"], element_components["diacritic_bottom_name"]);
        }

        this.add_element_to_sentence(element, "sentence-element");
    }

    add_to_sentence_by_library_and_name(library, name){
        
        let element = undefined;
        let full_name = library + "_" + name;

        if (library === "ameji-word"){
            element = this.ameji_word_name_to_div(full_name);

        }else if (library === "ameji-punctuation"){
            element = this.create_punctuation(full_name, full_name);
            
        }else{
            element = this.create_noun(full_name, full_name);
        }

        this.add_element_to_sentence(element, "sentence-element");
    }

    add_to_sentence_by_full_name(name){
        // full name (e.a. ameji-hour)

        console.log(name);
        let split_name = this.symbol_name_to_library_and_name(name);
       
        this.add_to_sentence_by_library_and_name(split_name["library_name"], split_name["symbol_name"])
    }

    add_punctuation_to_sentence(punctuation_name) {
        let sentence_element = this.create_punctuation(
            this.sentence_element_count,
            punctuation_name
        );
        this.add_element_to_sentence(sentence_element, "sentence-element");
    }

    add_newline_to_sentence(){

        // two divs need to be added. As we can't state that it should do a linebrake AFTER the current element. 
        // So, first, there is a dummy, visual linebreak. Then, the real one as a zero size div.
        
        // this.sentence_select_last_if_none_selected(); // we NEED to work with selection for this maneuvre to work.
        // let sentence_element = this.create_punctuation(
        //     this.sentence_element_count + "_newline",
        //     this.newline_symbol
        //     );
        // this.add_element_to_sentence(sentence_element, "sentence-element");
        

        var symbol = document.createElement("div");
        symbol.id =  this.sentence_element_count;
        symbol.className = "sentence-builder__newline";
        symbol.name = symbol.id;

        this.add_element_to_sentence(symbol, "sentence-builder__newline");
    }
    
    add_element_to_sentence(element_to_add, classname){
        element_to_add.id = "sentence_element_" + this.sentence_element_count;
        let id = element_to_add.id;
        if (this.sentence_selected_ids.length === 0){
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
            
            this.sentenceDiv.insertBefore(element_to_add, selected_element.nextSibling);
            this.sentence_symbol_sequence.splice(insert_index + 1,0,id);
            
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
        // if one element is selected. 
        let index = 0;
        
        for (let i=this.sentence_symbol_sequence.length - 2 ;i>=0;i--){
            // - 2 because if last element is selected, we can do anything. 
            if (this.sentence_symbol_sequence[i] == this.sentence_selected_ids[this.sentence_selected_ids.length-1]){
                this.deselect_element_in_sentence(this.sentence_symbol_sequence[i]);
                this.select_element_in_sentence(this.sentence_symbol_sequence[i+1]);
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
        // if (full_name.includes("newline")){
        //     // this.sentence_selected_ids_indeces.push(sentence_index + 1);
        //     console.log("Newline deletion, as this is a double symbol, it will remove the second invisible part too.");
        //     this.sentence_delete_element(this.sentence_symbol_sequence[index]);
        // }
    }

    // -------------------- WORDS ----------------------
    

    word_name_to_data(full_name){
        let split_name = this.symbol_name_to_library_and_name(full_name);
        if (split_name["library_name"] != "ameji-word"){
            console.log("ASSERT ERROR. only ameji words tested.")
        }
        let word_data = this.ameji_dictionary_library[split_name["symbol_name"]];
        return word_data;
    }

    ameji_word_name_to_div(full_name){
        // word_id --> only the word itself. 

        let split_name = this.symbol_name_to_library_and_name(full_name);
       
        let word_symbols = this.word_to_symbols(full_name);
        let word_data = this.word_name_to_data(full_name);

        let word_start_punctuation = undefined;
        let word_divider_punctuation = undefined;
        let word_stop_punctuation = undefined;

        if (word_data["type"] == "combo"){
            for(let i=0;i<word_symbols.length;i++){
                word_symbols[i]["diacritics"][1] = "combo";
            }
        }
        else if (word_data["type"] == "compare"){
            word_start_punctuation = "ameji-punctuation_bracket-square-left";
            word_divider_punctuation = "ameji-punctuation_colon";
            word_stop_punctuation = "ameji-punctuation_bracket-square-right";
        }

        else if (word_data["type"] == "proper noun"){
            for(let i=0;i<word_symbols.length;i++){
                
                word_symbols[i]["diacritics"][1] = "name";
            }
        }
        
        else if (word_data["type"] == "single"){
           
        }
        // console.log(word_symbols);
        return this.create_word(split_name["symbol_name"], "ameji-word", word_symbols, word_start_punctuation, word_divider_punctuation, word_stop_punctuation);
    }
    
    word_to_symbols(full_name){
        // from a dictionary.

        let word_data = this.word_name_to_data(full_name);

        let files = word_data["files"];           
        let symbols = []
        for (let symbol_index=0;symbol_index<files.length;symbol_index++){
            let symbol = {"name":"", "diacritics":[]};

            let symbol_type = files[symbol_index][0];
            // symbol["path"] = this.symbol_folders[symbol_type] + "/" + files[symbol_index][1];

            symbol["name"] = files[symbol_index][0] + "_" + files[symbol_index][1];


            if (files[symbol_index][2] === undefined){
                symbol["diacritics"] = ["blank","blank"];
            }else{
                symbol["diacritics"] = files[symbol_index][2];
            }

            // make sure there are at least two diacritics. (can both be empty, but they should be defined)
            if (symbol["diacritics"].length < 2){
                symbol["diacritics"].push("blank");
            }
            if (symbol["diacritics"].length < 2){
                console.log("ASSERT ERROR: by now, there should be two diacritics defined. ");
                console.log(symbol["diacritics"]);
            }
            symbols.push(symbol);
        }
        return symbols;
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

    create_word(id, library, symbols , start_punctuation, divider_punctuation, stop_punctuation){
        var wordDiv = document.createElement("div");
        wordDiv.id = id;
        wordDiv.name = library + "_" + id;
        wordDiv.className = "word";
        
        if (start_punctuation !== undefined){
            this.add_punctuation(wordDiv, "Start", start_punctuation);
        }
        
        for(var i=0;i<symbols.length;i++){
            if (i!==0 && divider_punctuation !== undefined){
                this.add_punctuation(wordDiv, "divider", divider_punctuation);
            }

            let symbol = symbols[i];
            let noun = this.create_noun(
                symbol["name"],
                symbol["name"],
                symbol["diacritics"][0],
                symbol["diacritics"][1]
                )
            wordDiv.appendChild(noun);
        }

        if (stop_punctuation !== undefined){
            this.add_punctuation(wordDiv, "Stop", stop_punctuation);
        }

        return wordDiv;
    }

    // -------------------- NOUNS --------------------
    
    get_noun_components(symbol){
        // provide actual symbol.
               
        let components = {"full_name": symbol.name};

        // let libraries_to_exclude = ["ameji-word", "ameji-punctuation", "ameji-diacritics"];
        // let library = this.symbol_name_to_library_and_name(full_name)["library_name"];
        // if (libraries_to_exclude.includes(library)){
        //     console.log("ASSERT ERROR, only works for noun symbols.");
        // }

        let diacritic_top_element = symbol.getElementsByClassName("noun_diacritic_top")[0];
        components["diacritic_top_name"] = diacritic_top_element.name;

        let diacritic_bottom_element = symbol.getElementsByClassName("noun_diacritic_bottom")[0];
        components["diacritic_bottom_name"] = diacritic_bottom_element.name;
        return components;
    }

    add_noun_click_event(elementToAttachTo){
        
        elementToAttachTo.addEventListener(
            "click",
            function (event) {
                let name = event.currentTarget.name;
                // let noun_image_element = event.currentTarget.querySelector('.noun_image');
                // let noun_image_name = noun_image_element.id;
                
                // let diacritic_top_element = event.currentTarget.querySelector('.noun_diacritic_top');
                // let diacritic_top = diacritic_top_element.id;
                
                // let diacritic_bottom_element = event.currentTarget.querySelector('.noun_diacritic_bottom');
                // let diacritic_bottom = diacritic_bottom_element.id;
                
                // this.add_noun_to_sentence(name, diacritic_top, diacritic_bottom);
                this.add_to_sentence_by_full_name(name);
                
                this.add_symbol_to_recent(name);
            }.bind(this)
            );
        }
        
    add_noun(divToAttachTo, id, name, image_name, diacritic_top, diacritic_bottom) {
        // diacritic_top, diacritic_bottom : can be undefined
        let noun = this.create_noun(id, name, diacritic_top, diacritic_bottom);
        
        noun.setAttribute("data-tooltip",  id + " " + image_name);
        divToAttachTo.appendChild(noun);
        return noun;
    }
    
    create_noun(id, name, diacritic_top_override, diacritic_bottom_override){

        // diacritic overrides, convert to short form if needed
        if (diacritic_top_override !== undefined){
            if (diacritic_top_override.includes("ameji-diacritics_")){
                diacritic_top_override = this.symbol_name_to_library_and_name(diacritic_top_override)["symbol_name"];
            }
        }
        if (diacritic_bottom_override !== undefined){
            if (diacritic_bottom_override.includes("ameji-diacritics_")){
                diacritic_bottom_override = this.symbol_name_to_library_and_name(diacritic_bottom_override)["symbol_name"];
            }
        }

        let diacritic_top = undefined;
        let diacritic_bottom = undefined;
        
        let symbol_data = this.symbol_name_to_data(name);
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
        noun.name = name;
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

    add_punctuation(divToAttachTo, id, full_name) {
        let punctuation = this.create_punctuation(id, full_name);
        divToAttachTo.appendChild(punctuation);
        return punctuation;
    }
    
    create_punctuation(id, full_name){
        
        let symbol_data = this.symbol_name_to_data(full_name);
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
        

    // get_diacritics_from_sentence_symbol(sentence_id){
    get_diacritics_from_symbol_components(element_components){

        // let full_name = document.getElementById(sentence_id).name;
        // let sentence_element = document.getElementById(sentence_id);
        // let element_components = this.get_noun_components(sentence_element);

        let diacritics = [];
        if (element_components["diacritic_top_name"]!== undefined){
            let diacritic_name = this.symbol_name_to_library_and_name(element_components["diacritic_top_name"])["symbol_name"];
            diacritics.push(diacritic_name);
        }
        if (element_components["diacritic_bottom_name"]!== undefined){
            let diacritic_name = this.symbol_name_to_library_and_name(element_components["diacritic_bottom_name"])["symbol_name"];
            diacritics.push(diacritic_name);
        }
        return diacritics;
    }

    get_diacritics_from_dictionary_symbol(full_name){
        
        // in a dictionary, blank diacritics are not indicated. Here, always return two diacritics (which can be blank)

        let diacritic_top = undefined;
        let diacritic_bottom = undefined;

        let symbol_data = this.symbol_name_to_data(full_name);
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
        diacritic_top = "ameji-diacritics_" + diacritic_top;
        diacritic_bottom = "ameji-diacritics_" + diacritic_bottom;

        return {"top":diacritic_top, "bottom":diacritic_bottom};
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
        let symbol_data = this.symbol_name_to_data(full_name);
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

        symbol.appendChild(img);
        return symbol;
    }
}