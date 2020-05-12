import { makeStyles } from '@material-ui/core';

const navBarHeight = '64px';
// to be reformated
// https://github.com/mui-org/material-ui/issues/15662

const pageHeight = `calc(100vh - ${navBarHeight})`;
const useStyle = makeStyles((theme) => ({
  container: {
    minHeight: pageHeight,
    marginTop: navBarHeight,
  },
}));

export default useStyle;
