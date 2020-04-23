import React, { Component } from 'react';
import {Checkbox} from 'antd';
import PropTypes from 'prop-types';

class CheckboxOptions extends Component {
  constructor() {
    super();
    this.state = {};
    this.handleChange = this.handleChange.bind(this);
    this.setValue = this.setValue.bind(this);
  }

  componentDidMount(){
    this.setValue(this.props);
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    const {value} = this.props;
    if (value !== nextProps.value) {
      this.setValue(nextProps);
    }
  }

  setValue(props){
    const {value, trueValue} = props;
    this.setState({value: props.value == trueValue});
  }

  handleChange(){
    let {value} = this.state;
    value = !value;
    const {onChange, trueValue, falseValue} = this.props;
    const response = value ? trueValue : falseValue;
    onChange && onChange(response);
    this.setState({value});
  }

  render() {
    const {value} = this.state;
    const {disabled} = this.props;
    return (
      <Checkbox disabled={disabled}
        checked={value} 
        onChange={this.handleChange}/>
    );
  }
}

CheckboxOptions.propTypes = {
  onChange: PropTypes.func,
  trueValue: PropTypes.string.isRequired,
  falseValue: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  value: PropTypes.string,
  defaultValue: PropTypes.object
};
export default CheckboxOptions;