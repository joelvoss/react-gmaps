import styled from 'styled-components';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/publish';
import NearbySearch from 'utilities/NearbySearch';

/**
 * The styled map component.
 */
const Map = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
`;

/**
 * Adds different map event handlers as observables.
 * @param {object} options The required options for the MapEventService to function properly
 */
export const MapEventService = props => {
  // Event listener
  let idleListener = null;

  return Observable.create(observer => {
    if (!props.map) {
      observer.error('Map reference missing!');
    }
    if (!props.places) {
      observer.error('Places library reference missing!');
    }

    idleListener = props.map.addListener('idle', async () => {
      try {
        const nearbySearchResults = await NearbySearch(props);
        emitAction('idle', 'nearby_search_success', nearbySearchResults);
      } catch (err) {
        emitAction('idle', 'nearby_search_error', err);
      }
    });

    /**
     * Generic method which calls the observer.next() method.
     * @param {string} type The action type, e.g. 'idle'.
     * @param {string} action The action identifier who describes the emitted action.
     * @param {any} payload The actual payload of the action.
     */
    const emitAction = (type, action, payload) => {
      observer.next({ type, action, payload });
    }

    /**
     * On complete, remove all event listener.
     */
    return () => {
      idleListener.remove();
    };
  })
    .publish()
    .refCount();
};

export default Map;
