# Representations

_Representations_ control how an individual collection is displayed.  The currently available representations are listed in the table and explained in more detail on the relevant pages. 

Representations for a given collection can be changed at any time. New representations can be [developed and added](../../development/representations/representation-development.md).


## Current representations

| Name | Description |
| --- | --- |
| [CollectionsOnly](collections-only.md) | The bare minimum representation. The [vanilla Canvas Modules page](#vanilla-canvas) is modified by adding: 1) the Collections navigation bar; 2) any [include pages](../collections/overview.md#include-page); and, 3) showing only modules belonging to the current collection. |
| [GriffithCards](griffith-cards.md) | Builds on _CollectionsOnly_ by adding a card component for each module belonging to the current collection. The card component includes a number of additional features to transform the generic Canvas module into a design and context specific object. |
| [AssessmentTable](assessment-table.md) | Rather than a card, each module is represented by a row in a table. The table is designed to summarises assessment for a course with columns for weighting and learning outcomes. |
| [HorizontalCards](horizontal-cards.md) | A variation on GriffithCards where there is a single column of horizontal cards. One for each module. Specially designed to function in Claytons mode without any external CSS. _Early release version_ |

### Vanilla Canvas

The vanilla [Canvas Modules page](https://community.canvaslms.com/t5/Canvas-Basics-Guide/What-are-Modules/ta-p/6) shows a linear list of all the modules in a course (for students all the _published_ modules). The following animated image shows the Modules page for a sample Canvas course containing 13 modules. 

This same course is used in the demonstrations for the other representations.

<figure markdown>
<figcaption>Vanilla Canvas Modules (no Collections)</figcaption>
<sl-animated-image src="../../../../assets/vanillaModules.gif" alt="Vanilla Canvas Modules (no Collections)" />
</figure>



