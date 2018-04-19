import React, {Component} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './ListItems.css';

let cx = classNames.bind(styles);

class Pagination extends Component {
  static propTypes = {
    items: PropTypes.array.isRequired,
    filteredItems: PropTypes.array.isRequired,
  };

  static defaultProps = {
    items: [],
    filteredItems: []
  };

  render() {
    const {items, filteredItems, images} = this.props;
    const itemNames = items.map(item => item.name);

    return(
      <ul className={cx('list-items')}>
        {filteredItems.map((item, index) =>
          <li className={cx('item')} key={itemNames.indexOf(item.name)}>
            <div className={cx('item-side')}>
              <img className={cx('item-img')} src={images[`${itemNames.indexOf(item.name) + 1}.png`]} alt={item.name} />
            </div>
            <div className={cx('item-main')}>
              <div className={cx('item-number')}>#{itemNames.indexOf(item.name) + 1}</div>
              <div className={cx('item-name')}>{item.name}</div>
            </div>
          </li>
        )}
      </ul>
    );
  }
}

export default Pagination;
