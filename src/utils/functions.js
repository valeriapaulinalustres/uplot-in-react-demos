


  //Encuentra los valores de y de cada tag para un valor de x
 export function findYvalues (seriesArray, namesArray, x) {
  console.log('desde function',seriesArray, namesArray, x)
    //obtiene el índice del array de tiempos
const index = seriesArray[0].findIndex(el=>el === x)
//Busca el valor de cada tag para ese x
const yValues = []
for (let i = 1; i < seriesArray.length; i++) {
const value = seriesArray[i][index]
yValues.push(value)
}

//se forma el array de los tags con id y tag alias y su value
const newArray = namesArray.map((el, index)=> {return ({tag_id:el.id, tag_alias: el.label, y_value: yValues[index]}) })

console.log('nuevo ', newArray)
return newArray
}


//Para obtener el valor de una propiedad de un elemento en un array de objetos, teniendo el valor de una propiedad de otro elemento. NO TESTEADA
export function getObjValue (array,a,b,property) {
const index = array.findIndex(el=>el[a] === b)
return array[index][property]
}


//Para pasar de color hexagesimal a RGBA
export const hexToRgba = (hex, opacity) => {

  //Quita el #
  if (hex.startsWith('#')) {
    hex = hex.slice(1);
}

let r = 0, g = 0, b = 0;
if (hex.length === 3) {
    r = parseInt(hex[0] + hex[0], 16);
    g = parseInt(hex[1] + hex[1], 16);
    b = parseInt(hex[2] + hex[2], 16);
} else if (hex.length === 6) {
    r = parseInt(hex[0] + hex[1], 16);
    g = parseInt(hex[2] + hex[3], 16);
    b = parseInt(hex[4] + hex[5], 16);
}
console.error('color',`rgba(${r}, ${g}, ${b}, ${opacity})`)
return `rgba(${r}, ${g}, ${b}, ${opacity})`;
};

//Obtener el color del objeto situado x índices atrás, o en el primer flag que encuentre hacia atrás
export function getPreviousFlagColor (actualIndex, backNumber, array) {

		let prevColor

		for (let i = actualIndex - backNumber; i >= 0; i--) {
			if (array[i].type === 'flag') {
				prevColor = array[i].color
				break // Rompe el bucle una vez encontrado el primer 'flag'
			}
		}

return prevColor

}
