# Canvas Collections (svelte)

{% note %}

**Warning:** this is very much still under development

{% endnote %}

Reimplementation of Canvas Collections using [Svelte](https://svelte.dev) to develop both a userscript, and live version.

The userscript version allows individual designers/teachers to use [Tampermonkey](https://www.tampermonkey.net/) to experiment with Collections without the institution installing it. It also allows supports developers working on Collections.

The live version is for institutions to install

## Development

- `npm run dev` will start a development server with hot reloading.
- `npm run build` will build a "production" version of the userscript. **Not fully tested**
- `npm run live` will build a "production" version of collections for the live version.

Ouputs placed in the `dist` folder.

- `bundle.css` - CSS for both versions
- `bundle.js` - userscript for Tampermonkey (not a production version)
- `canvas-collections.js` - live version of Collections
- `live-canvas-collections.js` - Javascript that can be loaded into the Canvas themes editor and will load the live version of Collections using a CDN


## Based On

Tampermonkey development relies on [this Tampermonkey Svelte Template](https://github.com/lpshanley/tampermonkey-svelte#readme)
