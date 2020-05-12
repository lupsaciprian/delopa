import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
} from './../../actionTypes';

const INITIAL_STATE = {
  token: localStorage.getItem('token'),
  isAuthenticated: null,
  mode: null,
  user: null,
};

export default (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
    case USER_LOADED:
      return { ...state, isAuthenticated: true, user: payload };
    case REGISTER_SUCCESS:
    case LOGIN_SUCCESS:
      localStorage.setItem('token', payload.token);
      return { ...state, ...payload, isAuthenticated: true };

    case LOGOUT:
    case AUTH_ERROR:
    case LOGIN_FAIL:
    case REGISTER_FAIL:
      localStorage.removeItem('token');
      return { ...state, token: null, isAuthenticated: false };

    default:
      return state;
  }
};
