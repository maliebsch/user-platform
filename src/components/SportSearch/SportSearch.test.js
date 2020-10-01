import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import SportSearch from './SportSearch';
import Papa from 'papaparse';
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
      const updateData = jest.fn();
      Papa.parse('test.csv', {
        download: true,
        header: false,
        complete: updateData(),
      });
      component.instance().componentDidMount();
      component.update();
      expect(updateData).toHaveBeenCalledTimes(1);
    });
  });

  describe('updateData function', () => {
    test('should filter data correctly and set result in state', async () => {
      const updateData = jest.fn();
      const results = [
        {
          data: [
            ['I1', '19/08/17', 'Juventus', 'Cagliari', '3', '0', 'H'],
            ['I1', '19/08/17', 'Verona', 'Napoli', '1', '3', 'A'],
            ['I1', '20/08/17', 'Bologna', 'Torino', '1', '1', 'D'],
          ],
        },
      ];
      await updateData(results);
      component.update();
      expect(component.state('dataList')).toBe([
        { homeTeam: 'Juventus', awayTeam: 'Cagliari', result: 'H' },
        { homeTeam: 'Verona', awayTeam: 'Napoli', result: 'A' },
      ]);
    });
  });

  describe('search form submit', () => {
    test('should capture search query correctly and filter dataList results before setting new state', () => {
      const mockState = {
        query: 'Juventus',
        dataList: [
          { homeTeam: 'Juventus', awayTeam: 'Cagliari', result: 'H' },
          { homeTeam: 'Cagliari', awayTeam: 'Juventus', result: 'A' },
          { homeTeam: 'Verona', awayTeam: 'Napoli', result: 'A' },
        ],
      };
      const searchForm = findByTestAttr(component, 'search-form');
      const mockEvent = { preventDefault: jest.fn() };
      component.setState(mockState);
      searchForm.simulate('submit', mockEvent);
      component.update();
      expect(component.state('query')).toBe('');
      expect(component.state('result')).toEqual(['Cagliari']);
    });
  });
});
