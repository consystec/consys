import React, { Component } from 'react';
import { Tooltip } from 'antd';
import { CalendarOutlined } from '@ant-design/icons';
import { FormattedDate } from 'react-intl';
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
            Cadastrado em <b><FormattedDate value={this.props.cadastro} /></b>
          </div>
        )
      }

      if (altera) {
        tituloAltera = (
          <div>
            Alterado em <b><FormattedDate value={this.props.altera} /></b>
          </div>
        )
      }
    }

    if (type == 'user') {
      if (cadastro) {
        const id = cadastro.id;
        const nome = typeof cadastro.descricao !== 'undefined' ? cadastro.descricao : cadastro.nome;

        tituloCadastro = (
          <div>
            Cadastrado por<br />
            <label className={utilsCss.bold}>{(id ? id + ' - ' : '') + nome}</label>
          </div>
        );
      }

      if (altera) {
        const id = altera.id;
        const nome = typeof altera.descricao !== 'undefined' ? altera.descricao : altera.nome;

        tituloAltera = (
          <div>
            Alterado por<br />
            <label className={utilsCss.bold}>{(id ? id + ' - ' : '') + nome}</label>
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
    PropTypes.number
  ]),
  fontSize: PropTypes.number,
  className: PropTypes.node
};

export default InfoTooltip;