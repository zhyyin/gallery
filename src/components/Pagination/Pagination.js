import React, {Component} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './Pagination.css';

let cx = classNames.bind(styles);

class Pagination extends Component {
  static propTypes = {
    currentPage: PropTypes.number,
    totalPages: PropTypes.number,
    handlePaginationClick: PropTypes.func
  };

  static defaultProps = {
    currentPage: 0,
    totalPages: 0
  };

  render() {
    const {currentPage, totalPages, handlePaginationClick} = this.props;

    return(
      <ul className={cx('list-paginations')}>
        <li className={cx('pagination', {disabled: currentPage <= 1})}>
          <button className={cx('pagination-link')} onClick={handlePaginationClick(currentPage - 1, totalPages)}>
            Previous
          </button>
        </li>
        <li className={cx('pagination', {disabled: currentPage >= totalPages})}>
          <button className={cx('pagination-link')} onClick={handlePaginationClick(currentPage + 1, totalPages)}>
            Next
          </button>
        </li>
      </ul>
    );
  }
}

export default Pagination;
