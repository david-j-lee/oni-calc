const geyserUtils = require('./geyserUtils');

describe('getGeysers', () => {
  describe('when given an empty array of geysers', () => {
    it('should return an emptry array', () => {
      const geysers = [];
      const inputs = [];
      const result = { inputted: [], listing: [] };
      expect(geyserUtils.getGeysers(geysers, inputs)).toEqual(result);
    });
  });
});
