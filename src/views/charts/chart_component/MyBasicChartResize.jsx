import { useEffect, useRef, useState } from "react";
import uPlot from "uplot";

export default function MyBasicChartResize({ data, series }) {
  const basicRef = useRef();

  let uBasic;

  // Definir el estado para el tamaño
  const [size, setSize] = useState(getSize());

  // Definir la función getSize
  function getSize() {
    return {
      width: window.innerWidth - 100,
      height: window.innerHeight - 200,
    };
  }

  // Usar useEffect para añadir y limpiar el event listener
  useEffect(() => {
    const handleResize = () => {
      setSize(getSize());
    };

    window.addEventListener('resize', handleResize);

    // Limpiar el event listener en el desmontaje del componente
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

console.log('size', size)


  const basicOpts = {
    width: size.width,
    height: size.height,
    
    title: "Auto Resize Chart: try resizing your browser window",
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

    series: series,
  };

  useEffect(() => {
    if (basicRef.current) {
      // Inits chart
      uBasic = new uPlot(basicOpts, data, basicRef.current);

      uBasic.setSize(size)

      // Destroy chart when component is unmounted
      return () => uBasic.destroy();
    }
  }, [data, basicOpts, size]);

  return <div ref={basicRef} ></div>;
}
