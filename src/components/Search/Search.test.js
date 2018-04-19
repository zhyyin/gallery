import React from 'react';
import ReactDOM from 'react-dom';
import { mount } from 'enzyme';
import Search from './Search';

describe('Search', () => {
  let props, wrapper;
  const handleSearch = jest.fn();

  beforeEach(() => {
    props = {
      id: 'searchId',
      placeholder: 'Enter',
      searchTerm: 'Hi',
      handleSearch: handleSearch
    };
  });

  it('should show initial value', () => {
    wrapper = mount(<Search {...props} />);
    expect(wrapper.find('input').instance().value).toEqual('Hi');
  });

  it('should init when props is not passed in', () => {
    wrapper = mount(<Search />);
    wrapper.find('input').simulate('change');
    expect(wrapper.find('input').instance().value).toEqual('');
  });

  it('should handle user input change', () => {
    wrapper = mount(<Search {...props} />);    
    wrapper.find('input').simulate('change', {
      target: {value: 'Hello'}
    });
    expect(handleSearch).toHaveBeenCalledWith(expect.objectContaining({
      target: {value: 'Hello'}
    }));
  });
})
