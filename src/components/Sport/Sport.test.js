import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import Sport from './Sport';
import { storeFactory, findByTestAttr } from '../../test/testUtils';

Enzyme.configure({ adapter: new EnzymeAdapter() });

const setUp = (initialState = {}) => {
  const store = storeFactory(initialState);
  const component = shallow(<Sport store={store} />);
  return component;
};

describe('sport component', () => {
  let component;
  beforeEach(() => {
    component = setUp();
  });

  test('should render without any errors', () => {
    const wrapper = findByTestAttr(component, 'component-sport');
    expect(wrapper.length).toBe(1);
  });

  test('should render container title', () => {
    const title = findByTestAttr(component, 'title');
    expect(title.length).toBe(1);
  });

  test('should render container sub title', () => {
    const subtitle = findByTestAttr(component, 'sub-title');
    expect(subtitle.length).toBe(1);
  });

  test('should render container content', () => {
    const content = findByTestAttr(component, 'content');
    expect(content.length).toBe(1);
  });
});
