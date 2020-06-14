import React from 'react';
import { shallow } from 'enzyme';

import { findByTestAttr, storeFactory } from '../../test/testUtils';
import Input, { UnconnectedInput } from './component.jsx';

const setup = (initialState = {}) => {
  const store = storeFactory(initialState);
  return shallow(<Input store={store} />)
    .dive()
    .dive();
};

describe('renders', () => {
  describe('word has not been guessed', () => {
    let wrapper;
    beforeEach(() => {
      const state = { success: false };
      wrapper = setup(state);
    });
    test('renders component without error', () => {
      const component = findByTestAttr(wrapper, 'input-component');
      expect(component.length).toBe(1);
    });
    test('renders input box', () => {
      const inputBox = findByTestAttr(wrapper, 'input-box');
      expect(inputBox.length).toBe(1);
    });
    test('renders submit button', () => {
      const submitButton = findByTestAttr(wrapper, 'submit-button');
      expect(submitButton.length).toBe(1);
    });
  });
  describe('word has been guessed', () => {
    let wrapper;
    beforeEach(() => {
      const state = { success: true };
      wrapper = setup(state);
    });
    test('renders component without error', () => {
      const component = findByTestAttr(wrapper, 'input-component');
      expect(component.length).toBe(1);
    });
    test('does not render input box', () => {
      const inputBox = findByTestAttr(wrapper, 'input-box');
      expect(inputBox.length).toBe(0);
    });
    test('does not render submit button', () => {
      const submitButton = findByTestAttr(wrapper, 'submit-button');
      expect(submitButton.length).toBe(0);
    });
  });
});

describe('redux props', () => {
  test('has success piece of state as prop', () => {
    const success = true;
    const wrapper = setup({ success });
    const successProp = wrapper.instance().props.success;
    expect(successProp).toBe(success);
  });
  test('guessWord action creator is a function prop', () => {
    const wrapper = setup();
    const guessWordProps = wrapper.instance().props.guessWord;
    expect(guessWordProps).toBeInstanceOf(Function);
  });
});

describe(`'guessWord' action creator call`, () => {
  let guessWordMock;
  let wrapper;
  const guessedWord = 'train';
  beforeEach(() => {
    guessWordMock = jest.fn();
    const props = {
      guessWord: guessWordMock,
    };
    wrapper = shallow(<UnconnectedInput {...props} />);
    wrapper.setState({ currentGuess: guessedWord });
    const submitButton = findByTestAttr(wrapper, 'submit-button');
    submitButton.simulate('click', { preventDefault() {} });
  });
  test(`'guessWord' was called once`, () => {
    const guessWordMockCallCount = guessWordMock.mock.calls.length;
    expect(guessWordMockCallCount).toBe(1);
  });
  test(`calls 'guessWord' with input value as argument`, () => {
    const guessWordArg = guessWordMock.mock.calls[0][0];
    expect(guessWordArg).toBe(guessedWord);
  });
  test(`input box clears on submit`, () => {
    const currentGuess = wrapper.state('currentGuess');
    expect(currentGuess).toBe('');
  });
});
