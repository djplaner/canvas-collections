# Configure the modules

!!! question "How do you configure modules to work with Collections?"

    You've [added some collections](./configure-collections.md) to your course, now how do you:
    
    1. Allocation modules their collections?
    2. Provide additional data about the modules?
    
Below you'll find three steps to answer those questions.

| Step | Description |
| ---- | ----------- |
| [**1. Find the module configuration area**](#1-introducing-the-module-configuration-area) | <p>Where do you find it? What can it do?</p>|
| [**2. Allocate a module to a collection**](#2-allocate-a-module-to-a-collection) | <p>How to modify a module so it belongs (is allocated) to a particular collection.</p> |
| [**3. Add more metadata to a module**](#3-add-more-metadata-to-a-module) | <p>Start transforming a vanilla Canvas module into a design specific object by adding a description, label, banner and other metadata.</p> |

=== "1. Find: module config"

    Collections will add to each Canvas module (just under the module title) a module configuration element. This is how you configure each module. 
    
    The following animated image illustrates how to find it and what it looks like. The following steps will show more, but there's more information in [Collections 101](../../getting-started/101/interface/configuration.md) and the [Reference area](../../reference/overview.md)

    <figure markdown>
    <figcaption>Finding the module configuration areas</figcaption>
    <sl-animated-image src="../images/moduleConfiguration.gif" alt="Finding the module configuration area" />
    </figure>



=== "2. Allocate a module to a collection"

    Use the _Collections_ drop down in the _General_ tab of a module configuration area to allocate a module to a collection. If you allocate a module to a collections that isn't currently be displayed, the module will disappear once allocated. It will be visible under its new collection. You can change a module's allocated collection at any time.
    
    <figure markdown>
    <figcaption>Allocating modules to another collection</figcaption>
    <sl-animated-image src="../images/allocateModules.gif" alt="Allocating modules to another collection" />
    </figure>

=== "3. Add more metadata to a module"

    Initially, how Collections represents a module will be quite "bare" due to the absence of metadata. As you add more metadata, the representation will be updated. Representing the transformation from a vanilla module to an object.

    !!! note "How metadata is displayed depends on the representation"

        Different representations can use the same metadata in different ways.
    
        For example, _Collections Only_ representation ignores it. Some metadata is designed specifically for the _Cards_ representation.

    The following animated image illustrates some examples of this transformation. The [Objects section in Reference](../../reference/conceptual-model/objects/overview.md) provides more detail on the metadata you can add and its effect on the representation. 

    <figure markdown>
    <figcaption>Adding metadata to modules</figcaption>
    <sl-animated-image src="../images/addMetadata.gif" alt="Adding metadata to modules" />
    </figure>


<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@shoelace-style/shoelace@2.0.0/dist/themes/light.css" />
<script type="module" src="https://cdn.jsdelivr.net/npm/@shoelace-style/shoelace@2.0.0/dist/shoelace.js"></script>
