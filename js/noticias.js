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
        var tipoTexto = /text.*/;
        if (archivo.type.match(tipoTexto)) 
        {
          var lector = new FileReader();
          lector.onload = function (evento) {
            //El evento "onload" se lleva a cabo cada vez que se completa con éxito una operación de lectura
            //La propiedad "result" es donde se almacena el contenido del archivo
            //Esta propiedad solamente es válida cuando se termina la operación de lectura
            for(var i in lector.result.split('\n')){
              var noticia = lector.result.split('\n')[i];
              var titulo = document.createElement("h3");
              titulo.innerHTML=noticia.split('_')[0];
              var subtitulo = document.createElement("p");
              subtitulo.innerHTML=noticia.split('_')[1];
              var texto = document.createElement("p");
              texto.innerHTML=noticia.split('_')[2];
              var autor = document.createElement("p");
              autor.innerHTML=noticia.split('_')[3];
              var article = document.createElement("article");
              $(article).append(titulo, subtitulo, texto, autor);
              $("section:first-of-type").append(article);
              
            }
            }      
          lector.readAsText(archivo);
        }
    }

    writeNewNews(){
      if($("input[id=titulo]")[0].value!=""&&$("input[id=subtitulo]")[0].value!=""&&$("input[id=texto]")[0].value!=""&&$("input[id=autor]")[0].value!=""){
        var tituloTexto = $("input[id=titulo]")[0].value;
        var subtituloTexto = $("input[id=subtitulo]")[0].value;
        var textoTexto = $("input[id=texto]")[0].value;
        var autorTexto = $("input[id=autor]")[0].value;

        var titulo = document.createElement("h3");
        titulo.innerHTML=tituloTexto;
        var subtitulo = document.createElement("p");
        subtitulo.innerHTML=subtituloTexto;
        var texto = document.createElement("p");
        texto.innerHTML=textoTexto;
        var autor = document.createElement("p");
        autor.innerHTML=autorTexto;
        var article = document.createElement("article");
        $(article).append(titulo, subtitulo, texto, autor);
        $("section:first-of-type").append(article);
      }
      else{
        alert("Completa todos los campos de la noticia.");
      }
      
    }
    
}