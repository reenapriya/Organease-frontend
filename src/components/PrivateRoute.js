

import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/UserContext';

const PrivateRoute = ({ children, permittedRoles}) => {
  const { user ,isLoggedIn} = useAuth();

  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  }

//   if(!permittedRoles.includes(user.role)) {
//     return <Navigate to="/unauthorized" />
// }


  return children;
};

export default PrivateRoute;
