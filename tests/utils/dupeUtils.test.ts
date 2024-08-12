import { describe, it, expect } from 'vitest';
import * as dupeUtils from '../../src/utils/dupeUtils';
import IDupes from '../../src/interfaces/IDupes';
import IDupesInput from '../../src/interfaces/IDupesInput';

describe('getDupes', () => {
  describe('when given empty object for dupes', () => {
    it('should return object with default values', () => {
      const dupes = {} as IDupes;
      const inputs = {} as IDupesInput;
      const result = {
        quantity: 0,
        waterValue: 0,
        pollutedWaterValue: 0,
        dirtValue: 0,
        pollutedDirtValue: 0,
        traits: [],
      };
      expect(dupeUtils.getDupes('no-sweat', dupes, inputs)).toEqual(result);
    });
  });

  describe('when given dupes with inputs', () => {
    it('should return dupes with updated trait quantities', () => {
      const dupes = {
        traits: [{ name: 'Test1' }, { name: 'Test2' }],
      } as IDupes;
      const inputs = {
        total: 2,
        traits: [
          { name: 'Test1', quantity: 1 },
          { name: 'Test2', quantity: 2 },
        ],
      } as IDupesInput;
      const result = {
        quantity: 2,
        waterValue: 0,
        pollutedWaterValue: 0,
        dirtValue: 0,
        pollutedDirtValue: 0,
        traits: [
          { name: 'Test1', quantity: 1 },
          { name: 'Test2', quantity: 2 },
        ],
        caloriesRequired: 0,
      };
      expect(dupeUtils.getDupes('no-sweat', dupes, inputs)).toEqual(result);
    });
  });
});

describe('getDupesWithClearedInputs', () => {
  describe('when given empty object for dupes', () => {
    it('should return default dupes object', () => {
      const dupes = {} as IDupes;
      const result = {
        dirtValue: 0,
        pollutedDirtValue: 0,
        pollutedWaterValue: 0,
        quantity: 0,
        traits: [],
        waterValue: 0,
      };
      expect(dupeUtils.getDupesWithClearedInputs(dupes)).toEqual(result);
    });
  });

  describe('when given object for dupes', () => {
    it('should return default dupes object', () => {
      const dupes = {
        dirtValue: 100,
        pollutedDirtValue: 200,
        pollutedWaterValue: 300,
        quantity: 400,
        traits: [{ name: 'Test', quantity: 0 }],
        waterValue: 500,
      } as IDupes;
      const result = {
        dirtValue: 0,
        pollutedDirtValue: 0,
        pollutedWaterValue: 0,
        quantity: 0,
        traits: [{ name: 'Test', quantity: 0 }],
        waterValue: 0,
      };
      expect(dupeUtils.getDupesWithClearedInputs(dupes)).toEqual(result);
    });
  });

  describe('when given dupes with traits with quantities', () => {
    it('should return object with zero for trait quantities', () => {
      const dupes = {
        dirtValue: 100,
        pollutedDirtValue: 200,
        pollutedWaterValue: 300,
        quantity: 400,
        traits: [{ name: 'Test', quantity: 5 }],
        waterValue: 500,
      } as IDupes;
      const result = {
        dirtValue: 0,
        pollutedDirtValue: 0,
        pollutedWaterValue: 0,
        quantity: 0,
        traits: [{ name: 'Test', quantity: 0 }],
        waterValue: 0,
      };
      expect(dupeUtils.getDupesWithClearedInputs(dupes)).toEqual(result);
    });
  });
});

describe('setDupesQuantity', () => {
  describe('when given empty list of resources', () => {
    it('should return empty array of resources', () => {
      const resources = [];
      const dupes = { traits: [] } as unknown as IDupes;
      const quantity = 0;
      const result = {
        resources: [],
        dupes: {
          caloriesRequired: 0,
          quantity: 0,
          traits: [],
        },
      };
      expect(
        dupeUtils.setDupesQuantity('no-sweat', resources, dupes, quantity),
      ).toEqual(result);
    });
  });

  describe('when given quantity to update dupes', () => {
    it('should return updated dupes and resources', () => {
      const resources = [];
      const dupes = { traits: [] } as unknown as IDupes;
      const quantity = 10;
      const result = {
        resources: [],
        dupes: {
          caloriesRequired: 0,
          quantity: 10,
          traits: [],
        },
      };
      expect(
        dupeUtils.setDupesQuantity('no-sweat', resources, dupes, quantity),
      ).toEqual(result);
    });
  });
});

describe('setDupeTraitQuantity', () => {
  describe('when given empty array of resources', () => {
    it('should return empty array of resources', () => {
      const resources = [];
      const dupes = { traits: [] } as unknown as IDupes;
      const name = '';
      const quantity = 0;
      const result = {
        resources: [],
        dupes: {
          caloriesRequired: 0,
          traits: [],
        },
      };
      expect(
        dupeUtils.setDupeTraitQuantity(
          'no-sweat',
          resources,
          dupes,
          name,
          quantity,
        ),
      ).toEqual(result);
    });
  });

  describe('when given dupes and name and quantity', () => {
    it('should return updated resources and dupes', () => {
      const resources = [];
      const dupes = { traits: [{ name: 'Testing1' }] } as IDupes;
      const name = 'Testing1';
      const quantity = 100;
      const result = {
        resources: [],
        dupes: {
          caloriesRequired: 0,
          traits: [{ name: 'Testing1', quantity: 100 }],
        },
      };
      expect(
        dupeUtils.setDupeTraitQuantity(
          'no-sweat',
          resources,
          dupes,
          name,
          quantity,
        ),
      ).toEqual(result);
    });
  });
});

describe('setDupeWaste', () => {
  describe('when given empty array of resources', () => {
    it('should return an empty array of resources', () => {
      const resources = [];
      const dupes = { traits: [] } as unknown as IDupes;
      const prop = 'pollutedWaterValue';
      const value = 100;
      const result = {
        resources: [],
        dupes: {
          traits: [],
        },
      };
      expect(dupeUtils.setDupeWaste(resources, dupes, prop, value)).toEqual(
        result,
      );
    });
  });

  describe('when given a prop to update', () => {
    it('should update the prop', () => {
      const resources = [];
      const dupes = { traits: [] } as unknown as IDupes;
      const prop = 'pollutedWaterValue';
      const value = 100;
      const result = {
        resources: [],
        dupes: {
          pollutedWaterValue: 100,
          traits: [],
        },
      };
      expect(dupeUtils.setDupeWaste(resources, dupes, prop, value)).toEqual(
        result,
      );
    });
  });
});

describe('clearDupeInputs', () => {
  describe('when given empty array of resources', () => {
    it('should return empty array of resources', () => {
      const resources = [];
      const dupes = { traits: [] } as unknown as IDupes;
      const result = {
        resources: [],
        dupes: {
          dirtValue: 0,
          pollutedDirtValue: 0,
          pollutedWaterValue: 0,
          quantity: 0,
          traits: [],
          waterValue: 0,
        },
      };
      expect(dupeUtils.clearDupeInputs(resources, dupes)).toEqual(result);
    });
  });

  describe('when given dupes with values', () => {
    it('should return dupes with default values', () => {
      const resources = [];
      const dupes = {
        dirtValue: 1,
        pollutedDirtValue: 2,
        pollutedWaterValue: 3,
        quantity: 4,
        traits: [],
        waterValue: 5,
      } as unknown as IDupes;
      const result = {
        resources: [],
        dupes: {
          dirtValue: 0,
          pollutedDirtValue: 0,
          pollutedWaterValue: 0,
          quantity: 0,
          traits: [],
          waterValue: 0,
        },
      };
      expect(dupeUtils.clearDupeInputs(resources, dupes)).toEqual(result);
    });
  });
});
