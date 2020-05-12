import { makeStyles } from '@material-ui/core';

const useStyle = makeStyles((theme) => ({
  chips: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  selectedOption: {
    backgroudColor: theme.palette.primary.main,
  },
}));

export default useStyle;
