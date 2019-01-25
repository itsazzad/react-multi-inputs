import React from "react";
import PropTypes from "prop-types";
import update from "immutability-helper";
import uniqid from "uniqid";

import Input from "../Input/index";
import { generateInputData } from "../_util/index";

import styles from "./styles.module.css";

function getInputData(options) {
  let data = [];
  if (Array.isArray(options.inputs)) {
    data = options.inputs;
  } else {
    data = generateInputData(options.size);
  }
  data.push(generateInputData(1, true)[0]);
  return data;
}

export default class Inputs extends React.Component {
  state = {
    id: this.props.id,
    legend: this.props.legend,
    data: getInputData({
      inputs: this.props.inputs,
      size: this.props.size
    })
  };

  static propTypes = {
    id: PropTypes.string.isRequired,
    legend: PropTypes.string,
    size: PropTypes.number, //inputs will get precedence over size
    inputs: PropTypes.array, //inputs will get precedence over size
    onChange: PropTypes.func
  };

  static defaultProps = {
    legend: uniqid()
  };

  static getDerivedStateFromProps(props, state) {
    if (props.id !== state.id) {
      return {
        id: props.id,
        legend: props.legend,
        data: getInputData({
          inputs: props.inputs,
          size: props.size
        })
      };
    }

    return null;
  }
  componentDidMount() {
    this.onChangeCallback();
  }
  componentDidUpdate(prevProps) {
    if (this.props.id !== prevProps.id) {
      this.onChangeCallback();
    }
  }

  onChangeCallback() {
    this.props.onChange &&
      this.props.onChange(
        update(this.state.data, { $splice: [[this.state.data.length - 1, 1]] })
      );
  }

  inputs() {
    return this.state.data.map((input, i) => {
      return (
        <Input
          key={i.toString()}
          data={input}
          onChange={this.onChange}
          onDelete={this.onDelete}
          isLast={this.state.data.length === i + 1}
        />
      );
    });
  }

  onChange = (id, value) => {
    this.setState(
      (state, props) => {
        const index = state.data.findIndex(input => input.id === id);

        const data = update(state.data, {
          [index]: { value: { $set: value } }
        });
        if (state.data.length === index + 1 && state.data[index].value === "") {
          data.push(generateInputData(1, true)[0]); //push in
        }
        return { data };
      },
      () => {
        this.onChangeCallback();
      }
    );
  };

  onDelete = id => {
    this.setState(
      (state, props) => {
        const index = state.data.findIndex(input => input.id === id);
        const data = update(state.data, { $splice: [[index, 1]] });

        return { data };
      },
      () => {
        this.onChangeCallback();
      }
    );
  };

  render() {
    return (
      <section className={styles["box"]}>
        <div className={styles["box-title"]}>
          {`${this.props.legend}-size:${this.props.size}-inputs:${this.props
            .inputs && this.props.inputs.length}`}
        </div>
        <div className={styles["box-content"]}>{this.inputs()}</div>
      </section>
    );
  }
}
