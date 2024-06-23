
import '../../../src/App.css'
import 'uplot/dist/uPlot.min.css';
import { useEffect, useState } from "react";
import Button from "../../components/Button";
import { useNavigate } from 'react-router-dom';
import { data, series } from "../../utils/data";
import MyMeasureChart from './chart_component/MyMeasureChart';

export default function Measure () {

  const navigate = useNavigate();



      const handleBack = () => {
        navigate('/');
      };
    

   
    return (
      <div className="container">
        <div className="chartContainer">

        <MyMeasureChart data={data} series={series}/>
        </div>
        <Button classStyle={"arrowButton"} func={handleBack} text={"⬅️"}/>
      </div>
    )
}