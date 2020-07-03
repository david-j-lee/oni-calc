const capacityUtils = require('./capacityUtils');

describe('getResourcesCapacity', () => {
  describe('when given buildings with resource capacity', () => {
    it('should return an object with the value and buildings', () => {
      const buildings = [
        {
          name: 'Testing1',
          quantity: 1,
          capacity: { resources: { value: 100, unit: 'g' } },
        },
        {
          name: 'Testing2',
          quantity: 2,
          capacity: { resources: { value: 100, unit: 'g' } },
        },
        {
          name: 'Testing3',
          quantity: 3,
          capacity: { resources: { value: 100, unit: 'g' } },
        },
      ];
      const result = { value: 600, buildings: buildings };
      expect(capacityUtils.getResourcesCapacity(buildings)).toEqual(result);
    });
  });

  describe('when given buildings with no resource capacity', () => {
    it('should return with zero value and empty buildings', () => {
      const buildings = [
        {
          name: 'Testing1',
          quantity: 1,
        },
        {
          name: 'Testing2',
          quantity: 2,
          capacity: {},
        },
        {
          name: 'Testing3',
          quantity: 3,
          capacity: { resources: {} },
        },
      ];
      const result = { value: 0, buildings: [] };
      expect(capacityUtils.getResourcesCapacity(buildings)).toEqual(result);
    });
  });
});

describe('getPowerCapacity', () => {
  describe('when given buildings with power capacity', () => {
    it('should return an object with the value and buildings', () => {
      const buildings = [
        {
          name: 'Testing1',
          quantity: 1,
          capacity: { power: { value: 100, unit: 'g' } },
        },
        {
          name: 'Testing2',
          quantity: 2,
          capacity: { power: { value: 100, unit: 'g' } },
        },
        {
          name: 'Testing3',
          quantity: 3,
          capacity: { power: { value: 100, unit: 'g' } },
        },
      ];
      const result = { value: 600, buildings: buildings };
      expect(capacityUtils.getPowerCapacity(buildings)).toEqual(result);
    });
  });

  describe('when given buildings with no power capacity', () => {
    it('should return with zero value and empty buildings', () => {
      const buildings = [
        {
          name: 'Testing1',
          quantity: 1,
        },
        {
          name: 'Testing2',
          quantity: 2,
          capacity: {},
        },
        {
          name: 'Testing3',
          quantity: 3,
          capacity: { resources: {} },
        },
      ];
      const result = { value: 0, buildings: [] };
      expect(capacityUtils.getPowerCapacity(buildings)).toEqual(result);
    });
  });
});
