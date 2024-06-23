import MyBasicChart from "./chart_component/MyBasicChart";
import "../../../src/App.css";
import "uplot/dist/uPlot.min.css";
import { useEffect, useState } from "react";
import Button from "../../components/Button";
import { useNavigate } from "react-router-dom";
import { series } from "../../utils/data";

export default function RealTime() {
  const [data, setData] = useState([[], [], [], []]);
  const [play, setPlay] = useState(true);


  const navigate = useNavigate();

  const handleBack = () => {
    navigate("/");
  };

  // Función para agregar un nuevo elemento a cada array
  function agregarElemento() {
    // Agregar tiempo Unix al primer array
    const now = Math.floor(Date.now() / 1000);
    setData((prevData) => {
      const newData = [...prevData];
      newData[0].push(now);

      // Para generar números entre 1000 y 2000
      const numero1 = Math.floor(Math.random() * (2000 - 1000 + 1)) + 1000;
      newData[1].push(numero1);
      // Para generar números entre 200 y 800
      const numero2 = Math.floor(Math.random() * (1100 - 100 + 1)) + 200;
      newData[2].push(numero2);
      // Para generar números entre 0 y 90
      const numero3 = Math.floor(Math.random() * (110 - 0 + 1)) + 0;
      newData[3].push(numero3);

      return newData;
    });
  }

  // Ejecutar la función agregarElemento() cada segundo
  useEffect(() => {
    const intervalId = setInterval(agregarElemento, 1000);
    return () => clearInterval(intervalId);
  }, []); // Se ejecuta solo una vez al montar el componente

  // -- end of chart configuration --/

  //New state for data in pause
  const [dataOnPause, setDataOnPause] = useState([]);

  //Handle Play and Pause
  function handlePause() {
    const dataCopy = JSON.parse(JSON.stringify(data)); // Realizar una copia profunda de data, porque si se hace setDataOnPause([...data]), dataOnPause tiene la misma referencia que data y se sigue actualizando en cada segundo
    setDataOnPause(dataCopy);
    setPlay(false);
  }

  function handlePlay() {
    setDataOnPause([]);
    setPlay(true);
  }

  console.log(dataOnPause);
  return (
    <div className="container">
      <div className="chartContainer">
        <MyBasicChart data={play ? data : dataOnPause} series={series} />
      </div>
      <div className="buttonsContainerRow">

      {play ? (
        <Button func={handlePause} text={"⏸️"} classStyle={"arrowButton"}/>
      ) : (
        <Button func={handlePlay} text={"▶️"} classStyle={"arrowButton"}/>
      )}
      <Button classStyle={"arrowButton"} func={handleBack} text={"⬅️"} />
      </div>
    </div>
  );
}
