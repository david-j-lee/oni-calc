const commonUtils = require('./commonUtils');

describe('getIOTotal', () => {
  describe('when given empty array', () => {
    it('should return a 0', () => {
      const ios = [];
      const result = 0;
      expect(commonUtils.getIOTotal(ios)).toEqual(result);
    })
  })
})