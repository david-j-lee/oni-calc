const buildingUtils = require('./buildingUtils');

// getBuildings
describe('getBuildingsWithInputs', () => {
  describe('when given empty arrays for buildings and inputs', () => {
    it('should return an empty array', () => {
      const buildings = [];
      const inputs = [];
      const result = [];
      expect(buildingUtils.getBuildings(buildings, inputs)).toEqual(result);
    });
  });

  describe('when given empty building array', () => {
    it('should return return empty array', () => {
      const buildings = [];
      const inputs = [{ name: 'Testing', quantity: 0, utilization: 0 }];
      const result = [];
      expect(buildingUtils.getBuildings(buildings, inputs)).toEqual(result);
    });
  });

  describe('when given buildings with quantity inputs', () => {
    it('should update building with quantity', () => {
      const buildings = [{ name: 'Testing' }];
      const inputs = [{ name: 'Testing', quantity: 50 }];
      const result = [{ name: 'Testing', quantity: 50, utilization: 0 }];
      expect(buildingUtils.getBuildings(buildings, inputs)).toEqual(result);
    });
  });

  describe('when given buildings with utilization inputs', () => {
    it('should update building with utilization', () => {
      const buildings = [{ name: 'Testing' }];
      const inputs = [{ name: 'Testing', utilization: 50 }];
      const result = [{ name: 'Testing', quantity: 0, utilization: 50 }];
      expect(buildingUtils.getBuildings(buildings, inputs)).toEqual(result);
    });
  });

  describe('when given buildings with inputs', () => {
    it('should update building with inputs', () => {
      expect(
        buildingUtils.getBuildings(
          [{ name: 'Testing' }],
          [{ name: 'Testing', quantity: 25, utilization: 50 }],
        ),
      ).toEqual([{ name: 'Testing', quantity: 25, utilization: 50 }]);
    });
  });

  describe('when given building with no inputs property', () => {
    it('should return an empty array', () => {
      const buildings = [{ name: 'Testing' }];
      const inputs = [{ name: 'Testing' }];
      const result = [{ name: 'Testing', quantity: 0, utilization: 0 }];
      expect(buildingUtils.getBuildings(buildings, inputs)).toEqual(result);
    });
  });
});

describe('getBuildingsWithClearedInputs', () => {
  describe('when given empty building array', () => {
    it('should handle empty buildings array', () => {
      const buildings = [];
      const result = [];
      expect(buildingUtils.getBuildingsWithClearedInputs(buildings)).toEqual(
        result,
      );
    });
  });

  describe('when given buildings with values', () => {
    it('should zero out quantity and utilization', () => {
      const buildings = [{ name: 'Testing', quantity: 25, utilization: 50 }];
      const result = [{ name: 'Testing', quantity: 0, utilization: 0 }];
      expect(buildingUtils.getBuildingsWithClearedInputs(buildings)).toEqual(
        result,
      );
    });
  });
});

describe('getBuildingsInputsForResource', () => {
  describe('when given buildings with resourceName', () => {
    it('should return inputs that match the resourceName', () => {
      const buildings = [
        {
          name: 'Testing',
          quantity: 7,
          utilization: 100,
          inputs: [{ name: 'water', value: 10, unit: 'g', rate: 'per second' }],
        },
      ];
      const resourceName = 'water';
      const result = [
        {
          name: 'water',
          value: 10,
          unit: 'g',
          rate: 'per second',
          valueExtended: ((7 * 100) / 100) * 10,
          building: {
            name: 'Testing',
            quantity: 7,
            utilization: 100,
            inputs: [
              { name: 'water', value: 10, unit: 'g', rate: 'per second' },
            ],
          },
        },
      ];

      expect(
        buildingUtils.getBuildingsInputsForResource(buildings, resourceName),
      ).toEqual(result);
    });
  });

  describe('when given resourceName with no matching inputs', () => {
    it('should return an empty array', () => {
      const buildings = [
        {
          name: 'Testing',
          quantity: 7,
          utilization: 100,
          inputs: [{ name: 'water', value: 10, unit: 'g', rate: 'per second' }],
        },
      ];
      const resourceName = 'fire';
      const result = [];

      expect(
        buildingUtils.getBuildingsInputsForResource(buildings, resourceName),
      ).toEqual(result);
    });
  });

  describe('when given empty inputs array', () => {
    it('should return an empty array', () => {
      const buildings = [
        {
          name: 'Testing',
          quantity: 7,
          utilization: 100,
          inputs: [],
        },
      ];
      const resourceName = 'fire';
      const result = [];
      expect(
        buildingUtils.getBuildingsInputsForResource(buildings, resourceName),
      ).toEqual(result);
    });
  });

  describe('when a building does not have an input array', () => {
    it('should return an empty array', () => {
      const buildings = [
        {
          name: 'Testing',
          quantity: 7,
          utilization: 100,
        },
      ];
      const resourceName = 'fire';
      const result = [];
      expect(
        buildingUtils.getBuildingsInputsForResource(buildings, resourceName),
      ).toEqual(result);
    });
  });
});
