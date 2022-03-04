# Design of "v1" canvas-collections

## Aims

- Improve structure of the code
    - better MVC structure
    - controller factory to distinguish edit/view and also different representations
    - clear promise driven models for configuration file reading/writing 
	- move to API based module information (replacing scraping)
	- test coverage
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