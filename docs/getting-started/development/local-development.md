# Local development of Canvas Collections

???+ warning "Under construction"

	This page is under construction. Basic idea here, but little useful detail

## Pre-requisites

1. Git
2. npm
3. editor
4. Chrome
5. Tampermonkey

## Set up

1. Clone the [Canvas Collections repository](https://github.com/djplaner/canvas-collections)
2. Install dependencies via npm
4. Modify the `@require` in `dist/canvas-collections.dev.user.js` to point to your repo's file structure


### Custom tweaks

Implement [this modification](https://github.com/nenadpnc/cl-editor/issues/25#issuecomment-1402631276) on the `cl-editor` package to ensure changes in the HTML view of the editor are not lost due to Canvas' use of senty.io


## Development

`npm run build` to enter live re-build in `dev/`

## Production

`npm run build` to build production version in `dist/`