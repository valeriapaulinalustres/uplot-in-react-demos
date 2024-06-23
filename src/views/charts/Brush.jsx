import { useState } from "react";
import MyBrushChart from "./chart_component/MyBrushChart";
import MyZoomedChart from "./chart_component/MyZoomedChart";
import Button from "../../components/Button";
import { useNavigate } from "react-router-dom";
import { data, series } from "../../utils/data";

export default function Brush() {

  
  const [scaleFromBrush, setScaleFromBrush] = useState(undefined); //guarda desde brush el valor de la selección para luego escalar en zoomed 
  const [windowMax, setWindowMax] = useState(data[0][data[0].length - 1]); //valor máximo de la selección
  const [windowMin, setWindowMin] = useState(data[0][0]); //valor mínimo de la selección


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
