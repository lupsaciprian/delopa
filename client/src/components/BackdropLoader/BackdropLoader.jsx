import React from 'react';
import { Backdrop, CircularProgress, Box } from '@material-ui/core';

import useStyles from './BackdropLoaderStyle';
import { useSelector } from 'react-redux';

export const BackdropLoader = () => {
  const loader = useSelector((state) => state.backdropLoader);
  const classes = useStyles();
  return (
    <div>
      <Backdrop className={classes.backdrop} open={loader.active}>
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
        >
          <CircularProgress size={120} color="inherit" />

          <h1>Delopa</h1>

          <p>Logging you in...</p>
        </Box>
      </Backdrop>
    </div>
  );
};
