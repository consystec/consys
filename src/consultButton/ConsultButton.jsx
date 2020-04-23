import React, { Component } from 'react';
import {Button, Tooltip} from 'antd';
import PropTypes from 'prop-types';

class ConsultButton extends Component {
  render() {
    const {onConsult, children, tooltip} = this.props;
    const props = {...this.props};
    delete props.onConsult;
    delete props.tooltip;
    return (
      <Tooltip title={tooltip ? "Consultar" : ''}>
        <Button {...props}
          icon="search"
          onClick={onConsult ? onConsult : null}>
          {children}
        </Button> 
      </Tooltip>
    );
  }
}

ConsultButton.propTypes = {
  className: PropTypes.node,
  onConsult: PropTypes.func,
  children: PropTypes.node,
  tooltip: PropTypes.bool
};

export default ConsultButton;