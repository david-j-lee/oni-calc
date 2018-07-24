const resourceUtils = require('./resourceUtils');

describe('getClearedResources', () => {
  describe('when given an empty array of resources', () => {
    it('should return an empty array', () => {
      const resources = [];
      const result = [];
      expect(resourceUtils.getClearedResources(resources)).toEqual(result);
    });
  });
});
