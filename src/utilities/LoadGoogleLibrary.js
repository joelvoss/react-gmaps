import GmapsUrl from './GmapsUrl';

class LoadGoogleLibrary {
  constructor(props) {
    this.apiKey = props.apiKey;
  }

  /**
   * Initialize the LoadGoogleLibrary class by constructing a valid Google
   * api url and adding the appropriate <script> tag to the document.
   *
   * Abort if the google API is already loaded by checking
   *  - Do we have a window.google object?
   *  - Do we have a document node with the google api url?
   *
   * @return {[type]} [description]
   */
  init() {
    window.renderMap = this.renderMap.bind(this);

    const ApiConfig = {
      apiKey: this.apiKey,
      cb: 'renderMap'
    }
    const sourceURL = GmapsUrl(ApiConfig);

    console.log(sourceURL);

    // check, if the script is already loaded
    if (this.isScriptAvailable(sourceURL)) {
      // if we the api is already loaded, return a promise
      return this.scriptLoaded();
    } else {
      return this.addScript(sourceURL);
    }
  }


  /**
   * Checks of a given script source is already embedded and if window.google is
   * available.
   * @param {string} src - Script source
   * @returns {bool} - True or false
   */
  isScriptAvailable(src) {
    const node = document.querySelector(`script[src='${src}']`) ? true : false;
    return (window.google && node) ? true : false;
  }

  /**
   * Add a given script to the dom.
   * @param {string} src - Source of the script to be added to the dom
   * @returns {void}
   */
  addScript(src) {
    const script = document.createElement('script');
    script.src = src;
    script.async = true;
    document.head.appendChild(script);

    return new Promise(resolve => {
      // expose fulfilled state holder to outer scope
      this.renderMap = resolve();
    });
  }

  renderMap() {
    console.log('callback called by google');
    return 'test';
  }

  /**
   * Handles the successful script load event.
   * @returns {void}
   */
  scriptLoaded() {
    return Promise.resolve(window.google);
  }

  /**
   * Handles the failed script load event.
   * @param {string} src - The source that failed
   * @returns {void}
   */
  scriptError(src) {
    const node = document.querySelector(`script[src='${src}']`);
    if (node != null) {
      node.parentNode.removeChild(node);
    }

    return Promise.reject(`Could not load google maps api from url ${src}`);
  }
}

export default LoadGoogleLibrary;
