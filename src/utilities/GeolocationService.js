import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/publish';

const GeolocationService = options => {
  const provider = typeof navigator !== 'undefined' && navigator.geolocation;

  return Observable.create(observer => {
    const onSuccess = pos => {
      observer.next({
        lat: pos.coords.latitude,
        lng: pos.coords.longitude
      });
    };

    const onError = err => {
      console.log(err);
      observer.error(err);
    };

    const watchId = provider.watchPosition(onSuccess, onError, {
      enableHighAccuracy: true,
      maximumAge: 0,
      timeout: Infinity
    });

    return () => {
      provider.clearWatch(watchId);
    };
  })
    .publish()
    .refCount();
};

export default GeolocationService;
