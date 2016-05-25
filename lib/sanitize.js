const inspector = require('schema-inspector');
const resolve = require('./resolve');

module.exports = function(rules, strict) {
  return function *(next) {
    let properties = yield resolve.call(this, rules);
    let sanitizationRules = {
      type: 'object',
      strict: strict || false,
      properties: properties
    };

    let result = yield done => inspector.sanitize(sanitizationRules, this.request.body, done);
    this.request.body = result.data;

    if (next) {
      yield next;
    }
  };
};
