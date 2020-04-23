import React, { Component } from 'react';
import { notification } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import CepInput from 'consys/CepInput';
import http from 'consys/http';
import PropTypes from 'prop-types';

class CepTypeahead extends Component {
  constructor() {
    super();
    this.state = { loading: false };

    this.search = this.search.bind(this);
  }

  search(value, onSuccess, onFail) {
    const notificationError = () => {
      notification.error({
        message: 'Opa! Temos um problema',
        description: 'O CEP informado não é válido',
      });
    };

    if (value && value.trim() !== '') {
      if (value.length !== 9) {
        notificationError();
        onFail && onFail();
        return;
      }

      this.setState({ loading: true });
      http('https://viacep.com.br/ws/' + value + '/json/', { api: false })
        .then((response) => {
          this.setState({ loading: false });

          if (response && response.erro) {
            notificationError();
            onFail && onFail();
          } else {
            onSuccess && onSuccess(response);
          }
        }).catch(() => {
          this.setState({ loading: false });
          notificationError();
          onFail && onFail();
        });
    }
  }

  render() {
    const { onSuccess, onFail, ...others } = this.props;
    return (
      <CepInput {...others}
        onPressEnter={(e) => this.search(e.target.value, onSuccess, onFail)}
        onBlur={(e) => this.search(e.target.value, onSuccess, onFail)}
        suffix={this.state.loading ? <LoadingOutlined /> : <span />} />
    );
  }
}

CepTypeahead.propTypes = {
  onSuccess: PropTypes.func,
  onFail: PropTypes.func
};
export default CepTypeahead;