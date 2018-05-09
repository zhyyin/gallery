import React, {Component} from 'react';

const withData = url => WrappedComponent => (
  class extends Component {
    state = {
      data: []
    }
    
    // A hook that is called when props are available and before making API call.
    componentDidMount() {
      // A string, or a function, which receives component's props and returns a URL that depends on received parameters.
      const endpoint = typeof url === 'function' ? url(this.props) : url;
      // console.log('this:', this);

      this.setState({
        isLoading: true
      });

      fetch(endpoint)
        .then(response => response.json())
        .then(data => this.setState({
          isLoading: false,
          isLoadingError: false,
          data: data
        }))
        .catch(error => this.setState({
          isLoading: false,
          isLoadingError: true
        }));
    }
    
    render() {
      // Render the given component spreading props 'cause we want HoC to be transparent.
      return <WrappedComponent {...this.props} {...this.state} />
    }
  }
);

export default withData;
