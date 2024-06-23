import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./views/Home";
import Basic from "./views/charts/Basic";
import RealTime from "./views/charts/RealTime";
import Brush from "./views/charts/Brush";
import Resize from "./views/charts/Resize";
import GetXValue from "./views/charts/GetXValue";
import Measure from "./views/charts/Measure";
import Flags from "./views/charts/Flags";
import Thresholds from "./views/charts/Thresholds";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" Component={Home}/>
          <Route path="/basic" Component={Basic}/>
          <Route path="/basic-real-time" Component={RealTime}/>
          <Route path="/brush" Component={Brush}/>
          <Route path="/resize" Component={Resize}/>
          <Route path="/get-x-value" Component={GetXValue}/>
          <Route path="/measure" Component={Measure}/>
          <Route path="/flags" Component={Flags}/>
          <Route path="/thresholds" Component={Thresholds}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
