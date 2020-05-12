import { GET_PROFILE, PROFILE_ERROR, CLEAR_PROFILE } from '../../actionTypes';

const INITIAL_STATE = {
  profile: null,
  profiles: [],
  repos: [],
  error: {},
};

export default (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
    case GET_PROFILE:
      return {
        ...state,
        profile: payload,
      };
    case PROFILE_ERROR:
      return {
        ...state,
        error: payload,
      };
    case CLEAR_PROFILE:
      return {
        ...state,
        profile: null,
        repos: [],
      };
    default:
      return state;
  }
};
