'use strict';

const assert = require('chai').assert;
const sinon = require('sinon');

const validate = require('./validate');
const co = require('co');

describe('Sanitize', () => {

  describe('configuration', () => {
    it('returns a generator', () => {
      let middleware = validate({});
      assert.isTrue(middleware.constructor.name === 'GeneratorFunction');
    });
  });

  describe('middleware', () => {

    let rules = {
      id: { type: 'number', optional: false }
    };

    it('passes through if everything is valid', () => {
      let context = {
        request: {
          body: {
            id: 123
          }
        }
      };

      return co(validate(rules).apply(context)).catch(err => assert.fail(err));
    });

    it('throws a 400 if the body is invalid', () => {
      let spy = sinon.spy();
      let context = {
        request: {
          body: {
          }
        },
        throw: spy
      };

      return co(validate(rules).apply(context))
      .then(() => {
        assert.isTrue(spy.calledWith(400, 'Invalid input provided'));
      });
    });

    it('calls onError instead of the default error', () => {
      let spy = sinon.spy();
      let context = {
        request: {
          body: {
          }
        }
      };

      return co(validate(rules, spy).apply(context))
      .then(() => {
        assert.isTrue(spy.calledWith([
          {
            code: null,
            message: 'is missing and not optional',
            property: '@.id'
          }
        ]));
      });
    });
  });
});
