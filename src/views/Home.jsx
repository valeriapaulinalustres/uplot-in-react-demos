import { Link } from "react-router-dom";
import "../../src/App.css";
import Button from "../components/Button";
import { useState } from "react";

export default function Home() {
  // Estado para controlar el valor del select
  const [selectedValue, setSelectedValue] = useState('option2'); // Valor por defecto

  // Función para manejar el cambio en el select
  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };

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
        <Link to="/resize">
          <Button text={"Auto Resize Chart"} classStyle={"button"}/>
        </Link>
        <Link to="/get-x-value">
          <Button text={"Get X Value"} classStyle={"button"}/>
        </Link>
        <Link to="/measure">
          <Button text={"Measure"} classStyle={"button"}/>
        </Link>
        <Link to="/flags">
          <Button text={"Flags"} classStyle={"button"}/>
        </Link>
        <Link to="/thresholds">
          <Button text={"Thresholds"} classStyle={"button"}/>
        </Link>
      </div>
      <div>
      <label htmlFor="controlled-select">Choose an option:</label>
      {/* <select
        id="controlled-select"
        value={selectedValue}
        onChange={handleChange}
      >
        <option value="option1">Option 1</option>
        <option value="option2">Option 2</option>
        <option value="option3">Option 3</option>
      </select> */}
    </div>
    </div>
  );
}
