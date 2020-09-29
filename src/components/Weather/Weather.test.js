import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import Weather from './Weather';
import { storeFactory, findByTestAttr } from '../../test/testUtils';

Enzyme.configure({ adapter: new EnzymeAdapter() });

const setUp = (initialState = {}) => {
  const store = storeFactory(initialState);
  const initialProps = {
    weather: [
      {
        location: 'testlocation',
        temperature: 18.5,
        thumbnail: 'Clouds',
      },
    ],
  };
  const component = shallow(<Weather store={store} {...initialProps} />);
  return component;
};

describe('weather component', () => {
  let component;
  beforeEach(() => {
    component = setUp();
  });

  test('should render without any errors', () => {
    const wrapper = findByTestAttr(component, 'component-weather');
    expect(wrapper.length).toBe(1);
  });

  test('should render title', () => {
    const title = findByTestAttr(component, 'title');
    expect(title.length).toBe(1);
  });

  test('should render local temperature given by weather prop', () => {
    const temperature = findByTestAttr(component, 'temperature');
    expect(temperature.length).toBe(1);
  });

  test('should render location given by weather prop', () => {
    const location = findByTestAttr(component, 'location');
    expect(location.length).toBe(1);
  });

  test('should render weather icon given by weather prop', () => {
    const weatherIconCloud = findByTestAttr(component, 'weather-icon-cloud');
    const weatherIconSun = findByTestAttr(component, 'weather-icon-sun');
    const weatherIconRain = findByTestAttr(component, 'weather-icon-rain');
    const weatherIconGeneric = findByTestAttr(
      component,
      'weather-icon-generic',
    );
    expect(weatherIconCloud.length).toBe(1);
    expect(weatherIconSun.length).toBe(0);
    expect(weatherIconRain.length).toBe(0);
    expect(weatherIconGeneric.length).toBe(0);
  });
});
