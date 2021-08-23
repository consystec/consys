import React, { Component } from 'react';
import { message, notification, Button, Popconfirm } from 'antd';
import utilsCss from 'consys/utils.css';
import PropTypes from 'prop-types';
import EditButton from 'consys/EditButton';
import DeleteButton from 'consys/DeleteButton';

function renderEditableCellButton(config) {
  const { thisComponent, listName, onCancel, onSave, onRemove, children } = config;
  class EditableCellButton extends Component {
    constructor() {
      super();
      this.state = {
        editable: false,
      }
      this.handleClick = this.handleClick.bind(this);
      this.checkEditable = this.checkEditable.bind(this);
      this.undone = this.undone.bind(this);
    }
    undone() {
      notification.close('editableCellButtonKey');
      thisComponent.setState({
        [listName]: this.listBeforeRemove
      });
    }
    checkEditable(editable, status) {
      const { index } = this.props;
      const list = thisComponent.state[listName];
      if (!list[index]) {
        return false;
      }
      const item = list[index];
      if (typeof editable === 'undefined') {
        editable = item.editable;
      }
      if (editable == true) {
        let isEditMode = false;
        for (var i = list.length - 1; i >= 0; i--) {
          if (i !== index && list[i].editable) {
            isEditMode = i;
          }
        }
        if (isEditMode !== false || status == 'remover') {
          let onRemoveFunc = onRemove;
          if (typeof onRemoveFunc === 'undefined') {
            onRemoveFunc = function () {
              return new Promise((resolve) => {
                resolve({
                  showMessage: true,
                  showUndo: true
                });
              });
            }
          }

          onRemoveFunc(item).then(({ showMessage, showUndo }) => {
            if (typeof status === 'undefined' || status == 'remover') {
              this.listBeforeRemove = list.slice();
              list.splice(index, 1);
              thisComponent.setState({
                [listName]: list
              });
            }
            if (showMessage) {
              if (status == 'remover') {
                notification.success({
                  message: 'Item removido',
                  btn: showUndo ? <Button onClick={this.undone} type="primary" size="small">Desfazer</Button> : null,
                  key: 'editableCellButtonKey'
                });
              }
              else {
                let action = list[isEditMode].status == 'editar' ? 'edição' : 'inserção';
                let action2 = status == 'editar' ? 'editar' : 'inserir';
                message.warning('Item em ' + action + ': você não pode ' + action2 + ' um item');
              }
            }
          });
          return false;
        }
      }
      this.setState({
        editable: editable,
      });
      list[index].beforeEdit = { ...list[index] };
      list[index].focused = false;
      list[index].editable = editable;
      list[index].status = status;
      thisComponent.setState({
        [listName]: list
      });
      return true;
    }
    componentDidMount() {
      this.checkEditable();
    }
    UNSAFE_componentWillReceiveProps(nextProps) {
      const that = this;
      const { index } = this.props;
      const list = thisComponent.state[listName];
      if (list[index]) {
        const item = list[index];
        let isOk = false;
        if (typeof item.editable === 'undefined') {
          return;
        }
        if (this.processing) {
          return;
        }
        if (item.status === 'salvar') {
          isOk = onSave && onSave(item);
        }
        else if (item.status === 'cancelar') {
          isOk = onCancel && onCancel(item);
        }
        else {
          return;
        }
        if (isOk) {
          that.processing = true;
          isOk.then((res) => {
            that.processing = false;
            if (res === false && item.fresh) {
              list.splice(index, 1);
              thisComponent.setState({
                [listName]: list
              });
            }
            else {
              list[index].fresh = false;
              list[index].status = false;
            }
          }).catch((err) => {
            that.processing = false;
            if (item.status === 'erro') {
              return;
            }
            list[index].focusComponent = err;
            list[index].editable = true;
            list[index].status = 'erro';
            thisComponent.setState({
              [listName]: list
            });
            that.setState({
              editable: true
            });
            message.error('Preencha os campos obrigatórios para salvar');
          });
        }
      }
    }
    handleClick(status) {
      let { editable } = this.state;
      this.checkEditable(!editable, status);
    }
    render() {
      const { editable } = this.state;
      const { text, record, index } = this.props;
      return (
        <div className={utilsCss.rightAlign}>
          {editable ?
            <span>
              <Popconfirm
                okText="Cancelar"
                cancelText="Não"
                title="Tem certeza que deseja cancelar?"
                onConfirm={() => { this.handleClick('cancelar') }}>
                <Button type="dashed">
                  Cancelar
                </Button>
              </Popconfirm>
              &nbsp;
              <Button onClick={() => { this.handleClick('salvar') }}
                type="primary"
                ghost>
                Salvar
              </Button>
            </span>
            :
            <span>
              {children && children(text, record, index)}
              <EditButton className={utilsCss.mr1}
                onEdit={() => { this.handleClick('editar') }} />
              <DeleteButton onDelete={() => { this.handleClick('remover') }} />
            </span>
          }
        </div>
      );
    }
  }
  EditableCellButton.propTypes = {
    children: PropTypes.func
  };

  return {
    render: function (text, record, index) {
      return <EditableCellButton index={index}
        text={text}
        record={record} />
    }
  }
}

export { renderEditableCellButton }