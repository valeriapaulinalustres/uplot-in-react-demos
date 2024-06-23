
import '../../../src/App.css'
import 'uplot/dist/uPlot.min.css';
import Button from "../../components/Button";
import { useNavigate } from 'react-router-dom';
import { largeData, series } from "../../utils/data";
import MyFlagsChart from "./chart_component/MyFlagsChart";

export default function Flags () {

  const navigate = useNavigate();

   
      const handleBack = () => {
        navigate('/');
      };
    

   
    return (
      <div className="container">
        <div className="chartContainer">

        <MyFlagsChart data={largeData} series={series}/>
        </div>
        <Button classStyle={"arrowButton"} func={handleBack} text={"⬅️"}/>
      </div>
    )
}