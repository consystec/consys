import React, { Component } from 'react';
import { DatePicker }  from 'antd'; 

class _DatePicker extends Component {
  render() {
    let {
      style,
      format,
      ...rest
    } = this.props;
    if (!style)
    {
      style = {};
    }
    if (!style.width)
    {
      style.width = '100%';
    }
    if (!format)
    {
      format = "DD/MM/YYYY";
    }
    return (
      <DatePicker {...rest}
        style={style} 
        format={format} />
    );
  }
}
export default _DatePicker;