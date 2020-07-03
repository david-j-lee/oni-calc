const powerUtils = require('./powerUtils');

describe('getBuildingsPowerUsage', () => {
  describe('when given an empty array of buildings', () => {
    it('should return an object whose value is 0', () => {
      const buildings = [];
      const result = { value: 0, buildings: [] };
      expect(powerUtils.getBuildingsPowerUsage(buildings)).toEqual(result);
    });
  });

  describe('when given array of buildings with power usage', () => {
    it('should return the total power usage', () => {
      const buildings = [
        {
          name: 'Testing1',
          quantity: 2,
          utilization: 100,
          power: { usage: 100, generation: 0, unit: 'W', rate: 'per second' },
        },
      ];
      const result = { value: 200, buildings: buildings };
      expect(powerUtils.getBuildingsPowerUsage(buildings)).toEqual(result);
    });
  });
});

describe('getBuildingsPowerGeneration', () => {
  describe('when given an empty array of buildings', () => {
    it('should return an object whose value is 0', () => {
      const buildings = [];
      const result = { value: 0, buildings: [] };
      expect(powerUtils.getBuildingsPowerGeneration(buildings)).toEqual(result);
    });
  });

  describe('when given array of buildings with power usage', () => {
    it('should return the total power generation', () => {
      const buildings = [
        {
          name: 'Testing1',
          quantity: 2,
          utilization: 100,
          power: { usage: 0, generation: 100, unit: 'W', rate: 'per second' },
        },
      ];
      const result = { value: 200, buildings: buildings };
      expect(powerUtils.getBuildingsPowerGeneration(buildings)).toEqual(result);
    });
  });
});
