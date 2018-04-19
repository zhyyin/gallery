import React from 'react';
import ReactDOM from 'react-dom';
import { mount } from 'enzyme';
import fetchMock from 'fetch-mock';
import apiResponse from './apiResponse.json';
import App from './App';

const apiUrl = 'https://cors.io/?http://pokeapi.co/api/v2/pokemon?limit=151';
const appState = {
  isLoading: false,
  currentPage: 1,
  itemStart: 0,
  itemEnd: 2,
  items: [{
    name: 'Items1'
  },{
    name: 'Items2'
  },{
    name: 'Items3'
  }]
};

const appState2 = {
  isLoading: false,
  currentPage: 2,
  itemStart: 0,
  itemEnd: 0,
  items: [{
    name: 'Items1'
  },{
    name: 'Items2'
  },{
    name: 'Items3'
  }]
};

describe('App', () => {
  let props, wrapper;

  beforeEach(() => {
    fetchMock
      .mock('http://items.com', apiResponse)
      .mock('http://empty.com', {count: 0, results: []})
      .catch(404)
      .flush();
    global.images = {};
  });

  it('renders App initially', () => {
    wrapper = mount(<App apiUrl="http://nowhere" />);

    wrapper.setState({
      isLoading: false,
      isLoadingError: true
    });
    expect(wrapper.state().isLoading).toEqual(false);
    expect(wrapper.state().items).toEqual(null);
  });

  it('renders App', () => {
    wrapper = mount(<App apiUrl="http://empty.com" />);
    wrapper.setState({
      isLoading: false,
      isLoadingError: true
    });
    expect(wrapper.state().isLoading).toEqual(false);
    expect(wrapper.state().items).toEqual(null);
  });

  it('renders specified page when click on active link', () => {
    wrapper = mount(<App apiUrl="http://items.com" />);
    wrapper.setState(appState);

    expect(wrapper.state().isLoading).toEqual(false);
    expect(wrapper.state().items.length).toEqual(3);
    expect(wrapper.state().currentPage).toEqual(1);

    wrapper.instance().handlePaginationClick(2, 3)({target: {}});
    expect(wrapper.state().currentPage).toEqual(2);
  });

  it('renders same page when click on inactive link', () => {
    wrapper = mount(<App apiUrl="http://items.com" />);
    wrapper.setState(appState);

    expect(wrapper.state().currentPage).toEqual(1);

    wrapper.instance().handlePaginationClick(4, 3)({target: {}});
    expect(wrapper.state().currentPage).toEqual(1);

    wrapper.instance().handlePaginationClick(0, 3)({target: {}});
    expect(wrapper.state().currentPage).toEqual(1);
  });

  it('update when search term changes', () => {
    wrapper = mount(<App apiUrl="http://items.com" />);
    wrapper.setState(appState);
    wrapper.instance().handleSearch({target: {value: 'item2'}});
    expect(wrapper.state().searchTerm).toEqual('item2');
  });

  it('renders empty item list when no match for search term', () => {
    wrapper = mount(<App apiUrl="http://items.com" />);
    wrapper.setState(appState2);
    wrapper.instance().handleSearch({target: {value: 'itemNotExist'}});

    expect(wrapper.state().itemStart).toEqual(0);
    expect(wrapper.state().itemEnd).toEqual(0);
  });

  afterEach(() => {
    fetchMock.restore();
  });
})
