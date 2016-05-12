const inspector = require('schema-inspector');
const resolve = require('./resolve');

module.exports = function(rules, onError, strict) {

  if (!onError) {
    onError = throwInvalidInput;
  }

  return function *(next) {
    let properties = yield resolve.call(this, rules);
    let validationRules = {
      type: 'object',
      strict: strict || false,
      properties: properties
    };

    let validation = inspector.validate(validationRules, this.request.body);

    if (!validation.valid) {
      onError.call(this, validation.error);
    }

    if (next) {
      yield next;
    }
  }
};

function throwInvalidInput(errors) {
  this.throw(400, 'Invalid input provided', errors);
}
