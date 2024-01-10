// AutoComplete.test.tsx
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import AutoComplete from './AutoComplete';
import { fetchUsername } from '../api/fetchUsername';

jest.mock('../api/fetchUsername');

describe('AutoComplete', () => {
  const mockData = ['Paul', 'Andrew', 'Anna'];

  const setupComponent = (inputValue: string) => {
    (fetchUsername as jest.Mock).mockResolvedValue(mockData);
    const { container } = render(<AutoComplete />);
    const inputElement = screen.getByPlaceholderText('Search...');
    fireEvent.change(inputElement, { target: { value: inputValue } });

    return { container, inputElement };
  };

  it('Check rendering the correct number of items after loading state has finished', async () => {
    const { container } = setupComponent('pau');

    // Wait for debouncing and API call to complete
    await waitFor(() => {
      expect(screen.queryByText('Loading...')).not.toBeInTheDocument();
      const autoCompleteItems =
        container.getElementsByClassName('auto-complete-item');
      expect(autoCompleteItems.length).toBe(1);
    });
  });

  it('Check the no match found', async () => {
    setupComponent('pauls');

    // Wait for debouncing and API call to complete
    await waitFor(() => {
      expect(screen.queryByText('Loading...')).not.toBeInTheDocument();
      expect(
        screen.queryByText('No match found', { exact: true })
      ).toBeInTheDocument();
    });
  });
});
