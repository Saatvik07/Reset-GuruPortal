import { Auth } from 'aws-amplify';
import * as ActionTypes from '../ActionTypes';

export const changePassword = (oldPassword, newPassword) => {
  return async (dispatch) => {
    dispatch({ type: ActionTypes.CHANGE_PASSWORD_REQUEST });
    let user = await Auth.currentAuthenticatedUser();
    return await Auth.changePassword(user, oldPassword, newPassword)
      .then((res) => {
        dispatch({ type: ActionTypes.CHANGE_PASSWORD_SUCCESS });
      })
      .catch((err) => {
        dispatch({
          type: ActionTypes.CHANGE_PASSWORD_FAILED,
          error: err.message
        });
        console.log(err);
      });
  };
};