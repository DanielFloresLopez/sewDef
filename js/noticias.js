"use strict"
class Noticias{
    constructor(){
      if (window.File && window.FileReader && window.FileList && window.Blob) 
      {  
          //El navegador soporta el API File
          document.write("<p>Este navegador soporta el API File </p>");
      }
      else document.write("<p>¡¡¡ Este navegador NO soporta el API File y este programa puede no funcionar correctamente !!!</p>");
    
    }


    readInputFile(files){
        var archivo = files[0];
        var escribe = document.getElementsByTagName("pre");
        var tipoTexto = /text.*/;
        if (archivo.type.match(tipoTexto)) 
        {
          var lector = new FileReader();
          lector.onload = function (evento) {
            //El evento "onload" se lleva a cabo cada vez que se completa con éxito una operación de lectura
            //La propiedad "result" es donde se almacena el contenido del archivo
            //Esta propiedad solamente es válida cuando se termina la operación de lectura
            escribe.innerText = lector.result;
            }      
          lector.readAsText(archivo);
        }
    }
    
}