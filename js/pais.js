
class Pais{
    constructor(nombre, capital, poblacion, formaGobierno){
        this.nombre = nombre;
        this.capital = capital;
        this.poblacion = poblacion;
        this.formaGobierno = formaGobierno;
    }

    fillAttributes(latitudCap, longitudCap, religion){
        this.latitudCap = latitudCap;
        this.longitudCap = longitudCap;
        this.religion = religion;
    }
    getNombre(){
        return this.nombre;
    }
    getCapital(){
        return this.capital;
    }

    getSecondaryInfoAsAList(){
        return "<ul><li>"+this.poblacion+"</li><li>"
        +this.formaGobierno+
        "</li><li>"+this.religion+
        "</li></ul>";
    }
    writeCapital(){
        document.write("<p> Coordenadas de "+this.capital+": latitud{" +this.latitudCap+"}, longitud{"+this.longitudCap+"}</p>");
    }

}

