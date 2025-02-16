import axios from 'axios';
import { setAlert } from './../alert/alert';
import { GET_PROFILE, PROFILE_ERROR } from './../../actionTypes';

// Get current user profile
export const getMyProfile = () => async (dispatch) => {
  try {
    const res = await axios.get('/api/profile/me');

    dispatch({
      type: GET_PROFILE,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
