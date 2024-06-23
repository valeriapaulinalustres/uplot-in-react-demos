import '../../../src/App.css'
import 'uplot/dist/uPlot.min.css';
import { useEffect, useState } from "react";
import Button from "../../components/Button";
import { useNavigate } from 'react-router-dom';
import MyBasicChartResize from "./chart_component/MyBasicChartResize";
import { data, series } from '../../utils/data';

export default function Resize () {

  const navigate = useNavigate();


      const handleBack = () => {
        navigate('/');
      };
    
     
    return (
      <div className="container">
        <div className="chartContainer">

        <MyBasicChartResize data={data} series={series} />
        </div>
        <Button classStyle={"arrowButton"} func={handleBack} text={"⬅️"}/>
      </div>
    )
}