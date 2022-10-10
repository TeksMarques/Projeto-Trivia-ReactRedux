import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Settings extends React.Component {
  handleClick = () => {
    const { history } = this.props;
    history.push('/');
  };

  render() {
    return (
      <div>
        <h1 data-testid="settings-title">Settings</h1>
        <span>Nothing to show</span>
        <button type="button" onClick={ this.handleClick }>Voltar</button>
      </div>
    );
  }
}

Settings.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
}.isRequired;

export default connect()(Settings);
