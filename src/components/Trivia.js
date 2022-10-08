import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Trivia extends Component {
  state = {
    answers: [],
  };

  async componentDidMount() {
    const token = localStorage.getItem('token');
    const url = `https://opentdb.com/api.php?amount=5&token=${token}`;
    const get = await fetch(url);
    const result = await get.json();
    const trivia = result.results;
    const isValid = result.response_code === 0;
    if (isValid === true) {
      this.setState({
        answers: trivia,
      });
      const { history } = this.props;
      localStorage.removeItem('token');
      history.push('/');
    }
    // if (isValid === false) {
    // }
  }

  render() {
    const { answers } = this.state;
    return (
      <div>
        {
          answers.map((q, i) => (
            <span key={ i }>{ q.category }</span>))
        }
      </div>
    );
  }
}

Trivia.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
}.isRequired;

export default connect()(Trivia);
