import React, { Component } from 'react';
import MaskInput from 'consys/MaskInput';
import StringMask from 'string-mask';
const RgPattern = new StringMask('000000000');

export default class RgInput extends Component {
  render() {
    const { ...rest } = this.props;
    return (
      <MaskInput {...rest}
        clearValue={(rawValue) => rawValue.replace(/[^\d]/g, '').slice(0, 9)}
        format={(cleanValue) => (RgPattern.apply(cleanValue) || '').trim().replace(/[^0-9]$/, '')} />
    );
  }
}
