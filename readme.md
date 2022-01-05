# canvas-collections

JavaScript intended to add enable the creation of "collections" on the [Canvas LMS](https://www.instructure.com/en-au/canvas) Modules page.

Rather than simply all the modules appearing. canvas-collections enable the specification of module collections which can then be used to navigate the modules.

## Status

Currently at the early exploratory stage

## Related work

- [Towards a Modules navigation menu in Instructure Canvas](https://learntech.medsci.ox.ac.uk/wordpress-blog/towards-a-navigation-menu-in-instructure-canvas/) - [github](https://gist.github.com/theotherdy/7983b4d64a2f376ee140673926ca5c07#file-ou-canvas-menu-demo-js)
    Creates a right-hand menu to support navigation within Modules
- [A dashboard view of Modules in Canvas v2](https://learntech.medsci.ox.ac.uk/wordpress-blog/a-dashboard-view-of-modules-in-canvas-v2/) - [github](https://gist.github.com/theotherdy/60ced3e955813861142f60bd3ea70ff4)
- [Canvas unpublish hack](https://daveeargle.com/2019/10/25/canvas-unpublish-hack/)
    Small blog post outlining a bit of JS to solve an issue with Canvas. Useful as an example of promises etc.
- [Module Ids with JS](https://community.canvaslms.com/t5/Canvas-Question-Forum/Module-ID-s-using-javascript/td-p/224060)
> Canvas community post that includes small JS code example using promises etc.

## To do 

- [ ] Do more searching to see what other work is there
- [ ] Try to get it working (or bits of it) as userscript
    - [ ] Perhaps just focusing on get module names
- [ ] Decide if scraping versus API is the better option