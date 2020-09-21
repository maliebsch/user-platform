import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import SignUp from './SignUp';
import { storeFactory, findByTestAttr } from '../../test/testUtils';
import { mapDispatchToProps } from './SignUp';

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

  describe('username input', () => {
    test('should capture username correctly onChange', () => {
      let signUpComp = component.dive();
      const username = findByTestAttr(signUpComp, 'username-input');
      username.value = 'testname';
      username.prop('onChange')({
        target: { id: 'username', value: 'testname' },
      });
      signUpComp.update();
      expect(signUpComp.state('username')).toBe('testname');
    });
  });

  describe('email input', () => {
    test('should capture email correctly onChange', () => {
      let signUpComp = component.dive();
      const email = findByTestAttr(signUpComp, 'email-input');
      email.value = 'testemail';
      email.prop('onChange')({
        target: { id: 'email', value: 'testemail' },
      });
      signUpComp.update();
      expect(signUpComp.state('email')).toBe('testemail');
    });
  });

  describe('password input', () => {
    test('should capture password correctly onChange', () => {
      let signUpComp = component.dive();
      const password = findByTestAttr(signUpComp, 'password-input');
      password.value = 'testpw';
      password.prop('onChange')({
        target: { id: 'password', value: 'testpw' },
      });
      signUpComp.update();
      expect(signUpComp.state('password')).toBe('testpw');
    });
  });
  describe('password input confirmation', () => {
    test('should capture password confirmation correctly onChange', () => {
      let signUpComp = component.dive();
      const password = findByTestAttr(signUpComp, 'confirmPw-input');
      password.value = 'testpw';
      password.prop('onChange')({
        target: { id: 'confirmPassword', value: 'testpw' },
      });
      signUpComp.update();
      expect(signUpComp.state('confirmPassword')).toBe('testpw');
    });
  });

  describe('dispatch action signUp', () => {
    test('signUp should be called with new user cred', () => {
      const newUser = {
        username: 'testname',
        email: 'testemail',
        password: 'testpw',
        confirmPassword: 'testpw',
        imageURL: 'url',
      };
      const dispatch = jest.fn();
      mapDispatchToProps(dispatch(newUser));
      expect(dispatch).toHaveBeenCalledTimes(1);
      expect(dispatch).toHaveBeenCalledWith({
        username: 'testname',
        email: 'testemail',
        password: 'testpw',
        confirmPassword: 'testpw',
        imageURL: 'url',
      });
    });
  });
});
