import React, { Component } from 'react';
import { Row, Col } from 'antd';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import utilsCss from 'consys/utils.css';
import moment from 'moment';
import PropTypes from 'prop-types';

class DatePickerRange extends Component {
  constructor() {
    super();
    this.state = {
      data: moment(),
      range: moment()
    }

    this.renderSeta = this.renderSeta.bind(this);
    this.igualSelecionado = this.igualSelecionado.bind(this);
    this.alteraData = this.alteraData.bind(this);
    this.alteraRange = this.alteraRange.bind(this);
  }

  componentDidMount() {
    const { data } = this.state;
    const { onBlur } = this.props;
    onBlur && onBlur(data.toDate());
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    const { value } = this.props;

    if (typeof nextProps.value !== 'undefined' && !moment(nextProps.value).isSame(value, 'day')) {
      const tmpDate = moment(nextProps.value);
      this.alteraData(tmpDate, typeof value === 'undefined' ? tmpDate : undefined);

      return;
    }
  }

  alteraRange(event, qtd) {
    event.stopPropagation();
    event.preventDefault()

    const { range } = this.state;

    range.add(qtd, 'M');

    this.setState({ range });
  }

  renderSeta({ type }) {
    return (
      <Col span={2}
        onClick={(e) => this.alteraRange(e, type == 'left' ? -1 : 1)}
        className={[utilsCss.center, utilsCss.pointer, utilsCss.py2].join(' ')}>
        {type == 'left' ? <LeftOutlined /> : <RightOutlined />}
      </Col>
    )
  }

  igualSelecionado(mes, ano) {
    const { data } = this.state;

    return (data.format('MMM/YYYY') === mes + '/' + ano);
  }

  alteraData(data, range) {
    const { onBlur } = this.props;
    let state = { data };

    if (typeof range !== 'undefined') {
      state = {
        ...state,
        range
      }
    }

    this.setState(state);

    onBlur && onBlur(data.toDate());
  }

  render() {
    const { range, data } = this.state;
    const datas = [];

    for (var i = -2; i <= 2; i++) {
      const dataCopy = moment(range || data);
      dataCopy.add(i, 'M');
      datas.push(dataCopy);
    }

    return (
      <Row align='middle'
        className={[utilsCss.border, utilsCss.rounded].join(' ')}>
        {this.renderSeta({ type: 'left' })}
        {datas && datas.map((dt, index) => {
          const mes = dt.format('MMM');
          const ano = dt.format('YYYY');
          const borderRight = index < datas.length ? utilsCss.borderRight : null;
          const borderLeft = (index == 0) ? utilsCss.borderLeft : null;

          return (
            <Col span={4}
              onClick={() => this.alteraData(dt)}
              className={[utilsCss.center, utilsCss.pointer, utilsCss.py1, borderRight, borderLeft].join(' ')}
              key={index}>
              <h3>
                {this.igualSelecionado(mes, ano) ?
                  <a>
                    {mes.toString().toUpperCase()}
                    <br />
                    {ano}
                  </a>
                  :
                  <span>
                    {mes.toString().toUpperCase()}
                    <br />
                    {ano}
                  </span>}
              </h3>
            </Col>
          )
        }
        )}
        {this.renderSeta({
          type: 'right'
        })}
      </Row>
    );
  }
}

DatePickerRange.propTypes = {
  onBlur: PropTypes.func
}
export default DatePickerRange;