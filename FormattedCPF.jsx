import React, { Component } from 'react';
import FormattedMask from 'consys/FormattedMask'; 

class FormattedCPF extends Component {
  render() {
    const rest = {...this.props};
    delete rest.mask;
    return (
      <FormattedMask {...rest}
        mask="000.000.000-00"/>
    );
  }
}

export default FormattedCPF;