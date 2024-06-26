import MyBasicChart from "./chart_component/MyBasicChart";
import '../../../src/App.css'
import 'uplot/dist/uPlot.min.css';
import Button from "../../components/Button";
import { useNavigate } from 'react-router-dom';
import { data, series } from "../../utils/data";

export default function Basic () {

  const navigate = useNavigate();

   
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