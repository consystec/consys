import React from 'react';
import { Button, Tooltip } from 'antd';
import { EyeOutlined, EditOutlined } from '@ant-design/icons';
import PropTypes from 'prop-types';
import utilsCss from 'consys/utils.css';

function EditButton({ className, noLink, onEdit, flat, view }) {
  const icon = view ? <EyeOutlined /> : <EditOutlined />;
  return (
    <Tooltip title={view ? "Visualizar" : "Editar"}>
      {flat ?
        <span className={className ? className : utilsCss.h2}
          onClick={onEdit ? onEdit : null}>
          {noLink ?
            icon
            :
            <a className={className}>
              {icon}
            </a>
          }
        </span>
        :
        <Button icon={icon}
          onClick={onEdit ? onEdit : null}
          className={className} />
      }
    </Tooltip>
  );
}

EditButton.propTypes = {
  className: PropTypes.node,
  onEdit: PropTypes.func,
  flat: PropTypes.bool,
  noLink: PropTypes.bool,
  view: PropTypes.bool
};

export default EditButton;