# Objects (aka Activities)

Vanilla Canvas modules can only provide the information and functionality provided by vanilla Canvas. Design (e.g. that the module is a lecture or assessment) and context specific (e.g. the date it is due) information can be added to the module name. But this is limited and manual.

A key feature of Collections is the ability to specify additional metadata and functionality for Canvas modules as a way to transform them into design and context specific objects. To better support and visually express your course's learning design.

## Description

A description of the object that will be displayed in most representations to provide students with a way to answer what, why, how or some other question about the module. How (and perhaps if) the description is shown to the student will depend on the relevant collection's representation.

## Image

Associate an image with the module. Useful for providing a visual representation of the module and contributing to the overall visual design of the course. Images are specified by two pieces of metadata:

1. Image url - the web location where the image can be viewed.
2. Image scale - how the image should be scaled to fit within the available space.

### Image url

### Image scale


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