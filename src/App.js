import React from 'react';
import { connect } from 'react-redux';
import { getSecretWord } from './actions';
import { Congrats } from './components/congrats';
import Input from './components/input';
import { GuessedWords } from './components/guessed-words';

export class UnconnectedApp extends React.Component {
  componentDidMount() {
    this.props.getSecretWord();
  }
  render() {
    const { success, guessedWords } = this.props;
    return (
      <div className={'container'} data-test='app-component'>
        <h1 className={'text-center'}>Jotto</h1>
        <Congrats success={success} />
        <Input />
        <GuessedWords guessedWords={guessedWords} />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  success: state.success,
  secretWord: state.secretWord,
  guessedWords: state.guessedWords,
});

const mapDispatchToProps = (dispatch) => ({
  getSecretWord: (state) => dispatch(getSecretWord(state)),
});

export default connect(mapStateToProps, mapDispatchToProps)(UnconnectedApp);
