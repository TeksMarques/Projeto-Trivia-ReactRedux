import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import App from '../App';

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
  
  const gameTitle = screen.getByRole('heading', {
    name: /game/i
  })
  expect(gameTitle).toBeInTheDocument();

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

});
})


