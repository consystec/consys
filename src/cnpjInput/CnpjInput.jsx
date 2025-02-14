import React, { Component } from 'react';
import MaskInput from 'consys/MaskInput';

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

function handleValidateCNPJ(value) {
  const cnpj = value.replace(/[^A-Z0-9]+/g, '').toUpperCase();

  if (
    cnpj == '' ||
    cnpj.length != 14 ||
    new Set(cnpj).size === 1
  ) {
    return false;
  }

  let tamanho = cnpj.length - 2;
  let numeros = cnpj.substring(0, tamanho);
  let digitos = cnpj.substring(tamanho);
  let pos = tamanho - 7;

  // calcula os 2 digitos e verifica se são iguais aos digitos informados
  for (let j = 0; j < 2; j++) {
    if (calculaDigito(tamanho, numeros, pos) !== digitos.charAt(j)) {
      return false;
    }

    tamanho += 1;
    numeros = cnpj.substring(0, tamanho);
    pos = tamanho - 7;
  }

  return true;
}

function calculaDigito(tamanho, numeros, pos) {
  let soma = 0;

  for (let i = tamanho; i >= 1; i--) {
    soma += getAsciiValue(numeros.charAt(tamanho - i)) * pos--;

    if (pos < 2) {
      pos = 9;
    }
  }

  const resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;

  return resultado > 9 ? String.fromCharCode(resultado + 55) : String(resultado);
}

function getAsciiValue(char) {
  return char.charCodeAt(0) - 48;
}

class CnpjInput extends Component {
  render() {
    const { format, clearValue, ...rest } = this.props;

    return (
      <MaskInput
        {...rest}
        clearValue={(rawValue) => rawValue && rawValue.toString().replace(/[^a-zA-Z0-9]/g, '').toUpperCase().slice(0, 14)} 
        format={(cleanValue) => cleanValue?.slice(0, 14).replace(/(.{2})(.{3})(.{3})(.{4})(.{2})/, '$1.$2.$3/$4-$5')} />
    );
  }
}

export default CnpjInput;
export { validateCnpj };