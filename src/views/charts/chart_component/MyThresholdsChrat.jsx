import { useEffect, useRef } from "react";
import uPlot from "uplot";

export default function MyThresholdsChart({ dataAxis, seriesAxis }) {
  const basicRef = useRef();

  let uBasic;

	function createAxis() {
		const axis = []
		for (let i = 0; i < seriesAxis.length; i++) {
			axis.push({
				show: true,
				scale: seriesAxis[i].scale,
				values: (u, v) =>
					v.map(
						(el) => +el.toFixed(2) + seriesAxis[i].scale
					),
				
				side: i === 0 ? 3 : 1, //1 significa a la derecha del gráfico, 0 a la izquierda
				grid: {
					show: false, //muestra líneas horizontales
					stroke: 'blue',
					width: 1,
				}, //líneas horizontales de la grilla
				label: seriesAxis[i].label,
				stroke: seriesAxis[i].stroke,
				ticks: {
					show: false, //QUEDA FIJO
					stroke: seriesAxis[i].stroke,
					width: 1, //alto del tick, QUEDA FIJO
					dash: [],
					size: 5, //QUEDA FIJO
				},
				labelSize: 20, //QUEDA FIJO
				labelFont: 'bold 12px Arial', //QUEDA FIJO
				font: '12px Arial', //QUEDA FIJO
				gap: 5, //distancia entre ticks y número. QUE QUEDE FIJO
				size: 90, //ancho de valor y ticks
				//space:30 //cantidad de números que muestra en el eje
			})
  }

		return axis
	}

  const axis = createAxis()

  const basicOpts = {
    width: 1000,
    height: 500,
    
    title: "Thresholds in 50m, 600l, 300°C",
    id: "U",
    class: "uplotChart",

    select: {
      over: false,
    },
    dist: 10,
    cursor: {
      x: true,
      y: true,
      points: {
        show: false,
      },
      drag: {
        setScale: true,
        setSelect: true,
        x: true,
        y: false,
      },
    },
    legend: {
      show: true,
    },

    series: seriesAxis,
    axes: [{}, ...axis],
    scales: {
			x: {
				time: false,
			}
    },
    hooks: {
      draw: [
        (u) => {
          const ctx = u.ctx;
          const { left, top, width, height } = u.bbox;

          // Función para dibujar líneas horizontales
          const drawHorizontalLine = (yValue, color, scale) => {
            const y = Math.round(u.valToPos(yValue, scale, true));
            ctx.strokeStyle = color;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(left, y);
            ctx.lineTo(left + width, y);
            ctx.stroke();
            
            
            console.log('draw----', 'y:', y, yValue, color, scale)
          };

          // Dibujar las líneas en los valores especificados
          drawHorizontalLine(50, seriesAxis[1].stroke, seriesAxis[1].scale);   // Línea para distancia a 50 m
          drawHorizontalLine(600, seriesAxis[2].stroke, seriesAxis[2].scale);  // Línea para volumen a 600 l
          drawHorizontalLine(300, seriesAxis[3].stroke, seriesAxis[3].scale);  // Línea para temperatura a 300 °C
        }
      ]
    }
  };

  useEffect(() => {
    if (basicRef.current) {
      // Inits chart
      uBasic = new uPlot(basicOpts, dataAxis, basicRef.current);


      // Destroy chart when component is unmounted
      return () => uBasic.destroy();
    }
  }, [dataAxis, basicOpts]);

  return <div ref={basicRef} ></div>;
}
