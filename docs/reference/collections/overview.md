# Collections 

## Add a new collection

_Insert instructions on how to add a new collection_


## Existing Collections

This list of already existing collections allows you to 

- Change the order of the collections
- Delete a collection
- Specify a collection as the _default collection_
- Change a collection's 

    * representation 
    * include page
    * output page

### Hide a collection

Configure a collection so that students will not see it.

### Output page

Specify the name of an **existing** page in the Canvas course site, when the _Update_ button is hit the page will be updated with a Claytons version of the collection's current representation. 

### Include page

Specify the name of an **existing** page in the Canvas course site. When the collection is viewed, the contents of the page will be included before the collection's representation - just after the navigation bar.

### Apply module labels

> 🚧🧪☠️ **Warning:** This feature is experimental, under construction, and potentially destructive. Only use as suggested and if you're certain.

Each module can be allocated a label and a label "number" - see [the Objects reference for more](../objects/overview.md). A label identifies a module as a certain type of object, for example _Lecture_, _Workshop_, _Week_ etc. A label "number" provides a way to indicate a sequence of objects of a certain type, for example _Lecture 1_, _Lecture 2_, _Lecture 3_ etc.

To improve way finding, it makes sense to use labels and label numbers in two places:

1. The representation of the module provided by Collections; and,
2. The name of the module used by Canvas.

However, as shown in the following table, doing this requires updating information in two separate places. With multiple modules this may become a tedious and error-prone process.

| Place | End Result | Specification|
| --- | --- | --- |
| Collections' Representation | ![](pics/labelRepresentation.png)   | ![](pics/labelStorage.png)    |
| Canvas | ![](pics/labelModuleName.png)   | ![](pics/moduleNameStorage.png)   |

**Apply module labels** is intended to semi-automate this process. It will (🚧**not quite yet**🚧) provide a way to automatically modify Canvas module names to include the relevant Collections' label and label number.

For example, the following image shows a Canvas module view with three collections. The current collection _Why?_ contains two modules.  These modules have been allocated the label _Why_ and are using Collection's auto-numbering. However, the module names do not include the label or label number.

![](pics/moduleLabelsBefore.png)  

Fixing this could be done by manually editing the module names. Alternatively, the **Apply module labels** feature could be used to automatically update the module names. As shown in the following image, the process is

1. Open the _Collections Configuration_ dialog.
2. Click the _Apply module label_ button for the relevant collection.
3. Step through the alerts as Collections updates progress.
4. Reload the module page to observed the modified module names (this step is likely to disappear in future)

![](pics/applyModuleLabelAnimation.gif)
