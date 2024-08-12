import { describe, it, expect } from 'vitest';
import * as foodUtils from '../../src/utils/foodUtils';
import IFood, { IFoodBase } from '../../src/interfaces/IFood';
import IFoodInput from '../../src/interfaces/IFoodInput';

describe('getFood', () => {
  describe('when given empty array of food', () => {
    it('should return an empty array', () => {
      const food = [];
      const inputs = [];
      const result = [];
      expect(foodUtils.getFood(food, inputs)).toEqual(result);
    });
  });

  describe('when given food with empty array of inputs', () => {
    it('should return foods with quantity of 0', () => {
      const food = [{ name: 'Testing1' }] as IFoodBase[];
      const inputs = [];
      const result = [{ name: 'Testing1', quantity: 0 }];
      expect(foodUtils.getFood(food, inputs)).toEqual(result);
    });
  });

  describe('when given food with inputs', () => {
    it('should return foods with quantities', () => {
      const food = [
        { name: 'Testing1' },
        { name: 'Testing2' },
        { name: 'Testing3' },
      ] as IFoodBase[];
      const inputs = [
        { name: 'Testing1', quantity: 1 },
        { name: 'Testing2' },
        { name: 'Testing3', quantity: 3 },
      ] as IFoodInput[];
      const result = [
        { name: 'Testing1', quantity: 1 },
        { name: 'Testing2', quantity: 0 },
        { name: 'Testing3', quantity: 3 },
      ];
      expect(foodUtils.getFood(food, inputs)).toEqual(result);
    });
  });
});

describe('getFoodWithClearedInputs', () => {
  describe('when given an empty food array', () => {
    it('should return an empty array', () => {
      const food = [];
      const result = [];
      expect(foodUtils.getFoodWithClearedInputs(food)).toEqual(result);
    });
  });

  describe('when given an array of food', () => {
    it('should return food with quantity of 0', () => {
      const food = [{ name: 'Testing1' }] as IFood[];
      const result = [{ name: 'Testing1', quantity: 0 }];
      expect(foodUtils.getFoodWithClearedInputs(food)).toEqual(result);
    });
  });
});

describe('updateFoodQuantity', () => {
  describe('when given an empty food array', () => {
    it('should return an empty array', () => {
      const food = [];
      const name = '';
      const quantity = 0;
      const result = [];
      expect(foodUtils.updateFoodQuantity(food, name, quantity)).toEqual(
        result,
      );
    });
  });

  describe('when given an food array with new quantity', () => {
    it('should return an array with updated value', () => {
      const food = [{ name: 'Testing1' }] as IFood[];
      const name = 'Testing1';
      const quantity = 100;
      const result = [{ name: 'Testing1', quantity: 100 }];
      expect(foodUtils.updateFoodQuantity(food, name, quantity)).toEqual(
        result,
      );
    });
  });

  describe('when given an food array with new quantity for another food', () => {
    it('should return an array with no updated value', () => {
      const food = [{ name: 'Testing1', quantity: 0 }] as IFood[];
      const name = 'Testing2';
      const quantity = 100;
      const result = [{ name: 'Testing1', quantity: 0 }];
      expect(foodUtils.updateFoodQuantity(food, name, quantity)).toEqual(
        result,
      );
    });
  });
});

describe('getFoodInputsForResource', () => {
  describe('when given array of food with a resourceName', () => {
    it('should return array of inputs for the resource', () => {
      const food = [
        {
          name: 'Testing1',
          quantity: 2,
          inputs: [{ name: 'Water', value: 300 }],
        },
        {
          name: 'Testing2',
          quantity: 2,
          inputs: [{ name: 'Fire', value: 300 }],
        },
        {
          name: 'Testing3',
          quantity: 2,
          inputs: [{ name: 'Water', value: 300 }],
        },
      ] as IFood[];
      const resourceName = 'Water';
      const result = [
        { name: 'Water', value: 300, valueExtended: 1, food: food[0] },
        { name: 'Water', value: 300, valueExtended: 1, food: food[2] },
      ];
      expect(foodUtils.getFoodInputsForResource(food, resourceName)).toEqual(
        result,
      );
    });
  });
});

describe('setFoodQuantity', () => {
  describe('when given an empty array of resources', () => {
    it('should return empty array of resources', () => {
      const resources = [];
      const plants = [];
      const food = [];
      const name = '';
      const quantity = 0;
      const result = { resources: [], food: [], plants: [] };
      expect(
        foodUtils.setFoodQuantity(resources, plants, food, name, quantity),
      ).toEqual(result);
    });
  });
});

describe('clearFoodInputs', () => {
  describe('when given an empty array of resources', () => {
    it('should return an empty array of resources', () => {
      const resources = [];
      const plants = [];
      const food = [];
      const result = { resources: [], plants: [], food: [] };
      expect(foodUtils.clearFoodInputs(resources, plants, food)).toEqual(
        result,
      );
    });
  });
});
