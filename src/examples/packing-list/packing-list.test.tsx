import { getByRole, render, screen } from 'test/utilities';
import PackingList from '.';
import userEvent from '@testing-library/user-event';

it('renders the Packing List application', () => {
  render(<PackingList />);
});

it('has the correct title', async () => {
  render(<PackingList />);
  screen.getByText('Packing List');
});

it('has an input field for a new item', () => {
  render(<PackingList />);
  expect(screen.getByLabelText('New Item Name')).not.toBeNull();
});

it('has a "Add New Item" button that is disabled when the input is empty', () => {
  render(<PackingList />);
  expect(screen.getByPlaceholderText('New Item')).toHaveTextContent('');
  expect(screen.getByLabelText('Add New Item')).toBeDisabled();
});

it('enables the "Add New Item" button when there is text in the input field', async () => {
  const { user } = render(<PackingList />);
  const newItemInput = screen.getByPlaceholderText('New Item');

  await user.type(newItemInput, 'item');

  expect(screen.getByRole('button', { name: 'Add New Item' })).toBeEnabled();
});

it('adds a new item to the unpacked item list when the clicking "Add New Item"', async () => {
  const { user } = render(<PackingList />);
  const newItemInput = screen.getByPlaceholderText('New Item');

  await user.type(newItemInput, 'item');
  await user.click(screen.getByRole('button', { name: 'Add New Item' }));

  expect(screen.getByLabelText('item')).not.toBeChecked();
});

it('clears the input field after clicking "Add New Item"', async () => {
  const { user } = render(<PackingList />);
  const newItemInput = screen.getByPlaceholderText('New Item');

  await user.type(newItemInput, 'item');
  await user.click(screen.getByRole('button', { name: 'Add New Item' }));

  expect(newItemInput).toHaveTextContent('');
});

it('removes the item after clicking on "Remove', async () => {
  const { user } = render(<PackingList />);
  const newItemInput = screen.getByPlaceholderText('New Item');

  await user.type(newItemInput, 'book');
  await user.click(screen.getByRole('button', { name: 'Add New Item' }));
  const item = screen.getByLabelText('book');
  await user.click(screen.getByRole('button', { name: 'Remove book' }));

  expect(item).not.toBeInTheDocument();
});
