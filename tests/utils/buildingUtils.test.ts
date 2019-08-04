import IBuilding from '../../src/interfaces/IBuilding';
import IBuildingInput from '../../src/interfaces/IBuildingInput';

import * as buildingUtils from '../../src/utils/buildingUtils';

const baseBuilding: IBuilding = {
  category: 'Base',
  name: 'Base Building',
  capacity: {
    power: { value: 0, unit: '' },
    resources: { value: 0, unit: '' },
  },
  hasConsistentIO: false,
  power: { usage: 0, generation: 0, unit: '', rate: '' },
  inputs: [],
  outputs: [],
  quantity: 0,
  utilization: 0,
};

const baseInput: IBuildingInput = {
  name: '',
  quantity: 0,
  utilization: 0,
};

// getBuildings
describe('getBuildings', () => {
  describe('when given empty arrays for buildings and inputs', () => {
    it('should return an empty array', () => {
      const buildings: IBuilding[] = [];
      const inputs: IBuildingInput[] = [];
      const result: IBuilding[] = [];
      expect(buildingUtils.getBuildings(buildings, inputs)).toEqual(result);
    });
  });

  describe('when given empty building array', () => {
    it('should return return empty array', () => {
      const buildings: IBuilding[] = [];
      const inputs: IBuildingInput[] = [
        { name: 'Testing', quantity: 0, utilization: 0 },
      ];
      const result: IBuilding[] = [];
      expect(buildingUtils.getBuildings(buildings, inputs)).toEqual(result);
    });
  });

  describe('when given buildings with quantity inputs', () => {
    it('should update building with quantity', () => {
      const buildings: IBuilding[] = [
        { ...baseBuilding, name: 'Testing1' },
        { ...baseBuilding, name: 'Testing2', hasConsistentIO: true },
        { ...baseBuilding, name: 'Testing3', hasConsistentIO: false },
      ];
      const inputs: IBuildingInput[] = [
        { name: 'Testing1', quantity: 10, utilization: 75 },
        { name: 'Testing2', quantity: 20, utilization: 0 },
        { name: 'Testing3', quantity: 30, utilization: 50 },
      ];
      const result = [
        {
          ...baseBuilding,
          name: 'Testing1',
          quantity: 10,
          utilization: 75,
        },
        {
          ...baseBuilding,
          name: 'Testing2',
          hasConsistentIO: true,
          quantity: 20,
          utilization: 0,
        },
        {
          ...baseBuilding,
          name: 'Testing3',
          hasConsistentIO: false,
          quantity: 30,
          utilization: 50,
        },
      ];
      expect(buildingUtils.getBuildings(buildings, inputs)).toEqual(result);
    });
  });

  describe('when given buildings with utilization inputs', () => {
    it('should update building with utilization', () => {
      const buildings: IBuilding[] = [{ ...baseBuilding, name: 'Testing' }];
      const inputs: IBuildingInput[] = [
        { ...baseInput, name: 'Testing', utilization: 50 },
      ];
      const result = [
        { ...baseBuilding, name: 'Testing', quantity: 0, utilization: 50 },
      ];
      expect(buildingUtils.getBuildings(buildings, inputs)).toEqual(result);
    });
  });

  describe('when given buildings with inputs', () => {
    it('should update building with inputs', () => {
      const buildings: IBuilding[] = [{ ...baseBuilding, name: 'Testing' }];
      const inputs: IBuildingInput[] = [
        { name: 'Testing', quantity: 25, utilization: 50 },
      ];
      const result = [
        { ...baseBuilding, name: 'Testing', quantity: 25, utilization: 50 },
      ];
      expect(buildingUtils.getBuildings(buildings, inputs)).toEqual(result);
    });
  });

  describe('when given building with no inputs property', () => {
    it('should return an empty array', () => {
      const buildings: IBuilding[] = [{ ...baseBuilding, name: 'Testing' }];
      const inputs: IBuildingInput[] = [{ ...baseInput, name: 'Testing' }];
      const result = [
        { ...baseBuilding, name: 'Testing', quantity: 0, utilization: 100 },
      ];
      expect(buildingUtils.getBuildings(buildings, inputs)).toEqual(result);
    });
  });
});

describe('getBuildingsWithClearedInputs', () => {
  describe('when given empty building array', () => {
    it('should handle empty buildings array', () => {
      const buildings: IBuilding[] = [];
      const result: IBuilding[] = [];
      expect(buildingUtils.getBuildingsWithClearedInputs(buildings)).toEqual(
        result,
      );
    });
  });

  describe('when given buildings with values', () => {
    it('should set default values for quantity and utilization', () => {
      const buildings: IBuilding[] = [
        { ...baseBuilding, name: 'Testing1', quantity: 25, utilization: 50 },
        {
          ...baseBuilding,
          name: 'Testing2',
          quantity: 25,
          utilization: 50,
          hasConsistentIO: false,
        },
        {
          ...baseBuilding,
          name: 'Testing3',
          quantity: 25,
          utilization: 50,
          hasConsistentIO: true,
        },
      ];
      const result = [
        {
          ...baseBuilding,
          name: 'Testing1',
          quantity: 0,
          utilization: 100,
        },
        {
          ...baseBuilding,
          name: 'Testing2',
          quantity: 0,
          utilization: 100,
          hasConsistentIO: false,
        },
        {
          ...baseBuilding,
          name: 'Testing3',
          quantity: 0,
          utilization: 0,
          hasConsistentIO: true,
        },
      ];
      expect(buildingUtils.getBuildingsWithClearedInputs(buildings)).toEqual(
        result,
      );
    });
  });
});

describe('getBuildingsInputsForResource', () => {
  describe('when given buildings with resourceName', () => {
    it('should return inputs that match the resourceName', () => {
      const buildings: IBuilding[] = [
        {
          ...baseBuilding,
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
            ...baseBuilding,
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
      const buildings: IBuilding[] = [
        {
          ...baseBuilding,
          name: 'Testing',
          hasConsistentIO: false,
          quantity: 7,
          utilization: 100,
          inputs: [{ name: 'water', value: 10, unit: 'g', rate: 'per second' }],
        },
      ];
      const resourceName = 'fire';
      const result: IBuilding[] = [];

      expect(
        buildingUtils.getBuildingsInputsForResource(buildings, resourceName),
      ).toEqual(result);
    });
  });

  describe('when given empty inputs array', () => {
    it('should return an empty array', () => {
      const buildings: IBuilding[] = [
        {
          ...baseBuilding,
          name: 'Testing',
          quantity: 7,
          utilization: 100,
        },
      ];
      const resourceName = 'fire';
      const result: IBuilding[] = [];
      expect(
        buildingUtils.getBuildingsInputsForResource(buildings, resourceName),
      ).toEqual(result);
    });
  });

  describe('when a building does not have an input array', () => {
    it('should return an empty array', () => {
      const buildings: IBuilding[] = [
        {
          ...baseBuilding,
          name: 'Testing',
          quantity: 7,
          utilization: 100,
        },
      ];
      const resourceName = 'fire';
      const result: IBuilding[] = [];
      expect(
        buildingUtils.getBuildingsInputsForResource(buildings, resourceName),
      ).toEqual(result);
    });
  });
});
