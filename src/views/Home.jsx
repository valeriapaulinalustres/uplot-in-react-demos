import { Link } from "react-router-dom";
import "../../src/App.css";
import Button from "../components/Button";

export default function Home() {
  return (
    <div className="home">
      <p>uPlot in React Demos</p>
      <div className="buttons-container">
        <Link to="/basic">
          <Button text={"Basic Chart"} />
        </Link>
        <Link to="/basic-real-time">
          <Button text={"Basic Real Time Chart"} />
        </Link>
        <Link to="/brush">
          <Button text={"Brush Chart"} />
        </Link>
      </div>
    </div>
  );
}
