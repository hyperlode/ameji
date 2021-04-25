
// https://thenounproject.com/
// opensymbols.org

// dir /b > dirlist.txt
var nouns = [
    "book_writing.png",
    "dirlist.txt",
    "EEBB.png",
    "emotion.png",
    "files_to_dirlist.bat",
    "finish.png",
    "garbage.png",
    "hammer_create.png",
    "happiness.png",
    "happy_happiness.png",
    "heart_love_like.png",
    "I_ME_NARRATOR_SPEAKER.png",
    "location.png",
    "luciebox.png",
    "noun_Smiley_149030.png",
    "quantity_relative_1.png",
    "quantity_relative_negative_2.png",
    "quantity_relative_negative_2_b.png",
    "time_absolute_clock_2.00.png",
    "time_relative-time_hourglass.png",
    "universal_language.png",
    "value_relative_0.png",
    "value_relative_5.png"
];

var punctuation = [
    "backward-slash.png",
    "bracket_open_left.png",
    "bracket_open_right.png",
    "colon.png",
    "comma.png",
    "comma_left.png",
    "double-backward-slash.png",
    "double-forward-slash.png",
    "forward-slash.png",
    "is_backward.png",
    "is_forward.png",
    "parentheses.png",
    "parentheses_open_left.png",
    "parentheses_open_right.png",
    "period.png",
    "possesive_backward.png",
    "possesive_forward.png",
    "semicolon.png",
    "semi_colon.png",
    "not.png"
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

class Ameji {
    constructor() {
        console.log("Ameji loaded");

        this.baseDiv = document.getElementById("base");
        this.controlsDiv = addDiv(this.baseDiv, "controls", "sentence-builder__controls");
        addBr(this.baseDiv);
        this.sentenceDiv = addDiv(this.baseDiv, "sentence", "sentence-builder__sentence");
        addBr(this.baseDiv);

        this.baseDiv.className = "sentence-builder";


        // this.searchField = addDiv(this.controlsDiv, "nounPicker", "sentence-builder__controls__noun-picker");
        this.nounPickerField = addDiv(this.controlsDiv, "nounPicker", "sentence-builder__controls__noun-picker");
        this.punctuationPickerField = addDiv(this.controlsDiv, "punctuationPicker", "sentence-builder__controls__punctuation-picker");
        this.diacriticsTopPickerField = addDiv(this.controlsDiv, "diacriticsTopPicker", "sentence-builder__controls__diacritics-picker");
        this.diacriticsBottomPickerField = addDiv(this.controlsDiv, "diacriticsBottomPicker", "sentence-builder__controls__diacritics-picker");
        this.properNounsPickerField = addDiv(this.controlsDiv, "properNounsPicker", "sentence-builder__controls__proper-nouns-picker");

        this.populate_noun_picker();
        this.populate_punctuation_picker();
        this.populate_diacritics_top_picker();
        this.populate_diacritics_bottom_picker();

        // addButton(this.controlsDiv,"add noun", "btnAdd", "btnAdd", this.add_noun_to_sentence.bind(this));
        // addButton(this.controlsDiv,"add punctuation", "btnAdd", "btnAdd", this.add_punctuation_to_sentence.bind(this));
        addButton(this.controlsDiv, "delete selected", "btnDelete", "btnDelete", this.deleteSelectedFromSentence.bind(this));
        this.sentence_element_count = 0;
        this.punctuation_count = 0;
        this.noun_count = 0;
        this.selected_symbol_id = null;
    }

    deleteSelectedFromSentence() {
        if (this.selected_symbol_id !== null) {
            document.getElementById(this.selected_symbol_id).remove();
            console.log(this.selected_symbol_id + " removed.");
        }
        this.selected_symbol_id = null;

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
        for (let i = 0; i < nouns.length; i++) {
            let name = nouns[i];
            let symbolElement = this.add_noun(this.nounPickerField, "noun" + i, name, "diacritic_empty.png", "diacritic_empty.png")
            this.add_noun_click_event(symbolElement);
        }
    }

    add_noun_to_sentence(noun_name, diacritic_top_name, diacritic_bottom_name) {

        let sentence_element = this.add_noun(
            this.sentenceDiv,
            this.sentence_element_count,
            noun_name,
            diacritic_top_name,
            diacritic_bottom_name
        );

        // this.add_symbol(this.sentenceDiv,this.sentence_element_count, "DEAE.png", "diacritic_squiggle.png", "diacritic_verb.png" )
        sentence_element.classList.add("sentence-element");
        this.add_sentence_element_click_event(sentence_element);

        this.sentence_element_count += 1;
    }

    add_punctuation_to_sentence(punctuation_name) {
        let sentence_element = this.add_punctuation(
            this.sentenceDiv,
            this.sentence_element_count,
            punctuation_name
        );
        sentence_element.classList.add("sentence-element");
        this.add_sentence_element_click_event(sentence_element);
        this.sentence_element_count += 1;
    }

    add_diacritic_click_event(elementToAttachTo) {
        elementToAttachTo.addEventListener(
            "click",
            function (event) {

                if (this.selected_symbol_id === null) {
                    alert("Select a symbol in the sentence.");
                }
                let selected_sentence_symbol = document.getElementById(this.selected_symbol_id);
                let selected_class_names = selected_sentence_symbol.classList;
                // console.log(selected_class_names);

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
                // console.log(el.id);

                let diacritic_field_id = event.currentTarget.id;
                let diacritic_position_is_top = true;
                if (diacritic_field_id.includes("bottom")) {
                    diacritic_position_is_top = false;
                } else if (!diacritic_field_id.includes("top")) {
                    console.log("ASSERT ERROR: diacritic in field id should contain bottom or top to determine position in symbol.");
                }

                // console.log(diacritic_position_is_top);

                let replace_class_name = ".noun_diacritic_bottom";
                if (diacritic_position_is_top) {
                    replace_class_name = ".noun_diacritic_top";

                }

                let diacritic_im = selected_sentence_symbol.querySelector(replace_class_name);
                diacritic_im.src = "symbols/diacritics/" + el.id;


                // let punctuation_image_name = punctuation_image_element.id;

                // this.add_punctuation_to_sentence(punctuation_image_name,"","");

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

                this.add_noun_to_sentence(noun_image_name, "", "");

            }.bind(this)
        );
    }

    add_sentence_element_click_event(elementToAttachTo) {
        elementToAttachTo.addEventListener(
            "click",
            function (event) {
                // current target = element where the eventtrigger was attached to
                let id = event.currentTarget.id;

                // console.log(this.selected_symbol_id);

                // first deselect selected symbols.
                if (this.selected_symbol_id !== null) {
                    document.getElementById(this.selected_symbol_id).classList.remove('symbol-selected');
                }

                if (id === this.selected_symbol_id) {
                    // event.currentTarget.classList.remove('symbol-selected');
                    // this.selected_symbol_id = null;
                    this.selected_symbol_id = null;
                    // console.log("rem");

                } else {
                    // console.log("add");
                    event.currentTarget.classList.add('symbol-selected');
                    this.selected_symbol_id = id;
                }
            }.bind(this)
        );
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
        let symbol = addDiv(divToAttachTo, id, "punctuation");
        let img = document.createElement("Img");
        img.src = "symbols/punctuation/" + image_name;
        img.id = image_name;
        img.classList.add("punctuation_image");
        symbol.appendChild(img);
        return symbol;
    }

    add_noun(divToAttachTo, id, image_name, diacritic_top_name, diacritic_bottom_name) {

        let noun = addDiv(divToAttachTo, id, "noun");
        let img = document.createElement("Img");
        img.src = "symbols/nouns/" + image_name;
        img.id = image_name;
        img.classList.add("noun_image");

        let diacritic_1 = document.createElement("Img");
        diacritic_1.src = "symbols/diacritics/" + diacritic_top_name;
        diacritic_1.classList.add("noun_diacritic_top");

        let diacritic_2 = document.createElement("Img");
        diacritic_2.src = "symbols/diacritics/" + diacritic_bottom_name;
        diacritic_2.classList.add("noun_diacritic_bottom");

        noun.appendChild(img);
        noun.appendChild(diacritic_1);
        noun.appendChild(diacritic_2);
        return noun;
    }

}