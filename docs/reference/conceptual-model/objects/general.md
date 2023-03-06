# General tab - module configuration element

## Description

A description of the object that will be displayed in most representations to provide students with a way to answer what, why, how or some other question about the module. How (and perhaps if) the description is shown to the student will depend on the relevant collection's representation.

<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@shoelace-style/shoelace@2.0.0/dist/themes/light.css" />
<script type="module" src="https://cdn.jsdelivr.net/npm/@shoelace-style/shoelace@2.0.0/dist/shoelace.js"></script>

| Metadata | Description |
| --- | --- |
| Description | <p>Some HTML intended to provide a description or rationale for the object represented by the module</p> |
| Image | <p>A visual image to represent the module</p> | 
| Label & Number | <p>Explicitly identify (label) a module as a particular object and its position in the collection (the number - which can be auto calculated). For example, <em>Lecture 5</em> or <em>Assessment item 3</em></p> | 
| Date (period) & Date Label | Specify the day/time (or date period) when the activity occurs, is due etc. Through a combination of a date and a label (e.g. due, commencing etc) | 
| Additional metadata | A flexible method for specifying any additional metadata in the form of pairs of name and value | 
| FYI | <p>Specify whether a module is intended as a "for your information" module. That is, a module for which students can see information about the module, but not the module itself.</p> <p> Useful if you want students to see details about a module that isn't released.</p> |



=== "Add a description"

    The description is best used to provide students with additional information about what, why and how they might engage with the activities and information contained by a module. The description is a relative short piece of text entered using a simple visual editor under the description heading of the module configuration area.

    <figure markdown>
    <figcaption>Adding a description to a couple of modules</figcaption>
    <sl-animated-image src="../pics/addDescription.gif" alt="Adding a description" />
    </figure>

=== "Add an image or other banner"

    The ability to add an image to each module is a powerful way to improve the visual design of ca course and help student way finding by providing a strong, unique a visual representation of the module. 

    Collections uses two pieces of metadata to specify the image and how it is displayed:

    <figure markdown>
    <figcaption>Updating the banner for a module</figcaption>
    <sl-animated-image src="../pics/addBanner.gif" alt="Adding a banner - image and colour" />
    </figure>

=== "Add a label and a number"

    The label helps identify a Canvas module as a specific type of object (e.g. _Lecture_, _Workshop_, _Assignment_). It helps them visitors develop a conceptual understanding of why, what, and how to engage with the module/object.

    A module can have a label and a label number (e.g. _Lecture 1_, _Lecture 2_ etc)

    A label is simple any sequence of characters (including emojis).

    There are two options for the number: 
    1. _Auto-number_ - the number is automatically calculated based on the order of the modules in the collection. The first lecture will be _Lecture 1_ the second _Lecture 2_ and so on.   
    2. _Explicitly specified string_ - i.e. you can manually specify any sequence of characters, including emojis, or leave it blank.

    Labels and numbers can also work with the names of Canvas modules, as illustrated in the following.

    <figure markdown>
    <figcaption>Adding a label and number to three modules</figcaption>
    <sl-animated-image src="../pics/addLabel.gif" alt="Adding a label and number to three modules" />
    </figure>

=== "Add a date and date label"

    Course activities and objects are typically associated with specific dates or date periods. Using the _Date_ tab you can associate a date or date period with a module. 

    Currently, these dates are specified using generic dates (e.g. _Monday, week 5_, or _Wednesday, Week 7) for a university study period. Collections converts these to specific calendar dates based on a university academic calendar and the current Canvas course id. 

    !!! note "Currently, only some Griffith University academic calendars are support"

        To be useful, this feature must be customised to meet your specific contextual needs.

    <figure markdown>
    <figcaption>Adding a date</figcaption>
    <sl-animated-image src="../pics/addDate.gif" alt="Adding a date" />
    </figure>


# Old stuff here??

## FYI

A way to specify that a module should become a _For Your Information_ (FYI) only object. i.e. any representation will only display Collections' information (label, number, description, banner etc). It should not display any information about the actual Canvas module, including a link to the module.

FYI object's - since they don't display any information about the Canvas module - are always displayed. Regardless of whether the module is unpublished or generally not available to the student.


## Labels and Numbers

Many course designs use modules to represent common objects (e.g. lectures, tutorials, workshops, assessments, themes, topics etc.). Often a course will have multiple such objects (e.g. topic 1, topic 2, topic 3). Labels and numbers provide a means to explicitly identify such objects and their sequence. This information is used in different ways by each representation.

Collections provides the ability for you to explicitly specify the number for each module OR it can auto calculate the number based on the module's position in the collection.

## Engage Button

Card representations can include an _Engage_ button as an explicit affordance for the visitor to click on the card. When configuring the _Engage_ button you can choose to:

1. Turn the button on or off.

    Even if the _Engage_ button is turned off, the visitor can still click on a normal card to access the module. (unless it is an FYI object for which the _Engage_ button is always off).

2. Change the button text.

The following animated image demonstrates the process of configuring the _Engage_ button, including: turning off the _Engage_ button; turning it back on again; changing the label; and, finally returning back to the default.

![](pics/animatedEngage.gif)


## FYI Objects

Selecting the _FYI_ switch turns a module into a _For Your Information_ (FYI) object, this means that any representation of the module will:

1. Always appear regardless of whether the visitor has access (e.g. the module is unpublished); 
2. Never include any Canvas information about the module (e.g. a link to the module, whether the module is published or unpublished etc.)
3. Only display information about the module configured by Collections (e.g. the banner, the dates, description, label etc.).

There are two common uses for an FYI object:

1. "Coming soon" modules

    Allow students to see information about a module that they can't currently access. Helping them understand the complete structure of the course without being able to access the content.

2. Simple information sharing.

    You have important information to share and want it integrated into the collection's representation, including use of Collection's other features (e.g. banner, dates, etc). But don't need all the additional features of a module (e.g. items) 

!!! Note "FYI objects and other representations"

    The example below focuses on [the _GriffithCards_ representation](../../representations/overview/#griffithcards). All other representations should provide similar support for FYI objects, customised to fit the specifics of the representation.

### Example

The following animated image demonstrates how an FYI object can be used with the following steps:

1. Demonstrate that unpublished modules are not displayed for students.
2. Modify the unpublished module to make it an FYI object.

    Note how the _Engage_ button disappears after this change. FYI object's can't link to the module.

3. Add some an FYI message.

    A short textual message is added. This is overlaid on the bottom of the banner. Useful for displaying some additional information for the students.

4. Demonstrate how FYI objects are displayed for students.

    Even though the associated Canvas module is still unpublished, the FYI object is displayed in student view. **Note:** The module itself remains invisible to students. All they can see is the FYI object containing information you've configured using Collections.
     
5. Demonstrate the FYI objects don't need a message


![](./pics/animatedFYIObject.gif)

