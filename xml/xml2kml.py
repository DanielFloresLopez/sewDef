import xml.etree.ElementTree as ET

def prologoKML(archivo, nombre):
    """ Escribe en el archivo de salida el prólogo del archivo KML"""

    archivo.write('<?xml version="1.0" encoding="UTF-8"?>\n')
    archivo.write('<kml xmlns="http://www.opengis.net/kml/2.2">\n')
    archivo.write("<Document>\n")
    archivo.write("<Placemark>\n")
    archivo.write("<name>"+nombre+"</name>\n")    
    archivo.write("<LineString>\n")
    #la etiqueta <extrude> extiende la línea hasta el suelo 
    archivo.write("<extrude>1</extrude>\n")
    # La etiqueta <tessellate> descompone la línea en porciones pequeñas
    archivo.write("<tessellate>1</tessellate>\n")
    archivo.write("<coordinates>\n")

def epilogoKML(archivo):
    """ Escribe en el archivo de salida el epílogo del archivo KML"""

    archivo.write("</coordinates>\n")
    archivo.write("<altitudeMode>relativeToGround</altitudeMode>\n")
    archivo.write("</LineString>\n")
    archivo.write("<Style> id='lineaRoja'>\n") 
    archivo.write("<LineStyle>\n") 
    archivo.write("<color>#ff0000ff</color>\n")
    archivo.write("<width>5</width>\n")
    archivo.write("</LineStyle>\n")
    archivo.write("</Style>\n")
    archivo.write("</Placemark>\n")
    archivo.write("</Document>\n")
    archivo.write("</kml>\n")
 

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