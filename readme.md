# canvas-collections

JavaScript intended to support the creation of "collections" of Modules on the [Canvas LMS](https://www.instructure.com/en-au/canvas) Modules page.

## Why?

There are two common limitiations to [the vanilla Canvas Modules page](https://community.canvaslms.com/t5/Canvas-Basics-Guide/What-are-Modules/ta-p/6):
1.  [no way to group modules](https://community.canvaslms.com/t5/Canvas-Question-Forum/Is-there-a-way-to-group-modules-together/m-p/179756/highlight/true#M84951); and,

    For a course with large numbers of modules or which uses modules for very different purposes the inability to group modules is a problem. Available workarounds all [have their limitations](https://community.canvaslms.com/t5/Canvas-Question-Forum/Is-there-a-way-to-group-modules-together/m-p/179757/highlight/true#M84952) and Instructure ["don't have plans to support nested modules soon"](https://community.canvaslms.com/t5/Idea-Conversations/Modules-within-Modules/idc-p/461383/highlight/true#M50428).
2.  [a very linear, less than engaging presentation](https://learntech.medsci.ox.ac.uk/wordpress-blog/a-dashboard-view-of-modules-in-canvas/).

    The linear "modules uncollapsed" by default approach causes issues (scroll of death) for courses [with "many modules and module items"](https://community.canvaslms.com/t5/Idea-Conversations/Modules-Display-as-Collapsed-by-Default/idi-p/370135). It's not kept up with more contemporary web design. e.g. [Card-Based User Interfaces](https://www.smashingmagazine.com/2016/10/designing-card-based-user-interfaces/) which [hundreds of courses across the world](https://djon.es/blog/2021/03/12/reflecting-on-the-spread-of-the-card-interface-for-blackboard-learn/) have found useful in Blackboard using the [Card Interface tweak](https://github.com/djplaner/Card-Interface-Tweak) and which [at least a couple of institutions](https://learntech.medsci.ox.ac.uk/wordpress-blog/a-dashboard-view-of-modules-in-canvas/) have sought to add to the Modules page. 

## What?

Embedded in Canvas, the canvas-collections Javascript will modify presentation of the Modules page in two ways:
1. Generate a [card-based user interface](https://www.smashingmagazine.com/2016/10/designing-card-based-user-interfaces/); and,

    Each module represented by a card. The module cards are inserted before the standard Canvas module list. Clicking on a card will take you to the module. Eventually, the cards will support much of [the functionality of the Card Interface](https://www.smashingmagazine.com/2016/10/designing-card-based-user-interfaces/) and new Canvas specific functionality.

2. group Modules into "collections".

    Modules can be grouped into collections (e.g. content, assessment, resources, units etc.). A collections navigation bar will be inserted before the Card interface to select the collection to view. Only the cards and modules for the selected collection will be visible.

The long-term plan is that the canvas-collections "architecture" will allow for different interface designs. Not limited to cards and a navigation bar.

## Status

Early exploratory stage. 
- Implementation as a [userscript](https://en.wikipedia.org/wiki/Userscript) for proof of concept purposes.  
- Hard code card data for a specific course and its collection of modules - for purposes of prototype
- Picks up some of the Canvas module information (published, completed, in progress, locked)
- Adopt the tailwind design from the card interface and kludge together sufficient code to get it to work
- Still a bit flaky due to connection with page events

![Current example](./docs/cards.png?raw=true)

## Related work

- [Towards a Modules navigation menu in Instructure Canvas](https://learntech.medsci.ox.ac.uk/wordpress-blog/towards-a-navigation-menu-in-instructure-canvas/) - [github](https://gist.github.com/theotherdy/7983b4d64a2f376ee140673926ca5c07#file-ou-canvas-menu-demo-js)

    Creates a right-hand menu to support navigation within Modules
- [A dashboard view of Modules in Canvas v2](https://learntech.medsci.ox.ac.uk/wordpress-blog/a-dashboard-view-of-modules-in-canvas-v2/) - [github](https://github.com/msdlt/canvas-module-tiles/blob/master/canvas-module-tiles.js)
- [Canvas unpublish hack](https://daveeargle.com/2019/10/25/canvas-unpublish-hack/)

    Small blog post outlining a bit of JS to solve an issue with Canvas. Useful as an example of promises etc.
- [Module Ids with JS](https://community.canvaslms.com/t5/Canvas-Question-Forum/Module-ID-s-using-javascript/td-p/224060)

    Canvas community post that includes small JS code example using promises etc.
