import React, { useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
// Material
import { Typography, Grid, Box, Button, Link } from '@material-ui/core';

// Redux
import { useSelector, useDispatch } from 'react-redux';
import { getMyProfile } from '../../store/actions/profile';

import WarningIcon from '@material-ui/icons/Warning';
import PersonAddIcon from '@material-ui/icons/PersonAdd';

export const Dashboard = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const profile = useSelector((state) => state.profile.profile);

  useEffect(() => {
    dispatch(getMyProfile());
  }, []);

  return (
    <Grid container direction="column" alignItems="center" justify="center">
      <Grid item sm={12} md={4}>
        <Typography variant="h2">Dashboard</Typography>

        <Typography variant="body1">Welcome, {user && user.name}</Typography>

        {profile !== null ? (
          <React.Fragment> has a </React.Fragment>
        ) : (
          <React.Fragment>
            <Box p={1} my={4} display="flex">
              <WarningIcon></WarningIcon>
              <Typography variant="subtitle1">
                You have not yet set up a profile!
              </Typography>
            </Box>

            <Link component={RouterLink} to="/profile/create">
              <Button
                startIcon={<PersonAddIcon />}
                variant="outlined"
                color="default"
                fullWidth
              >
                Create Profile
              </Button>
            </Link>
          </React.Fragment>
        )}
      </Grid>

      <Grid item sm></Grid>
    </Grid>
  );
};
