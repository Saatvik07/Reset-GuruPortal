import * as ActionTypes from '../ActionTypes';

const initState = {
  isLoading: false,
  error: '',
  updateStatus: null
};

const userReducer = (state = initState, action) => {
  switch (action.type) {
    case ActionTypes.CHANGE_PASSWORD_REQUEST:
      return { ...state, isLoading: true, error: '', updateStatus: null };

    case ActionTypes.CHANGE_PASSWORD_SUCCESS:
      return { ...state, isLoading: false, error: '', updateStatus: true };

    case ActionTypes.CHANGE_PASSWORD_FAILED:
      return {
        ...state,
        isLoading: false,
        error: action.error,
        updateStatus: false
      };

    default:
      return state;
  }
};

export default userReducer;
