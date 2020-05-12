import React, { lazy, Suspense, useEffect, useState } from 'react';
import {
  Grid,
  Typography,
  Divider,
  Box,
  CircularProgress,
} from '@material-ui/core';

import GeneralInformationForm from './GeneralInformationForm';
import StepperWrapper from '../../../components/Stepper/Stepper';
import { useSelector, useDispatch } from 'react-redux';

import { modesId, modes } from './Modes';
import { initModes, destroyMode } from '../../../store/actions/mode';

const Form = lazy(() => import('../../../components/Form/Form'));

export const CreateProfile = () => {
  console.log(GeneralInformationForm);

  const dispatch = useDispatch();
  const mode = useSelector((state) => state.mode);

  const [modeActive, setActive] = useState(null);

  useEffect(() => {
    dispatch(initModes(modes));

    return () => {
      dispatch(destroyMode(modesId));
    };
  }, []);

  useEffect(() => {
    const createProfileMode = mode[modesId];
    if (createProfileMode)
      setActive(createProfileMode.modes[createProfileMode.activeMode]);

    console.log('ACTIVE MODE: ', modeActive);
  }, [mode]);

  return (
    <Grid container alignItems="center" justify="center">
      <Grid item sm={12} md={8} lg={6}>
        <Typography variant="h4" align="center">
          Create a new profile
        </Typography>

        <Box p={3}>
          <Divider />
        </Box>

        {modeActive && (
          <div>
            <StepperWrapper modeId={modesId} />

            <Suspense fallback={<CircularProgress />}>
              <Form
                id={'createProfileForm'}
                fields={modeActive.fields}
                submit={{
                  submitFunction: async (data, { setSubmitting }) => {
                    console.log(data);
                    setSubmitting(false);
                  },
                  button: {
                    options: {
                      fullWidth: true,
                      variant: 'contained',
                      color: 'primary',
                    },
                    text: 'Create Profile',
                  },
                }}
              ></Form>
            </Suspense>
          </div>
        )}
      </Grid>
    </Grid>
  );
};
