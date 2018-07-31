const reducerUtils = require('./reducerUtils');

describe('getData', () => {
  describe('when given empty array for each param', () => {
    it('should return empty array', () => {
      const param = {
        buildingInputs: [],
        buildings: [],
        dupeInputs: [],
        dupes: {},
        food: [],
        foodInputs: [],
        geyserInputs: [],
        geysers: [],
        plants: [],
        resources: [],
      };
      const result = {
        buildings: [],
        dupes: {
          dirtValue: 0,
          pollutedDirtValue: 0,
          pollutedWaterValue: 0,
          quantity: 0,
          traits: [],
          waterValue: 0,
        },
        food: [],
        geysers: { inputted: [], listing: [] },
        plants: [],
        powerCapacity: { buildings: [], value: 0 },
        powerGeneration: { buildings: [], value: 0 },
        powerUsage: { buildings: [], value: 0 },
        resources: [],
        resourcesCapacity: { buildings: [], value: 0 },
      };
      expect(reducerUtils.getData(param)).toEqual(result);
    });
  });
});

describe('setBuildingsLayout', () => {
  describe('when given no layout value', () => {
    it('should default to a grid layout', () => {
      const layout = '';
      const result = { buildingsLayout: 'grid' };
      expect(reducerUtils.setBuildingsLayout(layout)).toEqual(result);
    });
  });

  describe('when given grid layout', () => {
    it('should return table layout', () => {
      const layout = 'grid';
      const result = { buildingsLayout: 'table' };
      expect(reducerUtils.setBuildingsLayout(layout)).toEqual(result);
    });
  });

  describe('when given table layout', () => {
    it('should return grid layout', () => {
      const layout = 'table';
      const result = { buildingsLayout: 'grid' };
      expect(reducerUtils.setBuildingsLayout(layout)).toEqual(result);
    });
  });
});

describe('sortResources', () => {
  describe('when given no resources', () => {
    it('should return empty array', () => {
      const resources = [];
      const currentOrderBy = '';
      const orderBy = '';
      const order = '';
      const result = {
        resources: [],
        resourcesOrder: 'desc',
        resourcesOrderBy: '',
      };
      expect(
        reducerUtils.sortResources(resources, currentOrderBy, orderBy, order),
      ).toEqual(result);
    });
  });

  describe('when given unordered list of resources', () => {
    it('should return ordered list of resources', () => {
      const resources = [
        { name: 'Testing3' },
        { name: 'Testing1' },
        { name: 'Testing2' },
      ];
      const currentOrderBy = 'name';
      const orderBy = 'name';
      const order = 'desc';
      const result = {
        resources: [
          { name: 'Testing1' },
          { name: 'Testing2' },
          { name: 'Testing3' },
        ],
        resourcesOrder: 'asc',
        resourcesOrderBy: 'name',
      };
      expect(
        reducerUtils.sortResources(resources, currentOrderBy, orderBy, order),
      ).toEqual(result);
    });
  });

  describe('when given unordered list of resources', () => {
    it('should return ordered list of resources', () => {
      const resources = [
        { name: 'Testing3' },
        { name: 'Testing1' },
        { name: 'Testing2' },
      ];
      const currentOrderBy = 'name';
      const orderBy = 'name';
      const order = 'asc';
      const result = {
        resources: [
          { name: 'Testing3' },
          { name: 'Testing2' },
          { name: 'Testing1' },
        ],
        resourcesOrder: 'desc',
        resourcesOrderBy: 'name',
      };
      expect(
        reducerUtils.sortResources(resources, currentOrderBy, orderBy, order),
      ).toEqual(result);
    });
  });

  describe('when given unordered list with no current order', () => {
    it('should return desc ordered list of resources', () => {
      const resources = [
        { name: 'Testing3' },
        { name: 'Testing1' },
        { name: 'Testing2' },
      ];
      const currentOrderBy = '';
      const orderBy = 'name';
      const order = 'asc';
      const result = {
        resources: [
          { name: 'Testing3' },
          { name: 'Testing2' },
          { name: 'Testing1' },
        ],
        resourcesOrder: 'desc',
        resourcesOrderBy: 'name',
      };
      expect(
        reducerUtils.sortResources(resources, currentOrderBy, orderBy, order),
      ).toEqual(result);
    });
  });

  describe('when given unordered list with no current order', () => {
    it('should return desc ordered list of resources', () => {
      const resources = [
        { name: 'Testing3' },
        { name: 'Testing1' },
        { name: 'Testing2' },
      ];
      const currentOrderBy = '';
      const orderBy = 'name';
      const order = 'desc';
      const result = {
        resources: [
          { name: 'Testing3' },
          { name: 'Testing2' },
          { name: 'Testing1' },
        ],
        resourcesOrder: 'desc',
        resourcesOrderBy: 'name',
      };
      expect(
        reducerUtils.sortResources(resources, currentOrderBy, orderBy, order),
      ).toEqual(result);
    });
  });
});

describe('setDupesQuantity', () => {
  describe('when given empty list of resources', () => {
    it('should return empty array of resources', () => {
      const resources = [];
      const dupes = { traits: [] };
      const quantity = 0;
      const result = {
        resources: [],
        dupes: {
          caloriesRequired: 0,
          quantity: 0,
          traits: [],
        },
      };
      expect(reducerUtils.setDupesQuantity(resources, dupes, quantity)).toEqual(
        result,
      );
    });
  });

  describe('when given quantity to update dupes', () => {
    it('should return updated dupes and resources', () => {
      const resources = [];
      const dupes = { traits: [] };
      const quantity = 10;
      const result = {
        resources: [],
        dupes: {
          caloriesRequired: 0,
          quantity: 10,
          traits: [],
        },
      };
      expect(reducerUtils.setDupesQuantity(resources, dupes, quantity)).toEqual(
        result,
      );
    });
  });
});

describe('setDupeTraitQuantity', () => {
  describe('when given empty array of resources', () => {
    it('should return empty array of resources', () => {
      const resources = [];
      const dupes = { traits: [] };
      const name = '';
      const quantity = 0;
      const result = {
        resources: [],
        dupes: {
          caloriesRequired: 0,
          traits: [],
        },
      };
      expect(
        reducerUtils.setDupeTraitQuantity(resources, dupes, name, quantity),
      ).toEqual(result);
    });
  });

  describe('when given dupes and name and quantity', () => {
    it('should return updated resources and dupes', () => {
      const resources = [];
      const dupes = { traits: [{ name: 'Testing1' }] };
      const name = 'Testing1';
      const quantity = 100;
      const result = {
        resources: [],
        dupes: {
          caloriesRequired: 0,
          traits: [{ name: 'Testing1', quantity: 100 }],
        },
      };
      expect(
        reducerUtils.setDupeTraitQuantity(resources, dupes, name, quantity),
      ).toEqual(result);
    });
  });
});

describe('setDupeWaste', () => {
  describe('when given empty array of resources', () => {
    it('should return an empty array of resources', () => {
      const resources = [];
      const dupes = { traits: [] };
      const prop = '';
      const value = 100;
      const result = {
        resources: [],
        dupes: {
          traits: [],
        },
      };
      expect(reducerUtils.setDupeWaste(resources, dupes, prop, value)).toEqual(
        result,
      );
    });
  });

  describe('when given a prop to update', () => {
    it('should update the prop', () => {
      const resources = [];
      const dupes = { traits: [] };
      const prop = 'caloriesRequired';
      const value = 100;
      const result = {
        resources: [],
        dupes: {
          caloriesRequired: 100,
          traits: [],
        },
      };
      expect(reducerUtils.setDupeWaste(resources, dupes, prop, value)).toEqual(
        result,
      );
    });
  });
});

describe('clearDupeInputs', () => {
  describe('when given empty array of resources', () => {
    it('should return empty array of resources', () => {
      const resources = [];
      const dupes = { traits: [] };
      const result = {
        resources: [],
        dupes: {
          dirtValue: 0,
          pollutedDirtValue: 0,
          pollutedWaterValue: 0,
          quantity: 0,
          traits: [],
          waterValue: 0,
        },
      };
      expect(reducerUtils.clearDupeInputs(resources, dupes)).toEqual(result);
    });
  });

  describe('when given dupes with values', () => {
    it('should return dupes with default values', () => {
      const resources = [];
      const dupes = {
        dirtValue: 1,
        pollutedDirtValue: 2,
        pollutedWaterValue: 3,
        quantity: 4,
        traits: [],
        waterValue: 5,
      };
      const result = {
        resources: [],
        dupes: {
          dirtValue: 0,
          pollutedDirtValue: 0,
          pollutedWaterValue: 0,
          quantity: 0,
          traits: [],
          waterValue: 0,
        },
      };
      expect(reducerUtils.clearDupeInputs(resources, dupes)).toEqual(result);
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
        reducerUtils.sortBuildings(buildings, currentOrderBy, orderBy, order),
      ).toEqual(result);
    });
  });

  describe('when given unordered list of buildings', () => {
    it('should return ordered list of buildings', () => {
      const buildings = [
        { name: 'Testing3' },
        { name: 'Testing1' },
        { name: 'Testing2' },
      ];
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
        reducerUtils.sortBuildings(buildings, currentOrderBy, orderBy, order),
      ).toEqual(result);
    });
  });
});

describe('setBuildingQuantity', () => {});

describe('setBuildingUtilization', () => {});

describe('clearBuildingInputs', () => {});

describe('setFoodQuantity', () => {});

describe('clearFoodInputs', () => {});

describe('addGeyser', () => {});

describe('deleteGeyser', () => {});

describe('clearGeyserInputs', () => {});
