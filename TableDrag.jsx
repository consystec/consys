import React from 'react';
import { Table } from 'antd';
import PropTypes from 'prop-types';
import { DndProvider, DragSource, DropTarget } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import update from 'immutability-helper';
import TableCss from 'consys/table.css';
import screenSize from 'consys/screenSize';

let sizeScreen = screenSize();

let dragingIndex = -1;

class BodyRow extends React.Component {
  render() {
    const { isOver, connectDragSource, connectDropTarget, moveRow, ...restProps } = this.props;
    const style = { ...restProps.style, cursor: 'move' };

    let className;

    if (isOver) {
      if (restProps.index > dragingIndex) {
        className = TableCss.drop_over_downward;
      }
      if (restProps.index < dragingIndex) {
        className = TableCss.drop_over_upward;
      }
    }

    return connectDragSource(
      connectDropTarget(<tr {...restProps} className={className} style={style} />),
    );
  }
}

const rowSource = {
  beginDrag(props) {
    dragingIndex = props.index;
    return {
      index: props.index,
    };
  },
};

const rowTarget = {
  drop(props, monitor) {
    const dragIndex = monitor.getItem().index;
    const hoverIndex = props.index;

    if (dragIndex === hoverIndex) {
      return;
    }

    props.moveRow(dragIndex, hoverIndex);

    monitor.getItem().index = hoverIndex;
  },
};

const DragableBodyRow = DropTarget('row', rowTarget, (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
  isOver: monitor.isOver(),
}))(
  DragSource('row', rowSource, connect => ({
    connectDragSource: connect.dragSource(),
  }))(BodyRow),
);

class TableDrag extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    };
  }

  components = {
    body: {
      row: DragableBodyRow,
    },
  };

  UNSAFE_componentWillReceiveProps(nextProps) {
    const {dataSource} = this.props;
    const {data} = this.state;
    if (data !== nextProps.dataSource) {
      this.setState({data: dataSource})
    }
  }

  moveRow = (dragIndex, hoverIndex) => {
    const { callback } = this.props;
    const { data } = this.state;
    const dragRow = data[dragIndex];

    this.setState(
      update(this.state, {
        data: {
          $splice: [[dragIndex, 1], [hoverIndex, 0, dragRow]],
        },
      }),
      () => callback && callback(this.state.data)
    );
  };

  render() {
    const { data } = this.state;

    return (
      <DndProvider backend={HTML5Backend}>
        <Table {...this.props} 
          dataSource={data}
          {...(sizeScreen == 'xs' || sizeScreen == 'sm' || sizeScreen == 'md' ? {scroll: {x: true}, style: {whiteSpace: 'nowrap'}} : null)}
          components={this.components}
          onRow={(_, index) => ({
            index,
            moveRow: this.moveRow,
          })}
        />
      </DndProvider>
    );
  }
}

TableDrag.propTypes = {
  pagination: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.object
  ]),
  fetch: PropTypes.func,
  className: PropTypes.string,
  hover: PropTypes.bool,
  callback: PropTypes.func.isRequired
};

export default TableDrag;