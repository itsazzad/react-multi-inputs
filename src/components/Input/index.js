import React from "react";
import PropTypes from "prop-types";

import styles from "./styles.module.css";

export default class Input extends React.Component {
  state = {
    id: this.props.data.id,
    value: this.props.data.value
  };
  static propTypes = {
    data: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
    isLast: PropTypes.bool
  };
  static getDerivedStateFromProps(props, state) {
    if (props.data.id !== state.id) {
      return {
        id: props.data.id,
        value: props.data.value
      };
    }

    return null;
  }

  handleChange = (e: React.KeyboardEvent<HTMLInputElement>) => {
    this.setState({ value: e.target.value });
    this.props.onChange(this.props.data.id, e.target.value);
  };

  handleDelete = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    this.props.onDelete(this.props.data.id);
  };

  render() {
    const id = this.props.data.label
      ? `input-${this.props.data.id}-${this.props.data.label.replace(
          /[^0-9a-z]/gi,
          "-"
        )}`
      : `input-${this.props.data.id}`;
    return (
      <div className={styles.row}>
        <div className={styles["item-label"]}>
          {!this.props.isLast && (
            <label htmlFor={id} title={this.props.data.label}>
              {this.props.data.label}
            </label>
          )}
        </div>
        <div className={styles["item-control"]}>
          <input
            id={id}
            placeholder={this.props.data.placeholder}
            type="text"
            className={styles.input}
            value={this.state.value}
            onChange={this.handleChange}
          />
          {!this.props.isLast && (
            <span
              className={styles["input-suffix"]}
              onClick={this.handleDelete}
            >
              <i role="button">
                <svg
                  viewBox="64 64 896 896"
                  data-icon="close-circle"
                  width="1em"
                  height="1em"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm165.4 618.2l-66-.3L512 563.4l-99.3 118.4-66.1.3c-4.4 0-8-3.5-8-8 0-1.9.7-3.7 1.9-5.2l130.1-155L340.5 359a8.32 8.32 0 0 1-1.9-5.2c0-4.4 3.6-8 8-8l66.1.3L512 464.6l99.3-118.4 66-.3c4.4 0 8 3.5 8 8 0 1.9-.7 3.7-1.9 5.2L553.5 514l130 155c1.2 1.5 1.9 3.3 1.9 5.2 0 4.4-3.6 8-8 8z" />
                </svg>
              </i>
            </span>
          )}
        </div>
      </div>
    );
  }
}
