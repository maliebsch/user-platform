import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import NewsArticle from './NewsArticle';
import { storeFactory, findByTestAttr } from '../../test/testUtils';

Enzyme.configure({ adapter: new EnzymeAdapter() });

const setUp = (initialState = {}) => {
  const store = storeFactory(initialState);
  const initialProps = {
    location: {
      state: {
        news: {
          title: 'newsTitle',
          description: 'newsDescr',
        },
      },
    },
  };
  const component = shallow(<NewsArticle store={store} {...initialProps} />);
  return component;
};

describe('NewsArticle component', () => {
  let component;
  beforeEach(() => {
    component = setUp();
  });

  test('should render without any errors', () => {
    const wrapper = findByTestAttr(component, 'component-newsArticle');
    expect(wrapper.length).toBe(1);
  });

  test('should render the title', () => {
    const sectionTitle = findByTestAttr(component, 'title');
    expect(sectionTitle.length).toBe(1);
  });

  test('should render news title', () => {
    const newsTitle = findByTestAttr(component, 'news-title');
    expect(newsTitle.length).toBe(1);
  });

  test('should render news description', () => {
    const newsDescr = findByTestAttr(component, 'news-description');
    expect(newsDescr.length).toBe(1);
  });
});
