import React, { Component } from 'react';
import { Table } from 'antd';
import PropTypes from 'prop-types';
import tableCss from 'consys/table.css';
import { le } from 'consys/screenSize';

class _Table extends Component {
  constructor() {
    super();
    this.state = {
      scrollProps: {
        scroll: { y: this.state?.scroll?.y }
      }
    }
  }

  componentDidMount() {
    const { screenSize, scroll } = this.props;
    if (le(screenSize || 'md')) {
      this.setState({
        scrollProps: {
          scroll: { ...this.state?.scroll, x: scroll || true },
          style: { whiteSpace: 'nowrap' }
        }
      });
    }
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
    const { bordered, className, hover } = this.props;
    const { scrollProps } = this.state;

    return (
      <Table {...{ ...this.props, ...scrollProps?.scroll, ...scrollProps?.style }}
        className={[(hover ? '' : tableCss.table), className].join(' ')}
        bordered={typeof bordered === 'undefined' ? true : bordered}
        onChange={this.handleTableChange.bind(this)} />
    );
  }
}


_Table.propTypes = {
  pagination: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.object
  ]),
  scroll: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.object
  ]),
  fetch: PropTypes.func,
  className: PropTypes.string,
  hover: PropTypes.bool,
  screenSize: PropTypes.string,
  bordered: PropTypes.bool,
};

export default _Table;