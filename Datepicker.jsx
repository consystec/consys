import React from 'react';
import { DatePicker } from 'antd';

function _DatePicker({ style, format, ...rest }) {
  if (!style) {
    style = {};
  }

  if (!style.width) {
    style.width = '100%';
  }

  if (!format) {
    format = "DD/MM/YYYY";
  }

  return (
    <DatePicker {...rest}
      style={style}
      format={format} />
  );
}

export default _DatePicker;