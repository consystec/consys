import React, { Component } from 'react';
import { Table } from 'antd';
import PropTypes from 'prop-types';
import tableCss from 'consys/table.css';

class _Table extends Component {
  constructor() {
    super();
  }

  handleTableChange(pagination, filters, sorter) {
    var orderBy = [];

    if (sorter.field) {
      var sortOrder = sorter.order == 'ascend' ? 'asc' : 'desc';
      orderBy.push({
        field: sorter.field,
        sort: sortOrder
      });
    } else {
      orderBy = [];
    }

    this.props.fetch({
      results: pagination.pageSize,
      page: pagination.current,
      pageSize: pagination.pageSize,
      current: pagination.current,
      orderBy,
      ...filters,
    });
  }

  render() {
    const { bordered, className, hover, scroll } = this.props;

    return (
      <Table {...this.props}
        className={[(hover ? '' : tableCss.table), className].join(' ')}
        bordered={typeof bordered === 'undefined' ? true : bordered}
        style={{ whiteSpace: 'nowrap' }}
        onChange={this.handleTableChange.bind(this)} />
    );
  }
}

_Table.propTypes = {
  pagination: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.object
  ]),
  fetch: PropTypes.func,
  className: PropTypes.string,
  hover: PropTypes.bool,
  screenSize: PropTypes.string
};

export default _Table;