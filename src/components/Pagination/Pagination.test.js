import React from 'react';
import ReactDOM from 'react-dom';
import { mount } from 'enzyme';
import Pagination from './Pagination';

describe('Pagination', () => {
  let props, wrapper;
  const handlePaginationClick = jest.fn();

  beforeEach(() => {
    props = {
      currentPage: 1,
      totalPages: 3,
      handlePaginationClick: handlePaginationClick
    };
  });

  it('should show paginations with correct state', () => {
    wrapper = mount(<Pagination {...props} />);
    expect(wrapper.find('.pagination').length).toBe(2);
    expect(wrapper.find('.pagination').at(0).hasClass('disabled')).toEqual(true);
    expect(wrapper.find('.pagination').at(1).hasClass('disabled')).toEqual(false);
  });

  it('should show paginations with correct state', () => {
    props = {
      currentPage: 3,
      totalPages: 3,
      handlePaginationClick: handlePaginationClick
    };
    wrapper = mount(<Pagination {...props} />);
    expect(wrapper.find('.pagination').at(0).hasClass('disabled')).toEqual(false);
    expect(wrapper.find('.pagination').at(1).hasClass('disabled')).toEqual(true);
  });

  it('should init when no props passed in', () => {
    wrapper = mount(<Pagination handlePaginationClick={handlePaginationClick} />);
    expect(wrapper.find('.pagination').at(0).hasClass('disabled')).toEqual(true);
    expect(wrapper.find('.pagination').at(1).hasClass('disabled')).toEqual(true);
    wrapper.find('.pagination').at(0).simulate('click');
  });

  it('should handle pagination click', () => {
    wrapper = mount(<Pagination {...props} />);    
    wrapper.find('.pagination').at(1).simulate('click');
    expect(handlePaginationClick).toHaveBeenCalledWith(2, 3);
  });
})
