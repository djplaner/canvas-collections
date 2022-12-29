/**
 * Entry point for CanvasCollections
 * - Check the URL and page contents extract some context
 * - insert div.canvas-collections as the first child of div.right-of-crumbs
 * - add the CanvasCollections app to that div
 */
import CanvasCollections from './CanvasCollections.svelte'
import {checkContext} from './lib/CanvasSetup'


// extract some useful context from the URL and the DOM
const context = checkContext()

// insert the app as the first content of div.right-of-crumbs
const rightOfCrumbs = document.querySelector(".right-of-crumbs")

// TODO
// - should more checks be done here?
// - e.g. URL etc
if (!rightOfCrumbs) {
    throw new Error("div.right-of-crumbs not found")
}

const div = document.createElement("div")
div.className = "canvas-collections"
div.style.display = "flex"
rightOfCrumbs.appendChild(div)

const app = new CanvasCollections({
    target: div,
    props: context 
})

export default app