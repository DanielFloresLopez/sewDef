"use strict"
class Fondo{
    constructor( nombrePais, nombreCapital, latitudCapital, longitudCapital){

        this.nombrePais = nombrePais;
        this.nombreCapital = nombreCapital;
        this.latitudCapital = latitudCapital;
        this.longitudCapital = longitudCapital;


        
    }

    getNombrePais(){
        return this.nombrePais;
    }
    getNombreCapital(){
        return this.nombreCapital;
    }
    getLatitudCapital(){
        return this.latitudCapital;
    }
    getLongitudCapital(){
        return this.longitudCapital;
    }
}