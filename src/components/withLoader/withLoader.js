import React, {Component} from 'react';
import { compose, branch, renderComponent } from 'recompose'

const withLoader = ComponentPlaceholder => WrappedComponent => (
  class extends Component {
    render() {
      return this.props.isLoading ? <ComponentPlaceholder {...this.props} /> : <WrappedComponent {...this.props} />;
    }
  }
);
  /* branch(
    (props) => props.isLoading,
    renderComponent(component),
    renderComponent(WrappedComponent)
  ); */

export default withLoader;
