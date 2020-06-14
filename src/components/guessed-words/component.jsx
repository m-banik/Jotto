import React from 'react';
import PropTypes from 'prop-types';

export const GuessedWords = (props) => {
  let content;
  if (props.guessedWords.length === 0) {
    content = (
      <span data-test='guess-instructions'>Try to guess a secret word!</span>
    );
  } else {
    const tableRows = props.guessedWords.map((item, index) => (
      <tr data-test='guessed-word' key={index}>
        <td>
          <span>{item.guessedWord}</span>
        </td>
        <td>
          <span>{item.letterMatchCount}</span>
        </td>
      </tr>
    ));
    content = (
      <table data-test='guessed-words-section' className={'table table-sm'}>
        <thead className={'table-warning'}>
          <tr>
            <td>Guessed word</td>
            <td>Letter match count</td>
          </tr>
        </thead>
        <tbody>{tableRows}</tbody>
      </table>
    );
  }
  return <div data-test='guessed-words-component'>{content}</div>;
};

GuessedWords.propTypes = {
  guessedWords: PropTypes.arrayOf(
    PropTypes.shape({
      guessedWord: PropTypes.string.isRequired,
      letterMatchCount: PropTypes.number.isRequired,
    })
  ).isRequired,
};
