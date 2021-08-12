import React, { Component } from 'react';
import { InputNumber } from 'antd';

class _InputNumber extends Component {
  render() {
    let {
      style,
      ...rest
    } = this.props;
    if (!style) {
      style = {};
    }
    if (!style.width) {
      style.width = '100%';
    }
    return (
      <InputNumber {...rest} style={style} />
    );
  }
}

export default _InputNumber;