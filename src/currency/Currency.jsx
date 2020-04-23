import React, { Component } from 'react';
import ValueMaskInput from 'consys/ValueMaskInput';

class Currency extends Component {
  render() {
    return (
      <ValueMaskInput ref={node => this.refs = node}
        {...this.props}
        prefixMask="R$$ "/>
    );
  }
}

export default Currency;