import App from './App.svelte'

// insert the app as the first content of div.right-of-crumbs

const rightOfCrumbs = document.querySelector(".right-of-crumbs")
const div = document.createElement("div")
// add canvas-collections to div's class
div.className = "canvas-collections"
// insert div as last child of rightOfCrumbs
rightOfCrumbs.appendChild(div)

//rightOfCrumbs.insertBefore(div, rightOfCrumbs.firstChild)

const app = new App({
    //target: document.body,
    target: div,
    props: {
        name: "World"
    }
})

export default app