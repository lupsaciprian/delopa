import React, { useState, useEffect, lazy, Suspense } from 'react';

import Avatar from '@material-ui/core/Avatar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import { CircularProgress } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Hidden from '@material-ui/core/Hidden';

import PersonAddIcon from '@material-ui/icons/PersonAdd';
import PersonIcon from '@material-ui/icons/Person';
import LockOpenIcon from '@material-ui/icons/LockOpen';

import useStyles from './AuthStyle';

import { useDispatch, useSelector } from 'react-redux';
import { register, login } from '../../store/actions/auth';

import { PictureBehind } from '../../components/PictureBehind/PictureBehind';
import { Alert } from '../../components/Alert/Alert';

// Modes
import { modesId, modes } from './Modes';
import {
  initModes,
  destroyMode,
  setActiveMode,
} from '../../store/actions/mode';

const Form = lazy(() => import('../../components/Form/Form'));

const Auth = () => {
  const classes = useStyles();
  const [activeMode, setActive] = useState(null);

  const mode = useSelector((state) => state.mode);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(initModes(modes));

    return () => {
      dispatch(destroyMode('authenticate'));
    };
  }, []);

  useEffect(() => {
    const authMode = mode[modesId];
    if (authMode) setActive(authMode.modes[authMode.activeMode]);

    console.log('Active mode: ', activeMode);
  }, [mode]);

  return (
    <Grid className={classes.root} container>
      <CssBaseline />
      <Hidden mdDown>
        <Grid md={8} item className={classes.imageContainer}>
          <PictureBehind img="https://www.hawksearch.com/assets/45/44/45444989-b3d7-4fca-88ea-8a6c143c0285/developer-role-glow.png" />
        </Grid>
      </Hidden>

      <Grid xs={12} md={4} className={classes.formContainer} item>
        {activeMode && (
          <Container component="main" maxWidth="xs">
            <div className={classes.paper}>
              <Avatar className={classes.avatar}>
                {activeMode.id === 'auth_login' && <PersonIcon />}
                {activeMode.id === 'auth_register' && <PersonAddIcon />}
                {activeMode.id === 'auth_forgot' && <LockOpenIcon />}
              </Avatar>
              <Typography
                className={classes.heading}
                component="h1"
                variant="h5"
              >
                {activeMode.heading}
              </Typography>

              <Alert />

              <Suspense fallback={<CircularProgress />}>
                <Form
                  id={activeMode.id}
                  fields={activeMode.fields}
                  submit={{
                    submitFunction: async (data, { setSubmitting }) => {
                      if (activeMode.id === 'auth_register')
                        await dispatch(register(data));
                      if (activeMode.id === 'auth_login')
                        await dispatch(login(data));
                      setSubmitting(false);
                    },
                    button: {
                      options: {
                        fullWidth: true,
                        variant: 'contained',
                        color: 'primary',
                        className: classes.submit,
                      },
                      text: activeMode.submit,
                    },
                  }}
                ></Form>
              </Suspense>

              <Grid container>
                <Grid item xs>
                  {activeMode.id !== 'auth_forgot' && (
                    <Link
                      onClick={() =>
                        dispatch(setActiveMode(modesId, 'auth_forgot'))
                      }
                      variant="body2"
                    >
                      {mode[modesId].modes['auth_forgot'].link}
                    </Link>
                  )}
                </Grid>
                <Grid item>
                  {activeMode.id === 'auth_login' && (
                    <Link
                      onClick={() =>
                        dispatch(setActiveMode(modesId, 'auth_register'))
                      }
                      variant="body2"
                    >
                      {activeMode.link}
                    </Link>
                  )}

                  {activeMode.id === 'auth_register' && (
                    <Link
                      onClick={() =>
                        dispatch(setActiveMode(modesId, 'auth_login'))
                      }
                      variant="body2"
                    >
                      {activeMode.link}
                    </Link>
                  )}

                  {activeMode.id === 'auth_forgot' && (
                    <Link
                      onClick={() => {
                        dispatch(setActiveMode(modesId, 'auth_login'));
                      }}
                      variant="body2"
                    >
                      {activeMode.link}
                    </Link>
                  )}
                </Grid>
              </Grid>
            </div>
            <Box mt={8}></Box>
          </Container>
        )}
      </Grid>
    </Grid>
  );
};

export default Auth;
