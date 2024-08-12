import * as plantUtils from '../../src/utils/plantUtils';
import { describe, it, expect } from 'vitest';

describe('updatePlants', () => {
  describe('when given an empty array of plants', () => {
    it('should return an empty array', () => {
      const plants = [];
      const food = [];
      const result = [];
      expect(plantUtils.updatePlants(plants, food)).toEqual(result);
    });
  });

  describe('when given an empty array of plants', () => {
    it('should return an empty array', () => {
      const plants = [];
      const food = [];
      const result = [];
      expect(plantUtils.updatePlants(plants, food)).toEqual(result);
    });
  });
});
