import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import News from './News';
import { storeFactory, findByTestAttr } from '../../test/testUtils';

Enzyme.configure({ adapter: new EnzymeAdapter() });

global.fetch = jest.fn(() =>
  Promise.resolve(
    new Response(
      '<?xml version="1.0" encoding="UTF-8"?>' +
        '<?xml-stylesheet title="XSL_formatting" type="text/xsl" href="/shared/bsp/xsl/rss/nolsol.xsl"?>' +
        '<rss xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:content="http://purl.org/rss/1.0/modules/content/" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:media="http://search.yahoo.com/mrss/" version="2.0"><channel><title><![CDATA[BBC News - Home]]></title><description><![CDATA[BBC News - Home]]></description><link>https://www.bbc.co.uk/news/</link><image><url>https://news.bbcimg.co.uk/nol/shared/img/bbc_news_120x60.gif</url><title>BBC News - Home</title><link>https://www.bbc.co.uk/news/</link></image><generator>RSS for Node</generator><lastBuildDate>Fri, 02 Oct 2020 14:41:35 GMT</lastBuildDate><copyright><![CDATA[Copyright: (C) British Broadcasting Corporation, see http://news.bbc.co.uk/2/hi/help/rss/4498287.stm for terms and conditions of reuse.]]></copyright>' +
        '<language><![CDATA[en-gb]]></language><ttl>15</ttl><item><title><![CDATA[testTitle]]></title><description><![CDATA[testDescription]]></description><link>https://www.bbc.co.uk/news/world-us-canada-54381848</link><guid isPermaLink="true">https://www.bbc.co.uk/news/world-us-canada-54381848</guid><pubDate>Fri, 02 Oct 2020 14:27:34 GMT</pubDate></item></channel></rss>      ',
    ),
  ),
);

const setUp = (initialState = {}) => {
  const store = storeFactory(initialState);
  const component = shallow(<News store={store} />, {
    disableLifecycleMethods: true,
  });
  return component;
};

describe('News component', () => {
  let component;
  beforeEach(() => {
    component = setUp();
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should render without any errrors', () => {
    const wrapper = findByTestAttr(component, 'component-news');
    expect(wrapper.length).toBe(1);
  });

  test('should render title', () => {
    const title = findByTestAttr(component, 'title');
    expect(title.length).toBe(1);
  });

  test('should render news title', () => {
    const newsTitle = findByTestAttr(component, 'news-title');
    expect(newsTitle.length).toBe(1);
  });

  test('should render news description', () => {
    const newsDescr = findByTestAttr(component, 'news-description');
    expect(newsDescr.length).toBe(1);
  });

  describe('component mount', () => {
    test('should set news state with value', async () => {
      await component.instance().componentDidMount();
      component.update();
      expect(component.state('news')).toEqual({
        title: 'testTitle',
        description: 'testDescription',
      });
    });
  });
});
