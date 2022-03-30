import React, { useEffect, useState } from 'react';
import { Table, Input, Popconfirm, Form, Typography, DatePicker, message, Modal, Button, Upload, Checkbox } from 'antd';
import PropTypes from 'prop-types';
import http from 'consys/http';

const find = (data, rCodigo, codigo) => {
  const index = data.findIndex(({ codigo }) => codigo === rCodigo);

  if (codigo) {
    return data[index];
  }

  return index;
}

const EditableCell = ({ editing, dataIndex, inputType, children, naoObriga,
  componentChildren, componentProps, codigo, name, noSave, setData, row, ...restProps }) => {
  let inputNode;
  const inputProps = { onChange: e => onChange(normFile(e)), ...componentProps };

  const normFile = (e) => {
    if (Array.isArray(e) || inputType === 'datepicker') {
      return e;
    }

    return e?.fileList || e?.target?.[name || 'value'];
  };

  switch (inputType) {
    case 'datepicker':
      inputNode = <DatePicker {...inputProps}
        format='DD/MM/YYYY' />
      break;
    case 'file':
      inputNode = <Upload {...inputProps}>{componentChildren}</Upload >
      break;
    case 'checkbox':
      inputNode = <Checkbox {...inputProps}>{componentChildren}</Checkbox>
      break;
    default:
      inputNode = <Input {...inputProps} />
      break;
  }

  const onChange = (value) => {
    setData(value, codigo, dataIndex);
  }

  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item name={!noSave ? dataIndex : dataIndex + row?.codigo}
          valuePropName={name || 'value'}
          getValueFromEvent={normFile}
          style={{ margin: 0, padding: 0 }}
          rules={[{
            required: noSave ? false : naoObriga ? false : true,
            message: `Campo obrigatório`,
          }]}>
          {inputNode}
        </Form.Item>
      ) : (children)}
    </td>
  );
};

EditableCell.propTypes = {
  editing: PropTypes.bool,
  naoObriga: PropTypes.bool,
  dataIndex: PropTypes.string,
  title: PropTypes.string,
  inputType: PropTypes.string,
  name: PropTypes.string,
  record: PropTypes.any,
  index: PropTypes.number,
  children: PropTypes.any,
  component: PropTypes.node,
  componentChildren: PropTypes.node,
  componentProps: PropTypes.object,
  codigo: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  row: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.object
  ]),
  data: PropTypes.array,
  noSave: PropTypes.bool,
  setData: PropTypes.func,
};

const { Link } = Typography;

const EditableTable = ({
  tableCss, defaultForm, columns, url, params, editing, callback, onBeforeSave, initialData, noSave
}) => {
  const [data, setData] = useState([]);
  const [deletados, setDeletados] = useState([]);
  const [editingKey, setEditingKey] = useState('');
  const [loading, setLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(noSave);
  const [count, setCount] = useState(0);
  const [form] = Form.useForm();
  const operation = {
    title: '',
    dataIndex: 'operation',
    render: (_, record) => {
      if (noSave) {
        return (
          <Popconfirm title="Deseja remover?"
            onConfirm={() => deletar(record)}>
            <Link>
              Deletar
            </Link>
          </Popconfirm>
        )
      }

      return record.codigo === editingKey ? (
        <span>
          <Link onClick={() => save(record.codigo)}
            style={{ marginRight: 8 }} >
            Save
          </Link>
          <Popconfirm title="Deseja cancelar?"
            onConfirm={cancel}>
            <a>Cancelar</a>
          </Popconfirm>
        </span>
      ) : (
        <React.Fragment>
          <Link disabled={editingKey !== ''}
            onClick={() => edit(record)}>
            Editar
          </Link>&nbsp;&nbsp;&nbsp;
          <Popconfirm title="Deseja remover?"
            onConfirm={() => deletar(record)}>
            <Link disabled={editingKey !== ''}>
              Deletar
            </Link>
          </Popconfirm>
        </React.Fragment>
      );
    },
  };

  useEffect(() => {
    editing && editing(editingKey);
  }, [isEditing])

  useEffect(() => {
    const time = setTimeout(() => {
      callback && callback({ data, deletados });
    }, 300);
    return () => { clearTimeout(time); };
  }, [deletados, data]);

  useEffect(() => {
    if (url) {
      setLoading(true);

      http(url, {
        method: 'GET',
        params
      }).then((values) => {
        setLoading(false);
        setData(values);
        setCount(values.length);
      }).catch((err) => {
        setLoading(false);
        Modal.error({
          title: 'Falha ao buscar dados da tabela',
          content: err.message,
          style: { whiteSpace: 'pre-wrap' }
        });
      });
    } else if (initialData) {
      setData(initialData);
    }
  }, [])

  const edit = (record) => {
    if (defaultForm) {
      const propsForm = defaultForm(record) || {};

      form.setFieldsValue({
        ...record,
        ...propsForm
      });
    } else {
      form.setFieldsValue({
        ...record,
      });
    }

    setIsEditing(true);
    setEditingKey(record.codigo);
  };

  const deletar = (record) => {
    const nData = [...data];

    setData(nData.filter((item) => {
      if (item.codigo !== record.codigo) {
        return true;
      }

      if (!item?.codigo?.toString().includes('novo')) {
        setDeletados(old => [...old, item]);
      }

      return false;
    }));
  }

  const cancel = () => {
    setEditingKey('');
    setIsEditing(false);
  };

  const save = async (codigo) => {
    try {
      const row = await form.validateFields();
      const newData = [...data];
      const index = find(data, codigo);

      if (index > -1) {
        let cancel = false;
        const item = newData[index];
        newData.splice(index, 1, { ...item, ...row, update: true });

        onBeforeSave && onBeforeSave(newData[index], (data) => {
          newData[index] = data;
          cancel = true;
        });

        if (cancel) {
          return;
        }

        setData(newData);
        setEditingKey('');
      } else {
        newData.push(row);
        setData(newData);
        setEditingKey('');
      }

      form.resetFields();
      setIsEditing(false);
    } catch (errInfo) {
      message.error('Campo obrigatório: ' + errInfo?.errorFields?.[0]?.name?.[0]);
    }
  };

  const add = () => {
    setData(old => [...old, { codigo: `novo${count}` }]);
    setCount(old => old += 1);
  }

  const mergedColumns = columns.map((col) => {
    const { componentProps, componentChildren } = col;
    if (!col.editable) {
      return col;
    }

    return {
      ...col,
      onCell: (record) => ({
        record,
        inputType: col.inputType || 'text',
        dataIndex: col.dataIndex,
        naoObriga: col.naoObriga,
        name: col.name,
        title: col.title,
        component: col.component,
        editing: record.codigo === editingKey || noSave,
        componentProps,
        codigo: record.codigo,
        componentChildren,
        noSave,
        row: find(data, record.codigo, true),
        setData: (val, codigo, dIndex) => setChangeData(val, codigo, dIndex)
      }),
    };
  });

  const setChangeData = (value, codigo, dataIndex) => {
    const nData = [...data];
    const index = find(data, codigo);

    nData[index][dataIndex] = value;

    setData(nData);
  }

  return (
    <Form form={form}>
      <Button onClick={add}
        type="primary"
        style={{ marginBottom: 16 }}>
        Adicionar Linha
      </Button>
      <Table {...tableCss}
        components={{ body: { cell: EditableCell } }}
        bordered
        dataSource={data}
        size='small'
        rowKey={(values) => values.codigo}
        loading={loading}
        columns={[...mergedColumns, { ...operation }]}
        pagination={{ onChange: cancel }} />
    </Form>
  );
};

EditableTable.propTypes = {
  url: PropTypes.string,
  params: PropTypes.object,
  defaultForm: PropTypes.func,
  columns: PropTypes.array,
  editing: PropTypes.func,
  callback: PropTypes.func,
  onBeforeSave: PropTypes.func,
  tableCss: PropTypes.object,
  initialData: PropTypes.any,
  noSave: PropTypes.bool,
};

export default EditableTable;