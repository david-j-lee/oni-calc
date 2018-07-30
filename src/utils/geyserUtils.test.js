const geyserUtils = require('./geyserUtils');

describe('getGeysers', () => {
  describe('when given an empty array of geysers', () => {
    it('should return an empty array', () => {
      const geysers = [];
      const inputs = [];
      const result = { inputted: [], listing: [] };
      expect(geyserUtils.getGeysers(geysers, inputs)).toEqual(result);
    });
  });

  describe('when given geysers with empty array of inputs', () => {
    it('should return object of geysers and inputs', () => {
      const geysers = [{ name: 'Testing1' }];
      const inputs = [];
      const result = { listing: geysers, inputted: inputs };
      expect(geyserUtils.getGeysers(geysers, inputs)).toEqual(result);
    });
  });

  describe('when given geysers with inputs', () => {
    it('should return object of geysers and inputs', () => {
      const geysers = [{ name: 'Testing1' }];
      const inputs = [{ name: 'Testing1' }];
      const result = { listing: geysers, inputted: inputs };
      expect(geyserUtils.getGeysers(geysers, inputs)).toEqual(result);
    });
  });
});

describe('getGeysersWithClearedInputs', () => {
  describe('when given geysers', () => {
    it('should return geysers with no inputs', () => {
      const geysers = {
        listing: [{ name: 'Testing1' }],
        inputted: [{ name: 'Testing1' }],
      };
      const result = {
        listing: [{ name: 'Testing1' }],
        inputted: [],
      };
      expect(geyserUtils.getGeysersWithClearedInputs(geysers)).toEqual(result);
    });
  });
});
