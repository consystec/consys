import React, { Component } from 'react';
import PropTypes from 'prop-types';
import notFoundCss from 'consys/notFound.css';
import {withRouter} from 'react-router-dom';

class NotFound extends Component {
  render() {
    const { location, history } = this.props; 
    return (
      <div className={notFoundCss.notFound}>
        <h5>
          A página
          <br/>
          <small>{location.pathname}</small>
          <br/>
          não foi encontrada
          <br/>
          <a onClick={() => history.goBack()}>clique aqui para voltar ao início</a>
        </h5>
      </div>
    );
  }
}

NotFound.propTypes = {
  location: PropTypes.object,
  history: PropTypes.object
};


const NotFoundRouter = withRouter(NotFound);
export default NotFoundRouter;