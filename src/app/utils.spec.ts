import { getCoords, DEFAULT_COORDS } from './utils';

describe('Utils', () => {
  it('getCoords should equal DEFAULT_COORDS', done => {
    getCoords().then(coords => {
      expect(coords).toEqual(DEFAULT_COORDS);
      done();
    });
  });
});
