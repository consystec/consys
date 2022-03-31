import React, { useEffect, useState } from 'react';
import { Row, Col } from 'antd';
import utilsCss from '../css/utils.css';
import pkg from '../package.json';
import Table from './table/Table';
import Screen from './screen/Screen';


function Components() {
  const [data, setData] = useState([]);
  const columns = [
    {
      title: 'Item 1',
      key: 'item1',
      dataIndex: 'item1',
    },
    {
      title: 'Item 2',
      key: 'item2',
      dataIndex: 'item2',
    },
    {
      title: 'Item 3',
      key: 'item3',
      dataIndex: 'item3',
    },
    {
      title: 'Item 4',
      key: 'item4',
      dataIndex: 'item4',
    },
    {
      title: 'Item 5',
      key: 'item5',
      dataIndex: 'item5',
    },
    {
      title: 'Item 6',
      key: 'item6',
      dataIndex: 'item6',
    }
  ];

  useEffect(() => {
    setData([
      {
        item1: 'Descrição', item2: 'Descrição 2', item3: 'Descrição 3',
        item4: 'Descrição 4', item5: 'Descrição 5', item6: 'Descrição 6'
      },
      {
        item1: 'Descrição', item2: 'Descrição 2', item3: 'Descrição 3',
        item4: 'Descrição 4', item5: 'Descrição 5', item6: 'Descrição 6'
      },
      {
        item1: 'Descrição', item2: 'Descrição 2', item3: 'Descrição 3',
        item4: 'Descrição 4', item5: 'Descrição 5', item6: 'Descrição 6'
      }
    ]);
  }, [])
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
              Table
            </Col>
            <Col span={24}>
              <Table columns={columns}
                dataSource={data.concat(data.concat(data.concat(data.concat(data))))}
                pagination={false}
                scroll={{ x: 600, y: 400 }} />
            </Col>
          </Row>
        </Col>
      </Row>
    </Screen>
  );
}

export default Components;