import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import Login from './Login';
import { storeFactory, findByTestAttr } from '../../test/testUtils';

Enzyme.configure({ adapter: new EnzymeAdapter() });

const setUp = (initialState = {}) => {
  const store = storeFactory(initialState);
  const component = shallow(<Login store={store} />).dive();
  return component;
};

describe('login component', () => {
  let component;
  beforeEach(() => {
    component = setUp();
  });

  test('should render without errors', () => {
    const wrapper = findByTestAttr(component.dive(), 'component-login');
    expect(wrapper.length).toBe(1);
  });

  test('it renders h1', () => {
    const h1 = findByTestAttr(component.dive(), 'heading-login');
    expect(h1.length).toBe(1);
  });

  test('renders login form', () => {
    const loginForm = findByTestAttr(component.dive(), 'login-form');
    expect(loginForm.length).toBe(1);
  });

  test('renders signup info', () => {
    const signUpInfo = findByTestAttr(component.dive(), 'signUp-info');
    expect(signUpInfo.length).toBe(1);
  });
});
