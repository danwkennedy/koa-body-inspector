const resolve = require('./resolve');

describe('Resolve', () => {

  test('returns a rules object', async () => {
    let rules = { rule: { type: `I'm a rule` } };

    const result = await resolve(rules)
    expect(result).toEqual(rules);
  });

  test('returns the output of a passed function', async () => {
    let rule = { rule: { type: `I'm a rule` } };
    let rules = async () => {
      return rule;
    };

    const result = await resolve(rules);
    expect(result).toEqual(rule);
  });
});
