const foodUtils = require('./foodUtils');

describe('getFood', () => {
  describe('when given empty array of food', () => {
    it('should return an empty array', () => {
      const food = [];
      const inputs = [];
      const result = [];
      expect(foodUtils.getFood(food, inputs)).toEqual(result);
    });
  });
});
