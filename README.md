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

### Sanitization

Call sanitize with an object defining the sanitization rules as specified by [schema-inspector](https://github.com/Atinux/schema-inspector#sanitization).

For example:
```
const sanitize = require('koa-body-inspector').sanitize;
const KOA = require('koa');

const app = new KOA();

const rules = {
  id: { type: 'number', optional: false, def: 123}
};

app.use(sanitize(rules));
app.post(*function() {
  console.log(this.request.body.id); // will default to the number 123
});

```

### Validation

Call validate with an object defining the validation rules as specified by [schema-inspector](https://github.com/Atinux/schema-inspector#sanitization). By default, any validation errors will by thrown with a status of 400. To override this behavior, simply specify an onError handler that accepts a list of errors.

For example:
```
const validate = require('koa-body-inspector').validate;
const Koa = require('koa');

const app = new Koa();

const rules = {
  id: { type: 'number', optional: false }
};

app.use(validate(rules, onError));
app.post(*function() {
  console.log(this.request.body);
});

function onError(errors) {
  console.log(errors); // errors will contain an error for each validation rule that failed
}
```

## Testing

In a dev environment, call `npm test` to run unit tests. For coverage, run `npm run coverage` to generate code coverage in the `./build/coverage` folder.
