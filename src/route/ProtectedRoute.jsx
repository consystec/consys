import React from 'react';
import { Navigate } from 'react-router-dom';
import { auth } from 'consys';

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

export default ProtectedRoute;