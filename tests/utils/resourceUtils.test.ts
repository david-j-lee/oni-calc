import IDupes from '../../src/interfaces/IDupes';
import { IGameMode } from '../../src/interfaces/IGameMode';
import IGeysers from '../../src/interfaces/IGeysers';
import IResource from '../../src/interfaces/IResource';
import * as resourceUtils from '../../src/utils/resourceUtils';
import { describe, it, expect } from 'vitest';

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
        { name: 'Testing1', totalInput: 100, totalOutput: 50, total: 50 },
      ] as unknown as IResource[];
      const result = [
        { name: 'Testing1', totalInput: 0, totalOutput: 0, total: 0 },
      ];
      expect(resourceUtils.getClearedResources(resources)).toEqual(result);
    });
  });
});

describe('updateResources', () => {
  describe('when given empty array of resources', () => {
    it('should return empty array', () => {
      const param = {
        gameMode: 'survival' as IGameMode,
        resources: [],
        plants: [],
        dupes: {} as IDupes,
        buildings: [],
        critters: [],
        geysers: {} as IGeysers,
      };
      const result = [];
      expect(resourceUtils.updateResources(param)).toEqual(result);
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
      } as IDupes;
      const result = [];
      expect(
        resourceUtils.updateResourcesWithDupes('survival', resources, dupes),
      ).toEqual(result);
    });
  });
});

describe('updateResourcesWithGeysers', () => {
  describe('when given empty array of resources', () => {
    it('should return empty array', () => {
      const resources = [];
      const geysers = {} as IGeysers;
      const result = [];
      expect(
        resourceUtils.updateResourcesWithGeysers(resources, geysers),
      ).toEqual(result);
    });
  });
});

describe('sortResources', () => {
  describe('when given no resources', () => {
    it('should return empty array', () => {
      const resources = [];
      const currentOrderBy = '';
      const orderBy = 'name';
      const order = '';
      const result = {
        resources: [],
        resourcesOrder: 'desc',
        resourcesOrderBy: 'name',
      };
      expect(
        resourceUtils.sortResources(resources, currentOrderBy, orderBy, order),
      ).toEqual(result);
    });
  });

  describe('when given unordered list of resources', () => {
    it('should return ordered list of resources', () => {
      const resources = [
        { name: 'Testing3' },
        { name: 'Testing1' },
        { name: 'Testing2' },
      ] as unknown as IResource[];
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
        resourceUtils.sortResources(resources, currentOrderBy, orderBy, order),
      ).toEqual(result);
    });
  });

  describe('when given unordered list of resources', () => {
    it('should return ordered list of resources', () => {
      const resources = [
        { name: 'Testing3' },
        { name: 'Testing1' },
        { name: 'Testing2' },
      ] as unknown as IResource[];
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
        resourceUtils.sortResources(resources, currentOrderBy, orderBy, order),
      ).toEqual(result);
    });
  });

  describe('when given unordered list with no current order', () => {
    it('should return desc ordered list of resources', () => {
      const resources = [
        { name: 'Testing3' },
        { name: 'Testing1' },
        { name: 'Testing2' },
      ] as unknown as IResource[];
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
        resourceUtils.sortResources(resources, currentOrderBy, orderBy, order),
      ).toEqual(result);
    });
  });

  describe('when given unordered list with no current order', () => {
    it('should return desc ordered list of resources', () => {
      const resources = [
        { name: 'Testing3' },
        { name: 'Testing1' },
        { name: 'Testing2' },
      ] as unknown as IResource[];
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
        resourceUtils.sortResources(resources, currentOrderBy, orderBy, order),
      ).toEqual(result);
    });
  });
});
