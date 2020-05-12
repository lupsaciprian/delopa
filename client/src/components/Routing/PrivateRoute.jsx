import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { CircularProgress } from '@material-ui/core';

const PrivateRoute = ({ component: Component, ...rest }) => {
  const auth = useSelector((state) => state.auth);
  const backdropLoader = useSelector((state) => state.backdropLoader);

  console.log(backdropLoader);
  // To prevent unauthorized access when clicking Dashboard in the navbar
  // Show a fragment until the backdrop loader finished loading
  return (
    <Route
      {...rest}
      render={(props) =>
        !backdropLoader.active && !auth.isAuthenticated ? (
          <Redirect to="/authenticate" />
        ) : (
          <Component {...props} />
        )
      }
    />
  );
};

export default PrivateRoute;
