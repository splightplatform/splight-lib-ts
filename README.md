# Splight TypeScript Library

The Splight TypeScript library provides convenient access to the Splight API from applications written in TypeScript and it's designed to work both in server-side and client-side runtimes.

## Development

Make sure that the project's dependencies are installed by running
`npm i`

Then you can run `npm run autobundle` to keep the bundled library in sync with your local changes.

## For splight-web development

_TODO: Move this to splight-web's readme when we start using this library there_

In order to be able to make changes to the code of this library and have those changes
reflected on your local instance of splight-web you can link this project's folder by doing:

```
cd ./path/to/splight-web
npm link ./path/to/splight-lib-ts
cd ./path/to/splight-lib-ts
npm run autobundle
```
