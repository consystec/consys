import React, { Component } from 'react';
import { Table, Row, Col, Button, notification } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import PropTypes from 'prop-types';
import Lookup from 'consys/Lookup';
import utilsCss from 'consys/utils.css';
import screenSize from 'consys/screenSize';

const sizeScreen = screenSize();

class CustomTableSelection extends Component {
  constructor() {
    super();
    this.state = { selectedRowKeys: [] };
    this.onSelectChange = this.onSelectChange.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
  }

  componentDidMount() {
    this.setState({ data: this.props.data });
  }

  onSelectChange(selectedRowKeys) {
    this.setState({ selectedRowKeys });
  }

  handleDelete() {
    var { selectedRowKeys, data } = this.state;

    if (selectedRowKeys.length == data.length) {
      data = [];
    }
    else {
      for (var i = 0; i < selectedRowKeys.length; i++) {
        data.splice(selectedRowKeys[i], 1);
      }
    }

    this.setState({ selectedRowKeys: [], data });
    this.props.onDelete && this.props.onDelete(data);
  }

  handleSelect(value) {
    let { data } = this.state;
    var repetido = false;

    for (var i = 0; i < data.length; i++) {
      if (data[i].id == value.id) {
        repetido = true;
      }
    }

    if (!repetido) {
      data.push(value);
      this.setState({ data });
    }
    else {
      notification.warning({
        message: 'Aviso',
        description: 'Esse registro já está inserido',
      });
    }
  }

  render() {
    const { selectedRowKeys } = this.state;

    return (
      <Row>
        <Row className={utilsCss.mb1}
          align="bottom"
          type="flex">
          <Col lg={8}
            md={8}
            sm={24}
            xs={24}>
            <h5>{this.props.title}</h5>
          </Col>
          <Col lg={16}
            md={16}
            sm={24}
            xs={24}
            className={utilsCss.rightAlign}>
            {this.props.lookup ?
              <Lookup {...this.props.lookup}
                onSelect={this.handleSelect}>
                Inserir {sizeScreen == 'xs' || sizeScreen == 'sm' ? null : 'novo'}
              </Lookup>
              : this.props.children}
            <Button type="danger"
              icon={<DeleteOutlined />}
              disabled={!selectedRowKeys.length}
              className={utilsCss.ml2}
              onClick={this.handleDelete}>
              Excluir {sizeScreen == 'xs' || sizeScreen == 'sm' ? null : 'selecionados'}
            </Button>
          </Col>
        </Row>
        <Row>
          <Table columns={this.props.columns}
            size="middle"
            rowSelection={{ selectedRowKeys, onChange: this.onSelectChange }}
            pagination={false}
            {...(sizeScreen == 'xs' || sizeScreen == 'sm' ? { scroll: { x: true }, style: { whiteSpace: 'nowrap' } } : null)}
            bordered={false}
            rowKey={(record, index) => index}
            dataSource={this.state.data} />
        </Row>
      </Row>
    );
  }
}

CustomTableSelection.propTypes = {
  title: PropTypes.string,
  data: PropTypes.array.isRequired,
  lookup: PropTypes.object,
  columns: PropTypes.array.isRequired,
  onDelete: PropTypes.func.isRequired
};

export default CustomTableSelection;