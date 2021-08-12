import React from 'react';
import MaskInput from 'consys/MaskInput';
import StringMask from 'string-mask';
import PropTypes from 'prop-types';

const cnpjPattern = new StringMask('00.000.000\/0000-00');
const cpfPattern = new StringMask('000.000.000-00');

const CpfCnpjInput = React.forwardRef(({ format, clearValue, type, ...rest }, ref) => {
  let size = type && type.toUpperCase() == 'CPF' ? 11 : 14;

  const formatInput = cleanValue => {
    var formatedValue;

    if (typeof cleanValue == 'undefined'
      || cleanValue == 'null'
      || cleanValue == null
      || (cleanValue != null && cleanValue.trim() === '')) {
      return;
    }

    if (type) {
      if (type.toUpperCase() == 'CNPJ') {
        formatedValue = cnpjPattern.apply(cleanValue);
      }
      if (type.toUpperCase() == 'CPF') {
        formatedValue = cpfPattern.apply(cleanValue) || '';
      }
    } else {
      if (cleanValue.length > 11) {
        formatedValue = cnpjPattern.apply(cleanValue);
      } else {
        formatedValue = cpfPattern.apply(cleanValue) || '';
      }
    }

    return formatedValue.trim().replace(/[^0-9]$/, '');
  }

  return (
    <MaskInput {...rest}
      ref={ref}
      clearValue={rawValue => rawValue && rawValue.replace(/[^\d]/g, '').slice(0, size)}
      format={cleanValue => formatInput(cleanValue)} />
  );
});

CpfCnpjInput.propTypes = {
  type: PropTypes.string
}

export default CpfCnpjInput;