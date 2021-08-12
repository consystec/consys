import React, { Component } from 'react';
import FormattedMask from 'consys/FormattedMask';

class FormattedCNPJ extends Component {
  render() {
    const rest = { ...this.props };
    delete rest.mask;
    return (
      <FormattedMask {...rest}
        mask="00.000.000/0000-00" />
    );
  }
}

export default FormattedCNPJ;