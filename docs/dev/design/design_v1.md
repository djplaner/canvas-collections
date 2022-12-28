# Design of "v1" canvas-collections

## Aims

- Improve structure of the code
    - better MVC structure
    - controller factory to distinguish edit/view and also different representations
    - clear promise driven models for configuration file reading/writing 
	- move to API based module information (replacing scraping)
	- test coverage
	- remove the lib folder??
- Improve the build process
    - clearer path for userscript dev, userscript live, and javascript CDN versions
- Add support for
    - configuration from JSON file in course "files" area
    - multiple represenations of collections (for students)
    - integrated collection editing interface
        - turn collections on/off
        - configure collections
            - list of available collections
            - change order
            - rename collections
            - indicate which collections are visible
            - choose how collection navigation representation
            - select collection representation
		- configure module collection information
		    - which collection a module belongs to
		    - dates - including using Canvas module dates
		    - labels and label numbering
		    - image iframe active image
- Improve representations
    - cards
        - accessibility
        - move away from tailwind??
        - component?
        - Canvas specific stuff
            - unpublished
            - progress
            - including module item drop downs
    - table
        - how to specify columns and link to module items
    - collection navigation 

## Repo structure

- dev
- release
- src
    controller factory at this level
	- initialise
	- edit
	- collection-view
	- module-view
	    - cards
	    - table
	    - ... 

## States

In each state there may be input elements, these will need to have event handlers that connect back to the controller and/or views (controller probably). 

1. Configuration
    - edit only view 
    - shows the capability for canvas-collections to be turned on 
    - but not currently turned on
    - may already be configured - show that
    - probably a drop box of some description at the same level of student view button
2. Edit
    - collections turned on and in edit view on the modules page
	- Modify "canvas-collection" display at top to have a drop down that allows configuration of collections
    - Perhaps depending on configuration, show the collections representation at the top
	- Modify the canvas module representations to include edit capabilities (mostly a drop down on module title)
	- ???
3. View
    - collections turn on but in student view
    - shows configured collection navigation
    - shows configured collection module information
    - modifies the canvas module information
    - What it displays is based on the selective representation for navigation and module information


## Code structure

- remove lib folder
- move canvasCollections function operation into cc_Controller
    - factory class, figures out which controller from which state to call
    - Need to check for cc configuration file **ASYNC** api call. Can probably do away with the waiting and by event driven
    - parse the available configuration file
    - combine URL and configuration file information to calculate which state to enter (and thus which controller)
	- create that controller and call it
- create sub-folders for the various states