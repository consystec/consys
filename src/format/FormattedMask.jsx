import React, { Component } from 'react';
import PropTypes from 'prop-types';
import utilsCss from 'consys/utils.css';
import StringMask from 'string-mask';

class FormattedMask extends Component {
  constructor(props){
    super();
    this.state = {value: this.setValue(props)};
    this.setValue = this.setValue.bind(this);
  }

  componentDidMount(){
    this.setValue(this.props, true);
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    const {value} = this.props;
    if (value !== nextProps.value) {
      this.setValue(nextProps, true);
    }
  }

  setValue(props, seth){
    const {value, mask} = props;
    const format = new StringMask(mask);
    const formatted = format.apply(value);
    if (seth) {
      this.setState({value: formatted});
    }
    return formatted;
  }

  render() {
    return (
      <span>{this.state.value}</span>
    );
  }
}

FormattedMask.propTypes = {
  value: PropTypes.string,
  mask: PropTypes.string
};

export default FormattedMask;