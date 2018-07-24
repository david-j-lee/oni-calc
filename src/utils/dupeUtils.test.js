const dupeUtils = require('./dupeUtils');

describe('getDupes', () => {
  describe('when given empty object for dupes', () => {
    it('should return object with default values', () => {
      const dupes = {};
      const inputs = [];
      const result = {
        quantity: 0,
        waterValue: 0,
        pollutedWaterValue: 0,
        dirtValue: 0,
        pollutedDirtValue: 0,
        traits: [],
      };
      expect(dupeUtils.getDupes(dupes, inputs)).toEqual(result);
    });
  });
});
