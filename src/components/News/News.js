import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styles from '../Dashboard/Dashboard.module.css';
import appStyles from '../../styles/App.module.css';

class News extends Component {
  state = {
    news: '',
  };

  async componentDidMount() {
    await fetch(
      'https://cors-anywhere.herokuapp.com/http://feeds.bbci.co.uk/news/rss.xml',
    )
      .then((response) => {
        console.log(response);
        return response.text();
      })
      .then((str) => {
        console.log(str);
        console.log(new DOMParser().parseFromString(str, 'text/xml'));
        return new DOMParser().parseFromString(str, 'text/xml');
      })
      .then((data) => {
        console.log(data.body);
        const latest = data.querySelector('item');
        const news = {
          title: latest.querySelector('title').textContent,
          description: latest.querySelector('description').textContent,
        };

        this.setState({ news });
      });
  }

  render() {
    const { news } = this.state;
    console.log(news);
    return (
      <div>
        <Link
          to={{
            pathname: 'news/latest',
            state: {
              news,
            },
          }}
        >
          <div className={styles.dashboardContainer} data-test="component-news">
            <div className={styles.containerHeader}>
              <h3 className={styles.containerTitle} data-test="title">
                News
              </h3>
            </div>
            <div className={styles.containerMain}>
              <div>
                <h3 className={appStyles.h3} data-test="news-title">
                  {news.title}
                </h3>
                <p data-test="news-description">{news.description}</p>
              </div>
            </div>
          </div>
        </Link>
      </div>
    );
  }
}

export default News;
