# Canvas Collections 

:confetti_ball: Version 1.1.0 - the first really usable version of Collections - is now available. See the [Collections site](https://djplaner.github.io/canvas-collections/) more for details  :confetti_ball:

## Why?

Frustrated by the limitations of the [Canvas LMS' modules](https://www.instructure.com/en-au/canvas/resources/all/how-to-use-modules-to-build-courses-in-canvas)? Wanting to achieve more than a long list of modules with no design of context specific information?

For example, look at the standard Canvas modules page on the left. This course was designed with three driving questions. Can you tell what those questions are from the modules page?

Try with the image on the right. It shows the same modules page with Collections installed.

See the [Collection site] for more.  

| Vanilla Canvas | Canvas Collections |
| -------------- | ------------------ |
| [View full-size image](docs/assets/vanillaModules.gif) | [View full-size image](docs/assets/withCanvasCollections.gif) |
| ![Vanilla Canvas Course Site](docs/assets/vanillaModules.gif) | ![Same site with Canvas Collections](docs/assets/withCanvasCollections.gif) |

## How?

Canvas Collections adds three three new features to Canvas Modules:

1. **Collections** - group modules together based on your design needs.
2. **Representations** - select different visual designs for each collection.
3. **Objects** - add more information to transform vanilla Canvas modules into context and design specific objects (e.g. theme, chapter, person etc).

## How can you use Canvas Collections?

You will need [to install Collections](https://djplaner.github.io/canvas-collections/getting-started/install/types-pre-requisites/). You can do this as [an individual](https://djplaner.github.io/canvas-collections/getting-started/install/individual/) or as [an institution](https://djplaner.github.io/canvas-collections/getting-started/install/institution/)

## Need to know more?

Want to learn more about Canvas Collections? What else can you do? How do you try it out?

See the [Canvas Collections site](https://djplaner.github.io/canvas-collections/)


# For the developers

Canvas Collections development will produce both

1. Userscript version for individual users; and,
2. CDN version for institutions.

Some basic info follows.

## Local development

Local development and testing currently takes place using a dev version of the userscript. Which requires that you have/are familiar with using

- GitHub - to clone this code
- `npm` - to install various dependencies
- TamperMonkey and the idea of userscripts - for running dev versions of Collections
- Chrome - live dev works best with Chrome
- Svelte and JavaScript development in general

## Install your development environment

1. Clone this repo
2. `npm install`

## Local Development

### Pre-reqs

1. Install [TamperMonkey](https://www.tampermonkey.net/) on your Chrome browser

    Local development is done using a combination of the Chrome browser and Tampermonkey using an approach based on [this Tampermonkey Svelte Template](https://github.com/lpshanley/tampermonkey-svelte#readme) - see that repo for more details.

2. Install the [dev user script](dist/canvas-collections.dev.user.js) using TamperMonkey 

3. Edit the [dev user script](dist/canvas-collections.dev.user.js)

    Modify the `@require` and `@resource` lines to match your folder structure. The two files are the `canvas-collections.css` and `canvas-collections.js` files in the `dev` folder. For example:

```js
// @resource    css file:///C:/Users/djones/code/svelte/canvas-collections/dev/canvas-collections.css
// @require     file:///C:/Users/djones/code/svelte/canvas-collections/dev/canvas-collections.js
```

4. Start the development server

### Starting the development server

1. `npm run dev` - will start a development server with hot reloading.

    It will produce `css` and `js` files in the `dev` folder. 

2. Visit a Canvas course site with the Chrome browser

### Building production code

`npm run build` will build two "production" versions of Canvas Collections in the `dist` folder, including

1. [`canvas-collections.user.js`](dist/canvas-collections.user.js) - production userscript that can be used by individual teachers/designers to experiment with Canvas Collections (use the "raw" version)
2. [`canvas-collections.js`](dist/canvas-collections.js) (and `canvas-collection.css`) - production version of Canvas Collections that can be loaded into the Canvas themes editor 

[`live-canvas-collections.js`](dist/live-canvas-collections.js) can be loaded into the Canvas themes editor to install Canvas Collections.  It's one example and relies upon a CDN version of the production code.