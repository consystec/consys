import React, { forwardRef, useState } from 'react';
import { Button, Checkbox, Col, notification, Row, Upload } from 'antd';
import { format } from 'date-fns';
import utilsCss from '../css/utils.css';
import pkg from '../package.json';
import Typeahead from './typeahead/Typeahead';
import Screen from './screen/Screen';
import CepTypeahead from './cepTypeahead/CepTypeahead';
import EditableTable from './editableTable/EditableTable';

const _Typeahead = forwardRef((props, ref) => {
  return (
    <Typeahead {...props}
      url='/url'
      ref={ref}
      view={item => item && item.codigo + ' - ' + item.descricao} />
  );
});

const _CepTypeahead = (props) => {
  return (
    <CepTypeahead {...props}
      onSuccess={(cep) =>
        notification.success({
          message: 'Sucesso',
          description: JSON.stringify(cep)
        })}
    />
  );
};

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
      editable: true,
      inputType: 'datepicker',
      width: '35%',
      render: (value) => value ? format(new Date(value), 'dd/MM/yyyy') : value
    },
    {
      title: 'anexo',
      dataIndex: 'anexo',
      editable: true,
      width: '20%',
      name: 'fileList',
      component: <Upload maxCount={1}
        beforeUpload={() => { return false; }}>
        <Button>clique aqui</Button>
      </Upload >,
      render: (value) => value ? value[0]?.name : ''
    },
    {
      title: 'checked',
      dataIndex: 'checkbox',
      editable: true,
      width: '20%',
      name: 'checked',
      component: <Checkbox>checked?</Checkbox>,
      render: (val) => <Checkbox checked={val}>checked?</Checkbox>
    }
  ];

  return (
    <EditableTable {...props}
      columns={columns} />
  );
};

function Components() {
  return (
    <Screen>
      <Row gutter={[10, 10]}
        align='middle'>
        <Col span={24}
          className={[utilsCss.h1, utilsCss.center].join(' ')}>
          {pkg.name} - {pkg.description} {pkg.dependencies.react}
        </Col>
        <Col span={6}>
          <Row gutter={[10, 10]}
            align='middle'>
            <Col span={24}
              className={utilsCss.h3}>
              Typeahead
            </Col>
            <Col span={24}>
              <_Typeahead />
            </Col>
          </Row>
        </Col>
        <Col span={6}>
          <Row gutter={[10, 10]}
            align='middle'>
            <Col span={24}
              className={utilsCss.h3}>
              CepTypeahead
            </Col>
            <Col span={24}>
              <_CepTypeahead autoFocus />
            </Col>
          </Row>
        </Col>
        <Col span={24}>
          <Row gutter={[10, 10]}
            align='middle'>
            <Col span={24}
              className={utilsCss.h3}>
              EditableTable
            </Col>
            <Col span={24}>
              <_EditableTable />
            </Col>
          </Row>
        </Col>
      </Row>
    </Screen>
  );
}

export default Components;