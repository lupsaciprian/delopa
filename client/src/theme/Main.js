import { createMuiTheme } from '@material-ui/core';
import { indigo, teal, red } from '@material-ui/core/colors';

import Globals from './Globals';

export default createMuiTheme({
  palette: {
    type: 'dark',
    primary: {
      // Purple and green play nicely together.
      main: indigo[300],
    },
    secondary: {
      // This is green.A700 as hex.
      main: teal[200],
    },
    error: {
      main: red[400],
    },
  },
  overrides: {
    MuiButton: {
      root: {
        textTransform: 'none',
      },
    },
    MuiCircularProgress: {
      root: {
        marginTop: '16px',
        marginBottom: '16px',
      },
    },
  },

  '@global': {
    ...Globals,
  },
});
