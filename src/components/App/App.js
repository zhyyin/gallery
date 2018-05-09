import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { compose, branch, renderComponent } from 'recompose'
import classNames from 'classnames/bind';
import 'bootstrap/dist/css/bootstrap-reboot.css';
import styles from './App.css';
import withData from '../withData/withData';
import withLoader from '../withLoader/withLoader';
import ListItems from '../ListItems/ListItems';
import Search from '../Search/Search';
import Pagination from '../Pagination/Pagination';
import Spinner from '../Spinner/Spinner';

let cx = classNames.bind(styles);

class App extends Component {
  static propTypes = {
    itemsPerPage: PropTypes.number,
    apiUrl: PropTypes.string,
    alertHeading: PropTypes.string,
    alertMain: PropTypes.string
  };

  static defaultProps = {
    itemsPerPage: 20,
    apiUrl: 'https://cors.io/?http://pokeapi.co/api/v2/pokemon?limit=151',
    alertHeading: 'Whoops! We couldn\'t find the pokemon you were looking for.',
    alertMain: 'Please try again in a few minutes as Pokemon api (hosted in Cloudflare) can go offline intermittently during the day.'
  };

  state = {
    items: null,
    currentPage: null,
    itemStart: null,
    itemEnd: null,
    isLoadingError: false,
    searchTerm: ''
  }

  componentDidMount() {
    this.loadPokemon(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.loadPokemon(nextProps);
  }

  render() {
    const {itemsPerPage, alertHeading, alertMain, isLoading, isLoadingError} = this.props;
    const {currentPage, searchTerm, items, itemStart, itemEnd} = this.state;

    let filteredItems = items;
    if (searchTerm) {
      filteredItems = items.filter(item => item.name.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1);
    }
    const totalCount = Array.isArray(filteredItems) ? filteredItems.length : 0;
    const totalPages = Math.ceil(totalCount / itemsPerPage);
    const hasListItems = filteredItems && filteredItems.slice(itemStart, itemEnd + 1);
    //console.log('isLoading:', isLoading, ' isLoadingError:', isLoadingError, ' filteredItems:', filteredItems, 'hasListItems:', hasListItems);

    return (
      <div className={cx('app')}>
        <div className={cx('hero-section')}>
          <div className={cx('hero-section-text')}>
            <h1 className={cx('hero-section-heading')}>Pokemon Gallery</h1>
          </div>
        </div>
        <div className={cx('main-section')}>
          { !isLoading &&
              (
                (hasListItems && !isLoadingError)
                ? <div>
                    <Search id="search-term" placeholder="Search by name" searchTerm={searchTerm} handleSearch={this.handleSearch} />
                    <ListItems items={items} filteredItems={filteredItems.slice(itemStart, itemEnd + 1)} images={images} />
                    <Pagination currentPage={currentPage} totalPages={totalPages} handlePaginationClick={this.handlePaginationClick} />
                  </div>
                : <div className={cx('alert-section')}>
                    <div className={cx('alert-error')}>
                      <h2 className={cx('alert-heading')}>{alertHeading}</h2>
                      <p className={cx('alert-main')}>{alertMain}</p>
                    </div>
                  </div>
              )
          }
        </div>
      </div>
    );
  }

  loadPokemon = (props) => {
    const {itemsPerPage} = this.props;
    const {data, isLoadingError, isLoading} = props;

    if (data.results && Array.isArray(data.results) && data.results.length > 0) {
      let items = data.results;
      let itemEnd = Math.min(itemsPerPage, items.length) - 1;
      this.setState({
        items: items,
        currentPage: 1,
        itemStart: 0,
        itemEnd: itemEnd
      });
    }
  };

  handlePaginationClick = (currentPage, totalPages) => (e) => {
    const totalCount = Array.isArray(this.state.items) ? this.state.items.length : 0;
    e.preventDefault && e.preventDefault();
    if (currentPage < 1 || currentPage > totalPages) {
      return false;
    }

    const itemStart = this.props.itemsPerPage * (currentPage - 1);
    const itemEnd = Math.min(itemStart + this.props.itemsPerPage, totalCount) - 1;
    this.setState({
      currentPage,
      itemStart,
      itemEnd
    });
  };

  handleSearch = (e) => {
    const filteredItems = this.state.items.filter(item =>
      item.name.toLowerCase().indexOf(e.target.value.toLowerCase()) > -1
    );

    this.setState({
      searchTerm: e.target.value,
      currentPage: 1,
      itemStart: 0,
      itemEnd: filteredItems.length === 0 ? 0 : Math.min(this.props.itemsPerPage, filteredItems.length) - 1
    });
  };
}

/* Import all images dynamically via Webpack */
let images = {};
function importAll(r) {
  let assets = {};
  r.keys().map((item, index) => {
    assets[item.replace('./', '')] = r(item);
  });
  return assets;
}

try {
  images = importAll(require.context('../../images', false, /\.png/));
} catch (error) {}

// props are unknown at the moment we apply withData HoC
// const enhance = withData(props => props.apiUrl);
const enhance = compose(withData(props => props.apiUrl), withLoader(Spinner));

export default enhance(App);
