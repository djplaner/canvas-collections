# Dates tab - module configuration element

The _dates tab_ is one of four tabs that form the [_module configuration area_](overview.md). It provides the interface to configure a single date or a date range for each module (see below).

<figure markdown>
<figcaption>The "dates tab" of the module configuration area</figcaption>
[![The "dates" tab" of the module configuration area](pics/datesTab.png)](pics/datesTab.png)
</figure>


## Properties

<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@shoelace-style/shoelace@2.0.0/dist/themes/light.css" />
<script type="module" src="https://cdn.jsdelivr.net/npm/@shoelace-style/shoelace@2.0.0/dist/shoelace.js"></script>

The _dates tab_ allows you to view and modify the following properties.

| Property | Description |
| --- | --- |
| Date label | A text label that will be added before the date (range). e.g. "Starts" or "Due". |
| Start Date | A collection of properties that can be used to specify a date or the start of a date range. |
| Stop Date | A collection of properties that can be used to specify the end of a date range. |
| Date output | A human readable description of the current date. Using the date representation from [the GriffithCards representation](../representations/overview/#griffithcards). |

Each of the _Start_ and _Stop_ dates has two properties you can set to specify the date (and optionally) time.

| Property | Description |
| --- | --- |
| Select date | Selected the calendar date |
| Select Time | Time of day (if any) for the date. |

#### Property visibility

Lastly, you can choose which of the components of a date to display using the provided checkboxes beside the following properties.

| Property | Description |
| --- | --- |
| Time | Whether or not the time is shown |
| Day | Whether the day of the week for the chosen date is shown |
| Date | Whether the numeric date of the month for the chosen date is shown |
| Month | Whether the abbreviated month name for the chosen date is shown |

<figure markdown>
<figcaption>Animated demonstration of changing the visibility of certain date properties</figcaption>
<sl-animated-image src="../pics/configureDatesAnimated.gif" alt="Animated demonstration of modifying the visibility of date properties" />
</figure>


#### Representation of dates

How dates are displayed to the student depends on the combination of:

1. The design of the current representation for a collection.
1. What dates have been configured.

The following animated image shows how to use the _date tab_ and the different ways dates can be displayed.


<figure markdown>
<figcaption>Animated demonstration of changing dates</figcaption>
<sl-animated-image src="../pics/configureDatesAnimated.gif" alt="Animated demonstration of changing dates" />
</figure>
