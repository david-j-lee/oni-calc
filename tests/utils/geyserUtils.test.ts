import IGeyser from '../../src/interfaces/IGeyser';
import IGeyserInput from '../../src/interfaces/IGeyserInput';
import IGeysers from '../../src/interfaces/IGeysers';
import IIO from '../../src/interfaces/IIO';
import IResource from '../../src/interfaces/IResource';
import * as geyserUtils from '../../src/utils/geyserUtils';
import { describe, it, expect } from 'vitest';

describe('getGeysers', () => {
  describe('when given an empty array of geysers', () => {
    it('should return an empty array', () => {
      const geysers: IGeyser[] = [];
      const inputs: IGeyserInput[] | undefined = [];
      const result = { inputted: [], listing: [] };
      expect(geyserUtils.getGeysers(geysers, inputs)).toEqual(result);
    });
  });

  describe('when given geysers with empty array of inputs', () => {
    it('should return object of geysers and inputs', () => {
      const geysers = [{ name: 'Testing1' }] as IGeyser[];
      const inputs: IGeyserInput[] | undefined = [];
      const result = { listing: geysers, inputted: inputs };
      expect(geyserUtils.getGeysers(geysers, inputs)).toEqual(result);
    });
  });

  describe('when given geysers with inputs', () => {
    it('should return object of geysers and inputs', () => {
      const geysers = [{ name: 'Testing1' }] as IGeyser[];
      const inputs = [
        { name: 'Testing1', outputs: [] },
      ] as unknown as IGeyserInput[];
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
      } as IGeysers;
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
      const geysers = { listing: [], inputted: [] } as IGeysers;
      const geyser = { name: 'Testing' } as IGeyserInput;
      const result = { inputted: [{ name: 'Testing' }], listing: [] };
      expect(geyserUtils.addGeyserToGeysers(geysers, geyser)).toEqual(result);
    });
  });
});

describe('deleteGeyserFromGeysers', () => {
  describe('when given empty geysers with geyser', () => {
    it('should return an empty array', () => {
      const geysers = { listing: [], inputted: [] } as IGeysers;
      const geyser = {} as IGeyserInput;
      const result = { inputted: [], listing: [] };
      expect(geyserUtils.deleteGeyserFromGeysers(geysers, geyser)).toEqual(
        result,
      );
    });
  });

  describe('when given geysers with geyser', () => {
    it('should return geyser without geyser', () => {
      const geysers = {
        inputted: [{ name: 'Testing1' }, { name: 'Testing2' }],
      } as IGeysers;
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
      const geysers = { listing: [], inputted: [] } as IGeysers;
      const resourceName = '';
      const result: IIO[] = [];
      expect(geyserUtils.getGeyserOutputs(geysers, resourceName)).toEqual(
        result,
      );
    });
    describe('when given a geyser', () => {
      it('should return array of outputs', () => {
        const geysers = {
          listing: [{ name: 'Testing1', outputs: [{ name: 'Water' }] }],
          inputted: [
            {
              name: 'Testing1',
              amount: 400,
              eruptionDuration: 1,
              eruptionEvery: 2,
              activeDuration: 1,
              activeEvery: 2,
            },
          ],
        } as IGeysers;

        const resourceName = 'Water';
        const result = [
          {
            name: 'Water',
            value: 100,
            valueExtended: 100,
          },
        ];
        expect(geyserUtils.getGeyserOutputs(geysers, resourceName)).toEqual(
          result,
        );
      });
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
      } as IGeysers;
      const resourceName = 'Water';
      const result = [
        {
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

describe('addGeyser', () => {
  describe('when given an empty array of resources', () => {
    it('should return an empty array of resources', () => {
      const resources: IResource[] = [];
      const geysers = { inputted: [], listing: [] };
      const geyser = {} as IGeyserInput;
      const result = {
        resources: [],
        geysers: { inputted: [{}], listing: [] },
      };
      expect(geyserUtils.addGeyser(resources, geysers, geyser)).toEqual(result);
    });
  });
});

describe('deleteGeyser', () => {
  describe('when given an empty array of resources', () => {
    it('should return an empty array of resources', () => {
      const resources: IResource[] = [];
      const geysers = { inputted: [], listing: [] };
      const geyser = {} as IGeyserInput;
      const result = { resources: [], geysers: { inputted: [], listing: [] } };
      expect(geyserUtils.deleteGeyser(resources, geysers, geyser)).toEqual(
        result,
      );
    });
  });
});

describe('clearGeyserInputs', () => {
  describe('when given empty array of resources', () => {
    it('should return an empty array of resources', () => {
      const resources: IResource[] = [];
      const geysers = { inputted: [], listing: [] };
      const result = { resources: [], geysers: { inputted: [], listing: [] } };
      expect(geyserUtils.clearGeyserInputs(resources, geysers)).toEqual(result);
    });
  });
});
