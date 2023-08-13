<!--
 Copyright (C) 2023 David Jones
 
 This file is part of Canvas Collections.
 
 Canvas Collections is free software: you can redistribute it and/or modify
 it under the terms of the GNU General Public License as published by
 the Free Software Foundation, either version 3 of the License, or
 (at your option) any later version.
 
 Canvas Collections is distributed in the hope that it will be useful,
 but WITHOUT ANY WARRANTY; without even the implied warranty of
 MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 GNU General Public License for more details.
 
 You should have received a copy of the GNU General Public License
 along with Canvas Collections.  If not, see <http://www.gnu.org/licenses/>.
-->


# GriffithCards

The following animated image shows the [same vanilla Canvas course](overview.md#vanilla-canvas) with the same collections as the previous example. However, this time the _GriffithCards_ representation is being used. This representation generates a card for each [object (aka Module)](../objects/overview.md) that belongs to the collection. It mirrors the widely used [card UI design pattern](https://www.nngroup.com/articles/cards-component/). 

Everything else (e.g. the navigation bar, include pages, and the modules belonging to the collection) is the same

The card component can help transform the vanilla Canvas module into a [design and context specific object](../objects/overview.md) by displaying additional attributes, including (but not limited to): a textual description; a label and sequence number; associated dates; and, a card image.

<figure markdown>
<figcaption>Collections using the Griffith Cards representation</figcaption>
<sl-animated-image src="../pics/animatedGriffithCards.gif" alt="Collections using the Griffith Cards representation" />
</figure>


## Progress ring

Canvas module [requirements](https://community.canvaslms.com/t5/Instructor-Guide/How-do-I-add-requirements-to-a-module/ta-p/1131) provide a way to specify what students must complete before a module can be marked as complete. The _GriffithCards_ representation provides a progress ring as a visualisation of the requirements a student has completed for a module.

The following animated image demonstrates 

- the visual design of the GriffithCards progress ring.
- the presence of a tooltip that allows students to hover over the progress ring to see a summary of # of requirements completed and the total number to be completed.
- how the progress ring is updated when a student completes a requirement.


!!! note "Use _student view_ to see the progress ring"

    Teacher or designer views will not show the progress ring.


<figure markdown>
<figcaption>Example of GriffithCards' progress ring for tracking student completion</figcaption>
<sl-animated-image src="../pics/progressGriffithCards.gif" alt="Example of GriffithCards' progress ring for tracking student completion" />
</figure>
