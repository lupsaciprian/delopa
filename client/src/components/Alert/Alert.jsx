import React, { useState, Fragment, useEffect } from 'react';

import { Box, Grid, Typography, Grow, Collapse } from '@material-ui/core';
import ErrorIcon from '@material-ui/icons/Error';

import useStyles from './AlertStyles';

import { useSelector } from 'react-redux';

export const Alert = () => {
  const classes = useStyles();

  const [animate, setAnimate] = useState(false);

  const alerts = useSelector((state) => state.alerts);

  useEffect(() => {
    setAnimate(true);
  }, [alerts]);

  return (
    <Fragment>
      <Collapse in={animate} className="fullwidth">
        <div>
          {alerts.map((alert, k) => {
            return (
              <Grow
                key={alert.id}
                in={animate}
                style={{ transformOrigin: '0 0 0' }}
                {...(animate ? { timeout: k + 1 * 500 } : {})}
              >
                <Box
                  bgcolor={`${[alert.alertType]}.main`}
                  className="fullwidth"
                  color={`${[alert.alertType]}.contrastText`}
                  p={1}
                  mt={1}
                  mb={1}
                >
                  {/*     style={{ transitionDelay: growAnim ? `${k * 500}ms` : '0ms' }} */}
                  <Grid
                    className={classes.alertItem}
                    container
                    wrap="nowrap"
                    alignItems="center"
                    spacing={2}
                  >
                    <Grid item>
                      <ErrorIcon p={1} />
                    </Grid>
                    <Grid item>
                      <Typography variant="body1" color="textSecondary" ml={1}>
                        {alert.message}
                      </Typography>
                    </Grid>
                  </Grid>
                </Box>
              </Grow>
            );
          })}
          {/* </Collapse> */}
        </div>
      </Collapse>
    </Fragment>
  );
};
