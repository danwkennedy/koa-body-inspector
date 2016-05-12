'use strict';

const assert = require('chai').assert;
const resolve = require('./resolve');
const co = require('co');

describe('Resolve', () => {

  it('returns a rules object', () => {
    let rules = { rule: { type: `I'm a rule`}};

    return co(resolve(rules)).then(result => {
      assert.equal(result, rules);
    });
  });

  it('returns the output of the passed generator', () => {
    let rule = { rule: { type: `I'm a rule`}};
    let rules = function*() {
      return rule;
    };

    return co(resolve(rules)).then(result => {
      assert.equal(result, rule);
    });
  });
});
