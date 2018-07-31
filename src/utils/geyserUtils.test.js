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

describe('addGeyserToGeysers', () => {
  describe('when given empty geysers with geyser', () => {
    it('should add empty object to inputted property', () => {
      const geysers = { inputted: [] };
      const geyser = { name: 'Testing' };
      const result = { inputted: [{ name: 'Testing' }] };
      expect(geyserUtils.addGeyserToGeysers(geysers, geyser)).toEqual(result);
    });
  });
});

describe('deleteGeyserFromGeysers', () => {
  describe('when given empty geysers with geyser', () => {
    it('should return an empty array', () => {
      const geysers = { inputted: [] };
      const geyser = {};
      const result = { inputted: [] };
      expect(geyserUtils.deleteGeyserFromGeysers(geysers, geyser)).toEqual(
        result,
      );
    });
  });

  describe('when given geysers with geyser', () => {
    it('should return geyser without geyser', () => {
      const geysers = {
        inputted: [{ name: 'Testing1' }, { name: 'Testing2' }],
      };
      const geyser = geysers.inputted[0];
      const result = { inputted: [{ name: 'Testing2' }] };
      expect(geyserUtils.deleteGeyserFromGeysers(geysers, geyser)).toEqual(
        result,
      );
    });
  });
});

describe('getGeyserOutputs', () => {
  describe('when given empty geyser inputted', () => {
    it('should return an empty array', () => {
      const geysers = { inputted: [] };
      const resourceName = '';
      const result = [];
      expect(geyserUtils.getGeyserOutputs(geysers, resourceName)).toEqual(
        result,
      );
    });
  });

  describe('when given geysers with resource name', () => {
    it('should return outputs for the geysers', () => {
      const geysers = {
        listing: [
          {
            name: 'Testing1',
            outputs: [{ name: 'Water' }],
          },
        ],
        inputted: [
          {
            name: 'Testing1',
            amount: 1,
            eruptionEvery: 1,
            activeEvery: 1,
            activeDuration: 1,
            eruptionDuration: 1,
          },
        ],
      };
      const resourceName = 'Water';
      const result = [
        {
          geyser: geysers.inputted[0],
          name: 'Water',
          value: 1,
          valueExtended: 1,
        },
      ];
      expect(geyserUtils.getGeyserOutputs(geysers, resourceName)).toEqual(
        result,
      );
    });
  });
});
