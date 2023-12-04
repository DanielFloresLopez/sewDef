"use strict"
class Sudoku{
    constructor(){
        this.cadenaTablero = "3.4.69.5....27...49.2..4....2..85.198.9...2.551.39..6....8..5.32...46....4.75.9.6";
        this.filas = 9;
        this.columnas = 9;
        this.clicked = null;
        
        this.tablero = new Array(this.columnas);
        for(var j = 0; j < this.columnas; j++){
            this.tablero[j] = new Array(this.filas);
        }

        this.start();
        
        document.addEventListener("keydown", (event) =>{
            if(this.clicked!=null)
                this.introduceNumber(event);
        }
        );
    }

    

    start(){
        var contador = 0;
        for(var i = 0; i < this.filas; i++){
            for(var j = 0; j < this.columnas; j++){
                if(this.cadenaTablero.charAt(contador)!='.')
                    this.tablero[i][j] = this.cadenaTablero.charAt(contador);
                else
                    this.tablero[i][j]  = 0;
                contador++;
            }
        }
    }

    createStructure(){
        for(var i = 0; i < this.filas; i++){
            for(var j = 0; j < this.columnas; j++){
                document.write("<p data-state = \"init\"></p> \n");
            }
        }
    }

    paintSudoku(){
        var contador = 0;
        var fields = document.getElementsByTagName("p");
        for(var i = 0; i < this.filas; i++){
            for(var j = 0; j < this.columnas; j++){
                var field = fields[contador];
                if(this.tablero[i][j] !=0){
                    field.dataset.state = "blocked";
                    field.innerHTML = this.tablero[i][j] ;
                }
                contador++;
            }
        }
    }

    addEventListeners(){
        var contador = 0;
        var fields = document.getElementsByTagName("p");
        for(var i = 0; i < this.filas; i++){
            for(var j = 0; j < this.columnas; j++){
                var field = fields[contador];
                if(field.dataset.state=="init"){
                    field.addEventListener("click", 
                            this.changeState.bind(field,this)
                    ,false);
                }
                    
                contador++;
            }
        }
    }

    clearClicked(sudoku){
        var contador = 0;
        var fields = document.getElementsByTagName("p");
        for(var i = 0; i < sudoku.filas; i++){
            for(var j = 0; j < sudoku.columnas; j++){
                var field = fields[contador];
                if(field.dataset.state=="clicked")
                    field.dataset.state = "init";
                contador++;
            }
        }
        this.clicked=null;
    }

    changeState(sudoku){
        if(this.dataset.state == "correct")
            return;
        if(this.dataset.state!="clicked"){
            sudoku.clearClicked(sudoku);
            this.dataset.state = "clicked";
            sudoku.clicked = this;
        }
    }

    

    introduceNumber(event){
        if( (event.key==0||event.key==1||event.key==2||event.key==3||event.key==4
            ||event.key==5||event.key==6||event.key==7||event.key==8||event.key==9)){
                this.validateAndWrite(event.key);
                this.clearClicked(this);
        }
        else{
            alert("Se debe escribir un número al seleccionar una celda");
            this.clearClicked(this);
        }
    }

    validateAndWrite(key){
        var auxRow = -1;
        var auxColumn = -1;
        var fields = document.getElementsByTagName("p");
        var clickedField = null;
        for(var i = 0; i < sudoku.columnas; i++){
            for(var j = 0; j < sudoku.filas; j++){
                var field = fields[(j*9 + (i))];
                if(field.dataset.state=="clicked"){
                    clickedField = field;
                    auxRow = i;
                    auxColumn = j;
                }
            }
        }

        if(!this.isSameNumberInRow(auxColumn, key) && 
        !this.isSameNumberInColumn(auxRow, key) &&
        !this.isSameNumberIn3x3(auxRow, auxColumn, key)){
            this.clearClicked(this);
            clickedField.dataset.state = "correct";
            clickedField.innerHTML = key;
        }
        else{
            alert(key+" es un valor incorrecto para esa casilla");
        }
    }

    isSameNumberInRow(auxRow,key){
        var row = this.tablero[auxRow];
        for(var i=0; i < this.filas; i++){
            if(row[i] == key)
                return true;
        }
        return false;
    }

    isSameNumberInColumn(auxColumn, key){
        for(var i=0; i < this.columnas; i++){
            if(this.tablero[i][auxColumn] == key)
                return true;
        }
        return false;
    }
    isSameNumberIn3x3(auxRow, auxColumn, key){
        var columnBox = Math.floor(auxColumn / 3);
        var rowBox = Math.floor(auxRow / 3);

        for(var i = 3*columnBox; i < columnBox+3; i++){
            for(var j = 3*rowBox; j < rowBox+3; j++){
                if(this.tablero[i][j] == key)
                    return true;
            }
        }
        return false;
    }
}