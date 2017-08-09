/**
 * Does a nearby search.
 * https://developers.google.com/maps/documentation/javascript/places?hl=de#place_search_requests
 */
const nearbySearch = options => {
  // Do the search...
  return new Promise((resolve, reject) => {
    if (!options.map) {
      reject('Map reference missing!');
    }
    if (!options.places) {
      reject('Places library reference missing!');
    }

    // Places request configuration object
    const request = {
      location: options.map.getCenter(),
      radius: '5000',
      types: ['store']
    };

    options.places.nearbySearch(request, (results, status) => {
      if (status === 'OK') {
        // clean the results object (and cache external image sources)
        const normalizedResults = results.map(result => {
          return Object.assign({}, result, {
            geometry: {
              location: {
                lat: result.geometry.location.lat(),
                lng: result.geometry.location.lng()
              }
            },
            image: {
              thumbnail: result.photos ? result.photos[0].getUrl({ maxWidth: 150 }) : result.icon,
              medium: result.photos ? result.photos[0].getUrl({ maxWidth: 800 }) : null,
              large: result.photos ? result.photos[0].getUrl({ maxWidth: 1920 }) : null
            }
          });
        });

        resolve(normalizedResults);
      } else {
        reject(status);
      }
    });
  });
};

export default nearbySearch;
