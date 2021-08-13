import React, { Component } from 'react';
import { Tooltip } from 'antd';
import { CalendarOutlined } from '@ant-design/icons';
import moment from 'moment';
import PropTypes from 'prop-types';
import utilsCss from 'consys/utils.css';

class InfoTooltip extends Component {
  render() {
    const { type, cadastro, altera, fontSize, className } = this.props;
    let tituloCadastro = null, tituloAltera = null;

    if (type == 'date') {
      if (cadastro) {
        tituloCadastro = (
          <div>
            Cadastrado em <b>{moment(this.props.cadastro, 'DD/MM/YYYY')}</b>
          </div>
        )
      }

      if (altera) {
        tituloAltera = (
          <div>
            Alterado em <b>{moment(this.props.cadastro, 'DD/MM/YYYY')}</b>
          </div>
        )
      }
    }

    if (type == 'user') {
      if (cadastro) {

        tituloCadastro = (
          <div>
            Cadastrado por<br />
            <label className={utilsCss.bold}>{cadastro}</label>
          </div>
        );
      }

      if (altera) {

        tituloAltera = (
          <div>
            Alterado por<br />
            <label className={utilsCss.bold}>{altera}</label>
          </div>
        );
      }
    }

    return (
      <span className={className}>
        <Tooltip title={
          <span>
            {cadastro ? tituloCadastro : 'Nenhum dado para mostrar'}
            {tituloAltera ? <span>{tituloAltera}</span> : ''}
          </span>
        }>
          <CalendarOutlined style={{ fontSize: fontSize || 20 }} />
        </Tooltip>
      </span>
    );
  }
}

InfoTooltip.propTypes = {
  type: PropTypes.string,
  cadastro: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
    PropTypes.instanceOf(Date),
    PropTypes.number
  ]),
  altera: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.instanceOf(Date),
    PropTypes.number,
    PropTypes.string,
  ]),
  fontSize: PropTypes.number,
  className: PropTypes.node
};

export default InfoTooltip;