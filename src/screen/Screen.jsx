import React, { Component } from 'react';
import { Row, Col } from 'antd';
import PropTypes from 'prop-types';

class Screen extends Component {
  render() {
    const { padding, style } = this.props;

    return (
      <Row justify="space-around"
        align="middle">
        <Col span={23}
          style={{ padding: padding || '16px', ...style }}>
          {this.props.children}
        </Col>
      </Row>
    );
  }
}

Screen.propTypes = {
  children: PropTypes.node,
  padding: PropTypes.any,
  style: PropTypes.any
};

export default Screen;