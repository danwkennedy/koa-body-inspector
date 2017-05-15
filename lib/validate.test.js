const validate = require('./validate');

describe('Sanitize', () => {

  describe('configuration', () => {
    test('returns a function', () => {
      let middleware = validate({});
      expect(middleware).toBeInstanceOf(Function);
    });
  });

  describe('middleware', () => {

    let rules = {
      id: { type: 'number', optional: false }
    };

    test('passes through if everything is valid', async () => {
      let context = {
        request: {
          body: {
            id: 123
          }
        },
        throw: jest.fn()
      };

      await validate(rules)(context, () => { });
      expect(context.throw).not.toHaveBeenCalled();
    });

    test('throws a 400 if the body is invalid', async () => {
      let context = {
        request: {
          body: {
          }
        },
        throw: jest.fn()
      };

      await validate(rules)(context, () => { });
      expect(context.throw).toHaveBeenCalledWith(400, 'Invalid input provided', [{ code: null, message: 'is missing and not optional', property: '@.id', reason: 'optional' }]);
    });

    test('calls onError instead of the default error', async () => {
      let spy = jest.fn();
      let context = {
        request: {
          body: {
          }
        }
      };

      await validate(rules, spy)(context, () => { });
      expect(spy).toHaveBeenCalledWith([{ code: null, message: 'is missing and not optional', property: '@.id', reason: 'optional' }], { request: { body: {} } });
    });
  });
});
