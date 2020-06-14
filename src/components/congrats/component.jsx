import React from 'react';
import propTypes from 'prop-types';

export const Congrats = (props) => {
  return (
    <div data-test='congrats-component'>
      {props.success ? (
        <h2
          data-test='congrats-message'
          className={'text-center alert alert-success'}
        >
          Congratulations! You've guessed the secret word!
        </h2>
      ) : null}
    </div>
  );
};

Congrats.propTypes = {
  success: propTypes.bool.isRequired,
};
