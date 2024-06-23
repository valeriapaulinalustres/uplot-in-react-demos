import { useEffect, useRef, useState } from "react";
import uPlot from "uplot";
import { getPreviousFlagColor, hexToRgba } from "../../../utils/functions";
import ModalWindow from "../../../components/ModalWindow";
import FlagsModal from "./FlagsModal";

export default function MyFlagsChart({ data, series }) {
  const basicRef = useRef();
  const [startX, setStartX] = useState(null);

  let uBasic;

  const [coordinatesSelectedUpper, setCoordinatesSelectedUpper] = useState([]);
  const [actualXselected, setActualXselected] = useState("");
  const [modalFlagsOn, setModalFlagsOn] = useState(false);

  function putAlarm(type, x) {
    //Se crea el nuevo objeto con los valores seleccionados en la ventana
    const newObj = {
      x: x,
      color: type === "a" ? "#e74c3c" : "#e67e22",
      label: type === "a" ? "ALARM" : "WARN",
      type: type === "a" ? "alarm" : "warning",
    };

    console.log("newobj", newObj);

    //se crea copia de coordinatesSelectedUpper, que tiene todos los objetos, y se le pushea este último
    const coordinatesSelectedCopy = coordinatesSelectedUpper.slice();
    coordinatesSelectedCopy.push(newObj);

    //Se ordena el nuevo array de objetos según el valor de las x
    coordinatesSelectedCopy.sort((a, b) => a.x - b.x);

    setCoordinatesSelectedUpper(coordinatesSelectedCopy);
  }

  // Plugin para manejar el evento de teclado y capturar el valor x
  function getXvalue() {
    return {
      hooks: {
        init: (u) => {
          const handleKeyDown = (e) => {
            if (e.key === "f") {
              //poner flag
              const idx = u.cursor.idx;
              if (idx !== null) {
                const valX = u.data[0][idx];
                //   setCoordinatesSelectedUpper(prevCoordinates => {
                // 	const newCoordinates = [...prevCoordinates, valX];
                // 	return newCoordinates.sort((a, b) => a - b);
                //   });
                setActualXselected(valX);

                setModalFlagsOn(true);
              }
            } else if (e.key === "a") {
              //poner alarm
              const idx = u.cursor.idx;
              if (idx !== null) {
                const valX = u.data[0][idx];
                putAlarm("a", valX);
              }
            } else if (e.key === "w") {
              //poner warning
              const idx = u.cursor.idx;
              if (idx !== null) {
                const valX = u.data[0][idx];
                putAlarm("w", valX);
              }
            }
          };

          u.over.tabIndex = 1; // Assign unique tabIndex for focus
          u.over.style.outlineWidth = 0;

          //Pone focus en el chart que tiene el cursor por encima, y cuando se va, saca el focus
          u.over.addEventListener("mouseenter", () => {
            u.over.focus();
            window.addEventListener("keydown", handleKeyDown);
          });

          u.over.addEventListener("mouseleave", () => {
            u.over.blur();
            window.removeEventListener("keydown", handleKeyDown);
          });
          // Limpiar eventos de teclado en el desmontaje del gráfico
          return () => {
            window.removeEventListener("keydown", handleKeyDown);
          };
        },
      },
    };
  }

  function getNextXvalue(array, x, u) {
    const index = array.findIndex((el) => el.x === x);
    if (index === array.length - 1) {
      return u.data[0][u.data[0].length - 1];
    } else {
      return array[index + 1].x;
    }
  }

  //Dibuja las banderas

  function createFlag(u) {
    if (coordinatesSelectedUpper.length !== 0) {
      const ctx = u.ctx;
      const { top, height } = u.bbox;

      for (let i = 0; i < coordinatesSelectedUpper.length; i++) {
        const el = coordinatesSelectedUpper[i];

        // --- Para dibujar alarm y warning ---

        if (el.type === "alarm" || el.type === "warning") {
          // Convertir a coordenadas del canvas
          const x1 = u.valToPos(el.x, "x", true);
          const xEnd = u.valToPos(
            getNextXvalue(coordinatesSelectedUpper, el.x, u),
            "x",
            true
          );

          const index = coordinatesSelectedUpper.findIndex(
            (element) => element.x === el.x
          );

          //Si isThereApreviosFlag es undefined, significa que no hay activities delante de esta alarm/warn, y no hay que pintarle el rectángulo
         
          const prevColor = getPreviousFlagColor(
            index,
            1,
            coordinatesSelectedUpper
          );

          if (index !== 0 && prevColor) {
            //Si la alarm/warning no están en primer lugar hay que pintarles el rectángulo


            //Dibujar el rectángulo
            ctx.save();
            ctx.fillStyle = hexToRgba(prevColor, 0.1);
            ctx.fillRect(x1, top, xEnd - x1, height);
            ctx.restore();
          }

          // Dibujar la línea vertical
          ctx.save(); //Guarda el estado previo
          ctx.strokeStyle = el.color;
          ctx.beginPath();
          ctx.moveTo(x1, top);
          ctx.lineTo(x1, top + height);
          ctx.stroke(); //dibuja una línea
          ctx.restore(); //restaura a las configuraciones iniciales de canvas

          // Dibujar la etiqueta
          const labelWidth = 50; // ancho de la etiqueta
          const labelHeight = 20; // altura de la etiqueta
          const labelText = el.label; // texto de la etiqueta

          ctx.save();
          ctx.fillStyle = "white"; // color de relleno de la etiqueta
          ctx.strokeStyle = el.color; // color del borde de la etiqueta
          ctx.lineWidth = 2;

          // Calcular las coordenadas de la etiqueta
          const labelX = x1 - labelWidth / 2;
          const labelY = top + 1; // queda justo sobre el top del gráfico

          // Dibujar el rectángulo de la etiqueta
          ctx.fillRect(labelX, labelY, labelWidth, labelHeight);
          ctx.strokeRect(labelX, labelY, labelWidth, labelHeight);

          // Dibujar el texto de la etiqueta
          ctx.fillStyle = "black";
          ctx.textAlign = "center";
          ctx.textBaseline = "middle";
          ctx.fillText(labelText, x1, labelY + labelHeight / 2);

          ctx.restore();

          // --- Para dibujar flag ---
        } else if (el.type === "flag") {
          // Convertir coordinatesSelectedUpper y el último valor de x a coordenadas del lienzo
          const x1 = u.valToPos(el.x, "x", true);
          const xEnd = u.valToPos(
            getNextXvalue(coordinatesSelectedUpper, el.x, u),
            "x",
            true
          );

          //Dibujar el rectángulo
          ctx.save();
          ctx.fillStyle = hexToRgba(el.color, 0.1);
          ctx.fillRect(x1, top, xEnd - x1, height);
          ctx.restore();

          // Dibujar la línea vertical
          ctx.save(); //Guarda el estado previo
          ctx.strokeStyle = el.color;
          ctx.beginPath();
          ctx.moveTo(x1, top);
          ctx.lineTo(x1, top + height);
          ctx.stroke(); //dibuja una línea
          ctx.restore(); //restaura a las configuraciones iniciales de canvas

          // Dibujar la etiqueta
          const labelWidth = 50; // ancho de la etiqueta
          const labelHeight = 20; // altura de la etiqueta
          const labelText = el.label.slice(0, 7); // texto de la etiqueta, lo corta si tiene más de 7 caracteres para que no rebalse de la etiqueta

          ctx.save();
          ctx.fillStyle = "white"; // color de relleno de la etiqueta
          ctx.strokeStyle = el.color; // color del borde de la etiqueta
          ctx.lineWidth = 2;

          // Calcular las coordenadas de la etiqueta
          const labelX = x1 - labelWidth / 2;
          const labelY = top + 1; // queda justo sobre el top del gráfico

          // Dibujar el rectángulo de la etiqueta
          ctx.fillRect(labelX, labelY, labelWidth, labelHeight);
          ctx.strokeRect(labelX, labelY, labelWidth, labelHeight);

          // Dibujar el texto de la etiqueta
          ctx.fillStyle = "black";
          ctx.textAlign = "center";
          ctx.textBaseline = "middle";
          ctx.fillText(labelText, x1, labelY + labelHeight / 2);

          ctx.restore();
        }
      }
    }
  }

  const basicOpts = {
    width: 800,
    height: 500,
    title: "Press 'f' to place a period of activity, 'a' for alarm and 'w' for warning. Alarms and Warns are a vertical line, activities are rectangles",
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

    hooks: {
      draw: [
        (u) => {
          createFlag(u);
        },
      ],
    },

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
  };

  console.log('coordinates', coordinatesSelectedUpper)

  useEffect(() => {
    if (basicRef.current) {
      // Inits chart
      uBasic = new uPlot(basicOpts, data, basicRef.current);

      // Establecer el foco en el contenedor del gráfico después de un pequeño retraso
      setTimeout(() => {
        const overElement = basicRef.current.querySelector(".u-over");
        if (overElement) {
          overElement.focus();
        }
      }, 100);


      // Destroy chart when component is unmounted
      return () => uBasic.destroy();
    }
  }, [data, basicOpts, startX]);

  return (
    <>
      <div ref={basicRef}></div>
      {modalFlagsOn && (
        <ModalWindow>
          <FlagsModal
            coordinatesSelectedUpper={coordinatesSelectedUpper}
            setModalFlagsOn={setModalFlagsOn}
            actualXselected={actualXselected}
            setCoordinatesSelectedUpper={setCoordinatesSelectedUpper}
          />
        </ModalWindow>
      )}
    </>
  );
}
