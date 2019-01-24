import React from "react";
import PropTypes from "prop-types";
import Input from "../Input/index";

import "./styles.css";

export default class Inputs extends React.Component {
  static propTypes = {
    size: PropTypes.number,
    legend: PropTypes.string
  };

  static defaultProps = {
    size: 1,
    legend: "Test"
  };

  inputs() {
    const rows = [];
    for (let i = 0; i < this.props.size; i++) {
      rows.push(<Input key={i.toString()} id={i.toString()} />);
    }
    return <React.Fragment>{rows}</React.Fragment>;
  }

  render() {
    return (
      <section className="box">
        <div className="box-title">
          {this.props.legend && this.props.legend}
        </div>
        <div className="box-content">{this.inputs()}</div>
      </section>
    );
  }
}
