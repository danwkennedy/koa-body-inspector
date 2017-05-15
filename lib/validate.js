const inspector = require('schema-inspector');
const resolve = require('./resolve');
const bluebird = require('bluebird');
const validate = bluebird.promisify(inspector.validate);

module.exports = function (rules, onError, strict) {

  if (!onError) {
    onError = throwInvalidInput;
  }

  return async (ctx, next) => {
    let properties = await resolve(rules, ctx);
    let validationRules = {
      type: 'object',
      strict: strict || false,
      properties: properties
    };

    const validation = await validate(validationRules, ctx.request.body);

    if (!validation.valid) {
      return onError(validation.error, ctx);
    }

    return next();
  }
};

function throwInvalidInput(errors, ctx) {
  ctx.throw(400, 'Invalid input provided', errors);
}
