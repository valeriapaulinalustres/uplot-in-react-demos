
import '../../../src/App.css'
import 'uplot/dist/uPlot.min.css';
import { useEffect, useState } from "react";
import Button from "../../components/Button";
import { useNavigate } from 'react-router-dom';
import { data, series } from "../../utils/data";
import MyGetXValueChart from "./chart_component/MyGetXValueChart";

export default function GetXValue () {

  const navigate = useNavigate();



      const handleBack = () => {
        navigate('/');
      };
    

   
    return (
      <div className="container">
        <div className="chartContainer">

        <MyGetXValueChart data={data} series={series}/>
        </div>
        <Button classStyle={"arrowButton"} func={handleBack} text={"⬅️"}/>
      </div>
    )
}