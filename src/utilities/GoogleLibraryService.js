/**
 * This method creates a google maps api url and appends it to the dom.
 * If we already have a window.google object, which means that the google maps
 * api is already loaded, we do not need to append a script tag.
 * In this case we just return the window.google object.
 *
 * @param  {object} opt - Options of the google maps api (e.g. apikey, libraries...)
 * @return {promise}    - Returns a promise with the window.google payload
 */
const GoogleLibraryService = opt => {
  const options = opt || {};

  if (!options.apiKey) {
    throw new Error('You must provide an apiKey to use the Google Maps API!');
  }

  /**
   * Create a google maps api url.
   * @returns {string} - URL as a string.
   */
  const createGoogleMapsApiUrl = () => {
    const url = 'https://maps.googleapis.com/maps/api/js';

    const params = {
      key: options.apiKey,
      client: options.client || null,
      callback: options.cb || null,
      libraries: (options.libraries && options.libraries.join(',')) || ['places'],
      v: options.version || '3',
      channel: options.channel || null,
      language: options.language || null,
      region: options.region || null
    };
    const paramStr = Object.keys(params)
      .filter(key => !!params[key])
      .map(key => `${key}=${params[key]}`)
      .join('&');

    return `${url}?${paramStr}`;
  };

  /**
   * Create a script tag and append load and error event listener.
   * @return {promise} - Returns a promise of the load events.
   */
  const loadScript = () => {
    // create google maps api url
    const src = createGoogleMapsApiUrl();

    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = src;
      script.addEventListener('error', reject);
      script.addEventListener('load', () => resolve(getLibrary()));
      document.body.appendChild(script);
    });
  };

  /**
   * Check, if the google maps api is loaded and we have access to the
   * window.google object.
   * @return {promise} - Returns a promise of the library check
   */
  const getLibrary = () => {
    return new Promise((resolve, reject) => {
      if (window.google) {
        resolve(window.google);
      } else {
        reject();
      }
    });
  };

  return new Promise((resolve, reject) =>
    getLibrary()
      // shortcut if window.google is already available
      .then(resolve)
      // no window.google available...loading script
      .catch(_ => {
        return loadScript();
      })
      .then(res => {
        resolve(res);
      })
      .catch(err => reject(err))
  );
};

export default GoogleLibraryService;
