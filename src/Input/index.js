import React from "react";
import PropTypes from "prop-types";

import "./styles.css";

export default class Input extends React.Component {
  static propTypes = {
    id: PropTypes.string.isRequired,
    label: PropTypes.string,
    value: PropTypes.string,
    maxLength: PropTypes.number,
    disabled: PropTypes.bool,
    defaultValue: PropTypes.any,
    className: PropTypes.string,
    addonBefore: PropTypes.node,
    addonAfter: PropTypes.node,
    prefixCls: PropTypes.string,
    onPressEnter: PropTypes.func,
    onKeyDown: PropTypes.func,
    onKeyUp: PropTypes.func,
    onFocus: PropTypes.func,
    onBlur: PropTypes.func,
    prefix: PropTypes.node,
    suffix: PropTypes.node,
    allowClear: PropTypes.bool
  };

  static defaultProps = {
    label: "test attribute"
  };

  render() {
    const id = this.props.label
      ? `input-${this.props.id}-${this.props.label.replace(/[^0-9a-z]/gi, "-")}`
      : `input-${this.props.id}`;
    return (
      <div className="row">
        <div className="item-label">
          {this.props.label && (
            <label htmlFor={id} title={this.props.label}>
              {this.props.label}
            </label>
          )}
        </div>
        <div className="item-control">
          <span class="input-affix-wrapper">
            <input
              id={id}
              placeholder={this.props.label}
              type="text"
              class="input"
              value={this.props.value}
            />
            <span class="input-suffix">
              <i role="button" class="input-clear-icon">
                <svg
                  viewBox="64 64 896 896"
                  class=""
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
          </span>
        </div>
      </div>
    );
  }
}
