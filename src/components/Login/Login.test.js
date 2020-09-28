import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import Login from './Login';
import { storeFactory, findByTestAttr } from '../../test/testUtils';
import { mapStateToProps, mapDispatchToProps } from './Login';

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

  describe('username input', () => {
    test('should capture username correctly onChange', () => {
      let loginComp = component.dive();
      const username = findByTestAttr(loginComp, 'username-input');
      username.value = 'testname';
      username.prop('onChange')({
        target: { id: 'username', value: 'testname' },
      });
      loginComp.update();
      expect(loginComp.state('username')).toBe('testname');
    });
  });
  describe('password input', () => {
    test('should capture password correctly onChange', () => {
      let loginComp = component.dive();
      const password = findByTestAttr(loginComp, 'password-input');
      password.value = 'testpw';
      password.prop('onChange')({
        target: { id: 'password', value: 'testpw' },
      });
      loginComp.update();
      expect(loginComp.state('password')).toBe('testpw');
    });
  });

  describe('dispatch action login', () => {
    test('login should be called with loginCred', () => {
      const loginCred = {
        username: 'testname',
        password: 'testpw',
      };
      const dispatch = jest.fn();
      mapDispatchToProps(dispatch(loginCred));
      expect(dispatch).toHaveBeenCalledTimes(1);
      expect(dispatch).toHaveBeenCalledWith({
        username: 'testname',
        password: 'testpw',
      });
    });
  });

  describe('dispatch state to props', () => {
    test('returns auth/authError state', () => {
      const state = {
        firebase: { auth: 'someAuth' },
        auth: { authError: 'someAuthError' },
      };

      let returnValue = mapStateToProps(state);
      expect(returnValue).toEqual({
        auth: 'someAuth',
        authError: 'someAuthError',
      });
    });
  });
});
