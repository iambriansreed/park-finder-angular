export const DEFAULT_COORDS = {
  latitude: 36.8471508,
  longitude: -76.2953987
};

export function getCoords(): Promise<{ latitude: number; longitude: number }> {
  return new Promise(resolve => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        position => resolve(position.coords),
        _ => resolve(DEFAULT_COORDS),
        { timeout: 1000 }
      );
    } else {
      resolve(DEFAULT_COORDS);
    }
  });
}
