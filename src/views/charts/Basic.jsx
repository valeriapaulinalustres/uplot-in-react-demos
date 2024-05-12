import MyBasicChart from "./MyBasicChart";
import '../../../src/App.css'
import 'uplot/dist/uPlot.min.css';
import { useEffect, useState } from "react";

export default function Basic () {


    const data =[
        [1715253022,1715253023,1715253024,1715253025,1715253026],
        [7,9,6,3,4],
        [89,87,65,66,45],
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

   
    return (
        <MyBasicChart data={data} series={series} className="basic"/>
    )
}