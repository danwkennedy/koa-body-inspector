const sanitize = require('./sanitize');

describe('Sanitize', () => {

  describe('configuration', () => {
    test('returns a function', () => {
      let middleware = sanitize({});

      expect(middleware).toBeInstanceOf(Function);
    });
  });

  describe('middleware', () => {
    test('sanitizes the request body', async () => {

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

      await sanitize(rules)(context, () => { });

      const body = context.request.body;

      expect(body).toHaveProperty('from', date);
      expect(body).toHaveProperty('page', 1);
    });
  });
});
