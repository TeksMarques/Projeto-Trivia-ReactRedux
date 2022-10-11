import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getScore, getAssertions } from '../redux/actions';

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
    isQuestionShow: false,
    assertions: 1,
    infoIndex: 0,
  };

  async componentDidMount() {
    this.timer();
    this.fetchApiAnswers();
  }

  fetchApiAnswers = async () => {
    const { infoIndex } = this.state;
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
        isQuestionShow: true,
      }, () => {
        const incorrectAnswers = trivia[infoIndex].incorrect_answers.map((c, i) => {
          const objeto = {
            name: c,
            testid: `wrong-answer-${i}`,
          };
          return objeto;
        });
        const correctAnswer = {
          name: trivia[infoIndex].correct_answer,
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
    const { timer, allInfo, infoIndex, assertions } = this.state;
    const { dispatch } = this.props;
    const points = 10;
    const easy = 1;
    const medium = 2;
    const hard = 3;
    let sum = 0;
    if (valor === 'verdadeiro') {
      this.setState((prevstate) => ({
        assertions: prevstate.assertions + 1,
      }));
      dispatch(getAssertions(assertions));
      if (allInfo[infoIndex].difficulty === 'hard') {
        sum = points + (timer * hard);
      } if (allInfo[infoIndex].difficulty === 'medium') {
        sum = points + (timer * medium);
      } if (allInfo[infoIndex].difficulty === 'easy') {
        sum = points + (timer * easy);
      }
      dispatch(getScore(Number(sum)));
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
    this.setState((prevstate) => ({
      nextCounter: prevstate.nextCounter + 1,
      infoIndex: prevstate.infoIndex + 1,
    }), () => this.fetchApiAnswers());
    this.setState({
      isHiddenBtnNext: true,
      showTimer: false,
      isQuestionShow: false,

    }, () => this.setState({
      timer: 30,
      correctColor: false,
      incorrectColor: false,
      isQuestionShow: false,
    }));
    const { history } = this.props;
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
  };

  render() {
    const { answers,
      allInfo, correctColor, incorrectColor, timer,
      isDisable, showTimer, isHiddenBtnNext, isQuestionShow, infoIndex } = this.state;
    return (
      <div>
        {
          isQuestionShow
          && answers.length > 0 && (
            <div>
              <h2
                data-testid="question-category"
              >
                { `${allInfo[infoIndex].category}` }
              </h2>
              <h3
                data-testid="question-text"
              >
                { `${allInfo[infoIndex].question}` }
              </h3>
              <div>
                <div data-testid="answer-options">
                  {
                    isQuestionShow
                    && answers.map((question) => (
                      question.name === allInfo[infoIndex].correct_answer
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
