// AutoCompleteItem.tsx

import React from 'react';

interface AutoCompleteItemProps {
  suggestionItem: string;
  inputValue: string;
  handleClick: (selectedSuggestion: string) => void;
}

export const AutoCompleteItem: React.FC<AutoCompleteItemProps> = ({
  suggestionItem,
  inputValue,
  handleClick,
}: AutoCompleteItemProps) => {
  // After finding the item and being able to show it, we are instructed to highlight the matched part of
  // searched string. We find the position of the character index that will be highlighted and we use the substring or the slice method.
  // NOTE: First occurence of this indexed character implementation
  const index = suggestionItem.toLowerCase().indexOf(inputValue.toLowerCase());

  // Substring from start UP to the index (without the character in the index)
  const startString = suggestionItem.substring(0, index);
  // Substring FROM the index (without the character in the index) to the end
  const endString = suggestionItem.substring(inputValue.length + index);

  // We use different styling for the character of the value of the input
  return (
    <div
      className="auto-complete-item"
      onClick={() => handleClick(suggestionItem)}
    >
      {startString}
      <strong style={{ color: 'blue' }}>{inputValue}</strong>
      {endString}
    </div>
  );
};
