import CanvasCollections from './CanvasCollections.svelte'
import {checkContext} from './lib/CanvasSetup'


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
// add canvas-collections to div's class
div.className = "canvas-collections"
// insert div as last child of rightOfCrumbs
rightOfCrumbs.appendChild(div)

//rightOfCrumbs.insertBefore(div, rightOfCrumbs.firstChild)

const app = new CanvasCollections({
    target: div,
    props: {
        courseId: context.courseId,
        editMode: context.editMode,
        csrfToken: context.csrfToken,
        modulesPage: context.modulesPage
    }
})

export default app