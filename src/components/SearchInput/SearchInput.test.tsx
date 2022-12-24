import { render, fireEvent, screen } from '@testing-library/react';
import { SearchInput } from './SearchInput';

jest.useFakeTimers();

test('SearchInput should call onSearch after debounce', () => {
  const onSearch = jest.fn();
  render(<SearchInput onSearch={onSearch} />);
  const input = screen.getByPlaceholderText('Search') as HTMLInputElement;

  fireEvent.change(input, { target: { value: 'a' } });
  fireEvent.change(input, { target: { value: 'ab' } });
  fireEvent.change(input, { target: { value: 'abc' } });
  jest.advanceTimersByTime(1000);

  expect(onSearch).toHaveBeenCalledWith('abc');
});

test('SearchInput should clear the input when the clear button is clicked', () => {
  render(<SearchInput onSearch={jest.fn()} />);
  const input = screen.getByPlaceholderText('Search') as HTMLInputElement;

  fireEvent.change(input, { target: { value: 'abc' } });
  expect(input.value).toBe('abc');

  const button = screen.getByText('Clear');

  fireEvent.click(button);
  expect(input.value).toBe('');
});
