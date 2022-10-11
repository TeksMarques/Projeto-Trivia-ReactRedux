import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Trivia extends Component {
  state = {
    answers: '',
    allInfo: {},
    correctColor: false,
    incorrectColor: false,
    isDisable: false,
    showTimer: false,
    isHiddenBtnNext: true,
    nextCounter: 0,
  };

  async componentDidMount() {
    this.timer();
    this.fetchApiAnswers();
  }

  componentWillUnmount() {
    clearTimeout(this.timer());
    console.log('morreu');
  }

  fetchApiAnswers = async () => {
    const VALID_CODE = 0;
    const INVALID_CODE = 3;
    const MULTPLIER = 0.5;
    const token = localStorage.getItem('token');
    const url = `https://opentdb.com/api.php?amount=5&token=${ token }`;
    const get = await fetch(url);
    const result = await get.json();
    const trivia = result.results;
    const getCode = result.response_code;
    if (trivia && getCode === VALID_CODE) {
      this.setState({
        allInfo: trivia,
      }, () => {
        const test = trivia[0].incorrect_answers.map((c, i) => {
          const objeto = {
            name: c,
            testid: `wrong-answer-${ i }`,
          };
          return objeto;
        });
        const correctAnswer = {
          name: trivia[0].correct_answer,
          testid: 'correct-answer',
        };
        const allAnswers = [...test, correctAnswer];
        const sorted = allAnswers.sort(() => Math.random() - MULTPLIER);
        this.setState({
          answers: sorted,
        });
      });
    }
    if (trivia && getCode === INVALID_CODE) {
      localStorage.removeItem('token');
      const { history } = this.props;
      history.push('/');
    }
  };

  handleClick = () => {
    this.setState({
      correctColor: true,
      incorrectColor: true,
      showTimer: true,
      isHiddenBtnNext: false,
    });
  };

  handleNextCounter = () => {
    const { nextCounter } = this.state;
    const MAX_QUESTION = 4;
    this.setState((prevstate) => ({
      nextCounter: prevstate.nextCounter + 1,
    }), () => this.fetchApiAnswers());
    this.setState({
      isHiddenBtnNext: true,
      showTimer: false,
    }, () => this.setState({
      timer: 30,
      correctColor: false,
      incorrectColor: false,
    }));
    console.log(nextCounter);
    if (nextCounter === MAX_QUESTION) {
      const { history } = this.props;
      console.log(history);
      history.push('/feedback');
    }
  };

  timer = () => {
    this.setState({ timer: 30 }, () => {
      const second = 1000;
      const idInterval = setInterval(() => {
        this.setState((prevState) => ({
          isDisable: false,
          timer: prevState.timer - 1,
        }), () => {
          const { timer } = this.state;
          if (timer === 0) {
            clearInterval(idInterval);
            this.setState({
              isDisable: true,
              isHiddenBtnNext: false,
            });
          }
        });
      }, second);
    });
  };

  handle = () => {
    const { allInfo } = this.state;
    console.log(allInfo);
  };

  render() {
    const { answers,
      allInfo,
      correctColor,
      incorrectColor,
      timer,
      isDisable,
      showTimer,
      isHiddenBtnNext } = this.state;
    return (
      <div>
        {
          answers.length > 0 && (
            <div>
              <h2
                data-testid="question-category"
              >
                { `Category: ${ allInfo[0].category }` }
              </h2>
              <h3
                data-testid="question-text"
              >
                { `Question: ${ allInfo[0].question }` }
              </h3>
              <div>
                <div data-testid="answer-options">
                  {
                    answers.map((question) => (
                      question.name === allInfo[0].correct_answer
                        ? (
                          <button
                            key={ question.name }
                            type="button"
                            data-testid={ question.testid }
                            onClick={ this.handleClick }
                            disabled={ isDisable }
                            style={ {
                              border:
                                correctColor
                                && '3px solid rgb(6, 240, 15)',
                            } }
                          >
                            { question.name }
                          </button>
                        )
                        : (
                          <button
                            key={ question.name }
                            type="button"
                            onClick={ this.handleClick }
                            disabled={ isDisable }
                            data-testid={ question.testid }
                            style={ {
                              border:
                                incorrectColor
                                && '3px solid red',
                            } }
                          >
                            { question.name }
                          </button>
                        )
                    ))
                  }
                </div>
                <div>
                  <h1
                    hidden={ showTimer }
                  >
                    { timer }
                  </h1>
                </div>
              </div>
              {
                !isHiddenBtnNext
                && (
                  <button
                    id="button"
                    type="button"
                    onClick={ this.handleNextCounter }
                    data-testid="btn-next"
                  >
                    Next
                  </button>
                )
              }
              <button
                id="button"
                type="button"
                onClick={ this.handle }
              >
                teste
              </button>
            </div>)
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
