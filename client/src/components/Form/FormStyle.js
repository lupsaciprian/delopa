import { makeStyles } from '@material-ui/core';

const useStyle = makeStyles((theme) => {
  return {
    submitSpacer: {
      ...theme['@global'].noRadius,
      margin: theme.spacing(1, 0),
    },
  };
});

export default useStyle;
