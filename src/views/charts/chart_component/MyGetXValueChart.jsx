import { useEffect, useRef, useState } from "react";
import uPlot from "uplot";

export default function MyGetXValueChart({ data, series }) {
  const basicRef = useRef();
  const [startX, setStartX] = useState(null);

  let uBasic;

  
  // function getX() {
  //   let x1;
  //   let x2;
  //   let y1;
  //   let y2;

  //   const drawDatum = (u, x, y, color) => {
  //     let cx = u.valToPos(x, "x", true);
  //     let cy = u.valToPos(y, "y", true);
  //     let rad = 10;

  //     u.ctx.strokeStyle = color;
  //     u.ctx.beginPath();

  //     u.ctx.arc(cx, cy, rad, 0, 2 * Math.PI);

  //     u.ctx.moveTo(cx - rad - 5, cy);
  //     u.ctx.lineTo(cx + rad + 5, cy);
  //     u.ctx.moveTo(cx, cy - rad - 5);
  //     u.ctx.lineTo(cx, cy + rad + 5);

  //     u.ctx.stroke();
  //   };

  //   const clearDatums = (u) => {
  //     x1 = x2 = y1 = y2 = null;
  //     u.redraw();
  //   };

  //   const drawDelta = (u) => {
  //     let dxLabel = (x2 - x1).toPrecision(3);
  //     let dyLabel = (y2 - y1).toPrecision(3);
  //     let xPos = u.valToPos((x1 + x2) / 2, "x", true);
  //     let yPos = u.valToPos((y1 + y2) / 2, "y", true);
  //     u.ctx.textAlign = "center";
  //     u.ctx.textBaseline = "middle";
  //     u.ctx.fillStyle = "black";
  //     u.ctx.fillText(`dx: ${dxLabel}, dy: ${dyLabel}`, xPos, yPos);
  //   };

  //   return {
  //     hooks: {
  //       init: (u) => {
  //         console.log("Añadiendo listener de teclado");
  //         u.over.tabIndex = 0; // hace que el div, que es un elemento que no tiene focus como un input, pueda recibir el foco
  //         u.over.style.outlineWidth = 0; // quita el borde al div focusado


  //         u.over.addEventListener("wheel", (e) => {
  //           clearDatums(u);
  //         });

  //         u.over.addEventListener("dblclick", (e) => {
  //           clearDatums(u);
  //         });

  //         u.over.addEventListener(
  //           "keydown",
  //           (e) => {
  //             console.log('pasa por init', e.key)
  //             if (e.key == "Escape") {
  //               clearDatums(u);
  //             } else {
  //               const { left, top } = u.cursor;

  //               if (left >= 0 && top >= 0) {
  //                 if (e.key == "1") {
  //                   x1 = u.posToVal(left, "x");
  //                   y1 = u.posToVal(top, "y");
  //                   u.redraw();

  //                   const idx = u.cursor.idx;
  //             if (idx !== null) {
  //               const valX = u.data[0][idx];
  //               console.log("Valor de x:", valX);
  //             }
  //                 } else if (e.key == "2") {
  //                   x2 = u.posToVal(left, "x");
  //                   y2 = u.posToVal(top, "y");
  //                   u.redraw();
  //                 }
  //               }
  //             }
  //           },
  //           true
  //         );
  //       },
  //       draw: (u) => {
  //         if (x1 != null || x2 != null) {
  //           u.ctx.save();

  //           u.ctx.lineWidth = 2;

  //           if (x1 != null) {
  //             drawDatum(u, x1, y1, "blue");
  //           }

  //           if (x2 != null) {
  //             drawDatum(u, x2, y2, "orange");
  //             drawDelta(u);
  //           }

  //           u.ctx.restore();
  //         }
  //       },
  //     },
  //   };
  // }

// Plugin para manejar el evento de teclado y capturar el valor x
function getXvalue() {
  return {
    hooks: {
      init: (u) => {
        u.over.tabIndex = 0;
        u.over.style.outlineWidth = 0;

        u.over.addEventListener("keydown", (e) => {
          if (e.key === "1") {
            const idx = u.cursor.idx;
            if (idx !== null) {
              const valX = u.data[0][idx];
              console.log("Valor de x:", valX);
              setStartX(valX);
            }
          }
        });
      },
     
    },
  };
}


  const basicOpts = {
    width: 800,
    height: 500,
    title: "Gex X Value Chart",
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
    plugins: [getXvalue()],

    series: series,
    // bands: startX !== null ? [
    //   {
    //     series: [0],
    //     fill: "rgba(255, 255, 0, 0.3)",
    //     from: (self, fromIdx, toIdx) => {
    //       // Convert startX to index
    //       const startIndex = self.data[0].findIndex(x => x >= startX);
    //       return {
    //         left: self.valToPos(startX, 'x'),
    //         right: self.valToPos(self.data[0][self.data[0].length - 1], 'x'),
    //       };
    //     }
    //   }
    // ] : [],
// bands:[
//   {
//     //show: true,
//     //dir: 1,
//     //fill: "red",
//     series: [4,1]
//   }
// ]
hooks: {
  draw: [
    (u) => {
      if (startX !== null) {
        const ctx = u.ctx;
        const { top, height } = u.bbox;

        // Convertir startX y el último valor de x a coordenadas del lienzo
        const x1 = u.valToPos(startX, 'x', true);
        const xEnd = u.valToPos(u.data[0][u.data[0].length - 1], 'x', true);

        //Dibujar el rectángulo
        ctx.save();
        ctx.fillStyle = 'rgba(0, 0, 255, 0.1)';
        ctx.fillRect(x1, top, xEnd - x1, height);
        ctx.restore();

         // Dibujar la línea vertical
         ctx.save(); //Guarda el estado previo
         ctx.strokeStyle = 'red';
         ctx.beginPath();
         ctx.moveTo(x1, top);
         ctx.lineTo(x1, top + height);
         ctx.stroke(); //dibuja una línea
         ctx.restore(); //restaura a las configuraciones iniciales de canvas

          // Dibujar la etiqueta
          const labelWidth = 50; // ancho de la etiqueta
          const labelHeight = 20; // altura de la etiqueta
          const labelText = "Label"; // texto de la etiqueta

          ctx.save();
          ctx.fillStyle = 'yellow'; // color de relleno de la etiqueta
          ctx.strokeStyle = 'black'; // color del borde de la etiqueta
          ctx.lineWidth = 2;

          // Calcular las coordenadas de la etiqueta
          const labelX = x1 - labelWidth / 2;
          const labelY = top; // 5px de margen arriba del gráfico

          // Dibujar el rectángulo de la etiqueta
          ctx.fillRect(labelX, labelY, labelWidth, labelHeight);
          ctx.strokeRect(labelX, labelY, labelWidth, labelHeight);

          // Dibujar el texto de la etiqueta
          ctx.fillStyle = 'black';
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText(labelText, x1, labelY + labelHeight / 2);

          ctx.restore();
      }
    },
  ],
},
  };

  useEffect(() => {

    
    if (basicRef.current) {
      // Inits chart
      uBasic = new uPlot(basicOpts, data, basicRef.current);


   // Establecer el foco en el contenedor del gráfico después de un pequeño retraso
   setTimeout(() => {
    const overElement = basicRef.current.querySelector('.u-over');
    if (overElement) {
      overElement.focus();

    } 
  }, 100);


  // if (startX !== null) {
  //   console.log('pasa por crear band')
  //   // Añadir la banda al gráfico
  //   uBasic.addBand({
  //     fill: "rgba(255, 255, 0, 0.3)",
  //     from: startX,
  //     to: data[0][data[0].length - 1],

  //   series: [2,5],
  //   dir:1,
  //   });
  //   // Redibujar el gráfico para mostrar la banda
  //   uBasic.redraw();
  //}

      // Destroy chart when component is unmounted
      return () => uBasic.destroy();
    }
  }, [data, basicOpts, startX]);



  return <div ref={basicRef}></div>;
}
