# Holey (Synesthesia Scene)

![Screenshot of scene](thumb.jpg)

This is an example of a Synesthesia scene that utilizes modern
TypeScript along with linting practices. The TypeScript code in the `src`
directory is transpiled by [Rollup](https://rollupjs.org/) to a single ES5
compatible bundle at the root directory named `script.js`. Synesthesia,
as of v1.21 (circa March 2023), only supports ES5 syntax and also does not
support most of the APIs JavaScript developers have come to expect from the
browser and Node.JS.

The files that the [Synesthesia Shader Format (SSF)](https://app.synesthesia.live/docs/ssf/ssf.html)
cares about when loading the scene are:
- scene.json
  - Scene configuration
- main.glsl
  - GLSL fragment shader code that represents the scene visually
- script.js
  - ES5 JavaScript code that allows for frame-by-frame manipulation of shader
  uniforms
  - _This file must be built using commands below (see Building)_
- thumb.jpg (Because it's referenced in scene.json)
  - Thumbnail displayed in the Synethesia UI

All of the other files in this directory are used at development and build time
to automatically maintain code quality (aka linting), and transpiling the
TypeScript source files into a single ES5 compatible bundle `script.js`.

## Pre-requisites

In order to build this scene, you must install [NodeJS](https://nodejs.org/en)
using the instructions that are compatible with your operating system.

Once you've installed NodeJS, you must install the NPM package depenendecies
before building by running:

```
npm install
```

## Building

To build once you can simply run:
```
npm run build
```

You can also start **Watch Mode**, which will automatically rebuild the output
`script.js` file everytime you make a change to the source files:
```
npm start
```
