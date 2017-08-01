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
        reject();
      } else {
        // do the geolocation stuff
        const timeout = options.userDecisionTimeout || null;
        if (timeout) {
          userDecisionTimeoutId = setTimeout(() => {
            reject();
          }, timeout);
        }

        return getPosition();
      }
    });
  }

  const getPosition = () => {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject, {
        enableHighAccuracy: true,
        maximumAge: 0,
        timeout: Infinity
      });
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
        cancelUserDecisionTimeout();
        console.log(position);
      })
      .catch(err => console.error(err))
  );
}

export default GeolocationService;
