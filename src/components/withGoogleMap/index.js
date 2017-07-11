import React, { Component } from 'react';
import GmapsUrl from './GmapsUrl';

const withGoogleMap = ({ apiKey }) => (WrappedComponent) => {
  class GoogleMapsLoader extends Component {
    /**
     * Creates an instance of GoogleMapsLoader.
     * @param {object} props - Components props
     */
    constructor (props) {
      super(props);

      this.script = GmapsUrl({
        apiKey,
      });

      this.state = {
        gLib: null
      }
    }

    /**
     * React lifecycle method.
     * Start loading scripts on mount event.
     * @returns {void}
     */
    componentDidMount () {
      if (this.isScriptAvailable(this.script)) {
        this.props.onGmapReady(window.google);
      } else {
        this.addScript(this.script);
      }
    }

    /**
     * Check of a given script source is already embedded.
     * @param {string} src - Script source
     * @returns {bool} - True or false
     */
    isScriptAvailable(src) {
      const node = document.querySelector(`script[src='${src}']`)
      return node ? true : false;
    }

    /**
     * Add a given script to the dom.
     * @param {string} src - Source of the script to be added to the dom
     * @returns {void}
     */
    addScript(src) {
      const script = document.createElement('script');
      script.src = src;
      script.addEventListener('load', () => this.scriptLoaded());
      script.addEventListener('error', () => this.scriptError(src));
      document.body.appendChild(script);
    }

    /**
     * Handles the successful script load event.
     * @returns {void}
     */
    scriptLoaded() {
      this.setState(() => ({
        gLib: window.google
      }));
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
     * Removes a script with a given source.
     * @param {string} script - The script to remove
     * @returns {void}
     */
    removeScript(src) {
      const node = document.querySelector(`script[src='${src}']`)
      if (node != null) {
        node.parentNode.removeChild(node)
      }
    }

    /**
     * When the component unmounts...remove the script from the dom.
     * @returns {void}
     */
    componentWillUnmount () {
      this.removeScript(this.script);
    }

    /**
     * React render method.
     * @returns {jsx} - Components JSX
     */
    render () {
      return (
        <WrappedComponent {...this.state} {...this.props}/>
      )
    }
  }

  return GoogleMapsLoader;
}

export default withGoogleMap;
