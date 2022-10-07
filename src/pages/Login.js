import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Login extends React.Component {
  state = {
    isDisabled: true,
    user: '',
    email: '',
  };

  handleClick = () => {
    const { history } = this.props;
    history.push('/game');
  };

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value }, () => {
      const MIN_LENGTH_PASS = 1;
      const { email, user } = this.state;
      const regex = /\S+@\S+\.\S+/;
      const verifyEmail = email && regex.test(email);
      console.log(verifyEmail);
      const verifyName = user.length >= MIN_LENGTH_PASS;
      console.log(verifyName);
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
          />
        </label>
        <label htmlFor="email">
          Email:
          <input
            type="email"
            name="email"
            onChange={ this.handleChange }
            data-testid="input-gravatar-email"
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
