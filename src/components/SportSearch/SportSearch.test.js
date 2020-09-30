import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import SportSearch from './SportSearch';
import { storeFactory, findByTestAttr } from '../../test/testUtils';

Enzyme.configure({ adapter: new EnzymeAdapter() });

const setUp = (initialState = {}) => {
  const store = storeFactory(initialState);
  const component = shallow(<SportSearch store={store} />, {
    disableLifecycleMethods: true,
  });
  return component;
};

describe('sportSearch component', () => {
  let component;
  beforeEach(() => {
    component = setUp();
  });

  test('should render without any errors', () => {
    const wrapper = findByTestAttr(component, 'component-sportSearch');
    expect(wrapper.length).toBe(1);
  });

  test('should render title', () => {
    const title = findByTestAttr(component, 'title');
    expect(title.length).toBe(1);
  });

  test('should render form', () => {
    const form = findByTestAttr(component, 'search-form');
    expect(form.length).toBe(1);
  });

  test('should render search results', () => {
    const searchResults = findByTestAttr(component, 'search-results');
    expect(searchResults.length).toBe(1);
  });

  describe('search input', () => {
    test('should capture search query correctly onChange', () => {
      const searchInput = findByTestAttr(component, 'search-input');
      searchInput.value = 'Testquery';
      searchInput.prop('onChange')({
        target: { value: 'Testquery' },
      });
      component.update();
      expect(component.state('query')).toBe('Testquery');
    });
  });

  describe('component mount', () => {
    test('should call updateData after completion', () => {
      const spy = jest.spyOn(component.instance(), 'updateData');
      component.instance().componentDidMount();
      component.update();
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });
});
