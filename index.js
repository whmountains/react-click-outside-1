const React = require('react');
const ReactDOM = require('react-dom');

module.exports = function enhanceWithClickOutside(WrappedComponent) {
  const componentName = WrappedComponent.displayName || WrappedComponent.name;

  if (!WrappedComponent.prototype.handleClickOutside) {
    throw new Error(
      `${componentName} must implement handleClickOutside().`
    );
  }

  return React.createClass({
    displayName: `Wrapped${componentName}`,

    componentDidMount() {
      this.__wrappedComponent = this.refs.wrappedComponent;
      document.addEventListener('click', this.handleClickOutside, true);
    },

    componentWillUnmount() {
      document.removeEventListener('click', this.handleClickOutside, true);
    },

    handleClickOutside(e) {
      const domNode = ReactDOM.findDOMNode(this);
      if (!domNode || !domNode.contains(e.target)) {
        this.refs.wrappedComponent.handleClickOutside(e);
      }
    },

    render() {
      return <WrappedComponent {...this.props} ref="wrappedComponent" />;
    },
  });
};
