import React, { Component } from 'react';
import {Spin} from 'antd';
import PropTypes from 'prop-types';

class Loading extends Component {
  render() {
    return (
      <Spin {...this.props}  >{this.props.children}</Spin>
    );
  }
}

Loading.propTypes = {
  children: PropTypes.node,
};

export default Loading;