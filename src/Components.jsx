import React, { forwardRef } from 'react';
import { Col, notification, Row } from 'antd';
import utilsCss from '../css/utils.css';
import pkg from '../package.json';
import Typeahead from './typeahead/Typeahead';
import Screen from './screen/Screen';
import CepTypeahead from './cepTypeahead/CepTypeahead';

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
      </Row>
    </Screen>
  );
}

export default Components;