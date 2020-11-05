import React, { Component } from 'react';
import { Button, Modal } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import Table from 'consys/Table';
import http from 'consys/http';
import PropTypes from 'prop-types';
import screenSize from 'consys/screenSize';

const sizeScreen = screenSize();

class Lookup extends Component {
  constructor() {
    super();
    this.state = { visible: false };

    this.openLookup = this.openLookup.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.handleOk = this.handleOk.bind(this);
    this.search = this.search.bind(this);
  }

  search(params = { page: 1 }) {
    let searchProp = this.props.search;
    const { method } = this.props;

    params = {
      filters: this.state.filters,
      orderBy: this.state.orderBy,
      ...params
    };

    if (typeof searchProp == 'undefined') {
      searchProp = (url, params) => {
        let objParams = {
          method: method ? method : 'POST'
        };

        if (method !== 'GET') {
          objParams = {
            ...objParams,
            body: JSON.stringify(params)
          };
        } else {
          objParams = {
            ...objParams,
            params: JSON.stringify(params)
          };
        }
        return http(url, objParams);
      }
    }

    this.setState({ loading: true });
    searchProp(this.props.url, params).then((data) => {
      const pagination = { ...this.state.pagination };
      pagination.current = params.page;
      pagination.total = data.totalElements;
      pagination.size = sizeScreen == 'xs' || sizeScreen == 'sm' ? "small" : "";

      this.setState({
        loading: false,
        data: data.content,
        pagination,
        filters: params.filters,
        orderBy: params.orderBy
      });
    });
  }

  openLookup(e) {
    e.preventDefault();
    e.stopPropagation();

    this.setState({ visible: true });
    this.search();
  }

  handleCancel() {
    this.setState({ visible: false });
  }

  handleOk(record, index) {
    this.setState({ visible: false });
    this.props.onSelect && this.props.onSelect(record, index);
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    const { data } = this.props;

    if (nextProps.data !== data) {
      this.setState({ data: nextProps.data, pagination: nextProps.pagination });
    }
  }

  componentDidMount() {
    const { onSearchReady } = this.props;
    onSearchReady && onSearchReady(this.search);
  }

  render() {
    const { loading } = this.state;
    const { rowKey, children, width, body, shape, disabled } = this.props;

    return (
      <span>
        <Button disabled={disabled}
          tabIndex="-1"
          shape={shape ? null : "circle"}
          onClick={this.openLookup}>
          {children || <SearchOutlined />}
        </Button>
        <Modal width={width}
          visible={this.state.visible}
          title={this.props.title}
          onOk={this.handleOk}
          zIndex={1000}
          onCancel={this.handleCancel}
          footer={[
            <Button key="back"
              onClick={this.handleCancel}>
              Voltar
            </Button>
          ]}>
          {body}
          <Table columns={this.props.columns}
            rowKey={(record) => rowKey ? rowKey(record) : record.id}
            dataSource={this.state.data}
            {...(sizeScreen == 'xs' || sizeScreen == 'sm' ? { scroll: { x: true }, style: { whiteSpace: 'nowrap' } } : null)}
            pagination={this.state.pagination}
            loading={loading}
            size="midle"
            onRow={(record, rowIndex) => {
              return {
                onClick: () => this.handleOk(record, rowIndex)
              };
            }}
            fetch={this.search} />
        </Modal>
      </span>
    );
  }
}

Lookup.propTypes = {
  url: PropTypes.string.isRequired,
  onSelect: PropTypes.func,
  title: PropTypes.string.isRequired,
  rowKey: PropTypes.func,
  search: PropTypes.func,
  onSearchReady: PropTypes.func,
  columns: PropTypes.array.isRequired,
  disabled: PropTypes.bool,
  children: PropTypes.node,
  button: PropTypes.object,
  width: PropTypes.number,
  body: PropTypes.node,
  data: PropTypes.array,
  pagination: PropTypes.object,
  shape: PropTypes.string,
  method: PropTypes.string,
};

export default Lookup;