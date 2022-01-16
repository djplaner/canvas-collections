# canvas-collections

Improve the functionality of [Canvas LMS](https://www.instructure.com/en-au/canvas) Modules by enabling:
1. Grouping modules into collections; and,
2. Flexible and enhanced representations.

> **Note:** This project is currently in the early stages of development. Currently only works as [userscript](https://en.wikipedia.org/wiki/User_script).

## Why?

Two address two known limitiations of [the vanilla Canvas Modules page](https://community.canvaslms.com/t5/Canvas-Basics-Guide/What-are-Modules/ta-p/6):
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

> **Note:** The card interface is only the first alternate interface. Plans include enabling different types of interfaces (e.g. a table-based interface).

The long-term plan is that the canvas-collections "architecture" will allow for different interface designs. Not limited to cards and a navigation bar.

## Status

Early exploratory stage. 
- Implementation as a [userscript](https://en.wikipedia.org/wiki/Userscript) for proof of concept purposes.

    For those of us who don't yet have permission to add Javascript to Canvas.

## Functionality

Support for two broad situation
1. Default - basic cards added to a standard Canvas Modules page 
2. Additional configuration - specify additional information for collections and modules to customise representation (currently hard coded in script) 

Representation supports
- Collections
    - basic nav bar allowing navigation between different module collections
    - only modules in the selected collection are visible    
- Modules
    - Engage button to go to default Canvas view of module
    - Showing if a module is completed, in progress, or locked
    - Circular progress bar illustrating % of items completed (of those that can be completed) 
    - Display module date
    - Display module description
    - Module title modified to include collection name

### Screenshots

Click on the screenshots to see larger versions.

| Default              | Additional configuration |
:---------------------:|:------------------------:
![](./docs/default.png?) | ![](./docs/additional.png?)

#### About _Default_

The _Default_ screenshot illustrates canvas-collections working on a standard Canvas modules page. No additional configuration. It is showing the modules page from an instance of the [Growing with Canvas](https://uc.instructure.com/courses/1032076) course. It illustrates early representations of standard Canvas functionality, including:
- Module requirements progress

    Individual Module items can have [completion requirements](https://community.canvaslms.com/t5/Instructor-Guide/How-do-I-add-requirements-to-a-module/ta-p/1131). If added, canvas-collections adds a circular progress bar to the module card illustrating the percentage of requirements completed.
- Module status

    The combination of [module pre-requisites and requirements](https://ki.instructure.com/courses/192/pages/locking-material-with-requirements-and-prerequisites) combine to indicate whether a module is completed, in progress, locked or....

#### About _Additional configuration_

The _Additional configuration_ screenshot is from a course where additional configuration has provided further information about the modules, including:
- Which collection a module belongs to

    Four are defined: Learning Journey; Assessment Essentials; Online Workshops; and, Student Support. _Learning Journey_ is currently displayed. The navigation bar above the cards allow navigation to other collections. Only modules belonging to the current collection are visible.
- Module date information
- Module label

    Modules within collections can be further distinguished by labels. e.g. the _Welcome_ module has no label. The _Introduction_ module is labelled _Topic 1_.
- Module description

    To aid learners in understanding the why and what of a module a short description is added to each module.


## Related work

- [Towards a Modules navigation menu in Instructure Canvas](https://learntech.medsci.ox.ac.uk/wordpress-blog/towards-a-navigation-menu-in-instructure-canvas/) - [github](https://gist.github.com/theotherdy/7983b4d64a2f376ee140673926ca5c07#file-ou-canvas-menu-demo-js)

    Creates a right-hand menu to support navigation within Modules
- [A dashboard view of Modules in Canvas v2](https://learntech.medsci.ox.ac.uk/wordpress-blog/a-dashboard-view-of-modules-in-canvas-v2/) - [github](https://github.com/msdlt/canvas-module-tiles/blob/master/canvas-module-tiles.js)
- [Canvas unpublish hack](https://daveeargle.com/2019/10/25/canvas-unpublish-hack/)

    Small blog post outlining a bit of JS to solve an issue with Canvas. Useful as an example of promises etc.
- [Module Ids with JS](https://community.canvaslms.com/t5/Canvas-Question-Forum/Module-ID-s-using-javascript/td-p/224060)

    Canvas community post that includes small JS code example using promises etc.
- [Canvas where am i](https://github.com/msdlt/canvas-where-am-I)

    Does a range of different and neat tweaks
    - tiles have a drop down box with details of each item (and perhaps a direct link)
    - adds module/item information to the left hand menu
    - adds progress icons to the previous/next
- [Collapse all modules](https://community.canvaslms.com/t5/Canvas-Developers-Group/Collapse-Expand-Modules/ba-p/273122) thread on instructure community around some code shared by an Instructure employee that helps manage collapse all modules
- [Module filters](https://community.canvaslms.com/t5/Canvas-Developers-Group/Module-Filters/ba-p/278855) - [blog post](https://lyonsinbeta.com/2019/6/experiments-in-product) - JS (from [another instructure employee](https://lyonsinbeta.com/)) to filter items on Modules page. Has some discussion about adding this type of functionality. [github](https://github.com/lyonsinbeta/canvas-module-filters). Doesn't appear to worry/handle dynamic loading of Module cotent
- [Quick Module Navigation](https://community.canvaslms.com/t5/Canvas-Admin-Blog/Quick-Module-Navigation/ba-p/279697) - JS to enable click on button (on home page) to go directly to appropriate module with other modules collapsed