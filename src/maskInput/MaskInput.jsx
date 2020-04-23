import ReactDOM from 'react-dom';
import React, { Component } from 'react';
import { Input } from 'antd';
import StringMask from 'string-mask';
import PropTypes from 'prop-types';

class MaskInput extends Component {
  constructor() {
    super();
    this.state = {};
    this.handleChange = this.handleChange.bind(this);
    this.setValue = this.setValue.bind(this);
  }
  setValue(valor) {
    const {onChange, format, clearValue} = this.props;
    if (typeof valor !== 'undefined') {
      valor = clearValue(valor);
      onChange && onChange(valor);
    }
    const maskedValue = format(valor);
    this.setState({
      valor: maskedValue
    });
  }
  UNSAFE_componentWillReceiveProps(nextProps) {
    const {value} = this.props;
    if (value !== nextProps.value) {
      this.setValue(nextProps.value);
    }
  }
  componentDidMount() {
    const {defaultValue, value} = this.props;
    this.setValue(defaultValue || value);
  }
  handleChange(ev) {
    let valor = ev.target.value;
    valor = valor.replace(',', '.');
    this.setValue(valor);
  }
  render() {
    const {valor} = this.state;
    const {
      onChange,
      format,
      clearValue,
      inputRef,
      ...rest
    } = this.props;
    return (
      <Input {...rest}
        ref={inputRef} 
        value={valor}
        onChange={this.handleChange} />
    );
  }
}

MaskInput.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func,
  clearValue: PropTypes.func.isRequired,
  format: PropTypes.func.isRequired,
}

export default MaskInput;