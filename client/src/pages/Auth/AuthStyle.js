import { makeStyles } from '@material-ui/core';
const pageHeight = 'calc(100vh - 64px)';
const useStyle = makeStyles((theme) => ({
  heading: {
    margin: theme.spacing(1),
  },
  imageContainer: {
    height: pageHeight,
  },
  formContainer: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    width: theme.spacing(7),
    height: theme.spacing(7),
    backgroundColor: theme.palette.secondary.main,
  },
  submit: {
    margin: theme.spacing(0, 0, 2),
  },
}));

export default useStyle;
