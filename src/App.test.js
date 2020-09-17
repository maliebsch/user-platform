import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import {findByTestAttr } from '../../test/testUtils';
import App from './App';

Enzyme.configure({ adapter: new EnzymeAdapter() });

const setUp = (props = {}) => {
  const component = shallow(<App/>);
  return component;
};

describe('app component', () => {
  let component;
  beforeEach(() => {
    component = setUp();
  });

  test('renders  without throwing error', () => {
    const appComp = findByTestAttr(component, 'component-app');
    expect(appComp.length).toBe(1);
  });
  
  test('renders background image', () => {
    const appCompStyle = findByTestAttr(component, 'component-app').get(0).props.style;
    expect(appCompStyle).toHaveProperty('backgroundImage');
  });
},