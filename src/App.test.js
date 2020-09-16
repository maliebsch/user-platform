import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import App from './App';

Enzyme.configure({ adapter: new EnzymeAdapter() });

test('renders  without throwing error', () => {
  const wrapper = shallow(<App />);
  const appComp = wrapper.find("[data-test='component-app']");
  expect(appComp.length).toBe(1);
});

test('renders background image', () => {
  const wrapper = shallow(<App />);
  const appCompStyle = wrapper.find("[data-test='component-app']").get(0).props
    .style;
  expect(appCompStyle).toHaveProperty('backgroundImage');
});
