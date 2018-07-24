const powerUtils = require('./powerUtils');

describe('getBuildingsPowerUsage', () => {
  describe('when given an empty array of buildings', () => {
    it('should return an object whose value is 0', () => {
      const buildings = [];
      const result = { value: 0, buildings: [] };
      expect(powerUtils.getBuildingsPowerUsage(buildings)).toEqual(result);
    });
  });
});
