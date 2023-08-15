# Navigation

Navigation in Collections has two flavours: live and Claytons (static). The following summarises the live navigation experience.

## Navigating live Collections

Collections will make up to four navigation changes to the Canvas modules page. Who sees these changes is defined by Collections' [visibility setting](../../../../reference/lifecycle/visibility/overview/). 

The four changes are summarised in the following table and labelled in the image below.

See the [Navigating _Live_ Collections](../../../navigate/navigating-live-collections.md) page for more detail.

| Navigation element | Description |
| ---- | ----- |
| Navigation bar | <p>Shows a list of all collections and allow navigation back and forth between collections. </p> |
| Include page (optional) | <p>Each collection can have a single _Include page_. i.e. a Canvas page, the content of which will be inserted before or after the _Current collection representation_.</p><p>**Note:** Only the current collection's include page is shown.</p> |
| Current collection's representation | <p>Each collection chooses from one of the [available representations](../../../../reference/conceptual-model/representations/overview/) (including the _CollectionsOnly_ representation that is empty). These are designed to provide a bespoke visualisation of information about the Canvas modules.</p>  |
| Current collection's Canvas modules  | <p>ALl of the above interface elements are placed before the normal list of modules displayed on the Canvas modules page. The one last change Collections makes is to hide all those modules that do not belong to the current collection (and other configuration choices).</p> |

<figure markdown>
<figcaption>An example modules page modified with Collection's navigation interface elements</figcaption>
[![Screenshot of Canvas modules page with Collections' navigation elements](../images/navigationInterfaceElements.png)](../images/navigationInterfaceElements.png)
</figure>



## Navigating Claytons Collections

Claytons Collections creates a static representation of the Collections navigation interface element in one or more Canvas pages. These static representations can be used to navigate to specific Canvas modules without the Canvas Collections code.

The following animated image demonstrates navigating Claytons Collections configured for the sample course. In this example, the course home page is using [a "full claytons" approach](../../../reference/conceptual-model/collections/full-claytons.md). Such an approach emulates a normal live Collections interface.

See the [Navigating _Claytons_ Collections](../../../navigate/navigating-claytons-collections.md) page for more detail.

<figure markdown>
<figcaption>Animated example of navigating Claytons Collections</figcaption>
<sl-animated-image src="../images/animatedClaytonsNav.gif" alt="Animated example of navigating Claytons Collections" />
</figure>
