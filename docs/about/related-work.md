# Related work

Canvas Collections seeks to address long-term limitations in Canvas. Limitations to which others have responded. Below is a small sample organised broadly along the features of Canvas Collections. The following table summarises the work. Click on the links to see more.

| Features | Description |
| --- | --- |
| [Collections](#collections) | Group or filter a Canvas modules |
| [Representations](#representations) | Modify the visual appearance of Canvas modules |
| [Objects](#objects-and-meta-data) | Add additional information about modules |
| [Navigation](#navigation) | Improve navigation within the contents of Canvas modules |
| [Other Canvas work](#other-canvas-work) | Other related work from within the Canvas community |
| [Earlier work](#earlier-work) | Earlier work from outside the Canvas community |


## Collections

### Filter modules

[Module filters](https://community.canvaslms.com/t5/Canvas-Developers-Group/Module-Filters/ba-p/278855) - [blog post](https://lyonsinbeta.com/2019/6/experiments-in-product) - JS (from [another instructure employee](https://lyonsinbeta.com/)) to filter items on Modules page. Has some discussion about adding this type of functionality. [github](https://github.com/lyonsinbeta/canvas-module-filters). Doesn't appear to worry/handle dynamic loading of Module content

## Representations

Work to modify the visual appearance of modules can be said to come in two flavours:

- supported - software helps improve the representation.
- manual - a person has to do the work.

### Supported

Cards or tiles

- [A dashboard view of Modules in Canvas v2](https://learntech.medsci.ox.ac.uk/wordpress-blog/a-dashboard-view-of-modules-in-canvas-v2/) - [github](https://github.com/msdlt/canvas-module-tiles/blob/master/canvas-module-tiles.js)
- [Canvas where am i](https://github.com/msdlt/canvas-where-am-I)

    Does a range of different and neat tweaks
    - tiles have a drop down box with details of each item (and perhaps a direct link)
    - adds module/item information to the left hand menu
    - adds progress icons to the previous/next

Other modifications

- [Collapse all modules](https://community.canvaslms.com/t5/Canvas-Developers-Group/Collapse-Expand-Modules/ba-p/273122) thread on instructure community around some code shared by an Instructure employee that helps manage collapse all modules
    - [Canvas Modules Compactor](https://www.youtube.com/watch?v=r8cTpzY8Rws) - YouTube video showing a browser extension for collapsing individual modules based on indentation
- [Quick Module Navigation](https://community.canvaslms.com/t5/Canvas-Admin-Blog/Quick-Module-Navigation/ba-p/279697) - JS to enable click on button (on home page) to go directly to appropriate module with other modules collapsed

### Manual

This typically involves hand-crafting HTML and CSS - whilst working within the constraints of the Canvas Rich Content Editor (RCE) - in a Canvas page.

- [Create full navigation using pages](http://lisahistory.net/wordpress/2020/06/working-against-canvas-three-tips/) 
- [Creating an inviting course home page](https://community.canvaslms.com/t5/Canvas-Instructional-Designer/Creating-an-inviting-course-home-page/ba-p/267236)
- [Home sweet home pages without tables](https://community.canvaslms.com/t5/Canvas-Instructional-Designer/Home-Sweet-Homepages-without-Tables/ba-p/275079)

- [Creating a page of cards](https://gcccd.instructure.com/courses/10582/pages/cards?module_item_id=17470) - College specific example of using CSS to enable staff to manually create a card interface
- [Create Interactive Cards](https://www.howtocanvas.com/theme-editor/interactive-cards) - similar approach but requires the ability to add external CSS to Canvas

    The Canvas RCE allows some CSS to be added, but (almost apparently) randomly deletes parts. This work suggests using your institution's [Canvas theme editor](https://community.canvaslms.com/t5/Admin-Guide/How-do-I-create-a-theme-for-an-account-using-the-Theme-Editor/ta-p/242). Another option, may be Cidi Labs Design Plus which supports [adding custom CSS to a page](https://cidilabs.instructure.com/courses/102/pages/custom-css).

## Objects and meta-data

Not currently aware of anything that does this.


## Module Navigation

- [Towards a Modules navigation menu in Instructure Canvas](https://learntech.medsci.ox.ac.uk/wordpress-blog/towards-a-navigation-menu-in-instructure-canvas/) - [github](https://gist.github.com/theotherdy/7983b4d64a2f376ee140673926ca5c07#file-ou-canvas-menu-demo-js)

    Creates a right-hand menu to support navigation within Modules

## Other Canvas Work

- [Canvas unpublish hack](https://daveeargle.com/2019/10/25/canvas-unpublish-hack/)

    Small blog post outlining a bit of JS to solve an issue with Canvas. Useful as an example of promises etc.

- [Module Ids with JS](https://community.canvaslms.com/t5/Canvas-Question-Forum/Module-ID-s-using-javascript/td-p/224060)

    Canvas community post that includes small JS code example using promises etc.

## Earlier Work

- [Card Interface](https://djplaner.github.io/Card-Interface-Tweak/) - direct inspiration for Collections. Javascript that modifies Blackboard Learn pages to add a card interface.
- [Blackboard Tweaks](http://tweaks.github.io/Tweaks/) - in turn the inspiration for the Card Interface. Earlier work using Javascript to improve Blackboard Lean.

## Academic Literature

Jones, D. (2019). [Exploring knowledge reuse in design for digital learning: Tweaks, H5P, CASA and constructive templates](https://djon.es/blog/2019/08/08/exploring-knowledge-reuse-in-design-for-digital-learning-tweaks-h5p-constructive-templates-and-casa/). In Y. W. Chew, K. M. Chan, & A. Alphonso (Eds.), Personalised Learning. Diverse Goals. One Heart. ASCILITE 2019 (pp. 139–148).