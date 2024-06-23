import MyBasicChart from "./chart_component/MyBasicChart";
import '../../../src/App.css'
import 'uplot/dist/uPlot.min.css';
import Button from "../../components/Button";
import { useNavigate } from 'react-router-dom';
import { dataAxis, seriesAxis,  } from "../../utils/data";
import MyThresholdsChart from "./chart_component/MyThresholdsChrat";

export default function Thresholds () {

  const navigate = useNavigate();

   
      const handleBack = () => {
        navigate('/');
      };
    

   
    return (
      <div className="container">
        <div className="chartContainer">

        <MyThresholdsChart dataAxis={dataAxis} seriesAxis={seriesAxis}/>
        </div>
        <Button classStyle={"arrowButton"} func={handleBack} text={"⬅️"}/>
      </div>
    )
}