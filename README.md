# Splight TypeScript Library

![npm](https://img.shields.io/npm/v/@splightplatform/splight-lib-ts)
![build](https://github.com/splightplatform/splight-lib-ts/actions/workflows/build.yml/badge.svg 'build')
![lint](https://github.com/splightplatform/splight-lib-ts/actions/workflows/lint.yml/badge.svg 'lint')
![test](https://github.com/splightplatform/splight-lib-ts/actions/workflows/test.yml/badge.svg 'test')
![npm](https://img.shields.io/npm/dw/@splightplatform/splight-lib-ts)
![snyk_code](https://github.com/splightplatform/splight-lib-ts/blob/gh-pages/snyk_code.svg?raw=True)
![snyk_dependencies](https://github.com/splightplatform/splight-lib-ts/blob/gh-pages/snyk_dependencies.svg?raw=True)

The Splight TypeScript library provides convenient access to the Splight API from applications written in TypeScript both in the client and the server.

## Release

IMPORTANT MESSAGE: Try to avoid changing directly the package.json version to release. Use the `npm version` command as follows

```sh
npm version prerelease
```

This will generate a prerelease version (X.X.X-1) and when you push the package.json changes will be reflected automatically. In case you found an error try with a directory without changes in progress.

```sh
git reset
git stash
npm version prerelease
git stash apply
```

## Usage

First, import setup from @splightplatform/splight-lib-ts. Then, you can create a splight object by calling setup.configure(). Optionally, you may pass the authentication headers to be used for making requests to the API. If running in Node, configure will try to read your authentication keys from the SPLIGHT_ACCESS_ID and SPLIGHT_ACCESS_KEY environment variables.

```typescript
import setup from '@splightplatform/splight-lib-ts';

const splight = setup.configure();

const attribute = await splight.engine.attributes.create({
  name: 'test attribute',
});

const { results: assets, next: nextAssetPage } =
  await splight.engine.assets.list();
```
