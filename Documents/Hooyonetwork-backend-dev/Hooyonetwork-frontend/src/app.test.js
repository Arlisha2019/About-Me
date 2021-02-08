import React from 'react';
import { render, fireEvent, waitForElement } from '@testing-library/react';
import App from './App';

window.matchMedia = jest.fn().mockReturnValue({
  matches: true,
  addListener: () => {},
  removeListener: () => {},
})

beforeEach(() => {
  window.matchMedia('(max-width: 599px)');
})

test('component renders', () => {
  render(<App />)
});

test('hamburger menu opens', async () => {
  const { getByTestId } = render(<App />)
  const button = await waitForElement(() => getByTestId('hamburger'))
  fireEvent.click(button)
})
