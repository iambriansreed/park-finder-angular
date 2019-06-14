const defaultCoords = {
  latitude: 36.8471508,
  longitude: -76.2953987
};

export function getCoords(): Promise<{ latitude: number; longitude: number }> {
  return new Promise(resolve => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        position => resolve(position.coords),
        _ => resolve(defaultCoords),
        { timeout: 1000 }
      );
    } else {
      resolve(defaultCoords);
    }
  });
}
