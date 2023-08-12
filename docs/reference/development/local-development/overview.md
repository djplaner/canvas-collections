# Local development - overview

If you're looking to build or modify your own version of Canvas Collections you will need to set up and use a local development environment.


## Pre-requisite Knowledge

Currently, local development and testing takes place using a `dev` version of a Collections userscript. It can be quickly modified, tested, and modified again.

To use current practice and understand the following, you will likely need to be fairly familiar with using

- GitHub - to clone this code
- `npm` - to install various dependencies
- TamperMonkey and the idea of userscripts - for running dev versions of Collections
- Chrome - live dev works best with Chrome
- Svelte and JavaScript development in general

!!! warning "Not a lot of detail, yet"

    The following provides only the bare bones explanation of what is required to set up a local development environment for Canvas Collections.

## Setting up your Collections local development environment

This is the initial process required to commence development.

### 1. Get a copy of the code and necessary external libraries

- **1.1** Clone [the Canvas Collections repository (repo)](https://github.com/djplaner/canvas-collections/)

    See GitHub's [cloning a repository documentation](https://docs.github.com/en/repositories/creating-and-managing-repositories/cloning-a-repository)

- **1.2** `npm install`

    You may need to [download and install Node.js and npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)

- **1.3** Take note of the full [File URI](https://en.wikipedia.org/wiki/File_URI_scheme) for the `dev` folder within the Collections repository on your computer.

    This is required for a later step

## 2. Set up local userscript development for your browser

!!! note "Using Chrome and a very particular method"

    To ensure live updating of the Collections userscript, the following recommends using a combination of the Chrome browser and Tampermonkey. It uses the 
    
    The approach used is based on [this Tampermonkey Svelte Template](https://github.com/lpshanley/tampermonkey-svelte#readme) - see that repo for more details.


- **2.1** Install [TamperMonkey](https://www.tampermonkey.net/) on your Chrome browser

- **2.2** Enable the `Allow access to file URLs" setting in the Chrome extension settings for TamperMonkey.

    Help on [how to change Chrome extension settings](https://www.greengeeks.com/tutorials/change-extension-settings-google-chrome/)

- **2.3** Click on [this dev user script link](https://github.com/djplaner/canvas-collections/raw/61af4efead25d2c49c8f8612004b89ee3adfd198/dist/canvas-collections.dev.user.js) to install the dev userscript using TamperMonkey 

- **2.4** Modify the dev user script to use File URIs for your set up.

    The dev userscript includes lines with `@require` and `@resource`. These inform the userscript where to retrieve files from. These need to be modified to use the File URI for your computer (see **1.3** above). For example, the following includes a File URI for my local development.:

```html
// @resource    css file:///C:/Users/djones/code/svelte/canvas-collections/dev/canvas-collections.css
// @require     file:///C:/Users/djones/code/svelte/canvas-collections/dev/canvas-collections.js
```

## Using your local Collections development environment

Once the setup process (above) is complete you can commence development.

- **1.1** Start the development server

    `npm run dev` - will start a development server with hot reloading.

    As you save changes to the Collections source code, it will generate new versions of the Canvas Collections `css` and `js` files in the `dev` folder.

- **1.2** Visit the Modules page of a Canvas course site with the Chrome browser

    Perform the ["is it installed" check](../../../getting-started/install/is-it-installed.md) to see if Collections is working.

- **1.3** Reload the Modules page after any changes to the Collections code.

## Building production code with your local Collections development environment

`npm run build` will build two "production" versions of Canvas Collections in the `dist` folder, including

1. [`canvas-collections.user.js`](dist/canvas-collections.user.js) - production userscript that can be used by individual teachers/designers to experiment with Canvas Collections (use the "raw" version)
2. [`canvas-collections.js`](dist/canvas-collections.js) (and `canvas-collection.css`) - production version of Canvas Collections that can be loaded into the Canvas themes editor 

[`live-canvas-collections.js`](dist/live-canvas-collections.js) can be loaded into the Canvas themes editor to install Canvas Collections.  It's one example and relies upon a CDN version of the production code.