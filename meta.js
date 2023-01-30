/**
 * @fileoverview Define TamperMonkey meta data for producing the production 
 * userscript
 */
const path = require('path');
const { pathToFileURL } = require('url');
const pkg = require('./package.json');

const distURLBase = `https://example.com/dist`;
const packageName = pkg.name;

const production = !process.env.ROLLUP_WATCH;
const baseUrl = !production	? path.join(__dirname, 'dist') : distURLBase;

let meta = {
    "name": production ? packageName : packageName + ' -> dev',
    "version": pkg.version,
    "description": pkg.description,
	"homepage": pkg.homepage,
	"author": pkg.author,
    "namespace": "https://djon.es/",
    "updateURL": "https://github.com/djplaner/canvas-collections/raw/main/dist/canvas-collections.user.js",
    "downloadURL": "https://github.com/djplaner/canvas-collections/raw/main/dist/canvas-collections.user.js",
    "supportURL": "https://github.com/djplaner/canvas-collections/issues",
    "resource": {
		//css: pathToFileURL(path.join(baseUrl, 'bundle.css'))
		css: "https://raw.githack.com/djplaner/canvas-collections/svelte/dist/canvas-collections.css"
	},
    "match": [
        "https://*/courses/*"
    ],
    "grant": [
        "GM_addStyle",
        "GM_getResourceText",
        "GM_xmlhttpRequest"
    ],
    "connect": [ ],
    "run-at": "document-idle"
}

/*if(!production){
	meta.require= [
        pathToFileURL(path.join(baseUrl, 'bundle.js'))
    ];
}

if(production) {
	meta.downloadURL = pathToFileURL(path.join(baseUrl, 'bundle.js'));
	meta.updateURL = pathToFileURL(path.join(baseUrl, 'bundle.js'));
} */

module.exports = meta;
