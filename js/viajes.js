"use strict"
class Viajes{
    constructor (){
        this.http_request = false;
        navigator.geolocation.getCurrentPosition(this.getPosicion.bind(this), this.verErrores.bind(this));
    }
    getPosicion(posicion){
        this.longitud         = posicion.coords.longitude; 
        this.latitud          = posicion.coords.latitude;  
        this.precision        = posicion.coords.accuracy;    
        this.getMapaEstatico();
        this.getMapaDinamico();
    }

    verErrores(error){
        switch(error.code) {
        case error.PERMISSION_DENIED:
            alert("El usuario no permite la petición de geolocalización");
            break;
        case error.POSITION_UNAVAILABLE:
            alert("Información de geolocalización no disponible");
            break;
        case error.TIMEOUT:
            alert("La petición de geolocalización ha caducado");
            break;
        case error.UNKNOWN_ERROR:
            alert("Se ha producido un error desconocido");
            break;
        }
    }
    getMapaEstatico(){
        var apiKey  = "pk.eyJ1IjoidW8yODI4OTQiLCJhIjoiY2xwdTBmNzV3MGhzZzJrcmxlYzBzMDVubyJ9.CfjWbYIW2ek2xxGn9favjA";
        var url = "https://api.mapbox.com/styles/v1/mapbox/streets-v12/static/["+(this.longitud-1)+","+(this.latitud-1)+","+(this.longitud+1)+","+(this.latitud+1)+"]/1080x720?access_token="+apiKey;
        var imagen = document.createElement("img");
        $(imagen).attr("src", url).attr("alt", "Mapa de la localización de la IP cliente");
        $("section:first-of-type").append(imagen);
    }

    getMapaDinamico(){
        var apiKey  = "pk.eyJ1IjoidW8yODI4OTQiLCJhIjoiY2xwdTBmNzV3MGhzZzJrcmxlYzBzMDVubyJ9.CfjWbYIW2ek2xxGn9favjA";
        mapboxgl.accessToken= apiKey;
        var article = document.createElement("article");
        var map = new mapboxgl.Map({
            container: article,
            style: 'mapbox://styles/mapbox/streets-v12',
            center: [this.longitud, this.latitud], // starting position [lng, lat]
            zoom: 9 // starting zoom
        });
        $("section:nth-of-type(2)").append(article);
    }

    readInputFile(files){
        var archivo = files[0];
        var tipoTexto = /text.*/;
        if (archivo.type.match(tipoTexto)) 
        {
          var lector = new FileReader();
          lector.onload = function (evento) {
            var rutas = $('ruta', lector.result);
            for(var i = 0; i < rutas.length; i++){
                var ruta = rutas[i];
                var article = document.createElement("article");
                var nombreRuta = document.createElement("h3");
                nombreRuta.innerHTML = $('nombreruta', ruta)[0].innerHTML;
                $(article).append(nombreRuta);
                
                var duracion = (ruta.attributes.tiemporuta.nodeValue).split(/[PYMDTHMSDT]+/);

                var unidades = ['año(s)', 'mes(es)', 'día(s)', 'hora(s)', 'minuto(s)', 'segundo(s)'];

                var resultadoDuracion = 'Duración: ';
                var primeraPalabra = true;
                for (var j = 0; j < duracion.length; j++) {
                    var valor = parseInt(duracion[j]);
                    if (!isNaN(valor) && valor > 0) {
                        if(!primeraPalabra){
                            resultadoDuracion+=",";
                            
                        }
                        primeraPalabra = false;
                        resultadoDuracion += valor + unidades[j];
                        
                    }
                }
                
                var infoRuta = document.createElement("p");
                infoRuta.innerHTML= $('tiporuta', ruta)[0].innerHTML + 
                    "|| ["+
                    ruta.attributes.fechainicio.nodeValue+"|"+
                    ruta.attributes.horainicio.nodeValue+"] ||"+
                    resultadoDuracion;
                $(article).append(infoRuta);

                var descripcionRuta = document.createElement("p");
                descripcionRuta.innerHTML=$('agencia',ruta)[0].innerHTML + ": "+
                    $('descripcion',ruta)[0].innerHTML;
                $(article).append(descripcionRuta);

                var enlaces = $('referencia', ruta);
                for(j = 0; j < enlaces.length; j++){
                    var enlace = enlaces[j].innerHTML.split('//')[1].split('/')[0];
                    var parrafoEnlace = document.createElement("p");
                    parrafoEnlace.innerHTML = "<a href=\""+enlaces[j].innerHTML+
                        "\">Referencia "+(j+1)+": "+enlace+"</a>";
                    $(article).append(parrafoEnlace);

                }

                var calificacionRuta = document.createElement("p");
                calificacionRuta. innerHTML= "Calificación de la ruta: "+
                    $('recomendacion',ruta)[0].innerHTML+"/10";
                $(article).append(calificacionRuta);
                var hitos = document.createElement("p");
                hitos. innerHTML= "Hitos: ";
                $(article).append(hitos);

                var totalhitos = $('hito', ruta);
                var listaHitos = document.createElement("ol");
                for(j =0; j<totalhitos.length;j++){
                    var listIndex = document.createElement("li");
                    listIndex.innerHTML = totalhitos[j].attributes.nombrehito.nodeValue;
                    var caracteristicasHitos = document.createElement("ul");
                    var coordsEnLista = document.createElement("li");
                    coordsEnLista.innerHTML = "Coords ["+
                        totalhitos[j].attributes.longitud.nodeValue+","+
                        totalhitos[j].attributes.latitud.nodeValue+","+
                        totalhitos[j].attributes.altitud.nodeValue+"]";
                    $(caracteristicasHitos).append(coordsEnLista);

                    var distanciaEnLista = document.createElement("li");
                    distanciaEnLista.innerHTML = "Distancia con el anterior punto: "
                        +totalhitos[j].attributes.distanciahito.nodeValue+
                        totalhitos[j].attributes.tipodistancia.nodeValue;
                    $(caracteristicasHitos).append(distanciaEnLista);

                    var descrripcionEnLista = document.createElement("li");
                    descrripcionEnLista.innerHTML = "Descripción: "+
                        $('descripcionhito',totalhitos[j])[0].innerHTML;
                    $(caracteristicasHitos).append(descrripcionEnLista);


                    $(listIndex).append(caracteristicasHitos);
                    $(listaHitos).append(listIndex);
                }
                $(article).append(listaHitos);

                $('section:nth-of-type(3)').append(article);
            }
        }      
          lector.readAsText(archivo);
        }
        
    }


    leerKMLs(){

        var apiKey  = "pk.eyJ1IjoidW8yODI4OTQiLCJhIjoiY2xwdTBmNzV3MGhzZzJrcmxlYzBzMDVubyJ9.CfjWbYIW2ek2xxGn9favjA";
        mapboxgl.accessToken= apiKey;
        var archivos = document.getElementsByName("archivosKML")[0].files;
        var nArchivos = archivos.length;
        var lectores = new Array();
        for(var i = 0; i < nArchivos; i++){
            var archivo = archivos[i];
            var lector = new FileReader();
            
            lector.onload = function (evento) {
                var centroLongitud = 0;
                var centroLatitud = 0;
                var centroMarked = false;
                var coords = "[";
                var coordsKML = $('coordinates',evento.currentTarget.result)[0].innerHTML.split('\n');
                for(var j in coordsKML){
                    if(coordsKML[j].length>0){
                        if(j>1){
                            coords+=", \n";
                        }
                        var coordKML = coordsKML[i].split(',');
                        if(!centroMarked){
                            centroLatitud = parseFloat(coordKML[1]);
                            centroLongitud = parseFloat(coordKML[0]);
                            centroMarked = true;
                        }
                        coords+="["+parseFloat(coordKML[0])+","+
                            parseFloat(coordKML[1])+"]";
                    }
                    
                }
                coords+="]";
                var article = document.createElement("article");
                var map = new mapboxgl.Map({
                    container: article,
                    style: 'mapbox://styles/mapbox/streets-v12',
                    center: [centroLongitud, centroLatitud], // starting position [lng, lat]
                    zoom: 9 // starting zoom
                });
                map.on('load', () => {
                    map.addSource('route', {
                        'type': 'geojson',
                        'data': {
                        'type': 'Feature',
                        'properties': {},
                        'geometry': {
                        'type': 'LineString',
                        'coordinates': coords
                        }
                    }
                    });
                    map.addLayer({
                            'id': 'route',
                            'type': 'line',
                            'source': 'route',
                            'layout': {
                            'line-join': 'round',
                            'line-cap': 'round'
                            },
                            'paint': {
                            'line-color': '#69C9BC',
                            'line-width': 20
                            }
                        });
                    });



                $("section:nth-of-type(4)").append(article);
                
            }  
            lector.readAsText(archivo);

        }
    }

    

}