import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { auth } from 'consys';
import PropTypes from 'prop-types';

function ProtectedRoute({ element, to = '/' }) {
  const [user, setUser] = useState(auth?.user);

  useEffect(() => {
    const onUserChange = auth.onUserChange((nUser) => {
      setUser(nUser);
    });

    return () => auth.removeUserChange(onUserChange);
  }, [])

  if (!user) {
    return (
      <Navigate to={to}
        replace />
    );
  }

  return (element);
}

ProtectedRoute.propTypes = {
  element: PropTypes.node,
  to: PropTypes.string
};

export default ProtectedRoute;