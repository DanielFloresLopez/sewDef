import xml.etree.ElementTree as ET

def prologoSVG(archivo, nombre):
    """ Escribe en el archivo de salida el prólogo del archivo SVG"""

    archivo.write('<?xml version="1.0" encoding="UTF-8"?>\n')
    archivo.write('<svg xmlns="http://www.w3.org/2000/svg" version="2.0">\n')
    archivo.write("<polyline points=")

def epilogoSVG(archivo):
    """ Escribe en el archivo de salida el epílogo del archivo SVG"""

    
    archivo.write("</svg>\n")
 

def getCoordenates(raiz, expresionXPath, archivo):
    
    # Recorrido de los elementos del árbol
    for hijo in raiz.findall(expresionXPath): # Expresión XPath
        archivo.write(hijo.attrib["latitud"]+","+hijo.attrib["longitud"]+",0.0\n")

def main():
    """Archivo .py hecho para convertir los .xml de las rutas en .kml

 
Daniel Flores López. Universidad de Oviedo

    """
    print(main.__doc__)
    miArchivoXML = input('Introduzca un archivo XML = ')

    try:
        arbol = ET.parse(miArchivoXML)
    except IOError:
        print ('No se encuentra el archivo ', miArchivoXML)
        exit()
    except ET.ParseError:
        print("Error procesando en el archivo XML = ", miArchivoXML)
        exit()

    
    numeroSalida  = input("Introduzca el numero de la ruta (*.kml) = ")

    raiz = arbol.getroot()

    


    try:
        salida = open("ruta" + numeroSalida +".kml",'w')
    except IOError:
        print ('No se puede crear el archivo ', "ruta" + numeroSalida + ".kml")
        exit()

    # Procesamiento y generación del archivo kml
    
    nLinea=0
    

    # Escribe la cabecera del archivo de salida
    prologoKML(salida, "ruta" + numeroSalida)

    getCoordenates(raiz, "*["+ numeroSalida +"]//*[@longitud]", salida)

    epilogoKML(salida)
    salida.close()

if __name__ == "__main__":
    main()