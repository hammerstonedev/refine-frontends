# [WIP] Refine React Implementation

Porting [@hammerstone/vue-query-builder](https://github.com/hammerstonedev/query-builder) to React.

## Todo

- [x] Begin rendering query builder based on a provided blueprint
- [ ] Begin mutating the blueprint when building a query
- [ ] Handle all cases handled by the Vue implementation
- [ ] Write unit & integration tests to ensure full compatibility
- [ ] Extract renderless components from Tailwind implementation (I think Formik would be great to model on -- A wrapper component and choose between pre-baked Tailwind implemenation cpomponents or wire up your own components with hooks)
- [ ] Hook up to an actual Refine backend to test
- [ ] Look at extracting common types and tests between Vue & React
- [ ] Publish package on NPM

## Installation

1. Clone the repo
2. Run `yarn install`
3. Run `yarn dev` to start the Vite server
