import {
  SET_BACKDROP_LOADER,
  RESET_BACKDROP_LOADER,
  ADD_BACKDROP_LOADER_MESSAGE,
} from '../../actionTypes';

const INITIAL_STATE = {
  actionId: null,
  active: true,
  messages: [],
};

// Only one backdrop loader can be active

export default (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
    case SET_BACKDROP_LOADER:
      return { ...state, ...payload };
    case RESET_BACKDROP_LOADER:
      return { ...INITIAL_STATE, active: false };
    case ADD_BACKDROP_LOADER_MESSAGE:
      if (state.actionId)
        return { ...state, messages: [...state.messages, payload] };
      else return { ...state };

    default:
      return state;
  }
};
