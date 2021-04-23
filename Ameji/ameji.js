class Ameji {
    constructor() {
        console.log("Ameji loaded");

        this.baseElement = document.getElementById("base");
        this.controlsElement = addDiv(this.baseElement, "controls", "classControls");
        this.sentenceElement = addDiv(this.baseElement, "sentence", "classSentence");

        this.sentenceElement.className = "sentence_field";
        addButton(this.controlsElement,"add symbol", "btnAdd", "btnAdd", this.add_symbol.bind(this));
        addButton(this.controlsElement,"add punctuation", "btnAdd", "btnAdd", this.add_punctuation.bind(this));
        this.symbol_count = 0;
        this.punctuation_count = 0;
    }

    add_symbol(){
        let symbol = addDiv(this.sentenceElement,this.symbol_count, "symbol");
        let img = document.createElement("Img");
        img.src  = "symbols/ABBA.png";
        img.classList.add("symbol_image");
        
        let diacritic_1 = document.createElement("Img");
        diacritic_1.src  = "symbols/diacritic_squiggle.png";
        diacritic_1.classList.add("symbol_diacritic");
        
        let diacritic_2 = document.createElement("Img");
        diacritic_2.src  = "symbols/diacritic_verb.png";
        diacritic_2.classList.add("symbol_diacritic");
        
        symbol.appendChild(img);
        symbol.appendChild(diacritic_1);
        symbol.appendChild(diacritic_2);

        this.symbol_count += 1;
    }
    
    add_punctuation(){
        let space = addDiv(this.sentenceElement,this.punctuation_count, "punctuation");


        
    }
}