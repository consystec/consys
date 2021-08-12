import React, { Component } from 'react';
import MaskInput from 'consys/MaskInput';
import { getFormatPhone } from 'consys/FormattedPhone';

class PhoneInput extends Component {
  render() {
    const {
      format,
      clearValue,
      ...rest
    } = this.props;
    return (
      <MaskInput
        {...rest}
        clearValue={(rawValue) => rawValue ? rawValue.toString().replace(/[^0-9]/g, '').slice(0, 13) : rawValue}
        format={(cleanValue) => getFormatPhone(cleanValue)} />
    );
  }
}

export default PhoneInput;
