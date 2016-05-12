'use strict';

const util = require('util');

module.exports = function *resolveRules(rules) {
  if (util.isObject(rules)) {
    return rules;
  }

  return yield rules.call(this);
};
