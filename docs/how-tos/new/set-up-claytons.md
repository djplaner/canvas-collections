# Setting up Claytons Collections

!!! question "How do you improve navigation when you can't use _live_ Collections?"

    _Live_ Collections only works if the code is installed. For students, this should be done institutionally. Not easy for all.

    If you can't use _live_ Collections, you can use _Claytons_ Collections to modify a Canvas page with an interface like Collections.

Assuming you've already [configured Collections](./overview.md) for your course, setting up Claytons Collections involves the following steps.

| Step | Description |
| ---- | ----------- |
| 1. How many collections? | <p>You can include some or all of your course's collections in Claytons.</p> |
| 2. What Canvas pages? | <p>Claytons Collections writes representations of one or more collections to one or more pages. You can have multiple collections on one page, one collection on multiple pages, or some combination</p> |
| 3. Configure Claytons | <p>Use the Collections configuration element to specify which collections go to which Canvas pages. </p> |
| 4. Generate Claytons | <p>Update the chosen pages with the current representation of the chosen collections.</p> |

!!! tip "Repeat the last step every time you make a change to Collections"

    Without this step, the Claytons pages will not reflect the changes you've made to Collections.

## Example - before, after and how

The following steps demonstrate how to convert the example course into a Claytons course. The following images show the before and after states of the example course.

<figure markdown>
<figcaption>_Live_ Collections to be emulated with _Claytons_</figcaption>
<sl-image-comparer>
  <img slot="after" src="../images/afterCollections.gif" alt="Live Collections to be emulated with Claytons">
  <img slot="before" src="../images/afterClaytons.gif" alt="Claytons version">
</sl-image-comparer>
</figure>

=== "1. How many collections?"

    For the example course used here, the aim is produce a new home page that fully emulates _live_ Collections.
    
    The example course has four collections. We want to use all four.


=== "2. What Canvas pages?"

    To emulate _live_ Collections, we need to place all the collections into a single page. The aim being is that this page will become the new home page for the course.

    Hence, the new Claytons Canvas page will be called _New Home Page_. A page that doesn't exist yet in the course.
    
=== "3. Configure Claytons"

    The main configuration required is to specify the _output page_ for each collection. The _output page_ is the name of the Canvas page to which the collection's representation will be written.

    In this example, an output page is provided for each collection. This is not necessary. Only add output pages for the collections you wish to include in the Claytons version.

    <figure markdown>
    <figcaption>Configure Claytons by specifying the output page for Collections</figcaption>
    <sl-animated-image src="../images/configureClaytons.gif" alt="Configure Claytons by specifying the output page for Collections">
    </figure>

=== "4. Generate Claytons"

    With everything configured, the final step is to generate the Claytons pages. This is done using the **Full "Claytons"** section of the collections configuration element. The main task is to choose [the _Navigation Bar Option_](../../reference/conceptual-model/representations/claytons/overview.md#navigation-bar-options) most appropriate.

    For the example, the aim is to emaulate _live_ Collections. Masking _Tabs_ the best navigation bar option.

    Once the option is chosen, Collections will create the page (if necessary) and update its content with static HTML.

    <figure markdown>
    <figcaption>Generate Claytons</figcaption>
    <sl-animated-image src="../images/generateClaytons.gif" alt="Generate Claytons">
    </figure>




<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@shoelace-style/shoelace@2.0.0/dist/themes/light.css" />
<script type="module" src="https://cdn.jsdelivr.net/npm/@shoelace-style/shoelace@2.0.0/dist/shoelace.js"></script>
