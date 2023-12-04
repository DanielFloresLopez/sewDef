"use strict"
class Agenda{
    constructor(){
        this.url = "http://ergast.com/api/f1/current"
        this.last_api_call = null;
        this.last_api_result = null;
        
    }

    cargarDatos(){
        var now = new Date();
        if(this.last_api_call == null || (now.getMinutes()-this.last_api_call.getMinutes()).getMinutes()>=10){
            $.ajax({
                dataType: "xml",
                url: this.url,
                method: 'GET',
                success: function(datos){
                    this.last_api_call = new Date();
                    this.last_api_result = datos;
                    var races = $('Race', datos);
                    var numOfRaces = races.length;
                    for(var i = numOfRaces-1; i >= 0; i--){
                        var race = races[i];
                        var article = document.createElement("article");
                        var nombreCarrera = document.createElement("h3");
                        nombreCarrera.innerHTML = $('RaceName', race).text();
                        var circuito = document.createElement("p");
                        circuito.innerHTML = $('CircuitName', race).text();
                        var coords = document.createElement("p");
                        coords.innerHTML = "{ "+$('Location', race).attr('lat')+", "+$('Location', race).attr('long')+" }";
                        var fecha = document.createElement("p");
                        var dia = $('Date', race)[0];
                        var hora = $('Time', race)[0];
                        fecha.innerHTML = dia.textContent+" || "+ hora.textContent;
            
                        $("section:last-of-type h2").after(article);
                        $("section:last-of-type article:first-of-type").prepend(nombreCarrera, circuito, coords, fecha);
                    }
                }});
        }
        else{
            var races = $('Race', this.last_api_result);
            var numOfRaces = races.length;
            for(var i = numOfRaces-1; i >= 0; i--){
                var race = races[i];
                var article = document.createElement("article");
                var nombreCarrera = document.createElement("h3");
                nombreCarrera.innerHTML = $('RaceName', race).text();
                var circuito = document.createElement("p");
                circuito.innerHTML = $('CircuitName', race).text();
                var coords = document.createElement("p");
                coords.innerHTML = "{ "+$('Location', race).attr('lat')+", "+$('Location', race).attr('long')+" }";
                var fecha = document.createElement("p");
                var dia = $('Date', race)[0];
                var hora = $('Time', race)[0];
                fecha.innerHTML = dia.textContent+" || "+ hora.textContent;
    
                $("section:last-of-type h2").after(article);
                $("section:last-of-type article:first-of-type").prepend(nombreCarrera, circuito, coords, fecha);
                }   
        
            }

        }
    
}