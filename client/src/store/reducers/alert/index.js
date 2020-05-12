import { SET_ALERT, REMOVE_ALERT, REMOVE_ALL_ALERTS } from '../../actionTypes';

const INITIAL_STATE = [];

const alert = (state = [], { type, payload }) => {
  switch (type) {
    case SET_ALERT:
      return [...state, payload];
    case REMOVE_ALERT:
      return state.filter((alert) => alert.id !== payload);
    case REMOVE_ALL_ALERTS:
      return INITIAL_STATE;

    default:
      return state;
  }
};

export default alert;
