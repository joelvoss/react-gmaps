export function mockPosition(google, map) {
  const bounds = map.getBounds();

  const lat_min = bounds.getSouthWest().lat();
  const lat_range = bounds.getNorthEast().lat() - lat_min;
  const lng_min = bounds.getSouthWest().lng();
  const lng_range = bounds.getNorthEast().lng() - lng_min;

  return {
    lat: lat_min + (Math.random() * lat_range),
    lng: lng_min + (Math.random() * lng_range)
  };
}