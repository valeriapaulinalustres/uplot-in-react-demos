import { Link } from "react-router-dom";
import "../../src/App.css";
import Button from "../components/Button";

export default function Home() {
  return (
    <div className="home">
      <p>uPlot in React Demos</p>
      <div className="buttonsContainer">
        <Link to="/basic">
          <Button text={"Basic Chart"} classStyle={"button"}/>
        </Link>
        <Link to="/basic-real-time">
          <Button text={"Basic Real Time Chart"} classStyle={"button"}/>
        </Link>
        <Link to="/brush">
          <Button text={"Brush Chart"} classStyle={"button"}/>
        </Link>
      </div>
    </div>
  );
}
