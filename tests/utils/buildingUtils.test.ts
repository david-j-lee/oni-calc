import IBuilding from '../../src/interfaces/IBuilding';
import IBuildingInput from '../../src/interfaces/IBuildingInput';
import IIO from '../../src/interfaces/IIO';
import * as buildingUtils from '../../src/utils/buildingUtils';
import { describe, it, expect } from 'vitest';

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
  categoryImgUrl: '',
  imgUrl: '',
  wikiUrl: '',
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
          inputs: [
            { name: 'water', value: 10, unit: 'g', rate: 'per second' } as IIO,
          ],
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
          inputs: [
            { name: 'water', value: 10, unit: 'g', rate: 'per second' } as IIO,
          ],
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

describe('setBuildingsLayout', () => {
  describe('when given no layout value', () => {
    it('should default to a grid layout', () => {
      const layout = '' as 'grid';
      const result = { buildingsLayout: 'grid' };
      expect(buildingUtils.setBuildingsLayout(layout)).toEqual(result);
    });
  });

  describe('when given grid layout', () => {
    it('should return table layout', () => {
      const layout = 'grid';
      const result = { buildingsLayout: 'table' };
      expect(buildingUtils.setBuildingsLayout(layout)).toEqual(result);
    });
  });

  describe('when given table layout', () => {
    it('should return grid layout', () => {
      const layout = 'table';
      const result = { buildingsLayout: 'grid' };
      expect(buildingUtils.setBuildingsLayout(layout)).toEqual(result);
    });
  });
});

describe('sortBuildings', () => {
  describe('when given empty array of buildings', () => {
    it('should return empty array', () => {
      const buildings = [];
      const currentOrderBy = '';
      const orderBy = '';
      const order = '';
      const result = {
        buildings: [],
        buildingsOrderBy: '',
        buildingsOrder: 'desc',
      };
      expect(
        buildingUtils.sortBuildings(buildings, currentOrderBy, orderBy, order),
      ).toEqual(result);
    });
  });

  describe('when given unordered list of buildings', () => {
    it('should return ordered list of buildings', () => {
      const buildings = [
        { name: 'Testing3' },
        { name: 'Testing1' },
        { name: 'Testing2' },
      ] as IBuilding[];
      const currentOrderBy = '';
      const orderBy = 'name';
      const order = '';
      const result = {
        buildings: [
          { name: 'Testing3' },
          { name: 'Testing2' },
          { name: 'Testing1' },
        ],
        buildingsOrderBy: 'name',
        buildingsOrder: 'desc',
      };
      expect(
        buildingUtils.sortBuildings(buildings, currentOrderBy, orderBy, order),
      ).toEqual(result);
    });
  });
});

describe('setBuildingQuantity', () => {
  describe('when given empty array of resources', () => {
    it('should return empty array of resources', () => {
      const resources = [];
      const buildings = [];
      const name = '';
      const quantity = 0;
      const result = {
        resources: [],
        buildings: [],
        powerGeneration: { value: 0, buildings: [] },
        powerUsage: { value: 0, buildings: [] },
        powerCapacity: { value: 0, buildings: [] },
        resourcesCapacity: { value: 0, buildings: [] },
      };
      expect(
        buildingUtils.setBuildingQuantity(resources, buildings, name, quantity),
      ).toEqual(result);
    });
  });
});

describe('setBuildingUtilization', () => {
  describe('when given empty array of resources', () => {
    it('should return empty array of resources', () => {
      const resources = [];
      const buildings = [];
      const name = '';
      const utilization = 0;
      const result = {
        resources: [],
        buildings: [],
        powerGeneration: { value: 0, buildings: [] },
        powerUsage: { value: 0, buildings: [] },
      };
      expect(
        buildingUtils.setBuildingUtilization(
          resources,
          buildings,
          name,
          utilization,
        ),
      ).toEqual(result);
    });
  });
});

describe('clearBuildingInputs', () => {
  describe('when given an empty array of resources', () => {
    it('should return empty array of resources', () => {
      const resources = [];
      const buildings = [];
      const result = {
        resources: [],
        buildings: [],
        powerGeneration: { value: 0, buildings: [] },
        powerUsage: { value: 0, buildings: [] },
        powerCapacity: { value: 0, buildings: [] },
        resourcesCapacity: { value: 0, buildings: [] },
      };
      expect(buildingUtils.clearBuildingInputs(resources, buildings)).toEqual(
        result,
      );
    });
  });
});
