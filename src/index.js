import React from "react";
import ReactDOM from "react-dom";
import uniqid from "uniqid";
import PropTypes from "prop-types";

import Inputs from "./components/Inputs/index";
import { generateInputData } from "./components/_util/index";

import "./styles.css";

const sizeORinputs = () => ({
  size: Math.random() >= 0.5 ? Math.floor(Math.random() * 4) : undefined,
  inputsSize: Math.random() >= 0.5 ? Math.floor(Math.random() * 2) : undefined
});
const init = () => {
  return {
    id: uniqid(),
    legend: uniqid(),
    inputs: sizeORinputs().inputsSize
      ? generateInputData(sizeORinputs().inputsSize)
      : undefined,
    size: sizeORinputs().size,
    multiInputData: null
  };
};
class App extends React.Component {
  state = {
    ...init(),
    multiInputs: null
  };

  onChange = data => {
    this.setState({
      multiInputData: data
    });
  };
  onSave = () => {
    console.error(this.state.multiInputData);
    alert(JSON.stringify(this.state.multiInputData));
  };
  onCancel = () => {
    this.setState(init());
  };
  render() {
    return (
      <div className="App">
        <section>
          <button type="button" className="btn" onClick={this.onCancel}>
            <span>Cancel</span>
          </button>
          <button
            type="submit"
            className="btn btn-primary"
            onClick={this.onSave}
          >
            <span>Save</span>
          </button>
        </section>
        <hr />
        <Inputs
          id={this.state.id} //For detecting changes
          legend={this.state.legend}
          size={this.state.size}
          inputs={this.state.inputs}
          onChange={this.onChange}
        />
      </div>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
