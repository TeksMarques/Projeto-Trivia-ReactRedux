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
    console.log(state, action, 'aqui');
    return ({ ...state, score: action.payload + state.score });
  default:
    return state;
  }
}

export default player;
