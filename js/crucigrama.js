"use strict"
class Crucigrama{
    constructor(){
        this.board = "";
        this.numCol = 9;
        this.numRow = 11;
        this.init_time = null;
        this.end_time = null;
        this.clicked= null;


        this.arrayBoard = new Array(this.numRow);
        for(var j = 0; j < this.numRow; j++){
            this.arrayBoard[j] = new Array(this.numCol);
        }
        this.chargeLevel("intermediate");
        this.start();

        document.addEventListener("keydown", (event) =>{
            if(this.clicked!=null)
                this.introduceElement(event);
            else if( !isNaN(parseInt(event.key)) ||
            String(event.key)==="*"||String(event.key)==="="||String(event.key)==="/"||String(event.key)==="+"
            || String(event.key)==="-"){
                alert("Se debe seleccionar una celda para escribir en el crucigrama");
            }
            }
            
        );
    }


    chargeLevel(dificultad){
        if(dificultad === "easy"){
            this.board = "4,*,.,=,12,#,#,#,5,#,#,*,#,/,#,#,#,*,4,-"+
            ",.,=,.,#,15,#,.,*,#,=,#,=,#,/,#,=,.,#,3,#,4,*,.,=,20,=,#,#,#,#,#,=,#,#,8,#,9,-,.,=,3,#,.,#,#,-"+
            ",#,+,#,#,#,*,6,/,.,=,.,#,#,#,.,#,#,=,#,=,#,#,#,=,#,#,6,#,8,*,.,=,16";
        }
        else if(dificultad === "intermediate"){
            this.board = "12,*,.,=,36,#,#,#,15,#,#,*,#,/,#,#,#,*,.,-" +
            ",.,=,.,#,55,#,.,*,#,=,#,=,#,/,#,=,.,#,15,#,9,*,.,=,45,=,#,#,#,#,#,=,#,#,72,#,20,-,.,=,11,#,.,#,#,-" + 
            ",#,+,#,#,#,*,56,/,.,=,.,#,#,#,.,#,#,=,#,=,#,#,#,=,#,#,12,#,16,*,.,=,32";
        }
        else{
            this.board = "4,.,.,=,36,#,#,#,25,#,#,*,#,.,#,#,#,.,.,-" + 
            ",.,=,.,#,15,#,.,*,#,=,#,=,#,.,#,=,.,#,18,#,6,*,.,=,30,=,#,#,#,#,#,=,#,#,56,#,9,-" +
            ",.,=,3,#,.,#,#,*,#,+,#,#,#,*,20,.,.,=,18,#,#,#,.,#,#,=,#,=,#,#,#,=,#,#,18,#,24,.,.,=,72";
        }
        
    }

    start(){
        var contador = 0;
        var valores = this.board.split(',');
        for(var i = 0; i < this.numRow; i++){
            for(var j = 0 ; j < this.numCol; j++){
                if(!isNaN(parseInt(valores[contador])))
                    this.arrayBoard[i][j] = String(valores[contador]);
                else if(String(valores[contador])==="*"||String(valores[contador])==="="||String(valores[contador])==="/"||String(valores[contador])==="+"
                    || String(valores[contador])==="-")
                    this.arrayBoard[i][j] = String(valores[contador]);
                else if(valores[contador]==".")
                    this.arrayBoard[i][j] = 0;
                else if(valores[contador]=="#")
                    this.arrayBoard[i][j] = -1;
                contador++;
            }
        }
    }

    paintMathWord(){
        for(var i = 0 ; i < this.numRow; i++){
            for(var j = 0; j < this.numCol; j++){
                var parrafo = document.createElement("p");
                if(this.arrayBoard[i][j]==0){
                    parrafo.innerHTML="";
                    $(parrafo).attr("data-state", "init");
                    parrafo.addEventListener("click", 
                            this.changeState.bind(parrafo, this)
                            ,false);
                }
                else if(this.arrayBoard[i][j]==-1){
                    parrafo.innerHTML="";
                    $(parrafo).attr("data-state", "empty");
                }
                else{
                    parrafo.innerHTML=String(this.arrayBoard[i][j]);
                    $(parrafo).attr("data-state", "blocked");
                }
                $("main").append(parrafo);
            }
        }
        this.init_time = (new Date());
    }

    changeState(crucigrama){
        if(this.dataset.state == "correct")
            return;
        if(this.dataset.state!="clicked"){
            crucigrama.clearClicked(crucigrama);
            this.dataset.state = "clicked";
            crucigrama.clicked = this;
        }
    }

    check_win_condition(){
        for(var i = 0; i < this.numRow; i++){
            for(var j = 0 ; j < this.numCol; j++){
                if(this.arrayBoard[i][j]==0)
                    return false;
            }
        }
        return true;
    }

    calculate_date_difference(){
        var deltaTime = new Date(this.end_time- this.init_time);
        return deltaTime.getHours()-1+"hora(s):"+deltaTime.getMinutes()+"min.:"+deltaTime.getSeconds()+"sec.";
    }

    clearClicked(crucigrama){
        var contador = 0;
        var fields = document.getElementsByTagName("p");
        for(var i = 0; i < crucigrama.numCol; i++){
            for(var j = 0; j < crucigrama.numRow; j++){
                var field = fields[contador];
                if(field.dataset.state=="clicked")
                    field.dataset.state = "init";
                contador++;
            }
        }
        this.clicked=null;
    }


    introduceElement(event){
        
        if( !isNaN(parseInt(event.key)) || String(event.key)==="*"||String(event.key)==="="||String(event.key)==="/"||String(event.key)==="+"
            || String(event.key)==="-"){
                var expression_row = true;
                var expression_col = true;
                var col;
                var row;
                var contador = 0;
                var parrafo;
                var fields = document.getElementsByTagName("p");
                for(var i = 0; i < crucigrama.numRow; i++){
                    for(var j = 0; j < crucigrama.numCol; j++){
                        var field = fields[contador];
                        if(field.dataset.state==="clicked"){
                            parrafo = field;
                            this.arrayBoard[i][j] = String(event.key);
                            col = j;
                            row = i;
                        }
                        contador++;
                    }
                }

                var colEqualSign = -1;
                for(j = col; j<crucigrama.numCol; j++)
                    if(this.arrayBoard[row][j]=="="){
                        colEqualSign = j;
                        break;
                    }
                if(colEqualSign!=-1){
                    var first_number = String(this.arrayBoard[row][colEqualSign-3]);
                    var expression = String(this.arrayBoard[row][colEqualSign-2]);
                    var second_number = String(this.arrayBoard[row][colEqualSign-1]);
                    var result = String(this.arrayBoard[row][colEqualSign+1]);

                    if(first_number!=0&&expression!=0&&second_number!=0&&result!=0){
                        var arrayAux = new Array(first_number, expression, second_number);
                        var opp = eval(arrayAux.join(""));
                        if(opp!=result)
                            expression_col=false;
                    }
                        
                }

                var rowEqualSign = -1;
                for(i = row; i<crucigrama.numRow; i++)
                    if(this.arrayBoard[i][col]=="="){
                        rowEqualSign = i;
                        break;
                    }
                if(rowEqualSign!=-1){
                    var first_number = String(this.arrayBoard[rowEqualSign-3][col]);
                    var expression = String(this.arrayBoard[rowEqualSign-2][col]);
                    var second_number = String(this.arrayBoard[rowEqualSign-1][col]);
                    var result = String(this.arrayBoard[rowEqualSign+1][col]);

                    if(first_number!=0&&expression!=0&&second_number!=0&&result!=0){
                        var arrayAux = new Array(first_number, expression, second_number);
                        var opp = eval(arrayAux.join(""));
                        if(opp!=result)
                            expression_row=false;
                    }
                }
                if(expression_col&&expression_row){
                    parrafo.innerHTML = String(event.key);
                    parrafo.dataset.state = "correct";

                    if(this.check_win_condition()){
                        this.end_time = new Date();
                        alert("Enhorabuena, logrado en "+this.calculate_date_difference());
                    }
                }
                else{
                    this.arrayBoard[row][col]=0;
                    alert("El elemento "+event.key+" no es correcto para la casilla seleccionada");
                }
                this.clearClicked(this);
        }
        
    }

}