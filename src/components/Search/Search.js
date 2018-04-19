import React, {Component} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './Search.css';

let cx = classNames.bind(styles);

class Search extends Component {
  static propTypes = {
    id: PropTypes.string,
    placeholder: PropTypes.string,
    searchTerm: PropTypes.string,
    handleSearch: PropTypes.func
  };

  static defaultProps = {
    currentPage: 0,
    totalPages: 0,
    searchTerm: '',
    handleSearch: e => e
  };

  render() {
    const {id, placeholder, searchTerm, handleSearch} = this.props;

    return(
      <div className={cx('search-section')}>
        <input
          type="text"
          id={id}
          name={id}
          className={cx('search-term')}
          value={searchTerm}
          placeholder={placeholder}
          onChange={handleSearch}>
        </input>
      </div>
    );
  }
}

export default Search;
