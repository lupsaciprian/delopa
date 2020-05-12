import {
  SET_ACTIVE_MODE,
  SET_MODE_META,
  INIT_MODES,
  DESTROY_MODE,
} from '../../actionTypes';

export const initModes = (modeData) => (dispatch) => {
  dispatch({ type: INIT_MODES, payload: modeData });
};

export const setActiveMode = (id, modeId) => (dispatch) => {
  dispatch({ type: SET_ACTIVE_MODE, payload: { id, modeId } });
};

export const destroyMode = (modeId) => (dispatch) => {
  dispatch({ type: DESTROY_MODE, payload: modeId });
};

export const setModeMeta = (modeId, metadata) => (dispatch) => {
  dispatch({ type: SET_MODE_META, payload: { modeId, metadata } });
};
