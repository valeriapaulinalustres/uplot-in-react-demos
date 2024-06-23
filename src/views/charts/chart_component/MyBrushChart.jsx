import { useEffect, useRef } from "react";
import uPlot from "uplot";

export default function MyBrushChart({
  data,
  series,
  setScaleFromBrush,
  windowMax,
  windowMin,
  setWindowMax,
  setWindowMin,
}) {
  const brushRef = useRef();

  let uBrush;
  const minMax = { min: null, max: null };

  const basicOpts = {
    width: 800,
    height: 100,
    title: "Brush Chart",
    id: "U",
    class: "brushChart",

    cursor: {
      x: false,
      y: false,
      points: {
        show: false,
      },
      drag: {
        setScale: false,
        setSelect: true,
        x: true,
        y: false,
      },
    },
    legend: {
      show: false,
    },
    scales: {
      x: {
        time: false, //transforma los valores de x en tiempo
      },
    },

    series: series,

    hooks: {
      ready: [
        //se ejecuta luego de que el chart está renderizado en el dom y pinta toda la selección inicial
        (uBrush) => {
          let left = Math.round(uBrush.valToPos(windowMin, "x"));
          let width = Math.round(uBrush.valToPos(windowMax, "x")) - left;
          let height = uBrush.bbox.height / devicePixelRatio;

          uBrush.setSelect({ left, width, height }, false); //setea la selección al inicio

        },
      ],
      setSelect: [
        //se ejecuta cuando se completa una selección para escalar el Zoomed Chart
        (uBrush) => {
          zoom(uBrush.select.left, uBrush.select.width);
        },
      ],
    },
  };

  function zoom(newLft, newWid) {
    //Sirve para escalar el zoomed chart
    minMax.min = uBrush.posToVal(newLft, "x");
    minMax.max = uBrush.posToVal(newLft + newWid, "x");

    setScaleFromBrush(minMax);
    setWindowMax(uBrush.posToVal(newLft + newWid, "x")); //gracias a este y al de abajo, al hacer selección la misma no vuelve al valor inicial
    setWindowMin(uBrush.posToVal(newLft, "x"));
  }

  useEffect(() => {
    if (brushRef.current) {
      // Inits chart
      uBrush = new uPlot(basicOpts, data, brushRef.current);

      // Destroy chart when component is unmounted
      return () => uBrush.destroy();
    }
  }, [data, basicOpts]);


  return <div ref={brushRef} ></div>;
}
