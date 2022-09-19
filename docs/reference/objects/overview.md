# Objects (aka Activities)

Vanilla Canvas modules can only provide the information and functionality provided by vanilla Canvas. Design (e.g. that the module is a lecture or assessment) and context specific (e.g. the date it is due) information can be added to the module name. But this is limited and manual.

A key feature of Collections is the ability to specify additional metadata and functionality for Canvas modules as a way to transform them into design and context specific objects. To better support and visually express your course's learning design.

## Description

A description of the object that will be displayed in most representations to provide students with a way to answer what, why, how or some other question about the module. How (and perhaps if) the description is shown to the student will depend on the relevant collection's representation.

## Image (or iframe)

Associate an image or an iframe with the module. Typically used to provide a visual representation of the module, contributing to the overall visual design of the course, and possibly helping students build conceptual associations. 

Images are specified by two pieces of metadata:

1. Image url - the web location where the image can be viewed.
2. Image scale - how the image should be scaled to fit within the available space.

An iframe is specified by entering the complete iframe embed code into the Image url field. iframes are automatically scaled to fit within the available space.

### Image url (or iframe)

Designed to contain either:

1. The URL for an image to be displayed.

    See the [Image URL](../../../walk-throughs/new/configure-modules/#image-url) section of the [Configure Modules walk-through](../../../walk-throughs/new/configure-modules) for more information, including demonstration of how to get the URL of an image in the Canvas files area.

2. The embed code for [an iframe](https://www.hostinger.com/tutorials/what-is-iframe/) (e.g. a YouTube/Vimeo/Stream/Studio etc video)

    Copy and paste the full embed code from a video-hosting (or some other) service and it will be embedded where the image would normally appear.

### Image (or iframe) scale

For an iframe, _Image Scale_ is ignored. Instead, iframes are automatically set to use ```width="100%" height="100%"``` to ensure they are scaled to fit the available space.

For an image, _Image scale_ modifies the scaling of the image using the standard [CSS property called object-fit](https://www.w3schools.com/cssref/css3_pr_object-fit.asp). The following table outlines the possible values for object-fit. These values appear in the Image scale drop down when configuring a module. 

See the [Image Scale](../../../walk-throughs/new/configure-modules/#image-scale) section of the [Configure Modules walk-through](../../../walk-throughs/new/configure-modules) for more information, including an animation of the impact of the different values.



| Value | 	Description |
| --- | --- |
| cover |	The image is scaled to fit the available space, maintaining the aspect ratio. The image is cropped to fit the available space. |
| contain | 	The image is scaled to fit the available space, maintaining the aspect ratio. The image is not cropped. |
| fill |	The image is scaled to fill the available space, maintaining the aspect ratio. The image is cropped to fit the available space. |
| fit |	The image is scaled to fit the available space, maintaining the aspect ratio. The image is not cropped. |
| none |	The image is not scaled. |
| scale-down | 	The image is scaled to fit the available space, maintaining the aspect ratio. The image is not cropped. |

## Labels and Numbers

Many course designs use modules to represent common objects (e.g. lectures, tutorials, workshops, assessments, themes, topics etc.). Often a course will have multiple such objects (e.g. topic 1, topic 2, topic 3). Labels and numbers provide a means to explicitly identify such objects and their sequence. This information is used in different ways by each representation.

Collections provides the ability for you to explicitly specify the number for each module OR it can auto calculate the number based on the module's position in the collection.

## Date

It is common for a design specific object (e.g. topic, assignments, lecture etc.) to occur at a specific date and time. It is also common (within a University context) for these dates and times to be scheduled at the same time each study period (aka trimester, semester, study session etc). This commonly leads to two strategies:

1. Generic dates - specify the date in a study period independent way (e.g. "Week 1", "Week 2", "Week 3" etc.). No upkeep is required, but students are expected to translate the generic dates into specific calendar dates.
2. Specific dates - specify the actual calendar date (e.g. 1st Marc). Requires manual updating each study period, but students can easily see the specific date.

Collections can take on the task of translating generic dates into calendar specific dates. It identifies the study period for the current course site and translates a generic date into the appropriate specific date based on the institution's academic calendar.

> 🚧 **Note:** This feature is currently under construction. Currently, the following restrictions apply:
>
> - Only generic dates can be provided.
> - Generic dates only work for Griffith University.

### Study Period

At Griffith University, the course code typically includes a term code. A four digital number identifying the study (aka teaching) period.  Collections attempts to extract the term code from the course code, which is then used to map generic dates to specific calendar dates. If the term code cannot be extracted, Collections defaults to the current study period.

See [the Griffith course id explanation page](https://intranet.secure.griffith.edu.au/computing/using-learning-at-griffith/staff/administration/course-ID) for more information about term codes.

## Additional Metadata

For various reasons you may wish to provide additional metadata about a module. The _additional metadata_ area enables this. You can add (and delete) any additional metadata in the form of name/value pairs.