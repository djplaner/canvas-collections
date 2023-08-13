# The edit life cycle

To modify the configuration of Collections for a Canvas course you will need to turn _Edit on_. The life cycle that follows may involve each of the following steps.

For more information on how to configure Collections once you've turned _Edit on_, see the [Configure Collections](collections.md) and [Configure Modules](modules.md) pages.

!!! note "Only one person, in one browser window can edit Collections for a course"

	To ensure that the Collections configuration information is not corrupted, only one person in one browser window can edit the Collections configuration information for a course at a time.

=== "Try to turn _edit on_"

	Initially, when viewing the course Modules page you will be in view mode. In the top right hand corner, you should be able to see both the Collections element (circled in red in the figure below) and next to it the _Student View_ button.

	To edit Collections, you click the _Edit On_ button to turn Collections editing on.

	<figure markdown>
	<figcaption>Staff view mode</figcaption>
	[![Staff view mode](images/viewMode.png)](images/viewMode.png)  
	</figure>

=== "Someone else is editing"

	After clicking the _Edit On_ button you will only be able to edit if no-one else (including you in another browser) are editing the same course's Collections configuration.

	If someone else is editing, you will see an alert (figure below) and will not be able to edit. As shown below, the alert will tell if it is you or someone else who is editing.

	<figure markdown>
	<figcaption>Someone else (you) is editing</figcaption>
	[![](images/alreadyEditing.png)](images/alreadyEditing.png)
	</figure>

=== "You are editing"

	!!! note "Collections will update first"

		The first step in turning _edit on_ is to update the Collections configuration information to ensure you are editing the latest version. Meaning you may see a change in your Collections view as editing is turned on


	If no-one else is editing, you will be able to edit. The changes you see will include:

	1. the _Edit On_ button will become the _Edit Off_ button
	2. The Collections element (the first figure below) will include additional "edit" features (e.g. the _Save_ button and the "arrow" icon to configure the collections)
	3. Each Canvas module will have a Collections' module configuration element (the second figure below)

	<figure markdown>
	<figcaption>You are editing</figcaption>
	[![](images/editing.png)](images/editing.png)
	</figure>

=== "Turn _edit off_"

	Clicking on the _edit off_ button will turn editing off. Returning the Collections element to the view mode and removing the Collections' module configuration elements.

	<figure markdown>
	<figcaption>Turning editing off</figcaption>
	<sl-animated-image src="../images/animatedTurnEditOff.gif" alt="Turning editing off">
	</figure>

=== "Automatic _edit off_"

	Collections will automatically turn _edit off_ if you

	1. Leave the Modules page for which editing was turned on.
	2. You have not made any edits to Collections for a given time period (the default is 2 minutes).
