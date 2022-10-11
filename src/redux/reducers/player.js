import { GET_USER, GET_SCORE } from '../actions';

const INITIAL_STATE = {
  email: '',
  user: '',
  score: 0,
};

function player(state = INITIAL_STATE, action) {
  switch (action.type) {
  case GET_USER:
    return ({ ...state,
      email: action.payload.email,
      user: action.payload.user,
    });
  case GET_SCORE:
    return ({ ...state, score: Number(action.payload) + Number(state.score) }
    );
  default:
    return state;
  }
}

export default player;
