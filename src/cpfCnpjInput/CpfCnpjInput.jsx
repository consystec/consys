import React from 'react';
import MaskInput from 'consys/MaskInput';
import PropTypes from 'prop-types';

const CpfCnpjInput = React.forwardRef(({ format, clearValue, type, ...rest }, ref) => {
  let size = type && type.toUpperCase() == 'CPF' ? 11 : 14;

  const formatInput = cleanValue => {
    if (typeof cleanValue == 'undefined'
      || cleanValue == 'null'
      || cleanValue == null
      || (cleanValue != null && cleanValue.trim() === '')) {
      return;
    }

    if (isCnpj(cleanValue)) {
      return cleanValue?.toUpperCase().trim().slice(0, 14).replace(/(.{2})(.{3})(.{3})(.{4})(.{2})/, '$1.$2.$3/$4-$5');
    } else {
      return cleanValue?.toUpperCase().trim().replace(/(.{3})(.{3})(.{3})(.{2})/, '$1.$2.$3-$4');
    }
  }

  const limpaValor = rawValue => {
    if (isCnpj(rawValue)) {
      return rawValue?.toString().replace(/[^a-zA-Z0-9]/g, '').toUpperCase().slice(0, 14);
    } else {
      return rawValue?.toString().replace(/[^a-zA-Z0-9]/g, '').toUpperCase().slice(0, size);
    }
  }

  const isCnpj = (value) => {
    return type && type.toUpperCase() == 'CNPJ' || value?.length > 11;
  }

  return (
    <MaskInput {...rest}
      ref={ref}
      clearValue={rawValue => limpaValor(rawValue)}
      format={cleanValue => formatInput(cleanValue)} />
  );
});

CpfCnpjInput.propTypes = {
  type: PropTypes.string
}

export default CpfCnpjInput;