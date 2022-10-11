import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getScore } from '../redux/actions';

class Trivia extends Component {
  state = {
    answers: '',
    allInfo: {},
    correctColor: false,
    incorrectColor: false,
    isDisable: false,
    timer: 30,
    showTimer: false,
    isHiddenBtnNext: true,
    nextCounter: 0,
  };

  async componentDidMount() {
    this.timer();
    this.fetchApiAnswers();
  }

  fetchApiAnswers = async () => {
    const VALID_CODE = 0;
    const INVALID_CODE = 3;
    const MULTPLIER = 0.5;
    const token = localStorage.getItem('token');
    const url = `https://opentdb.com/api.php?amount=5&token=${token}`;
    const get = await fetch(url);
    const result = await get.json();
    const trivia = result.results;
    const getCode = result.response_code;
    if (trivia && getCode === VALID_CODE) {
      this.setState({
        allInfo: trivia,
      }, () => {
        const incorrectAnswers = trivia[0].incorrect_answers.map((c, i) => {
          const objeto = {
            name: c,
            testid: `wrong-answer-${i}`,
          };
          return objeto;
        });
        const correctAnswer = {
          name: trivia[0].correct_answer,
          testid: 'correct-answer',
        };
        const allAnswers = [...incorrectAnswers, correctAnswer];
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

  handleSum = (valor) => {
    const { timer, allInfo } = this.state;
    const { dispatch } = this.props;
    const points = 10;
    const medium = 2;
    const easy = 1;
    const hard = 3;
    let sum = 0;
    if (valor === 'verdadeiro') {
      if (allInfo[0].difficulty === 'hard') {
        sum = points + (timer * hard);
      } if (allInfo[0].difficulty === 'medium') {
        sum = points + (timer * medium);
      } if (allInfo[0].difficulty === 'easy') {
        sum = points + (timer * easy);
      }
      console.log(sum, 'antes do dispatch');
      dispatch(getScore(sum));
      return sum;
    }
  };

  handleClick = ({ target }) => {
    this.setState({
      correctColor: true,
      incorrectColor: true,
      showTimer: true,
      isHiddenBtnNext: false,
    });
    const valor = target.value;
    this.handleSum(valor);
  };

  handleNextCounter = () => {
    const { nextCounter } = this.state;
    const MAX_QUESTION = 4;
    const { history } = this.props;
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
    if (nextCounter === MAX_QUESTION) {
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
          });
        }
      });
    }, second);
  };

  render() {
    const { answers,
      allInfo, correctColor, incorrectColor, timer,
      isDisable, showTimer, isHiddenBtnNext } = this.state;
    return (
      <div>
        {
          answers.length > 0 && (
            <div>
              <h2
                data-testid="question-category"
              >
                { `Category: ${allInfo[0].category}` }
              </h2>
              <h3
                data-testid="question-text"
              >
                { `Question: ${allInfo[0].question}` }
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
                            value="verdadeiro"
                            data-testid={ question.testid }
                            onClick={ this.handleClick }
                            disabled={ isDisable }
                            style={ {
                              border: correctColor
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
                              border: incorrectColor
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
