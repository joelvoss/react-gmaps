/**
 * Method that creates a google maps url
 * @param {object} options - Google Maps Options
 * @returns {string} - A Google Maps API string
 */
const GmapsUrl = (options = {}) => {
  if (!options.apiKey) {
    throw new Error('You must provide an apiKey to use the Google Maps API!');
  }

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
  const paramStr = Object.keys(params).filter(key => !!params[key]).map(key => `${key}=${params[key]}`).join('&');

  return `${url}?${paramStr}`;
};

export default GmapsUrl;
