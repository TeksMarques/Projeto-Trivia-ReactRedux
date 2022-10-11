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
