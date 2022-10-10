import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchToken, getUser } from '../redux/actions';

class Login extends React.Component {
  state = {
    isDisabled: true,
    user: '',
    email: '',
  };

  handleClick = async ({ target }) => {
    const { name } = target;
    const { dispatch, history } = this.props;
    if (name === 'btnLogin') {
      await dispatch(fetchToken());
      dispatch(getUser(this.state));
      history.push('/game');
    }
    if (name === 'btnSettings') {
      history.push('/settings');
    }
  };

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value }, () => {
      const MIN_LENGTH_PASS = 1;
      const { email, user } = this.state;
      const regex = /\S+@\S+\.\S+/;
      const verifyEmail = email && regex.test(email);
      const verifyName = user.length >= MIN_LENGTH_PASS;
      this.setState({ isDisabled: !(verifyEmail && verifyName) });
    });
  };

  render() {
    const { isDisabled } = this.state;
    return (
      <div>
        <label htmlFor="name">
          Nome:
          <input
            type="text"
            name="user"
            onChange={ this.handleChange }
            data-testid="input-player-name"
            placeholder="Digite seu nome"
          />
        </label>
        <label htmlFor="email">
          Email:
          <input
            type="email"
            name="email"
            onChange={ this.handleChange }
            data-testid="input-gravatar-email"
            placeholder="Digite seu email"
          />

        </label>
        <button
          type="button"
          name="btnLogin"
          disabled={ isDisabled }
          onClick={ this.handleClick }
          data-testid="btn-play"
        >
          Play
        </button>
        <button
          type="button"
          name="btnSettings"
          onClick={ this.handleClick }
          data-testid="btn-settings"
        >
          Configurações
        </button>
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
}.isRequired;

export default connect()(Login);
