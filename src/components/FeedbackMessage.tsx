import React from 'react';

type FeedbackMessageProps = {
  inputValue: string;
  isLoading: boolean;
  data?: string[]; // Make data optional
  selectionClicked: boolean;
};

export const FeedbackMessage: React.FC<FeedbackMessageProps> = ({
  inputValue,
  isLoading,
  data = [],
  selectionClicked,
}: FeedbackMessageProps) => {
  // When the loading/fetching state is active a loader/spinner shoud appear. Otherwise we should present
  // the results if there are any. If there not any results we should display a message of no matches
  return (
    <>
      {isLoading ? (
        <span
          style={{
            display: 'flex',
            height: '40px',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          Loading...
        </span>
      ) : (
        data.length === 0 &&
        inputValue &&
        !selectionClicked && (
          <span
            style={{
              display: 'flex',
              height: '40px',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            No match found
          </span>
        )
      )}
    </>
  );
};
