import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';
import ListItems from './ListItems';

describe('ListItems', () => {
  let props, propsWithSingleItem, wrapper, itemSelector;

  beforeEach(() => {
    props = {
      items: [{name: 'item1'}, {name: 'item2'}],
      filteredItems: [{name: 'item1'}, {name: 'item2'}],
      images: {'1.png': "data:image/png;base64,abc", '2.png': "data:image/png;base64,def"}
    };
    propsWithSingleItem = {
      items: [{name: 'item1'}, {name: 'item2'}],
      filteredItems: [{name: 'item1'}],
      images: {'1.png': "data:image/png;base64,abc", '2.png': "data:image/png;base64,def"}
    };
  });

  it('should have multiple items', () => {
    wrapper = shallow(<ListItems {...props} />)
    expect(wrapper.find('.item').length).toBe(2);
  });

  it('should have a single item', () => {
    wrapper = shallow(<ListItems {...propsWithSingleItem} />)
    expect(wrapper.find('.item').length).toBe(1);
  });
})