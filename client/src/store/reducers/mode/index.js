import {
  SET_ACTIVE_MODE,
  SET_MODE_META,
  INIT_MODES,
  DESTROY_MODE,
} from '../../actionTypes';

const INITIAL_STATE = {};

export default (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
    case INIT_MODES:
      return { ...state, [payload.id]: { ...payload } };
    case SET_ACTIVE_MODE:
      return {
        ...state,
        [payload.id]: { ...state[payload.id], activeMode: payload.modeId },
      };
    default:
      return state;
  }
};
