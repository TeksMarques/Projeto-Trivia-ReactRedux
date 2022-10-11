import { GET_USER, GET_SCORE, GET_ASSERTIONS } from '../actions';

const INITIAL_STATE = {
  email: '',
  user: '',
  score: 0,
  assertions: 0,
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
  case GET_ASSERTIONS:
    console.log('assert', action.payload);
    return ({ ...state, assertions: action.payload });
  default:
    return state;
  }
}

export default player;
