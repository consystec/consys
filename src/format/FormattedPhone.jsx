import React, { Component } from 'react';
import FormattedMask from 'consys/FormattedMask'; 
import StringMask from 'string-mask';

const phoneMask8D = {  
  areaCode: new StringMask('(00) 0000-0000'),
  simple: new StringMask('0000-0000')
}, phoneMask9D = { 
  areaCode: new StringMask('(00) 0 0000-0000'),
  simple: new StringMask('0 0000-0000')
}, phoneMask0800 = {
  areaCode: null,
  simple: new StringMask('0000-000-0000')
}, phoneMark12D = {
  areaCode: new StringMask('+00 (00) 0000-0000'),
}, phoneMark13D = {
  areaCode: new StringMask('+00 (00) 0 0000-0000'),
}

function getFormatPhone(cleanValue){
  if (cleanValue != null) {
    cleanValue = cleanValue.replace(/\D+/gm, "");
  }
  return getMaskPhone(cleanValue).apply(cleanValue);
}

function getMaskPhone(cleanValue){
  var maskValue;

  if (cleanValue && cleanValue.indexOf('0800') === 0) {
    maskValue = phoneMask0800.simple;
  } else if (cleanValue && cleanValue.length < 9) {
    maskValue = phoneMask8D.simple;
  } else if (cleanValue && cleanValue.length < 10) {
    maskValue = phoneMask9D.simple;
  } else if (cleanValue && cleanValue.length < 11) {
    maskValue = phoneMask8D.areaCode;
  } else if (cleanValue && cleanValue.length < 12) {
    maskValue = phoneMask9D.areaCode;
  } else if (cleanValue && cleanValue.length < 13) {
    maskValue = phoneMark12D.areaCode
  } else {
    maskValue = phoneMark13D.areaCode
  }
  
  return maskValue;
}

class FormattedPhone extends Component {
  render() {
    const rest = {...this.props};
    delete rest.mask;
    return (
      <FormattedMask {...rest}
        mask={getMaskPhone(this.props.value).pattern}/>
    );
  }
}

export default FormattedPhone;
export {getFormatPhone, getMaskPhone};
