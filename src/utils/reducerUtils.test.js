const reducerUtils = require('./reducerUtils');

describe('setBuildingsLayout', () => {
  describe('when given no layout value', () => {
    it('should default to a grid layout', () => {
      const layout = '';
      const result = { buildingsLayout: 'grid' };
      expect(reducerUtils.setBuildingsLayout(layout)).toEqual(result);
    });
  });
});
