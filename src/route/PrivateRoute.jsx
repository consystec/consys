import React, { useEffect, useState } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { auth } from 'consys';
import PropTypes from 'prop-types';


function ProtectedRoute({ to = '/' }) {
  const [user, setUser] = useState(auth?.user);
  const prevRoute = useLocation();

  useEffect(() => {
    const onUserChange = auth.onUserChange((nUser) => {
      setUser(nUser);
    });

    return () => auth.removeUserChange(onUserChange);
  }, [])

  if (!user) {
    return (
      <Navigate to={to}
        state={{ prevRoute }}
        replace />
    );
  }

  return <Outlet />;
}

ProtectedRoute.propTypes = {
  element: PropTypes.node,
  to: PropTypes.string
};

export default ProtectedRoute;