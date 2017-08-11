import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromEventPattern';

/**
 * This class represents all map events of the google map.
 * It esentiually is a wrapper for the google maps event api and returns observables.
 * This way we can use all utility methods from rxjs like throttle or debounce if necessary.
 */
class MapEventService {
  constructor(props) {
    this.map = props.map;
    this.google = props.google;
  }

  /**
   * Creates an event of type x and returns an observable for this type.
   * @param {string} type - The event type as a string, e.g. 'idle', 'change_center'
   */
  createEvent = type => {
    return Observable.fromEventPattern(
      handler => this.map.addListener(type, handler),
      (handler, listener) => {
        this.google.maps.event.removeListener(listener);
      }
    );
  };
}

export default MapEventService;
