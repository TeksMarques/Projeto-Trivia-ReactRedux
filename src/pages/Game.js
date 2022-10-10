import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Trivia from '../components/Trivia';

class Game extends React.Component {
  state = {
    historyGame: '',
  };

  componentDidMount() {
    const { history } = this.props;
    this.setState({
      historyGame: history,
    });
  }

  render() {
    const { historyGame } = this.state;
    return (
      <div>
        <Header />
        <Trivia history={ historyGame } />
      </div>
    );
  }
}

Game.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
}.isRequired;
export default connect()(Game);
