# Full Claytons

[_Claytons Collections_](../representations/claytons/overview.md) provides the ability to write the live Canvas Collections representation of a single or multiple collections to one or more Canvas pages. The purpose being to enable students and others to use the Collections representation without requiring the Collections code.

This can be done via two means:

1. [Update a single collection's page](update-single-collection.md); or,
2. Update all collections with an output page at once - i.e. _Full Claytons_

The _Full Claytons_ capability is accessed via the [_Collections configuration element_](../collections/overview.md).

<figure markdown>
<figcaption>An example _Full Claytons_ element from the _Collections configuration element_</figcaption>
![An example "Full Claytons" element from the "Collections configuration element"](pics/fullClaytons.png)
</figure>

## How does _Full Claytons_ work?

_Full Claytons_ works by:

1. Identifying all of the [_existing collections_](../collections/existing-collections.md) that have a configured [_output page_](../collections/existing-collections.md#output-page).
2. Then using the [_navigation bar option_](#navigation-bar-options) button you pressed it will write the current representation of each collection (identified in step 1) to the specified _output page_

## Navigation Bar Options

The _navigation bar options_ for _Full Claytons_ support different ways of using Claytons Collections across multiple pages and how you wish navigation to occur between those pages. The combination of the chosen navigation bar option and how existing collections have used the _output page_ property will determine the end result.

| Navigation Bar Option | Description |
| --- | --- |
| `None` | No navigation bar will be added to any of the collections' _output page_. |
| `Pages` | |
| `Tabs` | |


### Example - Full Claytons with `None` navigation bar option

The following animated image demonstrates the use of _Full Claytons_ using the `None` navigation bar option. The process shown, includes:

<figure markdown>
<figcaption>Example of using _Full Claytons_ with the `None` navigation bar option</figcaption>
<sl-animated-image src="../pics/animatedNoneFullClaytons.gif" alt="Example of using 'Full Claytons' with the 'None' navigation bar option" />
</figure>









<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@shoelace-style/shoelace@2.0.0/dist/themes/light.css" />
<script type="module" src="https://cdn.jsdelivr.net/npm/@shoelace-style/shoelace@2.0.0/dist/shoelace.js"></script>

