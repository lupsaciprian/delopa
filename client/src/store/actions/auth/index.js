import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  CLEAR_PROFILE,
} from './../../actionTypes';
import axios from 'axios';
import { setAlert } from '../alert/alert';
import setAuthToken from '../../../util/SetAuthToken';
import { setBackdropLoader, resetBackdropLoader } from '../loaders';
import History from '../../../util/History';

const formatDataByMode = (data, mode) => {
  const formatted = {};

  Object.keys(data).forEach((key) => {
    const formattedKey = key.replace(`${mode}_`, '');
    formatted[formattedKey] = data[key];
  });

  return formatted;
};

// Register user
export const register = (data) => async (dispatch) => {
  const formatted = formatDataByMode(data, 'register');
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  try {
    const res = await axios.post('/api/users', formatted, config);

    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data,
    });

    dispatch(loadUser());

    History.push('/dashboard');
  } catch (err) {
    dispatch({
      type: REGISTER_FAIL,
    });
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) =>
        dispatch(
          setAlert({
            message: error.msg,
            alertType: 'error',
          })
        )
      );
    }
  }
};

// Login user
export const login = (data) => async (dispatch) => {
  const formatted = formatDataByMode(data, 'login');
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  try {
    const res = await axios.post('/api/auth', formatted, config);

    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data,
    });

    dispatch(loadUser());
    History.push('dashboard/');
  } catch (err) {
    dispatch({
      type: LOGIN_FAIL,
    });
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) =>
        dispatch(
          setAlert({
            message: error.msg,
            alertType: 'error',
          })
        )
      );
    }
  }
};

export const logout = () => (dispatch) => {
  dispatch({ type: CLEAR_PROFILE });
  dispatch({ type: LOGOUT });

  History.push('/');
};

// Check user by token
export const loadUser = () => async (dispatch) => {
  console.log('LOAD USER');
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  try {
    console.log('LOADING USER');
    dispatch(
      setBackdropLoader({
        actionId: 'loadUserData',
        active: true,
        messages: ['Logging you in...'],
      })
    );

    const res = await axios.get('/api/auth');

    dispatch({
      type: USER_LOADED,
      payload: res.data,
    });

    setTimeout(() => dispatch(resetBackdropLoader()), 500);
  } catch (err) {
    History.push('/authenticate');
    dispatch({
      type: AUTH_ERROR,
    });
  }
};
