const GeolocationService = opts => {
  const options = opts || {};
  const geolocationProvider = typeof navigator !== 'undefined' && navigator.geolocation;

  let userDecisionTimeoutId = null;

  /**
   * [description]
   * @return {[type]} [description]
   */
  const getLocation = () => {
    return new Promise((resolve, reject) => {
      // If the geolocation provider is not available, reject the promise.
      if (!geolocationProvider || !geolocationProvider.getCurrentPosition) {
        reject({code: 1, message:'Geolocation Provider is not available!'});
      } else {
        // do the geolocation stuff
        const timeout = options.userDecisionTimeout || 5000;

        // start a timeout after which the geolocation process is automatically
        // aborted.
        if (timeout) {
          console.log('start cancel timer...');
          userDecisionTimeoutId = setTimeout(() => {
            console.log('...timer finished...reject!');
            reject({code: 1, message:'User did neither accepted nor declined the geolocation permission dialog!'});
          }, timeout);
        }

        navigator.geolocation.getCurrentPosition(resolve, reject, {
          enableHighAccuracy: true,
          maximumAge: 0,
          timeout: Infinity
        });
      }
    });
  }

  const cancelUserDecisionTimeout = () => {
    if (userDecisionTimeoutId) {
      clearTimeout(userDecisionTimeoutId);
    }
  }

  return new Promise((resolve, reject) =>
    getLocation()
      .then(position => {
        // we have a position! cancel our reject timeout.
        cancelUserDecisionTimeout();
        const pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
        resolve(pos);
      })
      .catch(err => {
        cancelUserDecisionTimeout();
        reject(err);
      })
  );
}

export default GeolocationService;
