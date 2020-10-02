import React from 'react';
import appStyles from '../../styles/App.module.css';
import styles from './NewsArticle.module.css';
import cx from 'classnames';

const NewsArticle = (props) => {
  const { news } = props.location.state;
  return (
    <div className={styles.newsArticle} data-test="component-newsArticle">
      <h1
        className={cx(appStyles.h1, appStyles.sectionTitle)}
        data-test="title"
      >
        News
      </h1>
      <h2 className={appStyles.h2} data-test="news-title">
        {news.title}
      </h2>
      <p data-test="news-description">{news.description}</p>
    </div>
  );
};

export default NewsArticle;
