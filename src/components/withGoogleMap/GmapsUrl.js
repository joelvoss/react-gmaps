/**
 * Method that creates a google maps url
 * @param {object} opts - Google Maps Options
 * @returns {string} - A Google Maps API string
 */
const GmapsUrl = (opts = {}) => {
  if (!opts.apiKey) {
    throw new Error('You must provide an apiKey to use the Google Apis!');
  }

  const url = 'https://maps.googleapis.com/maps/api/js';

  const params = {
    key: opts.apiKey,
    client: opts.client || null,
    callback: opts.cb || null,
    libraries: (opts.libraries && opts.libraries.join(',')) || ['places'],
    v: opts.version || '3',
    channel: opts.channel || null,
    language: opts.language || null,
    region: opts.region || null
  }
  const paramStr = Object.keys(params)
    .filter(key => !!params[key])
    .map(key => `${key}=${params[key]}`).join('&');

  return `${url}?${paramStr}`;
}

export default GmapsUrl;
