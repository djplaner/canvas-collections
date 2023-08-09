# Representations

_Representations_ control how an individual collection is displayed.  Currently available representations are summarised in the table and the demonstrations below. Representations for a given collection can be changed at any time. New representations can be [developed and added](../../development/representations/representation-development.md).

## Current representations

| Name | Description |
| --- | --- |
| [CollectionsOnly](#collections-only) | The bare minimum representation. The [vanilla Canvas Modules page](#vanilla-canvas) is modified by adding: 1) the Collections navigation bar; 2) any [include pages](../collections/overview.md#include-page); and, 3) showing only modules belonging to the current collection. |
| [GriffithCards](#griffithcards) | Builds on _CollectionsOnly_ by adding a card component for each module belonging to the current collection. The card component includes a number of additional features to transform the generic Canvas module into a design and context specific object. |
| [AssessmentTable](#assessmenttable) | Rather than a card, each module is represented by a row in a table. The table is designed to summarises assessment for a course with columns for weighting and learning outcomes. |
| [HorizontalCards](#horizontalcards) | A variation on GriffithCards where there is a single column of horizontal cards. One for each module. Specially designed to function in Claytons mode without any external CSS. _Early release version_ |

### Vanilla Canvas

The vanilla [Canvas Modules page](https://community.canvaslms.com/t5/Canvas-Basics-Guide/What-are-Modules/ta-p/6) shows a linear list of all the modules in a course (for students all the _published_ modules). The following animated image shows the Modules page for a sample Canvas course containing 13 modules. This same course is used in the demonstrations below.

<figure markdown>
<figcaption>Vanilla Canvas Modules (no Collections)</figcaption>
<sl-animated-image src="../../../../assets/vanillaModules.gif" alt="Vanilla Canvas Modules (no Collections)" />
</figure>

### Collections Only

The following animated image shows the above course configured with Canvas Collections so that its 13 modules are organised into three collections: _Why?_, _What?_, and _How?_. 

In this example, each collection is using the _Collections Only_ representation. This is the bare minimum Collections' representation, which modifies the Canvas modules page to include:

1. The collection's navigation bar (hence the name, _Collections Only_).

    This is how you navigate between collections.

2. Any [Include Pages](../collections/overview.md#include-page) configured for the collection.

    The _Why?_ collection includes some text (_A little bit of an include page -- one one 111_) after the collection's navigation bar. This is the content of a Canvas page that has been configured as an _Include Page_ for the collection.

3. The modules belonging to the current collection.

	This is the standard Canvas Modules view, however, when viewing a collection you will only see the modules that belong to the current collection.

The above three elements are the bare minimum changes that Collections (when turned on) makes to the Canvas Collections page. The remaining 

<figure markdown>
<figcaption>Modules page with Collections, but not representations</figcaption>
<sl-animated-image src="../pics/animatedCollectionsOnly.gif" alt="Modules page with Collections, but not representations" />
</figure>

### GriffithCards

The following animated image shows the same course with the same collections as the previous example. However, this time the _GriffithCards_ representation is being used. This representation generates a card for each [object (aka Module)](../objects/overview.md) that belongs to the collection. It mirrors the widely used [card UI design pattern](https://www.nngroup.com/articles/cards-component/). 

Everything else (e.g. the navigation bar, include pages, and the modules belonging to the collection) is the same

The card component can help transform the vanilla Canvas module into a [design and context specific object](../objects/overview.md) by displaying additional attributes, including (but not limited to): a textual description; a label and sequence number; associated dates; and, a card image.

<figure markdown>
<figcaption>Collections using the Griffith Cards representation</figcaption>
<sl-animated-image src="../pics/animatedGriffithCards.gif" alt="Collections using the Griffith Cards representation" />
</figure>


### AssessmentTable

Rather than representing each module as a card, the _AssessmentTable_ representation represents each module as the row in table. A table designed explicitly for summarising the assessment for a course with the following columns:

- Title - the title of the module (also used as by the _GriffithCard_ representation for the title for the card).
- Description - the description of the module (as per the _GriffithCard_ representation).
- Weighting - an [additional metadata](../objects/overview.md#additional-metadata) named _weighting_ (not used by _GriffithCard_).
- Due Date - the same [date](../objects/overview.md#dates) information used by _GriffithCards_ but displayed differently.
- Learning Outcomes - an [additional metadata](../objects/overview.md#additional-metadata) named _learningOutcomes_ (not used by _GriffithCard_).

!!! note "Learning outcomes or not?"

    If none of the modules in the current collection have any information in _learningOutcomes_ metadata then the learing outcomes table is not displayed.

The following animated image shows the same course as above, but using the _AssessmentTable_ representation. The first module of the _Why?_ collection has been configured with metadata for _weighting_ and _learningOutcomes_ and this information is displayed. None of the modules for the _What?_ and _How?_ collections have _learningOutcomes_, hence that column is not visible for these collections. 

<figure markdown>
<figcaption>Collections enabled modules page showing the assessment table representation</figcaption>
<sl-animated-image src="../pics/animatedAssessmentTable.gif" alt="Collections enabled modules page showing the assessment table representation" />
</figure>


### HorizontalCards

As shown below, the _HorizontalCards_ representation is related to [_GriffithCards_](#griffithcards). One card per module, often with very similar components. The main differences being 

1. The cards are displayed one per row; and,
2. _HorizontalCards_ does not require any external CSS when used in Claytons collections.

<figure markdown>
<figcaption>Collections enabled modules page showing the HorizontalCards representation</figcaption>
<sl-animated-image src="../pics/animatedHorizontalCards.gif" alt="Collections enabled modules page showing the HorizontalCards representation" />
</figure>



<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@shoelace-style/shoelace@2.0.0/dist/themes/light.css" />
<script type="module" src="https://cdn.jsdelivr.net/npm/@shoelace-style/shoelace@2.0.0/dist/shoelace.js"></script>

