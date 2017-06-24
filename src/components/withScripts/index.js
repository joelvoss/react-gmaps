import React, { Component } from 'react';
import PropTypes from 'prop-types';

const withScripts = (...scripts) => (WrappedComponent) => {
  return class ScriptLoader extends Component {
    /**
     * Components propTypes
     */
    static propTypes = {
      onScriptLoaded: PropTypes.func
    }

    /**
     * Components defaultProps
     */
    static defaultProps = {
      onScriptLoaded: () => {}
    }

    /**
     * Creates an instance of ScriptLoader.
     * @param {object} props - Components props
     */
    constructor (props) {
      super(props);

      this.state = {
        isScriptLoaded: false,
        isScriptLoadSucceed: false
      }
    }

    /**
     * Removes a script with a given source.
     * @param {string} script - The script to remove
     * @returns {void}
     */
    removeScript(script) {
      const node = document.querySelector(`script[src='${script}']`)
      if (node != null) {
        node.parentNode.removeChild(node)
      }
    }

    /**
     * Add a given script to the dom.
     * @param {string} src - Source of the script to be added to the dom
     * @returns {void}
     */
    newScript(src) {
      const script = document.createElement('script');
      script.src = src;
      script.addEventListener('load', () => this.scriptLoaded(src));
      script.addEventListener('error', () => this.scriptError(src));
      document.body.appendChild(script);
    }

    /**
     * Handles the successful script load event.
     * @returns {void}
     */
    scriptLoaded() {
      this.setState({
        isScriptLoaded: true,
        isScriptLoadSucceed: true
      });
      this.props.onScriptLoaded();
    }

    /**
     * Handles the failed script load event.
     * @param {string} src - The source that failed
     * @returns {void}
     */
    scriptError(src) {
      this.removeScript(src);
    }

    /**
     * Starts loading the given scripts.
     * @param {array || string} scripts - Array or single string of script sources
     */
    startLoadingScripts(scripts) {
      // if we have an array of scripts, loop over them
      if (Array.isArray(scripts)) {
        scripts.forEach(src => {
          this.removeScript(src);
          this.newScript(src);
        });
      } else {
        this.removeScript(scripts);
        this.newScript(scripts);
      }
    }

    /**
     * React lifecycle method.
     * Start loading scripts on mount event.
     * @returns {void}
     */
    componentDidMount () {
      this.startLoadingScripts(scripts);
    }

    /**
     * When the component unmounts...remove the scripts from the dom.
     * @returns {void}
     */
    componentWillUnmount () {
      if (Array.isArray(scripts)) {
        scripts.forEach(src => {
          this.removeScript(src);
        });
      } else {
        this.removeScript(scripts);
      }
    }

    /**
     * React render method.
     * @returns {jsx} - Components JSX
     */
    render () {
      const props = { ...this.props, ...this.state };
      return (
        <WrappedComponent {...props} />
      )
    }
  }
}

export default withScripts;
