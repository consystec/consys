import React, { Component } from 'react';
import FormattedMask from 'consys/FormattedMask';

class FormattedCNPJ extends Component {
  render() {
    const rest = { ...this.props };
    delete rest.mask;
    return (
      <FormattedMask {...rest}
        mask="AA.AAA.AAA/AAAA-AA" />
    );
  }
}

export default FormattedCNPJ;