import React, { forwardRef } from 'react';
import ValueMaskInput from 'consys/ValueMaskInput';
import PropTypes from 'prop-types';

const Currency = forwardRef(({ simbolo, ...props }, ref) => {

  return (
    <ValueMaskInput ref={ref}
      prefixMask={simbolo ? simbolo : "R$ "}
      {...props} />
  );
})

Currency.propTypes = {
  simbolo: PropTypes.string
};

export default Currency;