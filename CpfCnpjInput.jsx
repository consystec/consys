import React, { Component } from 'react';
import MaskInput from 'consys/MaskInput';
import StringMask from 'string-mask';
import PropTypes from 'prop-types';

const cnpjPattern = new StringMask('00.000.000\/0000-00');
const cpfPattern = new StringMask('000.000.000-00');

class CpfCnpjInput extends Component {
  constructor(){
    super();
    this.format = this.format.bind(this);
  }

  format(cleanValue){
    const {type} = this.props;
    var formatedValue;

    if (typeof cleanValue == 'undefined'){
      return;
    }

    if (type) {
      if (type.toUpperCase() == 'CNPJ') {
        formatedValue = cnpjPattern.apply(cleanValue);
      } 
      if (type.toUpperCase() == 'CPF') {
        formatedValue = cpfPattern.apply(cleanValue) || '';
      }
    }
    else {
      if (cleanValue.length > 11) {
        formatedValue = cnpjPattern.apply(cleanValue);
      } else {
        formatedValue = cpfPattern.apply(cleanValue) || '';
      }
    } 
    
    // if ((typeof type !== 'undefined' && type.toUpperCase() == 'CNPJ') || cleanValue.length > 11) {
    //   formatedValue = cnpjPattern.apply(cleanValue);
    // } else if ((typeof type !== 'undefined' && type.toUpperCase() == 'CPF') || cleanValue.length <= 11) {
    //   formatedValue = cpfPattern.apply(cleanValue) || '';
    // }

    return formatedValue.trim().replace(/[^0-9]$/, '');
  }

  render() {
    const {
      format,
      clearValue,
      type,
      ...rest
    } = this.props;
    let size = 14;

    if (type && type.toUpperCase() == 'CPF') {
      size = 11;
    }

    return (
      <MaskInput 
        {...rest}
        clearValue={(rawValue) => rawValue.replace(/[^\d]/g, '').slice(0, size)}
        format={(cleanValue) => this.format(cleanValue)}/>
    );
  }
}

CpfCnpjInput.propTypes = {
  type: PropTypes.string
};
export default CpfCnpjInput;