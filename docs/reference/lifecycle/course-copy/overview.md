# Course Copy - Canvas Collections

## Background - Copying a Canvas course with Collections

You can use the Canvas [course copy process](https://community.canvaslms.com/t5/Instructor-Guide/How-do-I-copy-content-from-another-Canvas-course-using-the/ta-p/1012) to copy course content from one site to another. 

Canvas Collections configuration information can be safely copied from one course to another. However, some changes need to be made. Collections will attempt to make these changes. This process is called _importing_ Collections into the new course.

## Considerations when importing

!!! warning "Claytons Collections pages may need to be re-generated after a course copy"

	After using Collections' course copy process, only [_live_ Collections](../../../navigate/navigating-live-collections.md) will by automatically updated (because it is dynamically generated each time).

	[Claytons Collections](../../../navigate/navigating-claytons-collections.md) is not automatically updated by the Collections' course copy process. Claytons Collections generates static HTML pages and are not automatically updated. 

	You will need to [update any Claytons pages](../../conceptual-model/representations/claytons/overview.md#how-does-it-work)
	

!!! tip "A _clean_ copy will be a _good_ copy"

	A _clean_ copy is where the destination course is "clean".
	
	i.e. it only contains information from the existing course. Nothing has already been added, modified, or removed.
	
	This makes it easy for Collections to update its configuration correctly.

	**A _clean_ copy will be a _good_ copy.**

## Importing Collections: what needs to happen after a course copy?

Collections' configuration information may contain information that needs to be updated to work with the new course. Collections will check and, in some cases, attempt to update this information, including:

- Module identifiers (ids) - the modules in the new course will have different module ids.
- Course image links - it is common to use images from a course's files area in Collections. A normal course copy process should result in these being modified. But Collections will check.

