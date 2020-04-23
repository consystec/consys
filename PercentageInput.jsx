import ReactDOM from 'react-dom';
import React, { Component } from 'react';
import ValueMaskInput from 'consys/ValueMaskInput';

class PercentageInput extends Component {
  render() {
    return (
      <ValueMaskInput {...this.props}
        suffixMask="%"/>
    );
  }
}

export default PercentageInput;