import React, { Component } from 'react';
import GmapsUrl from './GmapsUrl';

const withGoogleMap = ({ apiKey }) => WrappedComponent => {
  class GoogleMapsLoader extends Component {
    constructor(props) {
      super(props);

      this.script = GmapsUrl({
        apiKey
      });

      this.state = {
        googleLibrary: null
      };
    }

    /**
     * Add script tag to the dom when the component mounts and its not already available.
     */
    componentDidMount() {
      if (!this.isScriptAvailable(this.script)) {
        this.addScript(this.script);
      }
    }

    /**
     * Checks of a given script source is already embedded.
     * @param {string} src - Script source
     * @returns {bool} - True or false
     */
    isScriptAvailable(src) {
      const node = document.querySelector(`script[src='${src}']`);
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
        googleLibrary: window.google
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
      const node = document.querySelector(`script[src='${src}']`);
      if (node != null) {
        node.parentNode.removeChild(node);
      }
    }

    render() {
      return <WrappedComponent {...this.state} {...this.props} />;
    }
  }

  return GoogleMapsLoader;
};

export default withGoogleMap;
