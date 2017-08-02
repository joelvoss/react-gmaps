import * as mapActions from './googleActions';
import * as markerActions from './markerActions';
import * as geolocationActions from './geolocationActions';

const combinedActions = Object.assign({}, mapActions, markerActions, geolocationActions);

export default combinedActions;
