import React, { Component } from 'react';
import PropTypes from 'prop-types';
import FormattedMask from 'consys/FormattedMask'; 

class FormattedCep extends Component {
  render() {
    const rest = {...this.props};
    delete rest.mask;
    return (
      <FormattedMask {...rest}
        mask="00000-000"/>
    );
  }
}

export default FormattedCep;