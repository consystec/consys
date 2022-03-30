import React, { useEffect, useState } from 'react';
import { Button, Col, Row, Tag } from 'antd';
import { format } from 'date-fns';
import utilsCss from '../css/utils.css';
import pkg from '../package.json';
import Screen from './screen/Screen';
import EditableTable from './editableTable/EditableTable';

const _EditableTable = (props) => {
  const columns = [
    {
      title: 'descrição',
      dataIndex: 'descricao',
      editable: true,
      width: '35%'
    },
    {
      title: 'vencimento',
      dataIndex: 'vencimento',
      inputType: 'datepicker',
      editable: true,
      width: '35%',
      render: (value) => value ? format(new Date(value), 'dd/MM/yyyy') : value
    },
    {
      title: 'anexo',
      dataIndex: 'anexo',
      width: '20%',
      editable: true,
      name: 'fileList',
      inputType: 'file',
      componentProps: { beforeUpload: file => beforeUpload(file) },
      componentChildren: <Button>Inserir</Button>,
      render: (value) => value?.[0]?.name || ''
    },
    {
      title: 'checked',
      dataIndex: 'checkbox',
      editable: true,
      width: '20%',
      name: 'checked',
      componentChildren: 'Clique-me',
      inputType: 'checkbox',
      render: el => <Tag color={el ? 'blue' : 'red'}>{el ? 'Sim' : 'Não'}</Tag>
    }
  ];

  const beforeUpload = () => {

    return false;
  }

  return (
    <EditableTable {...props}
      columns={columns} />
  );
};

function Components() {
  const [data, setData] = useState([]);
  const [deletados, setDeletados] = useState([]);
  const [showData, setShowData] = useState([]);

  useEffect(() => {
    setShowData(data);
  }, [data, deletados])
  return (
    <Screen>
      <Row gutter={[10, 10]}
        align='middle'>
        <Col span={24}
          className={[utilsCss.h1, utilsCss.center].join(' ')}>
          {pkg.name} - {pkg.description} {pkg.dependencies.react.replace('^', '')}
        </Col>
        <Col span={6}>
          <Button onClick={() => console.log(showData)}>
            Mostrar dados
          </Button>
        </Col>
        <Col span={24}>
          <Row gutter={[10, 10]}
            align='middle'>
            <Col span={24}
              className={utilsCss.h3}>
              EditableTable
            </Col>
            <Col span={24}>
              <_EditableTable
                noSave
                callback={({ data, deletados }) => { setData(data); setDeletados(deletados) }}
              />
            </Col>
          </Row>
        </Col>
      </Row>
    </Screen>
  );
}

export default Components;