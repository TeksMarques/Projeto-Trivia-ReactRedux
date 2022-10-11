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
    const { assertions } = this.props;
    const { asserts } = this.state;
    const ASSERT_CRITERION = 3;

    return (
      <div>
        <Header />
        <h2>
          Acertos:
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
});

Feedback.propTypes = {
  assertions: PropTypes.number,
}.isRequired;

export default connect(mapStateToProps)(Feedback);
