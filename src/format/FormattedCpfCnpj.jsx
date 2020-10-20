import React from 'react';
import FormattedCPF from 'consys/FormattedCPF';
import FormattedCNPJ from 'consys/FormattedCNPJ';

function FormattedCpfCnpj(props) {
  if (props.value && props.value.length < 12) {
    return (
      <FormattedCPF {...props} />
    );
  }

  return (
    <FormattedCNPJ {...props} />
  );
}

export default FormattedCpfCnpj;