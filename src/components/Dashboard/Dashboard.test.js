import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import Dashboard from './Dashboard';
import { storeFactory, findByTestAttr } from '../../test/testUtils';
import { getLocation, fetchWeather } from '../../api/api';

Enzyme.configure({ adapter: new EnzymeAdapter() });
jest.mock('../../api/api');

const setUp = (
  initialState = {
    firebase: {
      auth: { uid: 1234 },
      profile: {
        username: 'testuser',
        password: 'testpw',
        profileImage: 'testImg.png',
      },
    },
  },
) => {
  const store = storeFactory(initialState);
  const component = shallow(<Dashboard store={store} />, {
    disableLifecycleMethods: true,
  })
    .dive()
    .dive();
  return component;
};

describe('dashbaord component', () => {
  let component;
  beforeEach(() => {
    component = setUp();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should render without any errors', () => {
    const wrapper = findByTestAttr(component, 'component-dashboard');
    expect(wrapper.length).toBe(1);
  });

  test('should render user greeting', () => {
    const userGreeting = findByTestAttr(component, 'user-greeting');
    expect(userGreeting.length).toBe(1);
  });

  test('should render username within the greeting', () => {
    const username = findByTestAttr(component, 'username');
    expect(username.length).toBe(1);
  });

  test('should render logout button if user is logged in', () => {
    const btn = findByTestAttr(component, 'logout-btn');
    expect(btn.length).toBe(1);
  });

  test('should render user profile image if existing', () => {
    const img = findByTestAttr(component, 'userImg');
    expect(img.length).toBe(1);
  });

  test('should render icon if user profile image is unset', () => {
    const icon = findByTestAttr(component, 'account-icon');
    expect(icon.length).toBe(0);
  });

  describe('component mount', () => {
    test('should set weather state with value', async () => {
      getLocation.mockResolvedValue('someLocation');
      fetchWeather.mockResolvedValue('someWeather');
      await component.instance().componentDidMount();
      component.update();
      expect(component.state('weather')).toBe('someWeather');
    });

    test('should not call fetchweather if location is null', async () => {
      getLocation.mockResolvedValue(null);
      expect(fetchWeather).toHaveBeenCalledTimes(0);
      await component.instance().componentDidMount();
      component.update();
      expect(component.state('weather')).toBe(null);
    });
  });
});
