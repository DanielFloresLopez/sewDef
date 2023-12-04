
class Pais{
    constructor(nombre, capital, poblacion, formaGobierno){
        this.nombre = nombre;
        this.capital = capital;
        this.poblacion = poblacion;
        this.formaGobierno = formaGobierno;
        this.datosMeteorologicos = ""; 
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


    cargarDatosMeteorologicos(){
        var apiKey = "9cdba15c5e1c43741f302a6dcbedf3c3";
        var unidades = "&units=metric";
        var url = "http://api.openweathermap.org/data/2.5/forecast?lat="+this.latitudCap+"&lon="+this.longitudCap+unidades+"&lang=es"
            +"&appid=" + apiKey;
        $.ajax({
            dataType: "json",
            url: url,
            method: 'GET',
            success:
                function(datos){
                    //$("pre").text(JSON.stringify(datos, null, 2))
                    for(var i = 0; i <= datos.list.length - 1; i++) {
                        var datosDia = datos.list[i];
                        var hora = datosDia.dt_txt.split(' ')[1];
                        if(hora == ("15:00:00")){
                            console.log("Creamos elemento");
                            var article = document.createElement("article");
                            var fecha = document.createElement("h3");
                            fecha.innerHTML = datosDia.dt_txt.split(' ')[0];
                            var temperatura = document.createElement("p");
                            temperatura.innerHTML = "Temp. "+datosDia.main.temp_min+"-/"+datosDia.main.temp_max+"+";
                            var humedad = document.createElement("p");
                            humedad.innerHTML = "Humedad "+datosDia.main.humidity+"%";
                            var imagen;
                            if(datosDia.weather.main=="Clouds"){
                                imagen = $("<img />").attr( "src", "multimedia/imagenes/nubes.svg").attr("alt", "Icono de nubes");
                                $("section:last-of-type h2").after(article);
                                $("section:last-of-type article:first-of-type").prepend(fecha, temperatura, humedad, imagen);

                            } else if(datosDia.weather.main=="Rain"){
                                imagen = $("<img />").attr( "src", "multimedia/imagenes/lluvia.svg").attr("alt", "Icono de lluvia");
                                var lluvia = document.createElement("p");
                                lluvia.innerHTML = datosDia.rain[0] + "l/mm";
                                $("section:last-of-type h2").after(article);
                                $("section:last-of-type article:first-of-type").prepend(fecha, temperatura, humedad, imagen, lluvia);

                            } else{
                                imagen = $("<img />").attr( "src", "multimedia/imagenes/sol.svg").attr("alt", "Icono de sol");
                                $("section:last-of-type h2").after(article);
                                $("section:last-of-type article:first-of-type").prepend(fecha, temperatura, humedad, imagen);
                            }
                            
                        }
                        
            
                    }
                }

        })
        
    }

    
    verJSON(){  
              this.cargarDatosMeteorologicos();
    }


}

