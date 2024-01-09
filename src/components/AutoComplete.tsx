import React, { ChangeEvent, useEffect, useState } from 'react';
import { AutoCompleteItem } from './AutoCompleteItem';
import { FeedbackMessage } from './FeedbackMessage';
import { fetchData } from '../api/nameAPI';

const AutoComplete: React.FC = () => {
  const [inputValue, setInputValue] = useState<string>('');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isClicked, setIsClicked] = useState<boolean>(false);

  useEffect(() => {
    const fetchSuggestions = async () => {
      // When the input value is empty no need to do any filtering/comparison for any suggested strings
      if (inputValue.trim() === '') {
        setSuggestions([]);
        setIsLoading(false);
        return;
      }

      if (!isClicked) {
        try {
          //We call fetchData() in this side effect every time the input changes
          // (except the first item and every time we select an item from the suggested list clearing the suggested array)
          const data = await fetchData();
          const filteredItems = data.filter((item) =>
            // We want to check if the current input value belongs/is included to every string of the fetched items
            // In order to compare, we lowercase both input value and each string of the list and check if the
            // value is included in each string of the list
            item.toLowerCase().includes(inputValue.toLowerCase())
          );
          // We update the state of the suggestions after the comparison
          setSuggestions(filteredItems);
        } catch (error) {
          console.log(error);
        } finally {
          setIsLoading(false);
        }
      }
    };

    // We use the fetchSuggestions as a callback inside a setTimeout to debounce the input to reduce unnecessary calls
    const debounceTimer = setTimeout(fetchSuggestions, 100);
    // Cleaning up of the debounce

    return () => clearTimeout(debounceTimer);
    //dependency for the input value in the useEffect
  }, [inputValue, isClicked]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    // Since there was a keystroke/paste in the input we need to update
    // the isClicked state to false and the isLoading again to true
    setIsClicked(false);
    setIsLoading(true);
    setInputValue(e.target.value); // update of the state of the input value (controlled component)
  };

  const handleSuggestionClick = (selectedSuggestion: string) => {
    // After selecting an item we update the state of the input and that there was a click and we clear the suggestions
    setIsClicked(true);
    setInputValue(selectedSuggestion);
    setSuggestions([]);
  };

  const renderSuggestions = () => {
    if (suggestions.length === 0) {
      // No suggestions to display
      return null;
    }

    return suggestions.map((suggestionItem, index) => (
      <AutoCompleteItem
        key={index}
        suggestionItem={suggestionItem}
        inputValue={inputValue}
        handleClick={handleSuggestionClick}
      />
    ));
  };

  // After the input we use another component to provide the different messages during loading states and
  // the results after the comparison. After loading is finished, we call the render function to display the
  // available AutoCompleteItem components
  return (
    <div className="auto-complete">
      <input
        type="text"
        placeholder="Search..."
        onChange={handleInputChange}
        value={inputValue}
        className="default-transition"
      />
      <FeedbackMessage
        inputValue={inputValue}
        isLoading={isLoading}
        data={suggestions}
        selectionClicked={isClicked}
      />

      {!isLoading && renderSuggestions()}
    </div>
  );
};

export default AutoComplete;
