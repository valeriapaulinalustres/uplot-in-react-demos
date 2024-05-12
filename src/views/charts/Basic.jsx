import MyBasicChart from "./MyBasicChart";
import '../../../src/App.css'
import 'uplot/dist/uPlot.min.css';
import { useEffect, useState } from "react";
import Button from "../../components/Button";
import { useNavigate } from 'react-router-dom';

export default function Basic () {

  const navigate = useNavigate();

    const data =[
        [1715253022,1715253023,1715253024,1715253025,1715253026],
        [7,90,64,3,50],
        [89,59,706,66,105],
        [222,987,778,653,980]
    ]

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
      ]

      const handleBack = () => {
        navigate('/');
      };
    

   
    return (
      <div className="container">
        <div className="chartContainer">

        <MyBasicChart data={data} series={series}/>
        </div>
        <Button classStyle={"arrowButton"} func={handleBack} text={"⬅️"}/>
      </div>
    )
}