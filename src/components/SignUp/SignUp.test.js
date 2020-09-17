import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import SignUp from './SignUp';
import { storeFactory, findByTestAttr } from '../../test/testUtils';

Enzyme.configure({ adapter: new EnzymeAdapter() });

const setUp = (initialState = {}) => {
  const store = storeFactory(initialState);
  const component = shallow(<SignUp store={store} />).dive();
  return component;
};

describe('signup component', () => {
  let component;
  beforeEach(() => {
    component = setUp();
  });

  test('should render without errors', () => {
    const wrapper = findByTestAttr(component.dive(), 'component-signUp');
    expect(wrapper.length).toBe(1);
  });

  test('it renders h1', () => {
    const h1 = findByTestAttr(component.dive(), 'heading-signUp');
    expect(h1.length).toBe(1);
  });

  test('renders signup form', () => {
    const signUpForm = findByTestAttr(component.dive(), 'signUp-form');
    expect(signUpForm.length).toBe(1);
  });

  test('renders img upload', () => {
    const imgUpload = findByTestAttr(component.dive(), 'img-upload');
    expect(imgUpload.length).toBe(1);
  });

  test('renders button', () => {
    const signUpBtn = findByTestAttr(component.dive(), 'register-button');
    expect(signUpBtn.length).toBe(1);
  });

  test('renders form error message', () => {
    const formErrorMessage = findByTestAttr(component.dive(), 'error-message');
    expect(formErrorMessage.length).toBe(1);
  });
});
