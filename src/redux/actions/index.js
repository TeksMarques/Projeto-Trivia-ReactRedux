export const GET_TOKEN = 'GET_TOKEN';

export const getToken = (token) => ({
  type: GET_TOKEN,
  payload: token,
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
    console.log(token);
    // dispatch(getToken());
  } catch (e) {
    dispatch(error(e));
  }
};
