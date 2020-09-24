import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import Dashboard from './Dashboard';
import { storeFactory, findByTestAttr } from '../../test/testUtils';

Enzyme.configure({ adapter: new EnzymeAdapter() });

const setUp = (
  initialState = {
    firebase: { auth: { uid: 1234 } },
    profile: { username: 'testuser', profileImage: 'testImg.png' },
  },
) => {
  const store = storeFactory(initialState);
  const component = shallow(<Dashboard store={store} />).dive();
  return component;
};

describe('dashbaord component', () => {
  let component;
  beforeEach(() => {
    component = setUp();
  });

  test('should render without any errors', () => {
    const wrapper = findByTestAttr(component.dive(), 'component-dashboard');
    expect(wrapper.length).toBe(1);
  });

  test('should render user greeting', () => {
    const userGreeting = findByTestAttr(component.dive(), 'user-greeting');
    expect(userGreeting.length).toBe(1);
  });

  test('should render logout button if user is sucessfully logged in', () => {
    const btn = findByTestAttr(component.dive(), 'logout-btn');
    expect(btn.length).toBe(1);
  });
});
