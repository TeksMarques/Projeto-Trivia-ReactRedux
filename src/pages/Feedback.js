import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from '../components/Header';

class Feedback extends Component {
  state = {
    asserts: 0,
  };

  componentDidMount() {
    this.getAssertions();
  }

  btnPlayAgain = () => {
    const { history } = this.props;
    history.push('/');
  };

  btnRanking = () => {
    const { history } = this.props;
    history.push('/ranking');
  };

  getAssertions = () => {
    const { assertions } = this.props;
    this.setState({ asserts: assertions });
  };

  render() {
    const { assertions, score } = this.props;
    const { asserts } = this.state;
    const ASSERT_CRITERION = 3;

    return (
      <div>
        <Header />
        <h2
          data-testid="feedback-total-score"
        >
          { score }
        </h2>
        <h2
          data-testid="feedback-total-question"
        >
          { asserts }
        </h2>
        {
          assertions < ASSERT_CRITERION
            ? <h1 data-testid="feedback-text">Could be better...</h1>
            : <h1 data-testid="feedback-text">Well Done!</h1>
        }
        <button
          type="button"
          onClick={ this.btnPlayAgain }
          data-testid="btn-play-again"
        >
          Play Again
        </button>
        <button
          type="button"
          onClick={ this.btnRanking }
          data-testid="btn-ranking"
        >
          Ranking
        </button>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  assertions: state.player.assertions,
  score: state.player.score,
});

Feedback.propTypes = {
  assertions: PropTypes.number,
}.isRequired;

export default connect(mapStateToProps)(Feedback);
