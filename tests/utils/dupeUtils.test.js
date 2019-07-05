const dupeUtils = require('./dupeUtils');

describe('getDupes', () => {
  describe('when given empty object for dupes', () => {
    it('should return object with default values', () => {
      const dupes = {};
      const inputs = [];
      const result = {
        quantity: 0,
        waterValue: 0,
        pollutedWaterValue: 0,
        dirtValue: 0,
        pollutedDirtValue: 0,
        traits: [],
      };
      expect(dupeUtils.getDupes(dupes, inputs)).toEqual(result);
    });
  });

  describe('when given dupes with inputs', () => {
    it('should return dupes with updated trait quantities', () => {
      const dupes = {
        traits: [{ name: 'Test1' }, { name: 'Test2' }],
      };
      const inputs = {
        total: 2,
        traits: [
          { name: 'Test1', quantity: 1 },
          { name: 'Test2', quantity: 2 },
        ],
      };
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
      expect(dupeUtils.getDupes(dupes, inputs)).toEqual(result);
    });
  });
});

describe('getDupesWithClearedInputs', () => {
  describe('when given empty object for dupes', () => {
    it('should return default dupes object', () => {
      const dupes = {};
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
      };
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
      };
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
