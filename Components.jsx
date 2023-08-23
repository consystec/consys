import React, { useEffect, useState } from 'react';
import { Row, Col } from 'antd';
import utilsCss from '../css/utils.css';
import pkg from '../package.json';
import Screen from './screen/Screen';
import ValueMaskInput from './valueMaskInput/ValueMaskInput';


function Components() {
  const [value, setValue] = useState();

  return (
    <Screen>
      <Row gutter={[10, 10]}
        align='middle'>
        <Col span={24}
          className={[utilsCss.h1, utilsCss.center].join(' ')}>
          {pkg.name} - {pkg.description} {pkg.dependencies.react.replace('^', '')}
        </Col>
        <Col span={24}>
          <Row gutter={[10, 10]}
            align='middle'>
            <Col span={24}
              className={utilsCss.h3}>
              ValueMaskInput
            </Col>
            <Col span={6}>
              <ValueMaskInput value={value}
                onChange={(newOne) => setValue(newOne)} />
            </Col>
          </Row>
        </Col>
      </Row>
    </Screen>
  );
}

export default Components;