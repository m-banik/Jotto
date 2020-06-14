import React from 'react';
import { connect } from 'react-redux';
import { guessWord } from '../../actions';

export class UnconnectedInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = { currentGuess: '' };
    this.submitGuessedWord = this.submitGuessedWord.bind(this);
  }
  onInputChange = (event) => {
    const currentGuess = event.target.value;
    this.setState({
      currentGuess,
    });
  };
  submitGuessedWord(event) {
    event.preventDefault();
    const guessedWord = this.state.currentGuess;
    if (guessedWord && guessedWord.length > 0) {
      this.props.guessWord(guessedWord);
      this.setState({ currentGuess: '' });
    }
  }
  render() {
    const contents = this.props.success ? null : (
      <form>
        <input
          data-test={'input-box'}
          type={'text'}
          className={'mb-2 mx-sm-3'}
          placeholder={'enter guess'}
          value={this.state.currentGuess}
          onChange={this.onInputChange}
        />
        <button
          data-test={'submit-button'}
          type={'submit'}
          className={'btn btn-primary mb-2'}
          onClick={this.submitGuessedWord}
        >
          Submit
        </button>
      </form>
    );
    return <div data-test={'input-component'}>{contents}</div>;
  }
}

const mapStateToProps = ({ success }) => ({
  success,
});

const mapDispatchToProps = (dispatch) => ({
  guessWord: (state) => dispatch(guessWord(state)),
});

export default connect(mapStateToProps, mapDispatchToProps)(UnconnectedInput);
