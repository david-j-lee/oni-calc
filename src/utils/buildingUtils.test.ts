import { Building } from '../interfaces/building.interface';
import { BuildingInput } from './../interfaces/building-input.interface';

import * as buildingUtils from './buildingUtils';

const baseBuilding: Building = {
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

const baseInput: BuildingInput = {
  name: '',
  quantity: 0,
  utilization: 0,
};

// getBuildings
describe('getBuildings', () => {
  describe('when given empty arrays for buildings and inputs', () => {
    it('should return an empty array', () => {
      const buildings: Array<Building> = [];
      const inputs: Array<BuildingInput> = [];
      const result: Array<Building> = [];
      expect(buildingUtils.getBuildings(buildings, inputs)).toEqual(result);
    });
  });

  describe('when given empty building array', () => {
    it('should return return empty array', () => {
      const buildings: Array<Building> = [];
      const inputs: Array<BuildingInput> = [
        { name: 'Testing', quantity: 0, utilization: 0 },
      ];
      const result: Array<Building> = [];
      expect(buildingUtils.getBuildings(buildings, inputs)).toEqual(result);
    });
  });

  describe('when given buildings with quantity inputs', () => {
    it('should update building with quantity', () => {
      const buildings: Array<Building> = [
        { ...baseBuilding, name: 'Testing1' },
        { ...baseBuilding, name: 'Testing2', hasConsistentIO: true },
        { ...baseBuilding, name: 'Testing3', hasConsistentIO: false },
      ];
      const inputs: Array<BuildingInput> = [
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
      const buildings: Array<Building> = [{ ...baseBuilding, name: 'Testing' }];
      const inputs: Array<BuildingInput> = [
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
      const buildings: Array<Building> = [{ ...baseBuilding, name: 'Testing' }];
      const inputs: Array<BuildingInput> = [
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
      const buildings: Array<Building> = [{ ...baseBuilding, name: 'Testing' }];
      const inputs: Array<BuildingInput> = [{ ...baseInput, name: 'Testing' }];
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
      const buildings: Array<Building> = [];
      const result: Array<Building> = [];
      expect(buildingUtils.getBuildingsWithClearedInputs(buildings)).toEqual(
        result,
      );
    });
  });

  describe('when given buildings with values', () => {
    it('should set default values for quantity and utilization', () => {
      const buildings: Array<Building> = [
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
      const buildings: Array<Building> = [
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
      const buildings: Array<Building> = [
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
      const result: Array<Building> = [];

      expect(
        buildingUtils.getBuildingsInputsForResource(buildings, resourceName),
      ).toEqual(result);
    });
  });

  describe('when given empty inputs array', () => {
    it('should return an empty array', () => {
      const buildings: Array<Building> = [
        {
          ...baseBuilding,
          name: 'Testing',
          quantity: 7,
          utilization: 100,
        },
      ];
      const resourceName = 'fire';
      const result: Array<Building> = [];
      expect(
        buildingUtils.getBuildingsInputsForResource(buildings, resourceName),
      ).toEqual(result);
    });
  });

  describe('when a building does not have an input array', () => {
    it('should return an empty array', () => {
      const buildings: Array<Building> = [
        {
          ...baseBuilding,
          name: 'Testing',
          quantity: 7,
          utilization: 100,
        },
      ];
      const resourceName = 'fire';
      const result: Array<Building> = [];
      expect(
        buildingUtils.getBuildingsInputsForResource(buildings, resourceName),
      ).toEqual(result);
    });
  });
});
