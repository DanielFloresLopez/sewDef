class Memoria{
    constructor(){
        this.elements = 
            [
                {"element": "HTML5", 
                    "source": "js/HTML5_Badge.svg"},
                {"element": "CSS3", 
                    "source": "js/CSS3_logo.svg"},
                {"element": "Javascript", 
                    "source": "js/Javascript_badge.svg"},
                {"element": "PHP", 
                    "source": "js/PHP-logo.svg"},
                {"element": "SVG", 
                    "source": "js/SVG_Logo.svg"},
                {"element": "W3C", 
                    "source": "js/W3C_icon.svg"},
                    {"element": "HTML5", 
                    "source": "js/HTML5_Badge.svg"},
                {"element": "CSS3", 
                    "source": "js/CSS3_logo.svg"},
                {"element": "Javascript", 
                    "source": "js/Javascript_badge.svg"},
                {"element": "PHP", 
                    "source": "js/PHP-logo.svg"},
                {"element": "SVG", 
                    "source": "js/SVG_Logo.svg"},
                {"element": "W3C", 
                    "source": "js/W3C_icon.svg"}

            ]
        this.hasFlippedCard = false;
        this.lockBoard = false;
        this.firstCard = null;
        this.secondCard = null;

        this.createElements();
        this.shuffleElements();
        this.addEventListeners();
    }

    shuffleElements(){
        for (var i = 0; i < this.elements.length - 1; i++) {
            var j = i + Math.floor(Math.random() * (this.elements.length - i));
    
            var temp = this.elements[j];
            this.elements[j] = this.elements[i];
            this.elements[i] = temp;
        }
    }

    unflipCards(){
        this.lockBoard=true;
        this.firstCard.dataset.state = "init";
        this.secondCard.dataset.state = "init";
        setTimeout(this.resetBoard(), 1000);
    }

    resetBoard(){
        this.firstCard = null;
        this.secondCard = null;

        this.hasFlippedCard = false;
        this.lockBoard = false;
    }

    checkForMatch(){
        this.firstCard.dataset.element===this.secondCard.dataset.element ? this.disableCards() : this.unflipCards();
    }

    disableCards(){
        this.firstCard.dataset.state = "revealed";
        this.secondCard.dataset.state = "revealed";
        this.resetBoard();
    }

    createElements(){
        for (var i = 0; i <= this.elements.length -1; i++) {
            document.write("<article data-state = \"init\" data-element = \" "+ this.elements[i]["element"] +"\"> "+
                            "<h3> Tarjeta de memoria </h3> <img src=\""+this.elements[i]["source"]+"\" alt=\""+this.elements[i]["element"]+"\"/>  </article>");
        }
    }

    addEventListeners(){
        var articles = document.getElementsByTagName("article");
        for (var i = 0; i <= this.elements.length -1; i++) {
            var article = articles[i];
            article.addEventListener("click",this.flipCard.bind(article,this),false);
        }
    }
    flipCard(game){
        console.log("estoy aqui");
        if(this.dataset.state === "revealed" || game.lockBoard)
            return;
        if(game.firstCard==this)
            return;
        if(!game.hasFlippedCard){
            game.hasFlippedCard = true;
            this.dataset.state = "flip";
            game.firstCard = this;
        }
        else{
            game.secondCard = this;
            this.dataset.state = "flip";
            setTimeout(game.checkForMatch.bind(game,this),2000);
        }
    }
}