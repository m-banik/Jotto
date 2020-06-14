import React from 'react';
import { findByTestAttr, checkProps } from '../../test/testUtils';
import { shallow } from 'enzyme';
import { Congrats } from './component';

const expectedProps = { success: false };

const setup = (props = {}) => {
  const setupProps = { ...expectedProps, ...props };
  return shallow(<Congrats {...setupProps} />);
};

test('renders without error', () => {
  const wrapper = setup();
  const component = findByTestAttr(wrapper, 'congrats-component');
  expect(component.length).toBe(1);
});

test("renders no text when 'success' props is false", () => {
  const wrapper = setup({ success: false });
  const component = findByTestAttr(wrapper, 'congrats-message');
  expect(component.length).toBe(0);
});

test("renders non-empty congrats message when 'success' prop is true", () => {
  const wrapper = setup({ success: true });
  const component = findByTestAttr(wrapper, 'congrats-message');
  expect(component.length).toBe(1);
  expect(component.text().length).not.toBe(0);
});

test('does not throw warning with expected props', () => {
  checkProps(Congrats, expectedProps);
});
