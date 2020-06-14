import React from 'react';
import { shallow } from 'enzyme';
import { findByTestAttr, storeFactory } from './test/testUtils';
import App, { UnconnectedApp } from './App';

const setup = (initialState = {}) => {
  const store = storeFactory(initialState);
  return shallow(<App store={store} />)
    .dive()
    .dive();
};

test('renders without error', () => {
  const wrapper = setup();
  const component = findByTestAttr(wrapper, 'app-component');
  expect(component.length).toBe(1);
});

describe('redux props', () => {
  test('has success piece of state as prop', () => {
    const success = true;
    const wrapper = setup({ success });
    const successProp = wrapper.instance().props.success;
    expect(successProp).toBe(success);
  });
  test('has secretWord piece of state as prop', () => {
    const secretWord = 'party';
    const wrapper = setup({ secretWord });
    const secretWordProp = wrapper.instance().props.secretWord;
    expect(secretWordProp).toBe(secretWord);
  });
  test('has guessedWords piece of state as prop', () => {
    const guessedWords = [{ guessedWord: 'train', letterMatchCount: 3 }];
    const wrapper = setup({ guessedWords });
    const guessedWordsProp = wrapper.instance().props.guessedWords;
    expect(guessedWordsProp).toEqual(guessedWords);
  });
  test('"getSecrettWord" action creator is a function on the props', () => {
    const wrapper = setup();
    const getSecretWordProp = wrapper.instance().props.getSecretWord;
    expect(getSecretWordProp).toBeInstanceOf(Function);
  });
});

test(`'getSecretWord' runs on App mount`, () => {
  const getSecretWordMock = jest.fn();
  const props = {
    getSecretWord: getSecretWordMock,
    success: false,
    guessedWords: [],
  };
  const wrapper = shallow(<UnconnectedApp {...props} />);
  wrapper.instance().componentDidMount();
  const getSecretWordCallCount = getSecretWordMock.mock.calls.length;
  expect(getSecretWordCallCount).toBe(1);
});
