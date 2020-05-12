import {
  SET_ALERT,
  REMOVE_ALERT,
  REMOVE_ALL_ALERTS,
} from './../../actionTypes';
import { v4 as uuidv4 } from 'uuid';

export const removeAllAlerts = () => (dispatch) => {
  dispatch({
    type: REMOVE_ALL_ALERTS,
  });
};

export const removeAlert = (id) => (dispatch) => {
  dispatch({
    type: REMOVE_ALERT,
    payload: id,
  });
};

export const setAlert = ({ message, alertType }) => (dispatch) => {
  const id = uuidv4();

  dispatch({
    type: SET_ALERT,
    payload: {
      id,
      message,
      alertType,
    },
  });

  setTimeout(() => {
    dispatch(removeAlert(id));
  }, 5000);
};
