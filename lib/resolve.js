module.exports = async function resolveRules(rules, ctx) {
  if (typeof (rules) === 'function') {
    return rules(ctx);
  }

  return rules;
};
