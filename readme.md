# Next.js + React Hot Loader

This plugin enables [React Hot Loader](https://github.com/gaearon/) for Next.js.

## ⚠️ This package is deprecated. Use [Fast Refresh](https://nextjs.org/blog/next-9-4#fast-refresh) instead!

## When to use it

Before you go further, here are some things you should know about `react-hot-loader`:

- It was [intentionally removed from Next.js](https://github.com/zeit/next.js/issues/4494) due to the many issues it causes;
- It might soon be deprecated in favour of [Fast Refresh](https://github.com/facebook/react/issues/16604);
- HMR is not the same as `react-hot-loader`; HMR works on Next.js out-of-the-box, but _states are NOT kept between reloads_.

This plugin can still be considered for those who desperately need state persisting during development, usually due to hard-to-achieve states.

This plugin also brings some implementation improvements over `react-hot-loader`, such as:

- Opt-in on any component, to avoid affecting the whole application;
- Removes itself transparently when `NODE_ENV !== 'development'`.

## Installation

```
npm install --save next-hot-loader react-hot-loader @hot-loader/react-dom
```

or

```
yarn add next-hot-loader react-hot-loader @hot-loader/react-dom
```

## Usage

### Install plugin

Create a `next.config.js` in the root of your project (next to pages/ and package.json)

```js
// next.config.js
const withHotLoader = require("next-hot-loader");
module.exports = withHotLoader({
  /* Next.js config options here */
});
```

`withHotLoader` should encapsulate a Next.js configuration object.

### Opt-in on components

In any component (usually pages):

```jsx
import { hot } from "react-hot-loader/root";

const Component = () => <div>Content</div>;

export default hot(Component);
```
