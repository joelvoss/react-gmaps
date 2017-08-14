import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/publish';

/**
 * This method creates an observable stream of actions based on the current state of
 * the html5 geolocation process of the browser.
 * We use an observable, since the user has to give permission to geolocate its device
 * and this may take a couple of seconds.
 * @param {object} options - Geolocation Service configuration object
 */
const GeolocationService = options => {
  const provider = typeof navigator !== 'undefined' && navigator.geolocation;

  return Observable.create(observer => {
    // Emit that we are trying to gather the user's location.
    observer.next({
      type: 'pending',
      payload: 'Standort suchen...'
    });

    // On each successfull geolocation emit a success action.
    const onSuccess = pos => {
      observer.next({
        type: 'success',
        payload: {
          lat: pos.coords.latitude,
          lng: pos.coords.longitude
        }
      });
    };

    // If we encounter an error when geolocating, emit a custom error action.
    // We dont want to tear down the complete observable.
    const onError = err => {
      return new Promise((resolve) => {
        const errorMessages = [
          'Geolokalisierung nicht möglich! <a href="https://developer.mozilla.org/en-US/docs/Web/API/Geolocation" target="_blank">(mehr erfahren)</a>',
          'Geolokalisierung fehlgeschlagen.',
          'Geolokalisierung fehlgeschlagen (Timeout)'
        ];
        observer.next({
          type: 'error',
          payload: errorMessages[err.code - 1]
        });

        // after a set timeout, emit the 'complete' action
        this.timer = setTimeout(() => {
          observer.next({
            type: 'complete'
          });
          resolve();
        }, options.timeout / 2);
      });
    };

    // If the geolocation provider is not supported, emit an error and tear down the observable.
    if (!provider) {
      onError({code: 2})
        .then(() => tearDown());
    }

    // Tear down the observable.
    const tearDown = () => {
      clearTimeout(this.timer);
      provider.clearWatch(watchId);
    }

    /**
     * Watch the users position.
     */
    const watchId = provider.getCurrentPosition(onSuccess, onError, {
      enableHighAccuracy: true,
      maximumAge: 0,
      timeout: options.timeout
    });

    return () => tearDown();
  })
    .publish()
    .refCount();
};

export default GeolocationService;
