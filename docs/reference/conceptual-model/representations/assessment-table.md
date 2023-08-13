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


# AssessmentTable

## What does it look like?

Rather than representing each module as a card, the _AssessmentTable_ representation represents each module as the row in table. A table designed explicitly for summarising the assessment for a course.  The [properties section below](#properties-columns) provides more detail on the displayed columns.

The following animated image shows the [same vanilla Canvas course](overview.md#vanilla-canvas), but using the _AssessmentTable_ representation. The first module of the _Why?_ collection has been configured with metadata for _weighting_ and _learningOutcomes_ and this information is displayed. None of the modules for the _What?_ and _How?_ collections have _learningOutcomes_, hence that column is not visible for these collections. 

<figure markdown>
<figcaption>Collections enabled modules page showing the assessment table representation</figcaption>
<sl-animated-image src="../pics/animatedAssessmentTable.gif" alt="Collections enabled modules page showing the assessment table representation" />
</figure>

## Properties (columns)

The columns of the _AssessmentTable_ representation (Title, Description, Weighting, Due Date, and Learning Outcomes) are populated from various properties of the allocated modules.

!!! note "Not all columns, all the time"

    If none of the modules have defined the _weighting_ and _learning outcomes_ properties, then those columns will not appear to students.

### Title

The title column is taken directly from the name of the module. 

The intent is that the module name represents the title of the assessment task students need to complete.

### Description

The description column is taken from the standard Canvas Collections [description property](../objects/overview.md#description). 

The intent is that the description provides students with some  additional high-level information about the assessment task.

### Due Date

The _Due Date_ column is taken from the standard Canvas Collections [dates property](../objects/dates.md).

The intent being to provide the student some indication of the due date for the assessment task.

### _Weighting_ and _Learning Outcomes_

The _Weighting_ and _Learning Outcomes_ columns are specific to the _AssessmentTable_ representation. They are populated using [Canvas Collections' metadata feature](../objects/metadata.md). The table below shows the metadata names and example values for the _Weighting_ and _Learning Outcomes_ columns.

The intent being to provide students with additional important information about the assessment task.

| Metadata Name | Example Value |
| --- | --- |
| `learning outcomes` | 1, 2, 3 |
| `weighting` | 10% |


