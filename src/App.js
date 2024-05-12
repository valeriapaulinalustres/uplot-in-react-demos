import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./views/Home";
import Basic from "./views/charts/Basic";
import RealTime from "./views/charts/RealTime";
import Brush from "./views/charts/Brush";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" Component={Home}/>
          <Route path="/basic" Component={Basic}/>
          <Route path="/basic-real-time" Component={RealTime}/>
          <Route path="/brush" Component={Brush}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
