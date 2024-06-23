export const data =[
    [1715253022,1715253023,1715253024,1715253025,1715253026],
    [7,90,64,3,50],
    [89,59,706,66,105],
    [222,987,778,653,980]
]

export const dataAxis =[
  [1,2,3,4,5],
  [7,90,64,3,50],
  [89,59,706,66,105],
  [222,987,778,653,980]
]

export const series = [
    {
      label: "x",
    },
    {
      label: "A",
      stroke: "red",
    },
    {
      label: "B",
      stroke: "yellow",
    },
    {
      label: "C",
      stroke: "green",
    },
  ]

  export const largeData =[
    [1715253022,1715253023,1715253024,1715253025,1715253026,1715253027,1715253028,1715253029,1715253030,1715253031],
    [7,90,64,3,50,55,68,58,8,56],
    [89,59,706,66,105,220,120,240,250,300],
    [222,987,778,653,980,500,600,700,550,788]
]

export const seriesAxis = [
  {
    label: "x",
  },
  {

				label: 'distance',
				stroke: 'red',
				width: 1, //ancho de la línea
				scale: 'm', //sirve para poner la escala en el eje
				value: (u, v) =>
					v == null ? null : v.toFixed(2) + 'm', //sirve para que adapte el valor de la escala en el eje. En toFixed van los decimales que acepta
				points: {
					size:10
				}
  },  
  {

				label: 'volume',
				stroke: 'green',
				width: 1, //ancho de la línea
				scale: 'l', //sirve para poner la escala en el eje
				value: (u, v) =>
					v == null ? null : v.toFixed(2) + 'l', //sirve para que adapte el valor de la escala en el eje. En toFixed van los decimales que acepta
				points: {
					size:10
				}
  },
  {

    label: 'temperature',
    stroke: 'yellow',
    width: 1, //ancho de la línea
    scale: '°C', //sirve para poner la escala en el eje
    value: (u, v) =>
      v == null ? null : v.toFixed(2) + '°C', //sirve para que adapte el valor de la escala en el eje. En toFixed van los decimales que acepta
    points: {
      size:10
    }
}
]


