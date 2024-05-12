import { useState } from "react";
import MyBrushChart from "./MyBrushChart";
import MyZoomedChart from "./MyZoomedChart";
import Button from "../../components/Button";
import { useNavigate } from "react-router-dom";

export default function Brush() {
  const data = [
    [1, 2, 3, 4, 5],
    [7, 9, 6, 3, 4],
    [89, 87, 65, 66, 45],
    [222, 987, 778, 653, 980],
  ];
  
  const [scaleFromBrush, setScaleFromBrush] = useState(undefined); //guarda desde brush el valor de la selección para luego escalar en zoomed 
  const [windowMax, setWindowMax] = useState(data[0][data[0].length - 1]); //valor máximo de la selección
  const [windowMin, setWindowMin] = useState(data[0][0]); //valor mínimo de la selección


  const series = [
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
  ];

  const navigate = useNavigate()

  const handleBack = () => {
    navigate('/');
  };

  return (
    <div className="container">
      <div className="chartContainer">

      <MyZoomedChart
        data={data}
        series={series}
        scaleFromBrush={scaleFromBrush}
      />
      </div>
      <div className="chartContainer"> 
      <MyBrushChart
        data={data}
        series={series}
        setScaleFromBrush={setScaleFromBrush}

        windowMax={windowMax}
        windowMin={windowMin}
        setWindowMax={setWindowMax}
        setWindowMin={setWindowMin}
     
      />
      </div>
      <Button classStyle={"arrowButton"} func={handleBack} text={"⬅️"}/>
    </div>
  );
}
