const resourceUtils = require('./resourceUtils');

describe('getClearedResources', () => {
  describe('when given an empty array of resources', () => {
    it('should return an empty array', () => {
      const resources = [];
      const result = [];
      expect(resourceUtils.getClearedResources(resources)).toEqual(result);
    });
  });

  describe('when given array of resources', () => {
    it('should return set each resource to default values', () => {
      const resources = [
        { name: 'Testing1', totalInput: 100, totalOutput: 50, totalIO: 50 },
      ];
      const result = [
        { name: 'Testing1', totalInput: 0, totalOutput: 0, totalIO: 0 },
      ];
      expect(resourceUtils.getClearedResources(resources)).toEqual(result);
    });
  });
});

describe('updateResources', () => {
  describe('when given empty array of resources', () => {
    it('should return empty array', () => {
      const param = {
        resources: [],
      };
      const result = [];
      expect(resourceUtils.updateResources(param)).toEqual(result);
    });
  });
});

describe('updateResourcesWithBuildings', () => {
  describe('when given empty array of resources', () => {
    it('should return empty array', () => {
      const resources = [];
      const buildings = [];
      const result = [];
      expect(
        resourceUtils.updateResourcesWithBuildings(resources, buildings),
      ).toEqual(result);
    });
  });
});

describe('updateResourcesWithDupes', () => {
  describe('when given empty array of resources', () => {
    it('should return empty array', () => {
      const resources = [];
      const dupes = {
        dirtValue: 100,
        pollutedDirtValue: 200,
        pollutedWaterValue: 300,
        quantity: 400,
        traits: [{ name: 'Test', quantity: 5 }],
        waterValue: 500,
      };
      const result = [];
      expect(resourceUtils.updateResourcesWithDupes(resources, dupes)).toEqual(
        result,
      );
    });
  });
});

describe('updateResourcesWithFoodAndPlants', () => {
  describe('when given empty array of resources', () => {
    it('should return empty array', () => {
      const resources = [];
      const plants = [];
      const food = [];
      const result = [];
      expect(
        resourceUtils.updateResourcesWithFoodAndPlants(resources, plants, food),
      ).toEqual(result);
    });
  });
});

describe('updateResourcesWithGeysers', () => {
  describe('when given empty array of resources', () => {
    it('should return empty array', () => {
      const resources = [];
      const geysers = {};
      const result = [];
      expect(
        resourceUtils.updateResourcesWithGeysers(resources, geysers),
      ).toEqual(result);
    });
  });
});
