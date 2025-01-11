import { screen } from '@testing-library/react';
import Counter from '.';
import { render } from './test/utilities.solution';

test('it should render the component', () => {
  render(<Counter />);
});

test('it should increment when the "Increment" button is pressed', async () => {
  const { user } = render(<Counter />);
  const count = screen.getByTestId('current-count');
  expect(count).toHaveTextContent('0');
  const button = screen.getByRole('button', { name: 'Increment' });

  await user.click(button);

  expect(count).toHaveTextContent('1');
});
