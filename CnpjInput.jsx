import React, { Component } from 'react';
import MaskInput from 'consys/MaskInput';
import StringMask from 'string-mask';
const cnpjPattern = new StringMask('00.000.000/0000-00');

function validateCnpj(_, value) {
  return new Promise((resolve, reject) => {
    if (value) {
      if (!handleValidateCNPJ(value)) {
        reject("Esse CNPJ é inválido");
      } else {
        resolve();
      }
    } else {
      resolve()
    }
  })
}

function handleValidateCNPJ(cnpj) {
  cnpj = cnpj.replace(/[^\d]+/g, '');

  if (cnpj == '' ||
    cnpj.length != 14 ||
    cnpj == "00000000000000" ||
    cnpj == "11111111111111" ||
    cnpj == "22222222222222" ||
    cnpj == "33333333333333" ||
    cnpj == "44444444444444" ||
    cnpj == "55555555555555" ||
    cnpj == "66666666666666" ||
    cnpj == "77777777777777" ||
    cnpj == "88888888888888" ||
    cnpj == "99999999999999") {
    return false;
  }

  let tamanho = cnpj.length - 2
  let numeros = cnpj.substring(0, tamanho);
  let digitos = cnpj.substring(tamanho);
  let soma = 0;
  let pos = tamanho - 7;

  for (var i = tamanho; i >= 1; i--) {
    soma += numeros.charAt(tamanho - i) * pos--;

    if (pos < 2) {
      pos = 9;
    }
  }

  let resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;

  if (resultado != digitos.charAt(0)) {
    return false;
  }

  tamanho = tamanho + 1;
  numeros = cnpj.substring(0, tamanho);
  soma = 0;
  pos = tamanho - 7;

  for (var i = tamanho; i >= 1; i--) {
    soma += numeros.charAt(tamanho - i) * pos--;

    if (pos < 2) {
      pos = 9;
    }
  }

  resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;

  if (resultado != digitos.charAt(1)) {
    return false;
  }

  return true;
}

class CnpjInput extends Component {
  render() {
    const { format, clearValue, ...rest } = this.props;

    return (
      <MaskInput
        {...rest}
        clearValue={(rawValue) => rawValue && rawValue.toString().replace(/[^\d]/g, '').slice(0, 14)}
        format={(cleanValue) => (cnpjPattern.apply(cleanValue) || '').trim().replace(/[^0-9]$/, '')} />
    );
  }
}

export default CnpjInput;
export { validateCnpj };