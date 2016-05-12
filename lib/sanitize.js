const inspector = require('schema-inspector');
const resolve = require('./resolve');

module.exports = function(rules) {
  return function *(next) {
    let properties = yield resolve.call(this, rules);
    let sanitizationRules = {
      type: 'object',
      properties: properties
    };
    this.request.body = inspector.sanitize(sanitizationRules, this.request.body).data;

    if (next) {
      yield next;
    }
  };
};
