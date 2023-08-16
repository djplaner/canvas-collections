# Configure "Claytons" (static) Collections

!!! question "How do you improve navigation when you can't use _live_ Collections?"

    By default, Collections only works if Collections is installed. For students, this should be done institutionally. This is not always possible.

    If your students can't use _live_ Collections, you can use _Claytons_ Collections. This is where a teacher/designer uses _live_ Collections to modify a Canvas page with an interface like Collections. A page that is visible without Collections.

With [Collections already configured](./overview.md) setting up Claytons Collections is a four step process.

## Four steps to configuring Claytons

| Step | Description |
| ---- | ----------- |
| 1. How many collections? | <p>You can include some or all of your course's collections in Claytons.</p> |
| 2. What Canvas pages? | <p>Claytons Collections writes representations of one or more collections to one or more pages. You can have multiple collections on one page, one collection on multiple pages, or some combination</p> |
| 3. Configure Claytons | <p>Use the Collections configuration element to specify which collections go to which Canvas pages. </p> |
| 4. Generate Claytons | <p>Update the chosen pages with the current representation of the chosen collections.</p><p>**Important** see the note below about repeating this step. |
| 5. Add external CSS | <p>The Canvas Editor supports a [limited collection of HTML/css](https://community.canvaslms.com/t5/Canvas-Resource-Documents/Canvas-HTML-Editor-Allowlist/ta-p/387066). It will remove anything else. </p><p> For best effect, some representations require additional CSS to be available externally.</p> |

!!! tip "Repeat step 4 every time you make a change to Collections"

    Claytons produces a static, one-off representation of Collections' configuration. You can make changes to that configuration using live Collections. But you will need to repeat step #4 to update the static representation.

## Example of configuring Claytons

These tabs demonstrate one example of stepping through the four steps from the table above. 

### Collections versus Claytons

The following steps convert a (live or normal) Collections configuration into a Claytons Collections. The two tabs below allow you to compare the live Collections with the final Claytons Collections.

=== "Live Collections"

    <figure markdown>
    <figcaption><em>Live</em> Collections to be emulated with <em>Claytons</em></figcaption>
    <sl-animated-image src="../images/afterCollections.gif" alt="Live Collections to be emulated with Claytons" />
    </figure>

=== "Claytons Collection"

    <figure markdown>
    <figcaption><em>Live</em> Collections to be emulated with <em>Claytons</em></figcaption>
    <sl-animated-image src="../images/afterClaytons.gif" alt="Claytons version" />
    </figure>


### 1. How many collections?

For the example course used here, the aim is produce a new home page that fully emulates _live_ Collections.
    
As shown in the image below, the example course has four collections. We want to use all four: _Why?_, _What?_, _How?_, and _Questions & Suggestions_.

<figure markdown>
<figcaption>The four collections for this live Collections</figcaption>
<img src="../images/fourCollections.png" alt="Four collections for this live Collections" />
</figure>



### 2. What Canvas pages?

To emulate _live_ Collections, we need to place all the collections into a single page. The aim being is that this page will become the new home page for the course.

Hence, the new Claytons Canvas page will be called _New Home Page_. A page that doesn't exist yet in the course.
    
### 3. Configure Claytons

The main configuration required is to specify the _output page_ for each collection. The _output page_ is the name of the Canvas page to which the collection's representation will be written.

In this example, since we want each collection to be represented in Claytons Collections, the name of an output page (_New Home Page_) is provided for each collection. Only add output pages for the collections you wish to include in the Claytons version.

!!! info "You can use different pages for different Claytons"

    In this example, Claytons Collections has all collections going to the same page. It is possible to use different pages for different collections.

<figure markdown>
<figcaption>Configure Claytons by specifying the output page for Collections</figcaption>
<sl-animated-image src="../images/configureClaytons.gif" alt="Configure Claytons by specifying the output page for Collections">
</figure>

### 4. Generate Claytons

With everything configured, the final step is to generate the Claytons pages. This is done using the **Full "Claytons"** section of the collections configuration element. The main task is to choose [the _Navigation Bar Option_](../reference/conceptual-model/representations/claytons/overview.md#navigation-bar-options) most appropriate.

For the example, the aim is to emulate _live_ Collections. Making _Tabs_ the best navigation bar option.

Once the option is chosen, Collections will create the page (if necessary) and update its content with static HTML.

<figure markdown>
<figcaption>Generate Claytons</figcaption>
<sl-animated-image src="../images/generateClaytons.gif" alt="Generate Claytons">
</figure>

### 5. Add external CSS

Given the limitations of the Canvas RCE, for best effect, some representations require additional CSS to be available externally. The following table summarise.

There are two known ways to add these additional CSS files:

1. Your Canvas administrator could add the CSS via the Canvas Theme Editor.
2. If you're institution has installed CIDI Labs DesignPLUS, it can be used to add the CSS at the course level.

| Representation | External CSS file |
| --- | --- |
| GriffithCards | [griffith-cards-claytons.css](https://raw.githubusercontent.com/djplaner/canvas-collections/main/src/css/griffith-cards-claytons.css) |



