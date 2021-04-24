var nouns = [
    "ABBA.png",
    "ABDB.png",
    "ADBB.png",
    "AEDB.png",
    "CEAA.png",
    "CECA.png",
    "DEAE.png",
    "ECBE.png",
    "EDCC.png",
    "EEBB.png"
];

var punctuation = [
   "bracket_open_left.png", 
   "bracket_open_right.png", 
   "colon.png", 
   "semi_colon.png", 
   "period.png", 
   "comma.png"
]

var diacritics = [
    "diacritic_empty.png",
    "diacritic_squiggle.png",
    "diacritic_verb.png"
]

class Ameji {
    constructor() {
        console.log("Ameji loaded");

        this.baseDiv = document.getElementById("base");
        this.controlsDiv = addDiv(this.baseDiv, "controls", "sentence-builder__controls");
        addBr(this.baseDiv);
        this.sentenceDiv = addDiv(this.baseDiv, "sentence", "sentence-builder__sentence");
        addBr(this.baseDiv);
        
        this.baseDiv.className = "sentence-builder";
      
        this.nounPickerField = addDiv(this.controlsDiv, "nounPicker", "sentence-builder__controls__noun-picker");
        this.punctuationPickerField = addDiv(this.controlsDiv, "punctuationPicker", "sentence-builder__controls__punctuation-picker");
        this.diacriticsPickerField = addDiv(this.controlsDiv, "diacriticsPicker", "sentence-builder__controls__diacritics-picker");
        this.properNounsPickerField = addDiv(this.controlsDiv, "properNounsPicker", "sentence-builder__controls__proper-nouns-picker");

        this.populate_noun_picker();
        this.populate_punctuation_picker();
        this.populate_diacritics_picker();

        // addButton(this.controlsDiv,"add noun", "btnAdd", "btnAdd", this.add_noun_to_sentence.bind(this));
        // addButton(this.controlsDiv,"add punctuation", "btnAdd", "btnAdd", this.add_punctuation_to_sentence.bind(this));
        addButton(this.controlsDiv,"delete selected", "btnDelete", "btnDelete", this.deleteSelectedFromSentence.bind(this));
        this.sentence_element_count = 0;
        this.punctuation_count = 0;
        this.noun_count = 0;
    }

    deleteSelectedFromSentence(){
        if (this.selected_symbol_id !== null){
            document.getElementById(this.selected_symbol_id).remove();
            console.log(this.selected_symbol_id + " removed.");
        }
        this.selected_symbol_id = null;

    }

    populate_diacritics_picker(){
        for (let i=0;i<diacritics.length;i++){
            let name = diacritics[i];
            let symbolElement = this.add_diacricit_independent(this.diacriticsPickerField, "diacricic" + i , name );
            // this.add_diacritic_click_event(symbolElement);
        }
    }

    add_diacricit_independent(){

    }


    populate_punctuation_picker(){
        for (let i=0;i<punctuation.length;i++){
            let name = punctuation[i];
            let symbolElement = this.add_punctuation(this.punctuationPickerField, "punctuation" + i , name, "diacritic_empty.png", "diacritic_empty.png" )
            this.add_punctuation_click_event(symbolElement);

        }
    }
    
    populate_noun_picker(){
        for (let i=0;i<nouns.length;i++){
            let name = nouns[i];
            let symbolElement = this.add_noun(this.nounPickerField, "noun" + i , name, "diacritic_empty.png", "diacritic_empty.png" )
            this.add_noun_click_event(symbolElement);
        }
    }
    
    add_noun_to_sentence(noun_name, diacritic_1_name, diacritic_2_name){

        let sentence_element = this.add_noun(
            this.sentenceDiv,
            this.sentence_element_count,
            noun_name,
            diacritic_1_name,
            diacritic_2_name
            );

        // this.add_symbol(this.sentenceDiv,this.sentence_element_count, "DEAE.png", "diacritic_squiggle.png", "diacritic_verb.png" )
        sentence_element.classList.add("sentence-element");
        this.add_sentence_element_click_event(sentence_element);

        this.sentence_element_count += 1;
    }
    
    add_punctuation_to_sentence(punctuation_name){
        let sentence_element = this.add_punctuation(
            this.sentenceDiv,
            this.sentence_element_count,
            punctuation_name
        );
        sentence_element.classList.add("sentence-element");
        this.add_sentence_element_click_event(sentence_element);
        this.sentence_element_count += 1;

    }

    add_punctuation_click_event(elementToAttachTo){
        elementToAttachTo.addEventListener(
            "click", 
            function (event){
                let punctuation_image_element = event.currentTarget.querySelector('.punctuation_image');
                let punctuation_image_name = punctuation_image_element.id;
                
                this.add_punctuation_to_sentence(punctuation_image_name,"","");

            }.bind(this)
        ); 
    }

    add_noun_click_event(elementToAttachTo){

        elementToAttachTo.addEventListener(
            "click", 
            function (event){
                let noun_image_element = event.currentTarget.querySelector('.noun_image');
                let noun_image_name = noun_image_element.id;
                
                this.add_noun_to_sentence(noun_image_name,"","");

            }.bind(this)
        ); 
    }

    add_sentence_element_click_event(elementToAttachTo){
        elementToAttachTo.addEventListener(
            "click", 
            function (event){
                // current target = element where the eventtrigger was attached to
                this.selected_symbol_id = event.currentTarget.id;
                console.log(this.selected_symbol_id);

            }.bind(this)
        ); 
    }

    add_diacricit_independent(divToAttachTo, id, image_name){
        let symbol = addDiv(divToAttachTo, id, "diacritic-independent");
        let img = document.createElement("Img");
        img.src  = "symbols/diacritics/" + image_name;
        img.id = image_name;
        img.classList.add("diacritic_image");
        symbol.appendChild(img);
        return symbol;
    }

    add_punctuation(divToAttachTo, id, image_name){
        let symbol = addDiv(divToAttachTo, id, "punctuation");
        let img = document.createElement("Img");
        img.src  = "symbols/punctuation/" + image_name;
        img.id = image_name;
        img.classList.add("punctuation_image");
        symbol.appendChild(img);
        return symbol;
    }

    add_noun(divToAttachTo, id, image_name, diacritic_1_name, diacritic_2_name){

        let noun = addDiv(divToAttachTo, id, "noun");
        let img = document.createElement("Img");
        img.src  = "symbols/nouns/" + image_name;
        img.id = image_name;
        img.classList.add("noun_image");
         
        let diacritic_1 = document.createElement("Img");
        diacritic_1.src  = "symbols/diacritics/" + diacritic_1_name;
        diacritic_1.classList.add("noun_diacritic");
        
        let diacritic_2 = document.createElement("Img");
        diacritic_2.src  = "symbols/diacritics/" + diacritic_2_name;
        diacritic_2.classList.add("noun_diacritic");
        
        noun.appendChild(img);
        noun.appendChild(diacritic_1);
        noun.appendChild(diacritic_2);
        return noun;
    }

}