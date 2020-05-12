import React from 'react';
import PropTypes from 'prop-types';
import { Box, CssBaseline } from '@material-ui/core';

import useStyles from './PageDefaultStyle';

export const PageDefault = (Component, props) => {
  const classes = useStyles();

  return () => {
    return (
      <Box className={classes.container} p={4}>
        <CssBaseline />
        <Component />
      </Box>
    );
  };
};

PageDefault.propTypes = {
  component: PropTypes.func.isRequired,
  props: PropTypes.object,
};
