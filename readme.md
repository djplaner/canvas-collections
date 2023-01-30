# Canvas Collections 

> :construction: A new version of Canvas Collections is just about ready. Early Feb 2023 should reveal all.
## Why?

Frustrated by the limitations of the [Canvas LMS' modules](https://www.instructure.com/en-au/canvas/resources/all/how-to-use-modules-to-build-courses-in-canvas)? Wanting to achieve more than a long list of modules with little or now visual or content difference?

## What?

Canvas Collections can help by providing three new features to Canvas Modules:

1. **Collections** - group modules together based on your design needs.
2. **Representations** - select different visual designs for each collection.
3. **Objects** - transform vanilla modules into context and design specific objects (e.g. theme, chapter, person etc) through the addition of design specific metadata and affordances.

## What's the difference?

The following images show the Module's view for the same Canvas course site with the same 11 modules.

The left hand image shows the default Canvas interface. A long scroll down the 11 modules.

The right hand image adds Canvas Collections with three collections titled: Why? What? and How?. Each collection can be navigated to separately. Each collection is using a _card_ representation. Hence collections adds a card for each module. Each module has had an image and a description added to help explain the purpose of the module.

| Vanilla Canvas | Canvas Collections |
| -------------- | ------------------ |
| [View full-size image](docs/assets/vanillaModules.gif) | [View full-size image](docs/assets/withCanvasCollections.gif) |
| ![Vanilla Canvas Course Site](docs/assets/vanillaModules.gif) | ![Same site with Canvas Collections](docs/assets/withCanvasCollections.gif) |


## How can you use Canvas Collections?

You can experiment with Collections as an individual teacher, or an institution can install it for all.

## Need to know more?

Want to learn more about Canvas Collections? What else can you do? How do you try it out?

See the [Canvas Collections online help/documentation site](https://djplaner.github.io/canvas-collections/)


# For the developers

Canvas Collections development is intended to produce both

1. Userscript version for individual users; and,
2. CDN version for institutions.

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

1. [`canvas-collections.user.js`](dist/canvas-collections.user.js) - production userscript that can be used by individual teachers/designers to experiment with Canvas Collections
2. [`canvas-collections.js`](dist/canvas-collections.js) (and `canvas-collection.css`) - production version of Canvas Collections that can be loaded into the Canvas themes editor 

[`live-canvas-collections.js`](dist/live-canvas-collections.js) can be loaded into the Canvas themes editor to install Canvas Collections.  It's one example and relies upon a CDN version of the production code.