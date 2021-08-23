import React, { Component } from 'react';
import { Button, Tooltip, Popconfirm } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import PropTypes from 'prop-types';
import utilsCss from 'consys/utils.css';

class DeleteButton extends Component {
  render() {
    const { className, onDelete, placement, flat } = this.props;
    return (
      <Popconfirm title="Tem certeza que deseja excluir?"
        onConfirm={onDelete}
        placement={placement ? placement : 'top'}
        okText="Excluir"
        cancelText="Cancelar">
        <Tooltip title="Excluir">
          {flat ?
            <span className={utilsCss.h2}>
              <a className={className}>
                <DeleteOutlined style={{ color: '#f04134' }} />
              </a>
            </span>
            :
            <Button type="danger"
              icon={<DeleteOutlined />}
              className={className} />
          }
        </Tooltip>
      </Popconfirm>
    );
  }
}

DeleteButton.propTypes = {
  className: PropTypes.node,
  onDelete: PropTypes.func,
  placement: PropTypes.string,
  flat: PropTypes.bool
};

export default DeleteButton;