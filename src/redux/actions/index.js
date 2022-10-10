export const GET_TOKEN = 'GET_TOKEN';
export const GET_USER = 'GET_USER';
export const GET_ANSWERS = 'GET_ANSWERS';
export const GET_ERROR = 'GET_ERROR';

export const getToken = (token) => ({
  type: GET_TOKEN,
  payload: token,
});

export const getUser = (state) => ({
  type: GET_USER,
  payload: state,
});

export const getAnswers = (payload) => ({
  type: GET_ANSWERS,
  payload,
});

export const error = (e) => ({
  type: GET_ERROR,
  payload: e,
});

export const fetchToken = () => async (dispatch) => {
  try {
    const request = await fetch('https://opentdb.com/api_token.php?command=request');
    const result = await request.json();
    const { token } = result;
    localStorage.setItem('token', token);
    dispatch(getToken(token));
  } catch (e) {
    dispatch(error(e));
  }
};

// export const fetchGame = () => async (dispatch) => {
//   try {
//     const token = localStorage.getItem('token');
//     const url = `https://opentdb.com/api.php?amount=5&token=${token}`;
//     const get = await fetch(url);
//     const result = await get.json();
//     const answers = result.results;
//     console.log(answers);
//     const isValid = result.response_code === 0;
//     if (isValid === true) {
//       dispatch(getAnswers(answers));
//       console.log('passou');
//     }
//     if (isValid === false) {
//       localStorage.removeItem('token');
//     }
//   } catch (e) {
//     dispatch(error(e));
//   }
// };
