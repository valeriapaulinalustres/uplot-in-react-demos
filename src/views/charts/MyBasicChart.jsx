import { useEffect, useRef } from "react";
import uPlot from "uplot";

export default function MyBasicChart({ data, series }) {
  const basicRef = useRef();

  let uBasic;

  const basicOpts = {
    width: 800,
    height: 200,
    title: "Basic Chart",
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

      // Destroy chart when component is unmounted
      return () => uBasic.destroy();
    }
  }, [data, basicOpts]);

  return <div ref={basicRef} className="myBasicChart"></div>;
}
