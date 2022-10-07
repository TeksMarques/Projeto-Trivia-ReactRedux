import { GET_USER } from '../actions';

const INITIAL_STATE = {
  email: '',
  user: '',
};

function userReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case GET_USER:
    return ({ ...state,
      email: action.payload.email,
      user: action.payload.user,
    });
  default:
    return state;
  }
}

export default userReducer;
