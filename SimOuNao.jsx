import React, { Component } from 'react';
import { Tag } from 'antd';
import PropTypes from 'prop-types';

class SimOuNao extends Component {
  render() {
    const {status} = this.props;
    const text = status == 'SIM' ? 'Sim' : 'Não';
    return (
      <small>
        <Tag>{text}</Tag>
      </small>
    );
  }
}

SimOuNao.propTypes = {
  status: PropTypes.string.isRequired
};


export default SimOuNao;