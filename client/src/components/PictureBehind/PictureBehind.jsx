import React from 'react';

import useStyles from './PictureBehindStyle';

export const PictureBehind = (props) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <img className={classes.img} src={props.img} alt="Blabla Behind" />
    </div>
  );
};
