import React, { Component } from 'react';
import Papa from 'papaparse';
import appStyles from '../../styles/App.module.css';
import formStyles from '../../styles/Form.module.css';
import styles from './SportSearch.module.css';
import cx from 'classnames';

class SportSearch extends Component {
  constructor() {
    super();
    this.state = {
      dataList: null,
      query: '',
      result: '',
    };
    this.updateData = this.updateData.bind(this);
  }

  componentDidMount() {
    Papa.parse(
      'https://cors-anywhere.herokuapp.com/http://www.football-data.co.uk/mmz4281/1718/I1.csv',
      {
        download: true,
        header: false,
        complete: this.updateData,
      },
    );
  }

  async updateData(results) {
    const dataList = [];
    await results.data.map((data) => {
      if (data[6] === 'H' || data[6] === 'A') {
        dataList.push({
          homeTeam: data[2],
          awayTeam: data[3],
          result: data[6],
        });
      }
      return dataList;
    });
    this.setState({ dataList });
  }

  onChangeHandler = (e) => {
    let str = e.target.value;
    const uppercaseFirstLetter = str.charAt(0).toUpperCase();
    const query = uppercaseFirstLetter + str.slice(1);
    this.setState({
      query,
    });
  };

  onSubmitHandler = (e) => {
    e.preventDefault();
    const { dataList, query } = this.state;
    const updatedList = [];
    dataList.map((data) => {
      if (data.homeTeam === query && data.result === 'H') {
        updatedList.push(data.awayTeam);
      } else if (data.awayTeam === query && data.result === 'A') {
        updatedList.push(data.homeTeam);
      }
      const result = [...new Set(updatedList)];
      this.setState({ result, query: '' });
      return result;
    });
  };

  render() {
    const { result } = this.state;
    return (
      <div className={styles.sportSearch} data-test="component-sportSearch">
        <h1
          className={cx(appStyles.h1, appStyles.sectionTitle)}
          data-test="title"
        >
          Sport
        </h1>
        <form
          onSubmit={(e) => this.onSubmitHandler(e)}
          className={styles.searchForm}
          data-test="search-form"
        >
          <input
            type="text"
            placeholder="Input team name"
            className={formStyles.inputField}
            data-test="search-input"
            value={this.state.query}
            onChange={(e) => this.onChangeHandler(e)}
          />
        </form>
        <ul className={styles.resultList} data-test="search-results">
          {result !== ''
            ? result.map((result) => {
                return <li key={result}>{result}</li>;
              })
            : null}
        </ul>
      </div>
    );
  }
}

export default SportSearch;
