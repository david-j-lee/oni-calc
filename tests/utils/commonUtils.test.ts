import IIO from '../../src/interfaces/IIO';
import * as commonUtils from '../../src/utils/commonUtils';
import { describe, it, expect } from 'vitest';

describe('getIOTotal', () => {
  describe('when given empty array', () => {
    it('should return a 0', () => {
      const ios: IIO[] = [];
      const result = 0;
      expect(commonUtils.getIOTotal(ios)).toEqual(result);
    });
  });

  describe('when given array with extended values', () => {
    it('should return the sum of the values', () => {
      const ios = [
        { name: 'Test1', valueExtended: 25 },
        { name: 'Test2', valueExtended: 25 },
        { name: 'Test3', valueExtended: 50 },
      ] as unknown as IIO[];
      const result = 100;
      expect(commonUtils.getIOTotal(ios)).toEqual(result);
    });
  });

  describe('when given array with no extended values', () => {
    it('should return a 0', () => {
      const ios = [
        { name: 'Test1' },
        { name: 'Test2' },
        { name: 'Test3' },
      ] as unknown as IIO[];
      const result = 0;
      expect(commonUtils.getIOTotal(ios)).toEqual(result);
    });
  });
});

describe('getStandardIO', () => {
  describe('when given grams', () => {
    it('should return the same value', () => {
      const io = { value: 100, unit: 'g', rate: 'per second' } as IIO;
      const result = { value: 100, unit: 'g', rate: 'per second' };
      expect(commonUtils.getStandardIO('survival', io)).toEqual(result);
    });
  });

  describe('when given kilograms', () => {
    it('should return the value in grams', () => {
      const io = { value: 1, unit: 'kg', rate: 'per second' } as IIO;
      const result = { value: 1000, unit: 'g', rate: 'per second' };
      expect(commonUtils.getStandardIO('survival', io)).toEqual(result);
    });
  });

  describe('when given milligrams', () => {
    it('should return the value in grams', () => {
      const io = { value: 1000, unit: 'mg', rate: 'per second' } as IIO;
      const result = { value: 1, unit: 'g', rate: 'per second' };
      expect(commonUtils.getStandardIO('survival', io)).toEqual(result);
    });
  });

  describe('when given rate of per cycle', () => {
    it('should return the value in seconds', () => {
      const io = { value: 600, unit: 'g', rate: 'per cycle' } as IIO;
      const result = { value: 1, unit: 'g', rate: 'per second' };
      expect(commonUtils.getStandardIO('survival', io)).toEqual(result);
    });
  });

  describe('when given unit of kgs and rate of per cycle', () => {
    it('should return the value grams per seconds', () => {
      const io = { value: 600, unit: 'kg', rate: 'per cycle' } as IIO;
      const result = { value: 1000, unit: 'g', rate: 'per second' };
      expect(commonUtils.getStandardIO('survival', io)).toEqual(result);
    });
  });

  describe('when given unit of NA', () => {
    it('should return a value of 0', () => {
      const io = {
        value: 600,
        unit: 'NA',
        rate: 'per second',
      } as unknown as IIO;
      const result = { value: 0, unit: 'g', rate: 'per second' };
      expect(commonUtils.getStandardIO('survival', io)).toEqual(result);
    });
  });

  describe('when given rate of NA', () => {
    it('should return a value of 0', () => {
      const io = { value: 600, unit: 'kg', rate: 'NA' } as unknown as IIO;
      const result = { value: 0, unit: 'g', rate: 'per second' };
      expect(commonUtils.getStandardIO('survival', io)).toEqual(result);
    });
  });
});

describe('getSortedArray', () => {
  describe('when given empty array', () => {
    it('should return an empty array', () => {
      const array: any[] = [];
      const orderBy = '';
      const order = 'desc';
      const result: any[] = [];
      expect(commonUtils.getSortedArray(array, orderBy, order)).toEqual(result);
    });
  });

  describe('when given array with orderBy and order of asc', () => {
    it('should return asc sorted array', () => {
      const array = [
        { name: 'Testing1' },
        { name: 'Testing2' },
        { name: 'Testing3' },
      ];
      const orderBy = 'name';
      const order = 'asc';
      const result = [
        { name: 'Testing1' },
        { name: 'Testing2' },
        { name: 'Testing3' },
      ];
      expect(commonUtils.getSortedArray(array, orderBy, order)).toEqual(result);
    });
  });

  describe('when given array with orderBy and order of desc', () => {
    it('should return desc sorted array', () => {
      const array = [
        { name: 'Testing1' },
        { name: 'Testing2' },
        { name: 'Testing3' },
      ];
      const orderBy = 'name';
      const order = 'desc';
      const result = [
        { name: 'Testing3' },
        { name: 'Testing2' },
        { name: 'Testing1' },
      ];
      expect(commonUtils.getSortedArray(array, orderBy, order)).toEqual(result);
    });
  });

  describe('when given array with orderBy and incorrect order', () => {
    it('should return sorted asc array', () => {
      const array = [
        { name: 'Testing1' },
        { name: 'Testing2' },
        { name: 'Testing3' },
      ];
      const orderBy = 'name';
      const order = 'asc';
      const result = [
        { name: 'Testing1' },
        { name: 'Testing2' },
        { name: 'Testing3' },
      ];
      expect(commonUtils.getSortedArray(array, orderBy, order)).toEqual(result);
    });
  });
});
