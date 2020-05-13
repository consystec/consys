import React, { Component } from 'react';
import MaskInput from 'consys/MaskInput';
var StringMask = require('string-mask');
var cepMask = new StringMask('00000-000');

class CepInput extends Component {
  render() {
    const {
      format,
      clearValue,
      ...rest
    } = this.props;
    return (
      <MaskInput {...rest}
        clearValue={(rawValue) => rawValue.toString().replace(/[^0-9]/g, '').slice(0, 8)}
        format={(cleanValue) => (cepMask.apply(cleanValue) || '').replace(/[^0-9]$/, '')} />
    );
  }
}

export default CepInput;