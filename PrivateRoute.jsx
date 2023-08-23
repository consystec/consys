import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import auth from 'consys/auth';
import Config from 'consys/Config';
import PropTypes from 'prop-types';

class PrivateRoute extends Component {
  constructor() {
    super();
    this.state = {
      user: auth.user
    };
  }
  componentDidMount() {
    var that = this;
    this.onUserChange = auth.onUserChange((user) => {
      that.setState({ user });
    });
  }
  componentWillUnmount() {
    auth.removeUserChange(this.onUserChange);
  }
  render() {
    if (!this.state.user) {
      return (
        <Redirect to={{
          pathname: Config.get('loginUrl'),
          state: { from: this.props.location }
        }} />
      );
    }
    return (<Route {...this.props} />);
  }
}

PrivateRoute.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }),
};

export default PrivateRoute;