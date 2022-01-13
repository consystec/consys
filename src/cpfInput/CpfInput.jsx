import React, { Component } from 'react';
import MaskInput from 'consys/MaskInput';
import StringMask from 'string-mask';
const cpfPattern = new StringMask('000-000.00000');

function validateCpf(_, value) {
  return new Promise((resolve, reject) => {
    if (value) {
      if (!handleValidateCPF(value)) {
        reject("Esse CPF é inválido");
      } else {
        resolve();
      }
    } else {
      resolve()
    }
  })
}

function handleValidateCPF(cpf) {
  cpf = cpf.replace(/[^\d]+/g, '');

  if (cpf == '' ||
    cpf.length != 11 ||
    cpf == "00000000000" ||
    cpf == "11111111111" ||
    cpf == "22222222222" ||
    cpf == "33333333333" ||
    cpf == "44444444444" ||
    cpf == "55555555555" ||
    cpf == "66666666666" ||
    cpf == "77777777777" ||
    cpf == "88888888888" ||
    cpf == "99999999999") {
    return false;
  }

  let add = 0;
  let rev = null;
  for (var i = 0; i < 9; i++) {
    add += parseInt(cpf.charAt(i)) * (10 - i);
  }

  rev = 11 - (add % 11);

  if (rev == 10 || rev == 11) {
    rev = 0;
  }

  if (rev != parseInt(cpf.charAt(9))) {
    return false;
  }

  add = 0;
  for (var i = 0; i < 10; i++) {
    add += parseInt(cpf.charAt(i)) * (11 - i);
  }

  rev = 11 - (add % 11);

  if (rev == 10 || rev == 11) {
    rev = 0;
  }

  if (rev != parseInt(cpf.charAt(10))) {
    return false;
  }

  return true;
}

class CpfInput extends Component {
  render() {
    const { format, clearValue, ...rest } = this.props;

    return (
      <MaskInput {...rest}
        clearValue={(rawValue) => rawValue && rawValue.replace(/[^\d]/g, '').slice(0, 11)}
        format={(cleanValue) => (cpfPattern.apply(cleanValue) || '').trim().replace(/[^0-9]$/, '')} />
    );
  }
}

export default CpfInput;
export { validateCpf };