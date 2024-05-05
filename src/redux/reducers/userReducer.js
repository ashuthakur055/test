import userTypes from '../constants/userTypes';

const initialState = {
  user: {
    first_name: '',
    last_name: '',
  },
  accessToken: '',
  isLoggedIn: false,
  roleType: '',
  tabs_access: [],
  collections_permissions: {},
  tabs_permissions: {},
  prints_negatives_obj: [],
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case userTypes.LOGIN_SUCCESS:
      return { ...state, ...action.payload, isLoggedIn: true };
    case userTypes.LOG_OUT:
      return { ...initialState };
    case userTypes.PERMISSION_GRANTED:
      return { ...state , ...action.payload};
    default:
      return state;
  }
};

export default userReducer;
