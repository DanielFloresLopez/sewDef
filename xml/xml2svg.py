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

def getAlturaYDistancia(raiz, salida, numeroRuta, alturasSegunDistancia, distancias, maxima):
    alturaMaxima =0
    espacio = False
    contadorDistancia=10
    salida.write("\"")
    for hijo in raiz.findall("*["+str(int(numeroRuta))+"]//*[@longitud]"): 
        if "distanciahito" in hijo.attrib:
            contadorDistancia += int(float(hijo.attrib["distanciahito"])*10)
        if espacio:
            salida.write("\n")
        espacio = True
        salida.write(str(contadorDistancia)+","+ str(int(hijo.attrib["altitud"])/10))
        alturasSegunDistancia[str(contadorDistancia)] = int(hijo.attrib["altitud"])/10
        distancias.append(str(contadorDistancia))
        if int(hijo.attrib["altitud"])>int(alturaMaxima):
            alturaMaxima= int(int(hijo.attrib["altitud"])/10)
    salida.write("\n 10, "+ str(int(raiz.findall("*["+str(int(numeroRuta))+"]//*[@longitud]")[0].attrib["altitud"])/10))
    salida.write("\" \n")
    salida.write("style=\"fill:white;stroke:red;stroke-width:4\" />")
    maxima.append(alturaMaxima)

def getNombresHitos(raiz, salida, numeroRuta, distancias, maxima):
    contador = 0
    y = maxima[0] + 5
    for hijo in raiz.findall("*["+str(int(numeroRuta))+"]//*[@longitud]"): 
        salida.write("<text x=\""+str(distancias[contador])+"\" y=\""+ str(y) +
                         "\" style=\"writing-mode: tb; glyph-orientation-vertical: 0;\"> \n")
        if "nombrehito" in hijo.attrib:
            salida.write(hijo.attrib["nombrehito"])
        else:
            salida.write(hijo.text)
        salida.write("</text>")
        contador+=1

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

    alturasSegunDistancia = dict()
    distancias= list()
    alturaMaxima= list()

    raiz = arbol.getroot()

    


    try:
        salida = open("perfil" + numeroSalida +".svg",'w')
    except IOError:
        print ('No se puede crear el archivo ', "perfil" + numeroSalida + ".svg")
        exit()

    # Procesamiento y generación del archivo kml
    
    nLinea=0
    

    # Escribe la cabecera del archivo de salida
    prologoSVG(salida, "perfil" + numeroSalida)

    getAlturaYDistancia(raiz, salida, numeroSalida,alturasSegunDistancia,distancias, alturaMaxima)

    getNombresHitos(raiz, salida, numeroSalida, distancias, alturaMaxima)

    epilogoSVG(salida)
    salida.close()

if __name__ == "__main__":
    main()