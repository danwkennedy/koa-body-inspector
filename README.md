# koa-body-inspector

Middleware for KOA that sanitizes and validates request bodies parameters. This package is compatible with KOA's body parser packages ([koa-bodyparser](https://www.npmjs.com/package/koa-bodyparser) or [koa-body](https://www.npmjs.com/package/koa-body)) and uses [schema-inspector](https://www.npmjs.com/package/schema-inspector) to do the actual santization/validation.

## Installation

`npm install --save koa-body-inspector`

## Usage

The package is a namespace that provides two function calls:
```
{
  sanitize: function(sanitizationRules),
  validate: function(validationRules, [onError])
}
```

## Testing

In a dev environment, call `npm test` to run unit tests. For coverage, run `npm run coverage` to generate code coverage in the `./build/coverage` folder.
