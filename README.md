# Cribbage Client

This is a very basic drag-and-drop interface for cribbage. It presents a basic list of cards as the deck, hand and cut card. It uses an API to get the deck and calculate score. The default one of these is set up to be at http://localhost:4567 and is a running version of the [cribbage-scoring](https://github.com/derrickp/cribbage-scoring) repo. However, as long as it is an API that responds to calls to `/score` and `/cards` in the same way, then any API could be used.

## Installation
Dependencies can be installed with either npm or yarn. Webpack is used to bundle all dependencies on build, and so there are no required run-time dependencies.

## Start
By default the repo is setup to use `http-server` to serve the static (built) files. Start with:
```
npm start
```
or
```
yarn start
```

## Tests
There are a some basic tests. Run with

```
npm test
```
or
```
yarn test
```

## Development
There are a number of npm scripts available to assist in building and developing.

- `npm run watch` - Runs webpack in watch mode so that any changes are immediately picked up and the bundle is rebuilt
- `npm run sass` - Runs node-sass to build the `styles.scss` file, also in watch mode.