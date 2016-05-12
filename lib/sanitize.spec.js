'use strict';

const assert = require('chai').assert;
const sanitize = require('./sanitize');
const co = require('co');

describe('Sanitize', () => {

  describe('configuration', () => {
    it('returns a generator', () => {
      let middleware = sanitize({});
      assert.isTrue(middleware.constructor.name === 'GeneratorFunction');
    });
  });

  describe('middleware', () => {
    it('sanitizes the request body', () => {

      let date = new Date();
      let context = {
        request: {
          body: {
            from: date.getTime()
          }
        }
      }

      let rules = {
        from: { type: 'date', optional: false },
        page: { type: 'number', optional: false, def: 1 }
      };

      return co(sanitize(rules).apply(context)).then(() => {
        let body = context.request.body;
        assert.property(body, 'from');
        assert.property(body, 'page');
        assert.equal(body.page, 1);
        assert.deepEqual(body.from, date);
      });
    });
  });
});
