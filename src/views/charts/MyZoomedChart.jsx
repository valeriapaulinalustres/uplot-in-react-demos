import { useEffect, useRef } from "react";
import uPlot from "uplot";

export default function MyZoomeduZoomed({ data, series, scaleFromBrush }) {
  const zoomedRef = useRef();

  let uZoomed;


  const basicOpts = {
    width: 800,
    height: 200,
    title: "Zoomed Chart",
    id: "U",
    class: "uplotuZoomed",

    select: {
      over: false,
    },
    dist: 10,
    cursor: {
      x: false, //muestra la pluma
      y: false, //muestra la pluma
      points: {
        show: false,
      },
      drag: {

        x: false, //hace zoom
        y: false, //hace zoom
      },
    },
    legend: {
      show: true,
    },

    series: series,

    scales: {
      x:{
          time: false,
      }
  },
    
  };

  useEffect(() => {
    if (zoomedRef.current) {
      // Inits uZoomed
      uZoomed = new uPlot(basicOpts, data, zoomedRef.current);

      if (uZoomed && scaleFromBrush) {
        uZoomed.setScale('x', scaleFromBrush)
    }

      // Destroy uZoomed when component is unmounted
      return () => uZoomed.destroy();
    }
  }, [data, basicOpts, scaleFromBrush]);

  return <div ref={zoomedRef} ></div>;
}
