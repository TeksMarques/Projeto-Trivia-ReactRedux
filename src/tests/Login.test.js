import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import App from '../App';
import NotFound from '../pages/NotFound';
import Ranking from '../pages/Ranking';
import Feedback from '../pages/Feedback';

// import mockData from './helpers/mockData';

const NAME_ID = 'input-player-name';
const EMAILID = 'input-gravatar-email';
const VALID_NAME = 'Alguém';
const VALID_EMAIL = 'alguem@alguem.com.br';
const INVALID_EMAIL = 'alguem@alguem.'
const BTN_PLAY_ID = 'btn-play'
const BTN_SETTINGS_ID = 'btn-settings'
const SETTINGS_TITLE_ID = 'settings-title'

describe('Testa os elementos da tela de login e seu comportamento', () => {

  test('Se todos os elementos estão renderizados na tela e se o botão Play está desabilitado ao carregar a página', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    const { pathname } = history.location;
    expect(pathname).toBe('/');
  
    const name = screen.getByTestId(NAME_ID);
    const email = screen.getByTestId(EMAILID);
    const btnPlay = screen.getByTestId(BTN_PLAY_ID);
    const btnSettings = screen.getByTestId(BTN_SETTINGS_ID);
  
    expect(name).toBeInTheDocument();
    expect(email).toBeInTheDocument();
    expect(btnPlay).toBeInTheDocument();
    expect(btnSettings).toBeInTheDocument();
  
    expect(btnPlay).toBeDisabled();
    expect(btnSettings).toBeEnabled();
  });
  
 test('se o botão Play é habilitado somente após o preenchimento correto dos inputs Nome e Email e se ao clicar no botão Play a página é redirecionada para a Página Games', async () => {
  const { history } = renderWithRouterAndRedux(<App />);
  const { pathname } = history.location;
  expect(pathname).toBe('/');
  
  const name = screen.getByTestId(NAME_ID);
  const email = screen.getByTestId(EMAILID);
  const btnPlay = screen.getByTestId(BTN_PLAY_ID);
  
  userEvent.type(name, VALID_NAME);
  userEvent.type(email, INVALID_EMAIL);  
  expect(btnPlay).toBeDisabled;
  
  userEvent.clear(email);
  userEvent.type(email, VALID_EMAIL);  
  expect(btnPlay).toBeEnabled();
  
  userEvent.click(btnPlay);
  await waitFor(() => expect(history.location.pathname).toBe('/game'));
  
  const headerPlayerName = screen.getByTestId('header-player-name')
  expect(headerPlayerName).toBeInTheDocument();

  const headerPlayerEmail = screen.getByText(/email:/i)
  expect(headerPlayerEmail).toBeInTheDocument();

  const placar = screen.getByText(/placar:/i)
  expect(placar).toBeInTheDocument();

  const score = screen.getByTestId('header-score');
  expect(score).toBeInTheDocument();
  expect(score).toHaveTextContent(0);

  await waitFor(() => expect(screen.getByTestId('question-category')).toBeInTheDocument());

  await waitFor(() => expect(screen.getByTestId('question-text')).toBeInTheDocument());

  await waitFor(() => expect(screen.getByTestId('answer-options')).toBeInTheDocument());

  
  const btnsOptions = screen.getAllByRole('button');
  expect(btnsOptions).not.toHaveLength(0);
  userEvent.click(btnsOptions[0]);
  
  const btnNext = screen.getByTestId('btn-next');
  await waitFor(() => expect(btnNext).toBeInTheDocument());
  userEvent.click(btnNext);


  });

test('se ao clicar no botão configurações a página é redirecionada para /settings', async () => {
  const { history } = renderWithRouterAndRedux(<App />);
  const { pathname } = history.location;
  expect(pathname).toBe('/');

  const btnSettings = screen.getByTestId(BTN_SETTINGS_ID);

  userEvent.click(btnSettings);
  await waitFor(() => expect(history.location.pathname).toBe('/settings'));

  const settingsTitle = screen.getByTestId(SETTINGS_TITLE_ID);
  expect(settingsTitle).toBeInTheDocument();

  const nothingToShow = screen.getByText(/nothing to show/i)
  expect(nothingToShow).toBeInTheDocument();

  const btnVoltar = screen.getByRole('button', {
    name: /voltar/i
  });
  expect(btnVoltar).toBeInTheDocument();

  userEvent.click(btnVoltar);
  await waitFor(() => expect(history.location.pathname).toBe('/'));

});
});

test('se os elementos são renderizados como esperado na página NotFound', async () => {
  renderWithRouterAndRedux(<NotFound />);

  const teste = screen.getByRole('heading', {
    name: /página não encontrada/i
  });
  expect(teste).toBeInTheDocument();
});

test('se os elementos são renderizados como esperado na página Ranking', async () => {
  const { history } = renderWithRouterAndRedux(<Ranking />);

  const ranking = screen.getByRole('heading', {
    name: /ranking/i
  })
  expect(ranking).toBeInTheDocument();

  const btnHome = screen.getByRole('button', {
    name: /home/i
  });
  expect(btnHome).toBeInTheDocument();

  userEvent.click(btnHome);

  await waitFor(() => expect(history.location.pathname).toBe('/'));
});

test('se os elementos são renderizados como esperado no componente Feedback', async () => {
  renderWithRouterAndRedux(<Feedback />);

  const feedBack = screen.getByTestId('feedback-text')
  expect(feedBack).toBeInTheDocument();

  const toalQuestions = screen.getByTestId('feedback-total-question');
  const totalScore = screen.getByTestId('feedback-total-score');
  const btnPlayAgain = screen.getByTestId('btn-play-again');

  expect(toalQuestions).toBeInTheDocument();
  expect(totalScore).toBeInTheDocument();
  expect(btnPlayAgain).toBeInTheDocument();
  
  userEvent.click(btnPlayAgain);
  await waitFor(() => expect(history.location.pathname).toBe('/'));

});

test('se, no componente Feedback, ao clicar no botão Ranking a página é redirecionada corretamente', async () => {
  renderWithRouterAndRedux(<Feedback />);

  const btnRanking = screen.getByTestId('btn-ranking');
  expect(btnRanking).toBeInTheDocument();

  userEvent.click(btnRanking);
  await waitFor(() => expect(history.location.pathname).toBe('/ranking'));

});


