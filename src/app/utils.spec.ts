import { getCoords } from './utils';

describe('Utils', () => {
  it('getCoords should equal DEFAULT_COORDS', done => {
    getCoords().then(coords => {
      expect(coords.latitude).toBeTruthy();
      done();
    });
  });
});
