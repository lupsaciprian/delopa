import {
  SET_BACKDROP_LOADER,
  RESET_BACKDROP_LOADER,
  ADD_BACKDROP_LOADER_MESSAGE,
} from '../../actionTypes';
import { v4 as uuidv4 } from 'uuid';

export const setBackdropLoader = (data) => (dispatch) => {
  dispatch({
    type: SET_BACKDROP_LOADER,
    payload: data,
  });
};

export const resetBackdropLoader = (data) => (dispatch) => {
  dispatch({
    type: RESET_BACKDROP_LOADER,
  });
};

export const addBackdropLoaderMessage = (message) => (dispatch) => {
  dispatch({
    type: ADD_BACKDROP_LOADER_MESSAGE,
    payload: {
      id: uuidv4(),
      message,
    },
  });
};
