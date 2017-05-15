const inspector = require('schema-inspector');
const resolve = require('./resolve');
const Promise = require('bluebird');
const sanitize = Promise.promisify(inspector.sanitize);

module.exports = function (rules, strict) {
  return async (ctx, next) => {
    const properties = await resolve(rules, ctx);
    const sanitizationRules = {
      type: 'object',
      strict: strict || false,
      properties: properties
    };

    const result = await sanitize(sanitizationRules, ctx.request.body);
    ctx.request.body = result.data;
    return next();
  };
};