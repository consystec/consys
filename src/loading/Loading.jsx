import React from 'react';
import PropTypes from 'prop-types';
import { Spin } from 'antd';

function Loading({ loading, spinning, ...props }) {

  return (
    <Spin {...props}
      spinning={spinning || loading} />
  );
}

Loading.propTypes = {
  spinning: PropTypes.bool,
  loading: PropTypes.bool,
};

export default Loading;