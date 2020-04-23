import React from 'react';
import { Upload } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import PropTypes from 'prop-types';
const Dragger = Upload.Dragger;

function Attach({ children, className, field, iconStyle, ...rest }) {
  return (
    <Dragger {...rest}>
      <div className={className}>
        {children ? children :
          <p className="ant-upload-drag-icon"
            style={iconStyle}>
            <InboxOutlined />
          </p>
        }
        {field ? null : <p className="ant-upload-text">Arraste seu arquivo ou clique aqui para carrega-lo</p>}
      </div>
    </Dragger>
  );
}

Attach.propTypes = {
  children: PropTypes.node,
  field: PropTypes.bool,
  iconStyle: PropTypes.object,
  className: PropTypes.object
};

export default Attach;