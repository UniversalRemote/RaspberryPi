'use strict';

describe('Articles E2E Tests:', function () {
  describe('Test remote page', function () {
    it('Should report missing credentials', function () {
      browser.get('http://localhost:3001/remote');
      expect(element.all(by.repeater('article in remote')).count()).toEqual(0);
    });
  });
});
