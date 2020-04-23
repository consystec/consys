import React, { Component } from 'react';
import { Row, Col } from 'antd';
import PropTypes from 'prop-types';

class Screen extends Component {
  render() {
    return (
      <Row type="flex" 
        justify="space-around" 
        align="middle">
        <Col span={23} 
          style={{padding: '16px'}}>
          {this.props.children}
        </Col>
      </Row>
    );
  }
}

Screen.propTypes = {
  children: PropTypes.node
};


export default Screen;