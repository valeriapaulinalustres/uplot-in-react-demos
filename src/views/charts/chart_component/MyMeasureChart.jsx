import { useEffect, useRef } from "react";
import uPlot from "uplot";

export default function MyMeasureChart({ data, series }) {
  const basicRef = useRef();

  let uBasic;



  function datumsPlugin() {
    let x1;
    let x2;
    let y1;
    let y2;

    const drawDatum = (u, x, y, color) => {
      let cx = u.valToPos(x, "x", true);
      let cy = u.valToPos(y, "y", true);
      let rad = 10;

      u.ctx.strokeStyle = color;
      u.ctx.beginPath();

      u.ctx.arc(cx, cy, rad, 0, 2 * Math.PI);

      u.ctx.moveTo(cx - rad - 5, cy);
      u.ctx.lineTo(cx + rad + 5, cy);
      u.ctx.moveTo(cx, cy - rad - 5);
      u.ctx.lineTo(cx, cy + rad + 5);

      u.ctx.stroke();
    };

    const clearDatums = (u) => {
      x1 = x2 = y1 = y2 = null;
      u.redraw();
    };

    const drawDelta = (u) => {
      let dxLabel = (x2 - x1).toPrecision(3);
      let dyLabel = (y2 - y1).toPrecision(3);
      let xPos = u.valToPos((x1 + x2) / 2, "x", true);
      let yPos = u.valToPos((y1 + y2) / 2, "y", true);
      u.ctx.textAlign = "center";
      u.ctx.textBaseline = "middle";
      u.ctx.fillStyle = "black";
      u.ctx.fillText(`dx: ${dxLabel}, dy: ${dyLabel}`, xPos, yPos);
    };

    return {
      hooks: {
        init: (u) => {
          console.log("Añadiendo listener de teclado");
          u.over.tabIndex = 0; // hace que el div, que es un elemento que no tiene focus como un input, pueda recibir el foco
          u.over.style.outlineWidth = 0; // quita el borde al div focusado


          u.over.addEventListener("wheel", (e) => {
            clearDatums(u);
          });

          u.over.addEventListener("dblclick", (e) => {
            clearDatums(u);
          });

          u.over.addEventListener(
            "keydown",
            (e) => {
              console.log('pasa por init', e.key)
              if (e.key == "Escape") {
                clearDatums(u);
              } else {
                const { left, top } = u.cursor;

                if (left >= 0 && top >= 0) {
                  if (e.key == "1") {
                    x1 = u.posToVal(left, "x");
                    y1 = u.posToVal(top, "y");
                    u.redraw();

                    const idx = u.cursor.idx;
              if (idx !== null) {
                const valX = u.data[0][idx];
                console.log("Valor de x:", valX);
              }
                  } else if (e.key == "2") {
                    x2 = u.posToVal(left, "x");
                    y2 = u.posToVal(top, "y");
                    u.redraw();
                  }
                }
              }
            },
            true
          );
        },
        draw: (u) => {
          if (x1 != null || x2 != null) {
            u.ctx.save();

            u.ctx.lineWidth = 2;

            if (x1 != null) {
              drawDatum(u, x1, y1, "blue");
            }

            if (x2 != null) {
              drawDatum(u, x2, y2, "orange");
              drawDelta(u);
            }

            u.ctx.restore();
          }
        },
      },
    };
  }

  const basicOpts = {
    width: 800,
    height: 500,

    title: "Measure",
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
    plugins: [datumsPlugin()],

    series: series,
  };

  useEffect(() => {

    
    if (basicRef.current) {
      // Inits chart
      uBasic = new uPlot(basicOpts, data, basicRef.current);

      console.log("Gráfico inicializado");

   // Establecer el foco en el contenedor del gráfico después de un pequeño retraso
   setTimeout(() => {
    const overElement = basicRef.current.querySelector('.u-over');
    if (overElement) {
      overElement.focus();

    } 
  }, 100);

      // Destroy chart when component is unmounted
      return () => uBasic.destroy();
    }
  }, [data, basicOpts]);

  return <div ref={basicRef}></div>;
}
