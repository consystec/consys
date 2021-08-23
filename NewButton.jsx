import React from 'react';
import { Button, Tooltip } from 'antd';
import PropTypes from 'prop-types';
import { FileAddOutlined } from '@ant-design/icons';

function NewButton({ children, tooltip = '', ...props }) {
  return (
    <Tooltip title={tooltip}>
      <Button {...props}
        type="primary"
        icon={<FileAddOutlined />}>
        {children || 'Novo'}
      </Button>
    </Tooltip>
  );
}

NewButton.propTypes = {
  tooltip: PropTypes.bool,
  children: PropTypes.node
};

export default NewButton;