// AutoComplete.test.tsx
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import AutoComplete from './AutoComplete';
import { fetchData } from '../api/nameAPI';

jest.mock('../api/nameAPI');

describe('AutoComplete', () => {
  it('Check rendering the correct number of items after loading state has finished', async () => {
    // Mocking the fetchData function
    const mockData = ['Paul', 'Andrew', 'Anna'];
    (fetchData as jest.Mock).mockResolvedValue(mockData);
    const { container } = render(<AutoComplete />);

    // Simulate user input
    const inputElement = screen.getByPlaceholderText('Search...');
    fireEvent.change(inputElement, { target: { value: 'pau' } });

    // Wait for debouncing and API call to complete
    await waitFor(() => {
      // Assert that the loading message is not in the DOM
      expect(screen.queryByText('Loading...')).not.toBeInTheDocument();

      // Select all AutoCompleteItem elements with the input value "pau"
      const autoCompleteItems =
        container.getElementsByClassName('auto-complete-item');

      // Assert that there is only one AutoCompleteItem with "pau"
      expect(autoCompleteItems.length).toBe(1);
    });
  });
});
