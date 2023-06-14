import React, { Component } from 'react';
import { Navigate } from 'react-router-dom';
import auth from 'consys/auth';
import PropTypes from 'prop-types';

class NoUser extends Component {
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
    const { url } = this.props;
    if (this.state.user) {
      const { from } = { from: { pathname: url } };
      return (
        <Navigate to={from} />
      );
    }
    return <span></span>;
  }
}

NoUser.propTypes = {
  url: PropTypes.string.isRequired
}

export default NoUser;