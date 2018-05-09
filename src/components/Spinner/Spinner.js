import React, {Component} from 'react';
import PropTypes from 'prop-types';

class Spinner extends Component {
  render() {
    return(
      <div className='progress'>
        <div className='loading-text'>Loading...</div>
      </div>
    );
  }
}

export default Spinner;
