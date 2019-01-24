import React from "react";
import ReactDOM from "react-dom";
import Inputs from "./Inputs/index";

import "./styles.css";

function App() {
  return (
    <div className="App">
      <Inputs size={3} legend="Test" />
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
