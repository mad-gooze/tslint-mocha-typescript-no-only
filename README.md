# tslint-mocha-typescript-no-only
Disallows `@only` suites and tests with [mocha-typescript](https://www.npmjs.com/package/mocha-typescript).

## Installation
```shell
npm i -D tslint-mocha-typescript-no-only
```
or for yarn:
```shell
yarn add -D tslint-mocha-typescript-no-only
```

then add the following to your `tslint.json`:
```json
{
    "rulesDirectory": [
        "tslint-mocha-typescript-no-only"
    ],
    "rules": {
        "tslint-mocha-typescript-no-only": true
    }
}
```
