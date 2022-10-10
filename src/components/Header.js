import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import md5 from 'crypto-js/md5';

class Header extends React.Component {
  state = {
    hash: '',
  };

  componentDidMount() {
    const { email } = this.props;
    const hash = md5(email).toString();
    this.setState({
      hash,
    });
  }

  render() {
    const { nome, email } = this.props;
    const { hash } = this.state;
    return (
      <div>
        <label htmlFor="nome">
          Nome:
          <h2 data-testid="header-player-name">{ nome }</h2>
        </label>
        <label htmlFor="email">
          Email:
          <h2>{ email }</h2>
        </label>
        <img
          src={ `https://www.gravatar.com/avatar/${hash}` }
          alt="Foto de perfil"
          data-testid="header-profile-picture"
        />
        <span data-testid="header-score">
          Placar:
          { 0 }
        </span>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  nome: state.user.user,
});

Header.propTypes = {
  nome: PropTypes.string,
  email: PropTypes.string,
}.isRequired;

export default connect(mapStateToProps)(Header);