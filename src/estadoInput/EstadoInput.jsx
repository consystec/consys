import React, { forwardRef } from 'react';
import { Select } from 'antd'
import { KEYS_ESTADOS } from './EstadoKeys';

const Option = Select.Option;

const EstadoInput = forwardRef((props, ref) => {
  const options = KEYS_ESTADOS.map(d => <Option key={d.key}>{d.key}</Option>);

  return (
      <Select showSearch
        defaultActiveFirstOption={false}
        notFoundContent={null}
        {...props}
        {...ref}>
        {options}
      </Select>
  );
})

export default EstadoInput;