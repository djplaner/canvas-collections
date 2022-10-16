/**
 * cc_ConfigurationView.js 
 * Update Canvas display (only on modules pages with edit mode on) to show
 * - title for cc
 * - switch to turn on/off
 * - drop down arrow to show the configuration dialog
 * - TODO: configuration dialog
 *  
 */

import { cc_View } from '../cc_View.js';

const CC_VERSION = "0.9.2";

const CV_DEFAULT_DATE_LABEL = "Starting";

const CC_UNPUBLISHED_HTML = `
<div class="cc-unpublished"> 
  	<span style="padding-top: 0.25em;padding-right:0.25em">
        <sl-tooltip id="cc-about-unpublished">
		  	<div slot="content"></div>
			<a target="_blank" href=""><i class="icon-question cc-module-icon"></i></a>
		</sl-tooltip>
  		Unpublished
	</span>
  </a>
 </div>
`;

const CONFIG_VIEW_TOOLTIPS = [
	{
		contentText: `<p>The <em>Canvas Collections Configuration</em> page</a> is unpublished. 
	The live Collections view will <strong>not</strong> be visible in "Student View" or for students.</p>
		<p>Any Claytons Collections will be visible, if the relevant pages are published.</p>`,
		maxWidth: `250px`,
		targetSelector: "#cc-about-unpublished",
		persistent: true,
		href: "https://djplaner.github.io/canvas-collections/reference/on-off-unpublished/"
	},
	{
		contentText: `Add more structure and context specific design to the Canvas module view.`,
		maxWidth: `250px`,
		targetSelector: "#cc-about-collections",
		animateFunction: "spin",
		href: "https://djplaner.github.io/canvas-collections/"
	},
	{
		// to complete
		contentText: `The list of current collections for your course and where you 
				can modify their order, appearance etc.`,
		maxWidth: `250px`,
		targetSelector: "#cc-about-existing-collections",
		animateFunction: "spin",
		href: "https://djplaner.github.io/canvas-collections/reference/collections/overview/#existing-collections"
	},
	{
		contentText: `Name and choose a representation for a new collection`,
		maxWidth: `250px`,
		targetSelector: "#cc-about-new-collection",
		animateFunction: "spin",
		href: "https://djplaner.github.io/canvas-collections/reference/collections/overview/#add-a-new-collection"
	},
	{
		contentText: `Specify how the collection will be displayed by choosing one of the available representations. Representations can be changed at any time.`,
		maxWidth: `250px`,
		targetSelector: "#cc-about-collection-representation",
		animateFunction: "spin",
		href: "https://djplaner.github.io/canvas-collections/reference/representations/overview/"
	},
	{
		contentText: `Update all configured output pages and choose an option for the navigation bar.`,
		maxWidth: `250px`,
		targetSelector: "#cc-about-full-claytons",
		animateFunction: "spin",
		href: "https://djplaner.github.io/canvas-collections/reference/representations/claytons/overview"
	},
	{
		contentText: `<p>There are three navigation bar options:</p>
		<ol>
		  <li> None - no navigation between pages/collections. </li>
		  <li> Pages - collections on separate pages with navigation between. </li>
		  <li> Tabs - multiple collections on a page with tab navigation. </li>
		</ol>`,
		maxWidth: `250px`,
		targetSelector: "#cc-about-full-claytons-navigation-option",
		animateFunction: "spin",
		href: "https://djplaner.github.io/canvas-collections/reference/representations/claytons/overview/#navigation-bar-options"
	},
	{
		contentText: `The first collection displayed when users visit for the first time.`,
		targetSelector: '#cc-about-default-collection'
	},
	{
		contentText: `<p>Make collection invisible to students. 
		(Note: can't hide the default collection)</p>
		<p><i class="icon-warning"></i> Also unpublish all the collection's modules to be ensure they are hidden.`,
		targetSelector: '.cc-about-hide-collection',
		animateFunction: "spin",
		href: "https://djplaner.github.io/canvas-collections/reference/collections/overview/#hide-a-collection"
	},
	{
		contentText: `Update the <em>output page</em> with the collection's current representation.
		<p><strong>Note:</strong> This is how you can use Collections with students without it being
		installed by your institution.</p>
		`,
		targetSelector: '.cc-about-update-output-page',
		animateFunction: "spin",
		href: "https://djplaner.github.io/canvas-collections/reference/collections/overview/#output-page"
	},
	{
		contentText: `Specify the name of an existing Canvas page and the content of that page
		will be displayed before the current collection's representation 
		(it is <strong>included</strong>)`,
		targetSelector: '#cc-about-include-page',
		animateFunction: "spin",
		href: "https://djplaner.github.io/canvas-collections/reference/collections/overview/#include-page"
	},
	{
		contentText: `<p>By default, include page contents placed <em>before</em> the collection. When selected
		will place the include page contents <em>after</em> the collection.</p>`,
		targetSelector: '.cc-about-include-after',
		animateFunction: "spin",
//		href: "https://djplaner.github.io/canvas-collections/reference/collections/overview/#hide-a-collection"
	},
	{
		contentText: `<p>🚧🧪☠️ <strong>Warning:</strong> This feature is experimental, under construction, and
		potentially destructive. Only use as suggested and if you're certain.</p>
		<p>Modify the names of Canvas modules by apply the Collection's label/number</p>
		`,
		targetSelector: '.cc-about-apply-module-labels',
		animateFunction: "spin",
		href: "https://djplaner.github.io/canvas-collections/reference/collections/overview/#apply-module-labels"
	},




	//******** Module configuration */
	{
		contentText: `Specify how this module works with and is represented by Collections.`,
		maxWidth: `250px`,
		targetSelector: ".cc-about-module-configuration",
		animateFunction: "spin",
	},
	{
		contentText: `Configure basic collections information about the module, including:
		<ul>
		  <li> Which collection does it belong to? </li>
		  <li> What is the module's description, label and number? </li>
	  </ul>`,
		maxWidth: `250px`,
		targetSelector: "#cc-about-basic-configuration",
		animateFunction: "spin",
		href: "https://djplaner.github.io/canvas-collections/reference/objects/overview/"
	},
	{
		contentText: `Which collection does this module belong to?`,
		maxWidth: `250px`,
		targetSelector: "#cc-about-module-collection",
		animateFunction: "spin",
		href: "https://djplaner.github.io/canvas-collections/reference/objects/overview/"
	},
	{
		contentText: `Represent the module as a "for your information" (fyi) object. Only display collection related information.
		Display no information about the corresponding module. Always display the object, even when the module is unpublished.`,
		maxWidth: `250px`,
		targetSelector: "#cc-about-module-fyi",
		animateFunction: "spin",
		href: "https://djplaner.github.io/canvas-collections/reference/objects/overview/#fyi"
	},
	{
		contentText: `Describe why, what or how the module relates to the students' learning`,
		maxWidth: `250px`,
		targetSelector: "#cc-about-module-description",
		animateFunction: "spin",
		href: "https://djplaner.github.io/canvas-collections/reference/objects/overview/#description"
	},
	{
		contentText: `Describe the type of object the module represents (e.g. lecture, theme etc.)`,
		maxWidth: `250px`,
		targetSelector: "#cc-about-module-label",
		animateFunction: "spin",
		href: "https://djplaner.github.io/canvas-collections/reference/objects/overview/#labels-and-numbers"
	},
	{
		contentText: `<p>Choose from the three supported "date types" and configure it. Options include:</p>
		<ol>
		  <li> <strong>Single date</strong> - a specific date (and time) </li>
		  <li> <strong>Date range</strong> - a start and end date (and time) </li>
		  <li> 🏗 <strong>Coming soon</strong> 🏗 - (soon you'll be able to) specify a single date (and time) when the module will be available.</li>
		</ol>
		<p><em>Coming Soon</em> will be able to be used with one of the other options</em></p>
		`,
		maxWidth: `250px`,
		targetSelector: "#cc-about-module-dates",
		animateFunction: "spin",
		href: "https://djplaner.github.io/canvas-collections/reference/objects/overview/#dates"
	},
	{
		contentText: `Specify a single date, or becomes the start date in a date range when used 
		with "stop" date.`,
		maxWidth: `250px`,
		targetSelector: "#cc-about-module-date-start",
		animateFunction: "spin",
		href: "https://djplaner.github.io/canvas-collections/reference/objects/overview/#start-date"
	},
	{
		contentText: `Representation of the date as configured by <em>Start Date</em> and possible <em>Stop Date</em>.`,
		maxWidth: `250px`,
		targetSelector: "#cc-about-module-date-calculated",
		animateFunction: "spin",
		href: "https://djplaner.github.io/canvas-collections/reference/objects/overview/#start-date"
	},
	{
		contentText: `Specify the 'stop' date in a date range. Date is relative to a specific study period.`,
		maxWidth: `250px`,
		targetSelector: "#cc-about-module-date-stop",
		animateFunction: "spin",
		href: "https://djplaner.github.io/canvas-collections/reference/objects/overview/#stop-date"
	},
	{
		contentText: `Specify a date and message describing when the module will be available.`,
		maxWidth: `250px`,
		targetSelector: "#cc-about-module-coming-soon",
		animateFunction: "spin",
		href: "https://djplaner.github.io/canvas-collections/reference/objects/overview/#coming-soon"
	},
	{
		contentText: `If and how a label specific number will be calculated for the module 
		(e.g. <em>Lecture 1</em> or <em>Workshop 5</em>)<p>Auto number or specify a value.</p>`,
		maxWidth: `250px`,
		targetSelector: "#cc-about-module-number",
		animateFunction: "spin",
		href: "https://djplaner.github.io/canvas-collections/reference/objects/overview/#labels-and-numbers"
	},
	{
		contentText: `Flexibly add, delete, and modify additional information about this module, which
		may be used by collections and representations - or for your own purposes.`,
		maxWidth: `250px`,
		targetSelector: "#cc-about-additional-metadata",
		animateFunction: "spin",
		href: "https://djplaner.github.io/canvas-collections/reference/objects/overview/#additional-metadata"
	},
	{
		contentText: `<p>Choose one of three possible banner types (for Card representations) and configure it. Options are:</p> 
		<ol>
		  <li> <strong>Image</strong> - a banner image</li>
		  <li> <strong>Colour</strong> - a solid colour</li>
		  <li> <strong>Iframe</strong> - HTML embed code (e.g. YouTube video)</li>
		  </ol>
		`,
		maxWidth: `250px`,
		targetSelector: "#cc-about-module-banner",
		animateFunction: "spin",
		href: "https://djplaner.github.io/canvas-collections/reference/objects/overview/#dates"
	},
	{
		contentText: `Specify how the image will be scaled to fit the available space`,
		maxWidth: `250px`,
		targetSelector: "#cc-about-module-image-scale",
		animateFunction: "spin",
		href: "https://djplaner.github.io/canvas-collections/reference/objects/overview/#image-scale"
	},
	{
		contentText: `Provide the URL for an image to associate with this module.`,
		maxWidth: `250px`,
		targetSelector: "#cc-about-module-image-url",
		animateFunction: "spin",
		href: "https://djplaner.github.io/canvas-collections/reference/objects/overview/#image-url"
	},
	{
		contentText: `Provide an iframe (embed HTML) to place in a card's banner section.`,
		maxWidth: `250px`,
		targetSelector: "#cc-about-module-iframe",
		animateFunction: "spin",
		href: "https://djplaner.github.io/canvas-collections/reference/objects/overview/#iframe"
	},
	{
		contentText: `Choose a colour for the background of the card's banner section.`,
		maxWidth: `250px`,
		targetSelector: "#cc-about-module-color",
		animateFunction: "spin",
		href: "https://djplaner.github.io/canvas-collections/reference/objects/overview/#iframe"
	},
	{
		contentText: `The study period automatically identified from the course site. The academic
		calendar for this study period will be used to translate "Monday Week 1" into a calendar date.`,
		maxWidth: `250px`,
		targetSelector: ".cc-about-module-studyPeriod",
		animateFunction: "spin",
		href: "https://djplaner.github.io/canvas-collections/reference/objects/overview/#study-period"
	}
];

export default class cc_ConfigurationView extends cc_View {

	/**
	 * @descr Initialise the view
	 * @param {Object} model
	 * @param {Object} controller
	 */
	constructor(model, controller) {
		super(model, controller);

		this.TOOLTIPS = CONFIG_VIEW_TOOLTIPS;
	}

	/*	addCollectionsConfigTooltips() {
			if (this.TOOLTIPS) {
				html5tooltips(this.TOOLTIPS);
			}
		} */

	/**
	 * @descr Modify the canvas page to show the cc title, switch, and drop arrow.
	 * Set up the click handlers for the switch and drop arrow.
	 */

	display() {
		DEBUG && console.log('-------------- cc_ConfigurationView.display()');

		// Add the cc configuration bundle
		this.addCcBundle();

		if (this.model.getConfigShowing()) {
			this.showConfig();
		} else {
			this.removeConfig();
		}
		// get the config show class
		const configShowClass = this.model.getConfigShowClass();
		// set i#configShowSwitch to the config show class
		const configShowSwitch = document.getElementById('configShowSwitch');
		if (configShowSwitch) {
			configShowSwitch.className = configShowClass;
		}

		// add the configuration interfaces for individual modules
		// remove all the div.cc-module-config 
		let divs = document.querySelectorAll('div.cc-module-config');
		divs.forEach((div) => {
			div.remove();
		});

		// only if ccOn show module configuration
		if (this.model.isOn()) {
			this.addModuleConfiguration();
		}

		//		this.addCollectionsConfigTooltips();
		this.addTooltips();
	}

/*	addTooltips() {
		const courseId = this.model.getCourseId();
		const configPageUrl = `https://${window.location.host}/courses/${courseId}/pages/canvas-collections-configuration`;

		// Add any local customisation to the tooltips
		let unpublished =
		{
			contentText: `The <a href="${configPageUrl}" target="_blank">
			<em>Canvas Collections Configuration</em> page</a> is unpublished. Meaning
		the live Collections view will be visible in "Student View" or for students.
		<p>Any Claytons Collections pages will be visible, if they are published.</p>
		`,
			maxWidth: `250px`,
			targetSelector: "#cc-about-unpublished",
			animateFunction: "spin",
			persistent: true,
			href: "https://djplaner.github.io/canvas-collections/reference/on-off-unpublished/"
		};

		// append unpublished onto this.TOOLTIPS
		this.TOOLTIPS.push(unpublished);

		// call the parent class method
		super.addTooltips();
	} */

	/**
	 * @descr Add the CC configuration interface to each module
	 * - source of module information
	 */

	addModuleConfiguration() {

		const moduleDetails = this.model.getModuleDetails();

		if (!moduleDetails) {
			// TODO for some reason, didn't get module details, skip
			return;
		}

		// loop through all the div.ig-header elements
		// 
		//const moduleHeaders = document.getElementsByClassName('ig-header');
		let moduleHeaders = document.querySelectorAll('div.ig-header');
		// for each
		for (let i = 0; i < moduleHeaders.length; i++) {
			const moduleHeader = moduleHeaders[i];
			// if moduleHeader does not have a numeric id, continue
			if (!moduleHeader.id.match(/^\d+$/)) {
				continue;
			}
			const id = moduleHeader.id;
			const moduleDetail = moduleDetails[id];

			if (moduleDetail === undefined) {
				continue;
			}

			this.addSingleModuleConfiguration(moduleHeader, moduleDetail, id);
		}
		this.addEventHandlers();
		this.addTooltips();
	}

	addEventHandlers() {

		// banner tabs to start with cc-banner-tab
		const bannerTabs = document.querySelectorAll(`.cc-banner-tab`);
		for (let i = 0; i < bannerTabs.length; i++) {
			const tab = bannerTabs[i];
			tab.onclick = (event) => this.controller.manageBannerTabShow(event);
			//tab.addEventListener('sl-tab-show', event => this.controller.manageBannerTabShow(event));
		}

		// event handler for sl-color-picker
		const colorPickers = document.querySelectorAll(`sl-color-picker`);
		for (let i = 0; i < colorPickers.length; i++) {
			const colorPicker = colorPickers[i];
			colorPicker.addEventListener('sl-change', event => this.controller.manageColourPickerChange(event));
		}

		// event handler for configDisplay.accordions
		const accordions = document.querySelectorAll(`sl-details`);
		for (let i = 0; i < accordions.length; i++) {
			const accordion = accordions[i];
			accordion.addEventListener('sl-show', event => this.controller.manageAccordionToggle(event));
			accordion.addEventListener('sl-hide', event => this.controller.manageAccordionToggle(event));
		}
	}



	addSingleModuleConfiguration(moduleHeader, moduleDetail, id) {
		let showConfigHtml = '';
		// does moduleDetail have property configClass
		if (!("configClass" in moduleDetail)) {
			moduleDetail.configClass = 'icon-mini-arrow-right';
		} else if (moduleDetail.configClass === 'icon-mini-arrow-down') {
			// do nothing
			showConfigHtml = this.showModuleConfig(moduleDetail);
		}

		const moduleConfig = this.model.getModuleConfiguration(moduleDetail.id);

		const moduleConfigHtml = `
<div class="cc-module-config border border-trbl" id="cc-module-config-${id}">
	<link href="//cdn.quilljs.com/1.0.0/quill.snow.css" rel="stylesheet" />
    <div class="cc-module-no-collection" id="cc-module-config-no-collection-${id}">
	    No collection allocated
	</div>
	<span>
		<i id="cc-module-config-${id}-switch" class="icon-mini-arrow-right"></i>
		Collections Module Configuration
        <sl-tooltip class="cc-about-module-configuration">
	  		<div slot="content"></div>
			<i class="icon-question cc-module-icon"></i>
		</sl-tooltip>

	</span> 
  	${showConfigHtml}
</div>`; 

		// TO DO check that the id matches on of the module ids in data structure

		// insert moduleConfigHtml afterend of moduleHeader
		moduleHeader.insertAdjacentHTML('afterend', moduleConfigHtml);

		//----------------------------
		// Now able to use JS to make various mods to the form

		// Add the image url input#cc-module-config-${moduleDetail.id}-image - need to set the value
		// to the image url
		const imageInput = document.getElementById(`cc-module-config-${moduleDetail.id}-image`);
		if (imageInput) {
			imageInput.value = moduleDetail.image;
		}
		// TODO add in the iframe value this way as well
		// add handler for iframe text area
		const iframeArea = document.querySelector(`#cc-module-config-${id}-iframe` );
		if (iframeArea) {
			iframeArea.onchange = (event) => this.controller.updateModuleConfigField(event);
			iframeArea.onkeydown = (event) => event.stopPropagation();
			// now set the value for iframe to the module's detail
			// Done here to make sure it's all encoded nicely
			if (moduleDetail.hasOwnProperty('iframe')) {
				iframeArea.value = moduleDetail.iframe;
			}
		}
		// add the label cc-module-config-${moduleDetail.id}-label"
		const labelInput = document.getElementById(`cc-module-config-${moduleDetail.id}-label`);
		if (labelInput && moduleDetail.label) {
			labelInput.value = moduleDetail.label;
		}
		// add the meta data stuff

		for (let key in moduleDetail.metadata) {
			// cc-module-config-${moduleDetail.id}-metadata-${key}-name is set to key
			// cc-module-config-${moduleDetail.id}-metadata-${key}-value is set to moduleDetail.metadata[key]
			const nameInput = document.getElementById(`cc-module-config-${moduleDetail.id}-metadata-${key}-name`);
			if (nameInput) {
				nameInput.value = key;
			}
			const valueInput = document.getElementById(`cc-module-config-${moduleDetail.id}-metadata-${key}-value`);
			if (valueInput) {
				valueInput.value = moduleDetail.metadata[key];
			}
		}


		// try to start tinymce editor on the textarea
		//tinymce.init( {selector: 'textarea'});

		// add a click handler for i#cc-module-config-${id}-switch
		const moduleConfigSwitch = document.getElementById(`cc-module-config-${id}-switch`);
		if (moduleConfigSwitch) {
			moduleConfigSwitch.onclick = (event) => this.controller.toggleModuleConfigSwitch(event);
			// and update the class appropriately
			moduleConfigSwitch.className = moduleDetail.configClass;
		}

		// set display:inline-block for div#cc-module-no-collection-${id} iff
		// module.collection is undefined or empty
		if (!moduleConfig || !moduleConfig.collection || moduleConfig.collection.length === 0) {
			const moduleNoCollection = document.getElementById(`cc-module-config-no-collection-${id}`);
			moduleNoCollection.style.display = 'inline-block';
		}

		// if our module cc config is revealed, then set up the quill editor
		if (moduleDetail.configClass === 'icon-mini-arrow-down') {
			let editor = new Quill(`#cc-module-config-${id}-description`,
				{ //modules: { toolbar: '#toolbar' },
					theme: 'snow'
				});

			// if that succeeded
			if (editor.container) {
				// set the contents
				const delta = editor.clipboard.convert(moduleConfig.description);
				editor.setContents(delta);
				// keep track of the current editor
				this.currentQuill = editor;
				this.quillChanged = false;
				// set the event handler
				const editorSelectionHandler = this.quillSelectionChange.bind(this);
				editor.on('selection-change', editorSelectionHandler);
				const editorChangeHandler = this.quillChange.bind(this);
				editor.on('text-change', editorChangeHandler);
			}
		}

		// add event handlers for additional metadata
		// button.cc-module-config-metadata-add 
		// and i.cc-module-config-metadata-trash calls model.manageModuleMetadata
		const buttonAddMetadata = document.querySelector(`button.cc-module-config-metadata-add`);
		if (buttonAddMetadata) {
			buttonAddMetadata.onclick = (event) => this.controller.manageModuleMetadata(event);
		}
		const trashMetadata = document.querySelectorAll(`i.cc-module-config-metadata-delete`);
		for (let i = 0; i < trashMetadata.length; i++) {
			const trash = trashMetadata[i];
			trash.onclick = (event) => this.controller.manageModuleMetadata(event);
		}

		// add catch all handlers for other module config elements
		const configDiv = document.querySelector(`#cc-module-config-${id}`);
		if (configDiv) {
			const configFields = configDiv.querySelectorAll('input, select');
			for (let j = 0; j < configFields.length; j++) {
				// only add this handler if id does not contain 'metadata-add-'
				if (configFields[j].id.indexOf('-metadata-add-') === -1) {
					configFields[j].onchange = (event) => this.controller.updateModuleConfigField(event);
				}
				// this to prevent some other strange behavior (introduced by Canvas?)
				configFields[j].onkeydown = (event) => event.stopPropagation();
			}
			// and also Quill, stop prop
			const quillFields = configDiv.querySelectorAll('div.ql-editor');
			for (let j = 0; j < quillFields.length; j++) {
				quillFields[j].onkeydown = (event) => event.stopPropagation();
			}
		}

	}

	/**
	 * Event handler called when Quill text is changed
	 * Just sets the quillChanged flag to true
	 * @param {*} delta 
	 * @param {*} oldDelta 
	 * @param {*} source 
	 */
	quillChange(delta, oldDelta, source) {
		this.quillChanged = true;
		const parentId = this.currentQuill.root.parentNode.id;
		// extract the id from parentId with format cc-module-config-<id>-description
		//const id = parentId.substring(parentId.indexOf('-') + 1, parentId.lastIndexOf('-'));
		const event = {
			target: {
				id: parentId,
				value: this.currentQuill.root.innerHTML
			}
		};
		this.quillChanged = false;
		// update the current collection representation
		// - first the model
		this.controller.updateModuleConfigField(event, false);
		this.controller.changeMade(true);
		// - then the view
		this.controller.parentController.updateCurrentRepresentation(true);

		/*		this.controller.updateModuleConfigField(event);
				this.currentQuill.focus(); */
	}

	/**
	 * Event handler for loss of focus on the quill edito
	 * TODO change this to an "update" description??
	 * @param {*} range 
	 * @param {*} oldRange 
	 * @param {*} source 
	 */
	quillSelectionChange(range, oldRange, source) {
		if (!range) {
			// assume user has changed focus
			if (this.currentQuill && this.quillChanged) {
				/*				if (this.currentQuill.hasFocus() ) {
									return;
								} */
				const parentId = this.currentQuill.root.parentNode.id;
				// extract the id from parentId with format cc-module-config-<id>-description
				//const id = parentId.substring(parentId.indexOf('-') + 1, parentId.lastIndexOf('-'));
				const event = {
					target: {
						id: parentId,
						value: this.currentQuill.root.innerHTML
					}
				};
				this.quillChanged = false;
				this.controller.updateModuleConfigField(event);
			}

		} else {
			console.log("user entered the editor");
		}
	}


	/**
	 * @descr Replace/update the div.cc-module-config for the given module
	 * @param {*} moduleId  - integer matching the Canvas module id
	 */

	updateSingleModuleConfig(moduleId) {
		// get the moduleDetails for the given id (if there is one)
		let moduleDetails = this.model.getModuleDetails();

		// does moduleDetails have the moduleId property
		if (!moduleDetails.hasOwnProperty(moduleId)) {
			// TODO handle the error
			return;
		}
		let singleModuleDetails = moduleDetails[moduleId];

		// get the moduleHeader element from the div.ig-header with id as moduleId
		const moduleHeader = document.getElementById(moduleId);
		if (moduleHeader) {
			// find the nextSibling of moduleHeader div.cc-module-config
			const moduleConfigDiv = document.querySelector(`#cc-module-config-${moduleId}`);
			if (moduleConfigDiv) {
				moduleConfigDiv.remove();
			}
			singleModuleDetails.configClass = 'icon-mini-arrow-down';
			this.addSingleModuleConfiguration(moduleHeader, singleModuleDetails, moduleId);
		}
	}

	/**
	 * Given an object with date information, generate two lists of HTML options representing
	 * - dayOptions
	 *   List of days of the week with any specified day selected
	 * - dayOfWeekOptions
	 *   List of week options for the current study period with any specified week selected
	 * And return an object with those attributes
	 * @param {Object} dateInfo 
	 * @returns {Object} - two attribute object (dayOfWeekOptions, weekOptions)
	 */

	calculateDayWeekOptions(dateInfo) {
		let weekOptions = '';
		let dayOfWeekOptions = '';

		let setWeek = 'Not chosen';
		if (dateInfo && dateInfo.hasOwnProperty('week')) {
			setWeek = dateInfo.week;
		}
		let setDayOfWeek = 'Not chosen';
		if (dateInfo && dateInfo.hasOwnProperty('day')) {
			setDayOfWeek = dateInfo.day;
		}

		//---------- week Options
		// current calendar located
		let calendar = this.controller.parentController.calendar;
		// weeks is an object/dict of weeks
		const periodWeeks = calendar.getWeekDetails();
		let weeks = ['Not chosen'];
		// get the keys for periodWeeks and add to weeks array
		for (const week in periodWeeks) {
			weeks.push(week);
		}

		for (let i = 0; i < weeks.length; i++) {
			let selected = '';
			const week = weeks[i];
			if (week === setWeek) {
				selected = 'selected';
			}
			let weekValue = week;
			if (week === 'Not chosen') {
				weekValue = '';
			}
			weekOptions += `<option value="${weekValue}" ${selected}>${week}</option>`;
		}

		const days = ['Not chosen', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
		for (let i = 0; i < days.length; i++) {
			let selected = '';
			const day = days[i];
			if (day === setDayOfWeek) {
				selected = 'selected';
			}
			let dayValue = day;
			if (day === 'Not chosen') {
				dayValue = '';
			}
			dayOfWeekOptions += `<option value="${dayValue}" ${selected}>${day}</option>`;
		}

		return { dayOfWeekOptions, weekOptions };
	}

	/**
	 * @function configureBanner
	 * @descr Based on moduleDetail configure how the banner information will be presented
	 * - moduleDetails.banner should be one of 'image', 'iframe', 'colour'
	 * - if not set, default to 'image'
	 * @param {Object} moduleDetail - details of module we're configuring a form for
	 * @returns {Object} - bannerActive - specifies which tabgroup will be active
	 */

	configureBanner(moduleDetail) {
		let bannerActive =
		{
			image: 'active', iframe: '', colour: ''
		};

		if (moduleDetail.hasOwnProperty('banner')) {
		 	if (['image', 'iframe', 'colour'].includes( moduleDetail.banner)) {
				bannerActive.image = '';
				bannerActive[moduleDetail.banner] = 'active';
			}
		} else {
			// setting a default value for banner
			moduleDetail.banner = 'image';
		}
		if (!moduleDetail.hasOwnProperty('bannerColour')) {
			moduleDetail.bannerColour = '#ffffff';
		}
		if (!moduleDetail.hasOwnProperty('iframe')) {
			moduleDetail.iframe = '';
		}
		return bannerActive;
	}

	/**
	 * @function configureBanner
	 * @description identify which of the start, stop and coming soon dates are
	 * active based on moduleDetail
	 * @param {Object} moduleDetail - details of module we're configuring a form for
	 * @returns {Object} - dateActive - specifies which tabgroup will be active
	 */
	configureDate(moduleDetail) {
		let dateActive = {
			start: 'active', stop: '', comingSoon: ''
		};

		if (!moduleDetail.hasOwnProperty('activeDate')) {
			moduleDetail.activeDate = 'start';
		}

		if (['start', 'stop', 'comingSoon'].includes(moduleDetail.activeDate)) {
			dateActive.start = '';
			dateActive[moduleDetail.activeDate] = 'active';
		}
		return dateActive;
	}

	/**
	 * @function configureConfigDisplay
	 * @description Examine the module details and create an object based on the contents
	 * of the configDetails attribute of moduleDetail.  Will also configure a default setting
	 * if none exists
	 *    "configDisplay" : {   // specify how the module config should be displayed
	 *          // whether the accordions are open or not
	 * 			"accordions": {
	 * 				"dates": "open",  
	 *              "banner": "",
	 *              "metadata": "" 
	 * 			},
	 *     }
	 */

	configureConfigDisplay(moduleDetail) {
		if (!moduleDetail.hasOwnProperty('configDisplay')) {
			moduleDetail.configDisplay = {
				accordions: {
					dates: '',
					banner: '',
					metadata: ''
				}
			};
		}

		return moduleDetail.configDisplay;
	}

	/**
	 * @function configureFyi
	 * @description Check the module details for
	 *    fyi: boolean - whether or not the object is a fyi only object
	 *    fyiText: string - text to display in the fyi message box
	 * If there isn't any already, set to false and empty string
	 * @param {Object} moduleDetail 
	 * @returns {Object} - { fyi: boolean, fyiText: string }
	 */

	configureFyi(moduleDetail) {
		let fyi = { fyi: false, fyiText: '' }

		// loop thru attributes of fyi object
		for (const key in fyi) {
			if (moduleDetail.hasOwnProperty(key)) {
				fyi[key] = moduleDetail[key];
			} else {
				if ( key==='fyi') {
					moduleDetail[key] = false;
				} else {
					moduleDetail[key] = '';
				}
			}
		}
		// modify the boolean fyi to be checked or not for HTML
		// add the styles for display
		if (fyi.fyi) {
			fyi.fyi = 'checked';
		} else {
			fyi.fyi = '';
			fyi.fyiStyle = 'disabled';
		}

		return fyi;
	}

	/**
	 * @descr generate the div.cc-module-config-details for the module
	 * @param {Object} moduleDetail
	 * @returns {string} html
	 */

	showModuleConfig(moduleDetail) {
		DEBUG && console.log('-------------- cc_ConfigurationView.showModuleConfig()');
		console.log(moduleDetail);

		// try and get existing Collections module configuration
		let moduleConfig = this.model.getModuleConfiguration(moduleDetail.id);
		// get the current collection
		//		const currentCollection = this.model.getCurrentCollection();

		// check for a module that hasn't been added to the collection yet
		if (!moduleConfig) {
			// if not, we want to add it
			moduleConfig = this.model.addModuleConfiguration(moduleDetail);
		}

		console.log('---- configuration');
		console.log(moduleConfig);

		const date = "";
		let comingSoonDate = "<em>No coming soon configured</em>";
		let comingSoonLabel = "";
		let comingSoonTime = "";

		let moduleCollection = "";
		if (moduleConfig.hasOwnProperty('collection') && moduleConfig.collection !== "") {
			moduleCollection = moduleConfig.collection;
		}

		// get list of collections
		const collections = this.model.getCollections();
		let selected = '';
		let collectionsOptions = '<option value="">Unallocated</option>';
		for (let i = 0; i < collections.length; i++) {
			const collection = collections[i];
			if (collection === moduleCollection) {
				selected = 'selected';
			}
			collectionsOptions += `<option value="${collection}" ${selected}>${collection}</option>`;
			selected = '';
		}
		// set the imageSizeOptions
		let imageSizeOptions = '';
		let imageSize = moduleConfig.imageSize;
		if (imageSize === "") {
			imageSize = "contain";
			moduleConfig.imageSize = imageSize;
		}
		const options = ['none', 'contain', 'cover', 'fill', 'scale-down'];
		for (let i = 0; i < options.length; i++) {
			let selected = '';
			const option = options[i];
			if (option === moduleConfig.imageSize) {
				selected = 'selected';
			}
			imageSizeOptions += `<option value="${option}" ${selected}>${option}</option>`;
		}

		// encode an iframe in moduleConfig.image
		/*		const match = moduleConfig.image.match(/<iframe.*src="(.*)".*<\/iframe>/);
				let imageUrl = moduleConfig.image;
				if (match) {
					imageUrl = this.controller.parentController.configurationStore.encodeHTML(imageUrl,false);
				} */

		// TODO need to generate the date information
		// - current kludge just handles the case when there is no date
		// - eventually will need to handle the CSS 
		// - perhaps with a date view?
		let dateInfo = {
			label: '', week: '', date: '',
			month: '', day: '', time: '',
			to: {
				week: '', date: '',
				month: '', day: '', time: '',
			}
		};
		if (moduleConfig.date) {
			// set the values for dateInfo for start date
			for (const dateField in dateInfo) {
				if (dateField !== 'to' && moduleConfig.date.hasOwnProperty(dateField)) {
					dateInfo[dateField] = moduleConfig.date[dateField];
				}
			}
			// do the same for the to date - if there is one
			if (moduleConfig.date.hasOwnProperty('to')) {
				for (const dateField in dateInfo.to) {
					if (moduleConfig.date.to.hasOwnProperty(dateField)) {
						dateInfo.to[dateField] = moduleConfig.date.to[dateField];
					}
				}
			}
		}
		/*		let weekOptions = '';
				let toWeekOptions = '';
				let comingSoonWeekOptions = '';
				let dayOfWeekOptions = '';
				let toDayOfWeekOptions = '';
				let comingSoonDayOfWeekOptions = ''; */

		const dateOptions = this.calculateDayWeekOptions(dateInfo);
		const toDateOptions = this.calculateDayWeekOptions(dateInfo.to);
		let comingSoon = null;
		if (moduleConfig.hasOwnProperty('comingSoon')) {
			comingSoon = moduleConfig.comingSoon;
		}
		const comingSoonDateOptions = this.calculateDayWeekOptions(moduleConfig.comingSoon);


		// calculate value for dateLabel
		let dateLabel = CV_DEFAULT_DATE_LABEL;
		// if moduleDetail has a date property and that has a label property change date label
		if (moduleDetail.hasOwnProperty('date') && moduleDetail.date.hasOwnProperty('label')) {
			dateLabel = moduleDetail.date.label;
		}

		// TODO need to handle both start and end
		let calculatedDate = this.calculateDate(dateInfo);
		if (dateInfo.hasOwnProperty('to')) {
			const toDate = this.calculateDate(dateInfo.to);
			if (toDate !== 'No date set' ) {
				calculatedDate += ` to ${toDate}`;
			}
		}

		// calculate the number elements for the form
		// - if no module.num then it's auto calculate
		//     - show a selected checkbox for auto  
		//     - hide the form
		// - else
		//     - grey out the unselected auto checkbox
		//     - display the form
		let autonumStyle = "";
		let autonumChecked = "";
		let numStyle = "";
		let numValue = "";

		if (!moduleConfig.hasOwnProperty('num')) {
			// no num, so we're doing auto calculate
			autonumChecked = "checked";
			numStyle = "disabled";
		} else {
			autonumStyle = "color:grey;";
			numValue = moduleConfig.num;
		}

		const currentStudyPeriod = this.model.getStudyPeriod();

		/*		let label = "";
				if (moduleConfig.hasOwnProperty('label')) {
					label = moduleConfig.label;
					// quote any " in the label
					label = label.replaceAll(/"/g, '&quot;');
				} */


		let fyi = this.configureFyi(moduleDetail);
		let bannerActive = this.configureBanner(moduleDetail);
		let dateActive = this.configureDate(moduleDetail);
		let configDisplay = this.configureConfigDisplay(moduleDetail);

		// this has to go last before the HTML to ensure all the setup is done
		const additionalMetaDataHTML = this.getAdditionalMetaDataHTML(moduleDetail);

		let showConfigHtml = `
		<style>
		   .cc-module-config-collection-representation label {
			   width: 5rem;
			   font-size: 0.8rem;
			   /*font-weight: bold; */
		   }
		   .cc-module-config-collection-representation input {
			   font-size: 0.8rem;
		   }
		   .cc-module-config-detail {
			   padding: 0.5rem;
		   }
		   .cc-preview-container {
			   display:flex;
			   flex-wrap: wrap;
			   width: 100%;
		   }

		   .cc-module-icon{
			position:relative;
			top:-0.2rem;
		   }

		   .cc-preview-container .cc-card {
			   min-width: 50%;
		   }

		   .cc-calculated-date {
			   font-size: 0.8rem;
			   background-color: #eee;
			   padding: 0.5em
			   margin-left: 3rem;
			   margin-top: 0.5rem
		   }
		
		   .cc-current-studyPeriod {
			   font-size: 0.7rem;
			   display: inline;
			   margin-left: 2rem;
		   }

		   sl-tab {
			   font-size: var(--sl-font-size-small);
		   }
		</style>

		<div class="cc-module-config-detail">
			<div>
<!--			  <sl-details open>
			    <div slot="summary">
				  <a id="cc-about-basic-configuration" target="_blank" href=""><i class="icon-question cc-module-icon"></i></a>
				  <strong>Basic configuration</strong>
				</div> -->
				<div class="cc-module-config-collection-representation">
			        <sl-tooltip id="cc-about-module-collection">
					  	<div slot="content"></div>
						<i class="icon-question cc-module-icon"></i>
					</sl-tooltip>
					<label for="cc-module-config-${moduleDetail.id}-collection">Collection
					</label>
					<select id="cc-module-config-${moduleDetail.id}-collection">
					  ${collectionsOptions}
					</select>
				</div>
				<div class="cc-collection-description" style="margin-top: 0.5em">
			        <sl-tooltip id="cc-about-module-fyi">
					  	<div slot="content"></div>
						<a target="_blank" href=""><i class="icon-question cc-module-icon"></i></a>
					</sl-tooltip>
				    <label for="cc-module-config-${moduleDetail.id}-fyi">FYI</label>
					<span class="cc-config-autonum" >
				   		<input type="checkbox" id="cc-module-config-${moduleDetail.id}-fyi" ${fyi.fyi} 
						    style="position:relative; top:-0.25rem; " />
						</span>
						<label for="cc-module-config-${moduleDetail.id}-fyi-text">FYI text</label>
						<input type="text" id="cc-module-config-${moduleDetail.id}-fyi-text"" 
					     	value="${fyi.fyiText}" style="width:10rem;" ${fyi.fyiStyle}/>
					</span>
				</div>

				<div class="cc-collection-description" style="margin-top: 1em">
			        <sl-tooltip id="cc-about-module-description">
					  	<div slot="content"></div>
						<a target="_blank" href=""><i class="icon-question cc-module-icon"></i></a>
					</sl-tooltip>
				    <label for="cc-module-config-${moduleDetail.id}-description">Description</label>
					<div id="cc-module-config-${moduleDetail.id}-description" class="cc-module-config-description" style="height:8rem"> </div>
				</div>

				<div class="cc-module-config-collection-representation" style="margin-top:0.5rem">
				        <sl-tooltip id="cc-about-module-label">
						  	<div slot="content"></div>
						  	<a target="_blank" href="">
						   	<i class="icon-question cc-module-icon"></i></a>
						</sl-tooltip>
				    	<label for="cc-module-config-${moduleDetail.id}-label">Label
						</label> 
						<input type="text" id="cc-module-config-${moduleDetail.id}-label"
					    	style="width:10rem" value="" />
				</div>
				<div class="cc-module-config-collection-representation" style="margin-top:0.5rem">
				        <sl-tooltip id="cc-about-module-number">
					  		<div slot="content"></div>
							<a target="_blank" href=""><i class="icon-question cc-module-icon"></i></a>
						</sl-tooltip>
				    	<label for="cc-module-config-${moduleDetail.id}-num">Number</label>
						<span class="cc-config-autonum" style="${autonumStyle}">auto:
					   		<input type="checkbox" id="cc-module-config-${moduleDetail.id}-autonum" ${autonumChecked} 
							    style="position:relative; top:-0.25rem; ${autonumStyle}" />
						</span>
						<input type="text" id="cc-module-config-${moduleDetail.id}-num" 
					     	value="${numValue}" style="width:3rem;" ${numStyle}/>
				</div>

<!--			</sl-details> -->

			</div> 

			<div style="margin-right:1em">
				<sl-details ${configDisplay.accordions.dates} id="cc-module-config-${moduleDetail.id}-dates-accordion">  <!-- dates accordion -->
		   		<div slot="summary">
			        <sl-tooltip id="cc-about-module-dates">
					  	<div slot="content"></div>
						<a target="_blank" href=""><i class="icon-question cc-module-icon"></i></a>
					</sl-tooltip>
		    		<strong>Dates</strong>
					<div class="cc-current-studyPeriod">
			        	<sl-tooltip class="cc-about-module-studyPeriod">
					  		<div slot="content"></div>
							<a target="_blank" href=""><i class="icon-question cc-module-icon"></i></a>
						</sl-tooltip>
		   				<strong>Study Period</strong> ${currentStudyPeriod}
					</div>
			  	</div>
				<sl-tab-group>
			  		<sl-tab ${dateActive.start} slot="nav" panel="cc-module-config-${moduleDetail.id}-date-start">Start Date</sl-tab>
				  		<sl-tab ${dateActive.stop} slot="nav" panel="cc-module-config-${moduleDetail.id}-date-stop">Stop Date</sl-tab>
				  		<!-- sl-tab ${dateActive.comingSoon} slot="nav" panel="cc-module-config-${moduleDetail.id}-coming-soon">Coming Soon</sl-tab -->

 			      		<sl-tab-panel name="cc-module-config-${moduleDetail.id}-date-start">
		   					<div id="cc-module-config-${moduleDetail.id}-date-start">
			        			<sl-tooltip id="cc-about-module-date-start">
					  				<div slot="content"></div>
									<a target="_blank" href=""><i class="icon-question cc-module-icon"></i></a>
								</sl-tooltip> About start date
					    		<div>
									<div class="cc-calculated-date">
			        					<sl-tooltip id="cc-about-module-date-calculated">
					  						<div slot="content"></div>
											<i class="icon-question cc-module-icon"></i>
										</sl-tooltip>
										${calculatedDate}
									</div>
									<div class="cc-module-config-collection-representation" style="padding-top:1rem; padding-left:3rem">
				    					<label for="cc-module-config-${moduleDetail.id}-date-label">Date label</label>
										<input type="text" id="cc-module-config-${moduleDetail.id}-date-label"
						   					style="width:10rem" value="${dateLabel}" /><br />
				    					<label for="cc-module-config-${moduleDetail.id}-day">Day of week</label>
										<select id="cc-module-config-${moduleDetail.id}-day">
		                  					${dateOptions.dayOfWeekOptions}
										</select> <br />
										<label for="cc-module-config-${moduleDetail.id}-week">Week</label>
										<select id="cc-module-config-${moduleDetail.id}-week">
		   		           					${dateOptions.weekOptions}}	
										</select> <br />
										<label for="cc-module-config-${moduleDetail.id}-time">Time</label>
										<style>
					   						input[readonly] {
												display:none;
					   						}
					   					</style>
										<aeon-datepicker local="en-au">
										<input type="time" id="cc-module-config-${moduleDetail.id}-time" name="time" value="${dateInfo.time}" />
										</aeon-datepicker>
									</div>
									<br clear="all" />
								</div>
							</div>
						</sl-tab-panel>
				    	<sl-tab-panel name="cc-module-config-${moduleDetail.id}-date-stop">
		   			  		<div id="cc-module-config-${moduleDetail.id}-date-stop">
			        			<sl-tooltip id="cc-about-module-date-stop">
					  				<div slot="content"></div>
									<a target="_blank" href=""><i class="icon-question cc-module-icon"></i></a>
								</sl-tooltip> About stop date
					    		<div>
									<div class="cc-calculated-date">
			        					<sl-tooltip id="cc-about-module-date-calculated">
					  						<div slot="content"></div>
											<i class="icon-question cc-module-icon"></i>
										</sl-tooltip>
										${calculatedDate}
									</div>

									<div class="cc-module-config-collection-representation" style="padding-top:1rem; padding-left:3rem">
				    					<label for="cc-module-config-${moduleDetail.id}-day-to">Day of week</label>
										<select id="cc-module-config-${moduleDetail.id}-day-to">
		                  					${toDateOptions.dayOfWeekOptions}
										</select> <br />
										<label for="cc-module-config-${moduleDetail.id}-week-to">Week</label>
										<select id="cc-module-config-${moduleDetail.id}-week-to">
		   		           					${toDateOptions.weekOptions}}	
										</select> <br />
										<label for="cc-module-config-${moduleDetail.id}-time-to">Time</label>
										<style>
					   						input[readonly] {
												display:none;
					   						}
					  					</style>
										<aeon-datepicker local="en-au">
											<input type="time" id="cc-module-config-${moduleDetail.id}-time-to" name="time" value="${dateInfo.to.time}" />
										</aeon-datepicker>
									</div>
									<br clear="all" />
								</div>
							</div>
						</sl-tab-panel>
				    	<!--
						<sl-tab-panel name="cc-module-config-${moduleDetail.id}-coming-soon">
		   					<div id="cc-module-config-${moduleDetail.id}-coming-soon">
					    		<div>
									<div class="cc-calculated-date">${comingSoonDate}</div>
									<div class="cc-module-config-collection-representation" style="padding-top:1rem; padding-left:3rem">
				    					<label for="cc-module-config-${moduleDetail.id}-coming-soon-label">Label</label>
										<input type="text" id="cc-module-config-${moduleDetail.id}-coming-soon-label"
						   					style="width:10rem" value="${comingSoonLabel}" /><br />
				    					<label for="cc-module-config-${moduleDetail.id}-coming-soon-day">Day of week</label>
										<select id="cc-module-config-${moduleDetail.id}-coming-soon-day">
		                  					${comingSoonDateOptions.dayOfWeekOptions}
										</select> <br />
										<label for="cc-module-config-${moduleDetail.id}-coming-soon-week">Week</label>
										<select id="cc-module-config-${moduleDetail.id}-coming-soon-week">
		   		           					${comingSoonDateOptions.weekOptions}}	
										</select> <br />
										<label for="cc-module-config-${moduleDetail.id}-coming-soon-time">Time</label>
										<style>
					   						input[readonly] {
												display:none;
					   						}
					   					</style>
										<aeon-datepicker local="en-au">
											<input type="time" id="cc-module-config-${moduleDetail.id}-coming-soon-time" name="time" value="${comingSoonTime}" />
										</aeon-datepicker>
									</div>
									<br clear="all" />
								</div>
							</div>
						</sl-tab-panel>
						-->
					</sl-tab-group>
				</sl-details>

			    <sl-details ${moduleDetail.configDisplay.accordions.banner} id="cc-module-config-${moduleDetail.id}-banner-accordion">
				  <div slot="summary">
  			        <sl-tooltip id="cc-about-module-banner">
					  	<div slot="content"></div>
						<a target="_blank" href=""><i class="icon-question cc-module-icon"></i></a>
					</sl-tooltip>
				  	<strong>Banner</strong>
				</div>
					<sl-tab-group>
				  		<sl-tab class="cc-banner-tab" ${bannerActive.image} slot="nav" panel="cc-module-config-${moduleDetail.id}-image">Image</sl-tab>
				  		<sl-tab class="cc-banner-tab" ${bannerActive.iframe} slot="nav" panel="cc-module-config-${moduleDetail.id}-iframe">Iframe</sl-tab>
				  		<sl-tab class="cc-banner-tab" ${bannerActive.colour} slot="nav" panel="cc-module-config-${moduleDetail.id}-colour">Colour</sl-tab>


 			      		<sl-tab-panel name="cc-module-config-${moduleDetail.id}-image">
							<div class="cc-module-config-collection-representation"
							     style="padding-left: 0.5rem;">
						        <sl-tooltip id="cc-about-module-image-scale">
					  				<div slot="content"></div>
									<a target="_blank" href=""><i class="icon-question cc-module-icon"></i></a>
								</sl-tooltip>
								<label for="cc-collection-representation-${moduleDetail.id}-imageSize"
					     			style="float:left;padding-top:0.8rem;"> Image scale </label>
		   		       			<select id="cc-module-config-${moduleDetail.id}-imageSize">
					      			${imageSizeOptions}
								</select>
								<br clear="all" />
						        <sl-tooltip id="cc-about-module-image-url">
					  				<div slot="content"></div>
									<a target="_blank" href=""><i class="icon-question cc-module-icon"></i></a>
								</sl-tooltip>
								<label for="cc-module-config-collection-representation-${moduleDetail.id}-image"     
					    			style="float:left;padding-top:0.8rem"> Image URL
								</label>
								<input type="text" id="cc-module-config-${moduleDetail.id}-image" 
					        		value="">
								<br clear="all" />
							</div>

						</sl-tab-panel>

 			      		<sl-tab-panel name="cc-module-config-${moduleDetail.id}-iframe">
							<div class="cc-module-config-collection-representation">
						        <sl-tooltip id="cc-about-module-iframe">
					  				<div slot="content"></div>
									<a target="_blank" href=""><i class="icon-question cc-module-icon"></i></a>
								</sl-tooltip>
								<label for="cc-collection-representation-${moduleDetail.id}-iframe"
					     			style="padding-top:0.8rem;"> iframe </label>
		   		       			<textarea id="cc-module-config-${moduleDetail.id}-iframe"></textarea>
								<br clear="all" />
							</div>

						</sl-tab-panel>

 			      		<sl-tab-panel name="cc-module-config-${moduleDetail.id}-colour">
							<div class="cc-module-config-collection-representation">
						        <sl-tooltip id="cc-about-module-color">
					  				<div slot="content"></div>
									<a target="_blank" href=""><i class="icon-question cc-module-icon"></i></a>
								</sl-tooltip>
								<label for="cc-collection-representation-${moduleDetail.id}-color"
					     			style="padding-top:0.8rem;"> colour </label>
						  		<sl-color-picker 
								    id="cc-module-config-${moduleDetail.id}-color"
									value="${moduleDetail.bannerColour}"
								    label="Select a color">
								</sl-color-picker>
								<br clear="all" />
							</div>
						</sl-tab-panel>
					<sl-tab-group>
				</sl-details>

				${additionalMetaDataHTML}
				<div class="cc-module-config-imagePreview">
							 
				  </div>
				</div>
		    </div>
		</div>	
		`;

		// TODO
		// - display:none cc-module-config-image if there is no image
		// - set the options for select#cc-module-config-${moduleDetail.id}-collection
		// - set onClick for select#cc-module-config-${moduleDetail.id}-collection
		// - set the options for select#cc-module-config-${moduleDetail.id}-imageSize
		// - set onClick for select#cc-module-config-${moduleDetail.id}-imageSize
		// - all the other event handlers

		return showConfigHtml;
	}

	/**
	 * Given details of a module generate the HTML for a form to manage additional metadata
	 * - bordered div with title "Additional metadata"
	 * - followed by a table with the meta data
	 * - each row has three columns: name, value, action
	 * - at least one row for "add new metadata"
	 * - one each for every entry in module that isn't a standard one
	 * @param {Object} module 
	 * @returns {String} HTML for the module configuration form for managing additional meta data
	 */
	getAdditionalMetaDataHTML(module) {

		let additionalMetaDataHTML = `
	<sl-details ${module.configDisplay.accordions.metadata} id="cc-module-config-${module.id}-metadata-accordion">
	   <div slot="summary">
	         <sl-tooltip id="cc-about-additional-metadata">
  				<div slot="content"></div>
				<a target="_blank" href=""><i class="icon-question cc-module-icon"></i></a>
			</sl-tooltip>
						
	     	<strong>Additional metadata</strong>
		</div>
		<div class="cc-module-config-additional-metadata border border-trbl">
			<table>
			  <thead>
				<tr>
					<th>Name</th>
					<th>Value</th>
					<th>Action</th>
				</tr>
			  </thead>
			  <tbody>
				<tr>
					<td><input type="text" id="cc-module-config-${module.id}-metadata-add-name"></td>
					<td><input type="text" id="cc-module-config-${module.id}-metadata-add-value"></td>
					<td><button id="cc-module-config-${module.id}-metadata-add"
					    class="cc-module-config-metadata-add">Add</button></td>
				</tr>

		`;

		// add rows for existing metadata, if any
		// - stored in dictionary module.metadata
		// - loop through keys
		// - add a row for each key
		// - add a button to delete the row
		for (let key in module.metadata) {
			additionalMetaDataHTML += `
				<tr>
					<td>
						<input type="text" id="cc-module-config-${module.id}-metadata-${key}-name"
							value="" pattern="[^\"]"/>
					</td>
					<td>
						<input type="text" id="cc-module-config-${module.id}-metadata-${key}-value"
							value="" />
					</td>
					<td>
						<i class="icon-trash cc-module-config-metadata-delete" 
							id="cc-module-config-${module.id}-metadata-${key}-delete"></i>
					</td>
				</tr>
			`;
		}


		additionalMetaDataHTML += `
		      </tbody>
			</table>
		</div>
	</sl-details>
		`;

		return additionalMetaDataHTML;
	}

	/**
	 * Return a string containing HTML <options> capturing the currently
	 * availableRepresentations
	 * @param {String} currentRepresentation - name of a representation to be set to selected
	 * @return {String} - HTML <options> of all available representations
	 */
	getAvailableRepresentations(currentRepresentation = null) {

		// set the available repseentation drop box
		let availableRepresentations = '';
		for (let i = 0; i < this.model.availableRepresentations.length; i++) {
			if (this.model.availableRepresentations[i] === currentRepresentation) {
				availableRepresentations += `<option value="${this.model.availableRepresentations[i]}" selected>${this.model.availableRepresentations[i]}</option>`;
			} else {
				availableRepresentations += `<option value="${this.model.availableRepresentations[i]}">${this.model.availableRepresentations[i]}</option>`;
			}
		}
		return availableRepresentations;
	}

	/**
	 * @descr Add the div#cc-config to the end of div.ic-app-nav-toggle-and-crumbs
	 * Config should allow for
	 * - Choosing default initial collection
	 * - adding or removing collections from the list
	 * - the order of collections
	 * - choosing the representation for collections
	 * - whether to include the "All" and "None" collections?
	 */
	showConfig() {

		// always remove before showing, just in case?
		this.removeConfig();

		const configDivHtml = `
		<div id="cc-config-wrapper">
		<style>
		    #cc-config-wrapper {
				display: block;
				border-bottom: 1px solid #c7cdd1
			}

			#cc-config {
				float: right;
				display: block;
				max-width: 50%;
				margin-top: -1em;
				margin-right: 10em;
				margin-bottom: 1em;
				padding-bottom: 0.5em;
				background-color: #f5f5f5;
			}

			.cc-box-header {
				padding-left: 0.5em;
			}

			.cc-box-header p {
				font-size: 1.1em;
				font-weight: bold;
			}

			.cc-box-body {
				width: 35em; 
				padding-left: 0.5em;
				padding-right: 0.5em;
				padding-bottom: 1.em;
			}

			#cc-config-body {  display: grid; 
				grid-template-columns: 1fr 1fr; 
				grid-template-rows: 1fr; 
				gap: 0px 1em; 
				grid-auto-flow: row; 
				grid-template-areas: ". .";
				height: 100%;
			}

			#cc-config-body p {
				font-size: 0.9em;
				/*font-weight: bold; */
			}

			#cc-config-new-collection {
			}

			#cc-config-new-collection-button, #cc-config-update-full-claytons {
				left: 50%;
				transform: translateX(-50%);
				font-size: 0.8em;
			}

			.cc-existing-collection {
				font-size: 0.8em;
				font-weight: normal;
				padding-left: 0.5em;
			}

			.cc-existing-collection label {
				font-size: 0.8em;
			}

			.cc-existing-collection select {
				font-size: 0.8em;
				width: 7rem;
				height: 2rem;
			}

			.cc-existing-collection p {
				margin-top: 0.2em;
				margin-bottom: 0.2em;
			}

			.cc-existing-collection i {
				cursor: pointer;
			}

			.cc-output-page-not-exists { 
				display: none ! important;
			}
 
			.cc-output-page-update {
				font-size: 0.8rem;
			}

			.cc-output-page-update-button, .cc-apply-module-labels-update-button {
				font-size: 0.8rem;
				padding: 0.2rem;
			}

			.cc-config-error {
				background-color:red;
				color:white;
				padding:0.5em;
				font-size:0.8em;
				margin:0.5em;
			}
		
			.cc-config-collection {
				padding-top: 0.5em;
				padding-left: 0.5em;
			}

			.cc-config-collection label {
				font-size: 0.8em;
			}

			.cc-config-collection input {
				font-size: 0.8em;
			}

			.cc-config-collection button {
				font-size: 0.8em;
				padding: 0.5em 1em;
			}
			.cc-config-collection select {
				font-size: 0.8em;
				width: 7rem;
				height: 2rem;
			}

			.cc-move-collection {
				cursor: pointer;
			}

			.cc-collection-representation {
				display: flex;
				align-items: center;
				justify-content: space-around;
			}

			.cc-version {
				font-size: 50%;
				font-weight: normal;
			}

			input.cc-existing-collection {
				width: 10rem;
				margin: 0.1rem;
			}

			</style>

<div id="cc-config">
 	<div class="cc-box-header">
	  	<p>
	  		Configure Canvas Collections <span class="cc-version">(v${CC_VERSION})</span>
		</p>
	</div>
    <div class="cc-box-body">
	  	<div id="cc-config-body">
	    	<div id="cc-config-existing-collections">
	        	<sl-tooltip id="cc-about-existing-collections">
		  			<div slot="content"></div>
					<a target="_blank" href=""><i class="icon-question cc-module-icon"></i></a>
				</sl-tooltip>
				<strong>Existing collections</strong>
			</div>
			<div id="cc-config-new-collection">
	        	<sl-tooltip id="cc-about-new-collection">
		  			<div slot="content"></div>
					<a target="_blank" href=""><i class="icon-question cc-module-icon"></i></a>
				</sl-tooltip>
				<strong>Add a new collection</strong>
				<div class="cc-config-collection border border-trbl">
			  		<div class="ic-Form-control" style="margin-bottom: 0px">
			  	  		<input type="text" id="cc-config-new-collection-name" placeholder="Name for new collection">
			  		</div>

			  		<div class="cc-collection-representation">
  			        	<sl-tooltip id="cc-about-collection-representation">
		  					<div slot="content"></div>
							<a href="" target="_blank"><i class="icon-question cc-module-icon"></i></a>
						</sl-tooltip>

				  		<label for="cc-config-new-collection-representation">Representation</label>
				  		<select id="cc-config-new-collection-representation">
				    		${this.getAvailableRepresentations()}
				  		</select>
			  		</div>

			  		<fieldset class="ic-Fieldset ic-Fieldset--radio-checkbox">
				  		<button class="btn btn-primary" id="cc-config-new-collection-button">Add</button>
			  		</fieldset>
		  		</div>
		  		<div style="margin-top:0.5em">
		    		<div>
		        		<sl-tooltip id="cc-about-full-claytons">
		  					<div slot="content"></div>
							<a target="_blank" href=""><i class="icon-question cc-module-icon"></i></a>
						</sl-tooltip>
						<strong>Full "Claytons"</strong>
					</div>
					<div class="border border-trbl" style="padding:0.5em">
 			        	<sl-tooltip id="cc-about-full-claytons-navigation-option">
		  					<div slot="content"></div>
							<a target="_blank" href=""><i class="icon-question cc-module-icon"></i></a>
						</sl-tooltip>
			  			<label for="cc-config-full-claytons-navigation-option">Navigation Bar Options</label>
			  			<sl-radio-group id="cc-config-full-claytons-navigation-option" value="1">
			    			<sl-radio-button value="1">None</sl-radio-button>
							<sl-radio-button value="2">Pages</sl-radio-button>
							<sl-radio-button value="3">Tabs</sl-radio-button>
			  			</sl-radio-group>
						<div style="margin-top: 0.5rem">
			  				<fieldset class="ic-Fieldset ic-Fieldset--radio-checkbox">
				  				<button class="btn btn-primary" id="cc-config-update-full-claytons">Update</button>
			  				</fieldset>
		    			</div> 
		  			</div>
		  		</div>
			</div>
	  	</div>
	</div>
</div>
		`;

		// remove the border at the bottom of Canvas top nav bar
		const toggleAndCrumbs = document.getElementsByClassName('ic-app-nav-toggle-and-crumbs')[0];
		if (toggleAndCrumbs) {
			// change toggleAndCrumbs border-bottom style to none
			toggleAndCrumbs.style.borderBottom = 'none';
			toggleAndCrumbs.insertAdjacentHTML('afterEnd', configDivHtml);
		}
		// remove the bottom border from div.cc-switch-container
		const ccSwitchContainer = document.getElementsByClassName('cc-switch-container')[0];
		if (ccSwitchContainer) {
			ccSwitchContainer.style.borderBottom = 'none';
		}

		// add in the details of the existing collections
		this.showExistingCollections();

	}

	/**
	 * @descr existing collections are already showing, but user has asked to move on
	 * - remove all the existing #cc-config-existing-collections > div.cc-existing-collection
	 * - call showExistingCollections() to re-add them
	 */

	updateExistingCollections() {
		// find all existing #cc-config-existing-collections > div.cc-existing-Collection
		const existingCollections = document.querySelectorAll('#cc-config-existing-collections > div.cc-existing-collection');
		// remove them
		for (let i = 0; i < existingCollections.length; i++) {
			existingCollections[i].remove();
		}
		this.showExistingCollections();
	}

	/**
	 * @descr Fill div#cc-config-existing-collections with a div.cc-existing-collection for each
	 * of the existing collections
	 */
	showExistingCollections() {
		DEBUG && console.log('cc_configugurationView::showExistingCollections()');
		const existingCollectionNames = this.model.getExistingCollectionNames();

		DEBUG && console.log(existingCollectionNames);

		// get div#cc-config-existing-collections
		const existingCollectionsDiv = document.getElementById('cc-config-existing-collections');

		const numCollections = existingCollectionNames.length;
		let count = 0;
		const defaultCollection = this.model.getDefaultCollection();

		// for each collection add a div.cc-existing-collection
		existingCollectionNames.forEach(collectionName => {
			const moduleCount = this.model.getModuleCount(collectionName);
			const moduleName = `module${moduleCount !== 1 ? 's' : ''}`;
			// get the <option> elements for all the representations
			// with the current collection's representation selected
			const availableRepresentations = this.getAvailableRepresentations(
				this.model.getCollectionRepresentation(collectionName)
			);
			// TODO set these to collection values
			let includePage = this.model.getCollectionAttribute(collectionName, "includePage");
			if (!includePage) {
				includePage = "";
			}
			let outputPage = this.model.getCollectionAttribute(collectionName, "outputPage");
			let outputPageExists = "cc-output-page-not-exists";
			if (!outputPage) {
				outputPage = "";
			}
			if (outputPage !== "") {
				outputPageExists = "cc-output-page-exists";
			}
			const divExistingCollection = `
			<div class="cc-existing-collection border border-trbl" id="cc-collection-${collectionName}">
				<p>${collectionName} - (${moduleCount} ${moduleName})
				<span class="cc-collection-move">
				<i class="icon-arrow-up cc-move-collection" id="cc-collection-${collectionName}-up"></i>
				<i class="icon-arrow-down cc-move-collection" id="cc-collection-${collectionName}-down"></i>
				</span>
				<span class="cc-collection-delete">
				<i class="icon-trash cc-delete-collection" id="cc-collection-${collectionName}-delete"></i>
				</span>
				</p>

				<div class="cc-collection-representation">
					<label for="cc-collection-${collectionName}-representation">Representation</label>
				 	<select id="cc-collection-${collectionName}-representation"
					    class="cc-collection-representation">
					  ${availableRepresentations}
					</select>
				</div>
				<div class="cc-collection-representation">
				<!-- put the options -->
				<fieldset class="ic-Fieldset ic-Fieldset--radio-checkbox" style="margin-bottom:0.5em">
					<div class="ic-Checkbox-group">
						<div>
					        <sl-tooltip id="cc-about-default-collection">
		  						<div slot="content"></div>
								<i class="icon-question cc-module-icon"></i>
							</sl-tooltip>

							<input type="checkbox" id="cc-config-collection-${collectionName}-default"
							    class="cc-config-collection-default">
							<label for="cc-config-collection-${collectionName}-default">
								Default collection?
							</label>
						</div>
						<!-- <div class="ic-Form-control ic-Form-control--checkbox"> -->
						<div>
					        <sl-tooltip class="cc-about-hide-collection">
		  						<div slot="content"></div>
								<a target="_blank" href=""><i class="icon-question cc-module-icon"></i></a>
							</sl-tooltip>
							<input type="checkbox" id="cc-config-collection-${collectionName}-hide"
							    class="cc-config-collection-hide">
							<label for="cc-config-collection-${collectionName}-hide">
								Hide collection?
							</label>
						</div>
					</div>
				</fieldset>
				</div>

				<div>
			        <sl-tooltip id="cc-about-include-page">
		  				<div slot="content"></div>
						<a target="_blank" href=""><i class="icon-question cc-module-icon"></i></a>
					</sl-tooltip>
				  	Include page
				  	<div style="padding-left:0.5em">
				 		<input id="cc-collection-${collectionName}-include-page" 
					     value="${includePage}" class="cc-existing-collection" />
				        <sl-tooltip class="cc-about-include-after">
	  						<div slot="content"></div>
								<i class="icon-question cc-module-icon"></i>
							</sl-tooltip>
							<input type="checkbox" id="cc-config-collection-${collectionName}-include-after"
							    class="cc-config-collection-include-after">
							<label for="cc-config-collection-${collectionName}-include-after">
								After?
							</label>
				  	</div>
				</div>
				<!-- output page -->
				<div style="margin-top:0.5em">
			        <sl-tooltip class="cc-about-update-output-page">
		  				<div slot="content"></div>
						<a target="_blank" href=""><i class="icon-question cc-module-icon"></i></a>
					</sl-tooltip>
				  	Output page
				  	<div class="cc-collection-representation">
<!--					<label for="cc-collection-${collectionName}-output-page">Name</label> -->
				 		<input id="cc-collection-${collectionName}-output-page" 
					      value="${outputPage}" class="cc-existing-collection" />
				  		<span class="cc-collection-representation cc-output-page-update ${outputPageExists}">
							<button id="cc-collection-${collectionName}-output-page-update"
					      		class="btn cc-output-page-update-button">Update</button>
				  		</span>
					</div>
  			    	<div style="display:flex;margin-top:1em;margin-bottom:0.5em">
				  		<div style="margin-right:0.5em">
					        <sl-tooltip class="cc-about-apply-module-labels">
		  						<div slot="content"></div>
								<a target="_blank" href=""><i class="icon-question cc-module-icon"></i></a>
							</sl-tooltip>
				  			🧪Apply module labels ☠️
						</div>
						<button id="cc-collection-${collectionName}-apply-module-labels"
					      class="btn cc-apply-module-labels-update-button">Apply</button>
					</div>
				</div>
			`;


			// add the div.cc-existing-collection to div#cc-config-existing-collections
			existingCollectionsDiv.insertAdjacentHTML('beforeEnd', divExistingCollection);

			// set input#cc-config-collection-${collectionName}-default to checked
			if (defaultCollection === collectionName) {
				const defaultCheckbox = document.getElementById(`cc-config-collection-${collectionName}-default`);
				if (defaultCheckbox) {
					defaultCheckbox.checked = true;
				}
				// disable the collections hide checkbox
				const hideCheckbox = document.getElementById(`cc-config-collection-${collectionName}-hide`);
				if (hideCheckbox) {
					hideCheckbox.disabled = true;
				}
			}
			// TODO set input#cc-config-collection-${collectionName}-hide to checked
			// if the collection is hidden
			const hidden = this.model.getCollectionAttribute(collectionName, "hide");
			const hideCheckbox = document.getElementById(`cc-config-collection-${collectionName}-hide`);
			if (hideCheckbox) {
				if (hidden) {
					hideCheckbox.checked = true;
				} else {
					hideCheckbox.checked = false;
				}
			}

			const includeAfter = this.model.getCollectionAttribute(collectionName, "includeAfter");
			const includeAfterCheckbox = document.getElementById(`cc-config-collection-${collectionName}-include-after`);
			if (includeAfterCheckbox) {
				if (includeAfter) {
					includeAfterCheckbox.checked = true;
				} else {
					includeAfterCheckbox.checked = false;
				}
			}

			// select the right representation
			const representation = this.model.getCollectionRepresentation(collectionName);
			// set option#cc-collection-${collectionName}-representation-${representation} to selected
			const representationOption = document.getElementById(`cc-collection-${collectionName}-representation-${representation}`);
			if (representationOption) {
				representationOption.selected = true;
			}

			// if we're the first collection, remove i#cc-collection-${collectionName}-up
			if (count === 0) {
				const upButton = document.getElementById(`cc-collection-${collectionName}-up`);
				if (upButton) {
					upButton.remove();
				}
			} else if (count === numCollections - 1) {
				// if we're the last collection, remove i#cc-collection-${collectionName}-down
				const downButton = document.getElementById(`cc-collection-${collectionName}-down`);
				if (downButton) {
					downButton.remove();
				}
			}
			count += 1;
		});

		// add event handler to all the i.cc-move-collection 
		const moveIcons = document.querySelectorAll('.cc-move-collection');
		moveIcons.forEach(icon => {
			icon.onclick = (event) => this.controller.moveCollection(event);
		});
		// add event handler to all the i.cc-delete-collection
		const deleteIcons = document.querySelectorAll('.cc-delete-collection');
		deleteIcons.forEach(icon => {
			icon.onclick = (event) => this.controller.deleteCollection(event);
		});
		// add event handler for select.cc-collection-representation
		const representations = document.querySelectorAll('select.cc-collection-representation');
		representations.forEach(representation => {
			representation.onchange = (event) => this.controller.changeCollectionRepresentation(event);
		});
		// add event handler for adding a new collection button#cc-config-new-collection-button
		const newCollectionButton = document.querySelector('button#cc-config-new-collection-button');
		if (newCollectionButton) {
			newCollectionButton.onclick = (event) => this.controller.addNewCollection(event);
		}
		// add event handler for adding a new collection button#cc-config-update-full-claytons
		const fullClaytonsButton = document.querySelector('button#cc-config-update-full-claytons');
		if (fullClaytonsButton) {
			fullClaytonsButton.onclick = (event) => this.controller.updateFullClaytons(event);
		}

		// add event handler for cc-config-collection-default selection
		const defaultCheckboxes = document.querySelectorAll('input.cc-config-collection-default');
		defaultCheckboxes.forEach(checkbox => {
			checkbox.onchange = (event) => this.controller.changeDefaultCollection(event);
		});
		// add event handler for cc-config-collection-hide selection
		const hideCheckboxes = document.querySelectorAll('input.cc-config-collection-hide');
		hideCheckboxes.forEach(checkbox => {
			checkbox.onchange = (event) => this.controller.changeHideCollection(event);
		});

		// add event handler for .cc-config-collection-include-after selection
		const includeAfterCheckboxes = document.querySelectorAll('input.cc-config-collection-include-after');
		includeAfterCheckboxes.forEach(checkbox => {
			checkbox.onchange = (event) => this.controller.changeIncludeAfterCollection(event);
		});

		// add event handler for input.cc-existing-collection (the page inputs)
		const existingCollections = document.querySelectorAll('input.cc-existing-collection');
		existingCollections.forEach(collection => {
			collection.onchange = (event) => this.controller.modifyCollectionPages(event);
		});
		// button.cc-output-page-update-button
		// - calls controller.updateOutputPage
		const updateButtons = document.querySelectorAll(`button.cc-output-page-update-button`);
		for (let i = 0; i < updateButtons.length; i++) {
			const updateButton = updateButtons[i];
			updateButton.onclick = (event) => this.controller.updateOutputPage(event);
		}
		// button.cc-apply-module-labels-update-button
		// - calls controller.applyModuleLabels
		const applyModuleLabelsButton = document.querySelectorAll(`button.cc-apply-module-labels-update-button`);
		for (let i = 0; i < applyModuleLabelsButton.length; i++) {
			const button = applyModuleLabelsButton[i];
			button.onclick = (event) => this.controller.applyModuleLabels(event);
		}
	}


	/**
	 * @descr Remove the div#cc-config from the end of div.ic-app-nav-toggle-and-crumbs, if it exists
	 */
	removeConfig() {
		const configDiv = document.getElementById('cc-config-wrapper');
		if (configDiv) {
			configDiv.remove();
			const toggleAndCrumbs = document.getElementsByClassName('ic-app-nav-toggle-and-crumbs')[0];
			if (toggleAndCrumbs) {
				toggleAndCrumbs.style.borderBottom = '1px solid #c7cdd1';
			}
			// add the bottom border from div.cc-switch-container
			const ccSwitchContainer = document.getElementsByClassName('cc-switch-container')[0];
			if (ccSwitchContainer) {
				ccSwitchContainer.style.borderBottom = '1px solid #c7cdd1';
			}
		}
	}

	/**
	 * @descr Add the cc configuration bundle to the canvas page.
	 * Currently placed to the left of the "Student View" button at the top of page
	 */
	addCcBundle() {
		if (this.model.isOn()) {
			this.addConfigShowSwitch();
		}
		// get div.cc-switch-container
		const ccSwitchContainer = document.getElementsByClassName('cc-switch-container')[0];
		if (ccSwitchContainer) {
			return;
		}

		let published = "";
		if (!this.model.isPublished()) {
			published = CC_UNPUBLISHED_HTML;
		}

		/*
		30px - 2em
		17px - 1.2em
		13px - 1rem
	
		*/

		// inject the switch script tag into the canvas page, just after start of body
		const SL_SWITCH_HTML = `
		 <style>
		 /* The switch - the box around the slider */
.cc-switch {
  position: relative;
  display: inline-block;
  width: 2rem; 
  height: 1.2rem;
  margin-top: .75rem;
  margin-right: 0.5rem
}

/* Hide default HTML checkbox */
.cc-switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

/* The slider */
.cc-slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  -webkit-transition: .4s;
  transition: .4s;
}

.cc-slider:before {
  position: absolute;
  content: "";
  height: 0.9rem;
  width: 0.9rem;
  left: 2px;
  bottom: 2px;
  background-color: white;
  -webkit-transition: .4s;
  transition: .4s;
}

input:checked + .cc-slider {
  background-color: #328c04;
}

input:focus + .cc-slider {
  box-shadow: 0 0 1px #2196F3;
}

input:checked + .cc-slider:before {
  -webkit-transform: translateX(1rem);
  -ms-transform: translateX(1rem);
  transform: translateX(1rem);
}

/* Rounded sliders */
.cc-slider.cc-round {
  border-radius: 1.1rem;
}

.cc-slider.cc-round:before {
  border-radius: 50%;
}

.cc-switch-container {
	background-color: #f5f5f5;
	border: 1px solid #c7cdd1;
	color: var(--ic-brand-font-color-dark);
	display: flex;
	position:relative;
}

.cc-unpublished {
    display: flex;
    font-size: .75em;
    background-color: #ffe08a;
    align-items: center;
    border-radius: .5em;
    padding-left: 0.5em;
    padding-right: 0.5em;
    height: 2em;
}

.cc-switch-title {
	margin: 0.5rem
}

/* styles for the module configs */
		    .cc-module-config {
				padding: 1em;
				font-size: smaller;
				margin:0;
			/*	font-weight: bold; */
			}

		   .cc-module-no-collection {
				float:right;
				background: red;
				color:white;
				border-radius: 0.25rem;
				padding-left: 0.5rem;
				padding-right: 0.5rem;
				display:none;
		   }

		   .cc-module-config-additional-metadata {
			    margin-top: 0.5rem;
				margin-bottom: 0.5rem;
				padding-left: 0.5rem;
				padding-right: 0.5rem;
		   }



			.cc-module-config-detail {  
				display: grid; 
				grid-template-columns: 1fr 1fr; 
				grid-template-rows: 1fr; 
				gap: 0px 1em; 
				grid-auto-flow: row; 
				grid-template-areas: ". .";
				height: 100%;
			}

			.cc-save {
				margin-top: 0.5rem;
			}

			.cc-active-save-button {
				background-color: #c94444;
				color: var(--ic-brand-button--primary-text);
				border: 1px solid;
				border-color: var(--ic-brand-primary--primary-bgd-darkened-15);
				border-radius: 2px;
				display: inline-block;
				position: relative;
				padding-left: 0.25rem;
				padding-right: 0.25rem
				text-align: center;
				vertical-align: middle;
				cursor: pointer;
				font-size: 65%;
				transition: background-color 0.2s ease-in-out;
			}

			.cc-active-save-button:hover {
				background: var(--ic-brand-primary);
			}

			.cc-save-button {
				background: #f5f5f5;
				color: #2d3b45;
				border: 1px solid;
				border-color: #c7cdd1;
				border-radius: 2px;
				display: inline-block;
				position: relative;
				padding-left: 0.25rem;
				padding-right: 0.25rem
				text-align: center;
				vertical-align: middle;
				cursor: pointer;
				font-size: 65%;
				transition: background-color 0.2s ease-in-out;
			}

			.cc-save-button:hover {
				background: #cccccc;
			}

			.html5tooltip-box
{
  background-color: #cccccc;
  border-radius: 0.5em;
  padding: 0.5em;
  box-shadow: 0 0 0 1px rgba(255,255,255,.15), 0 0 10px rgba(255,255,255,.15);
  font-size: 0.8em;
  color: black;
}


		 </style>
			`;

		const body = document.querySelector('div#application');
		body.insertAdjacentHTML('afterbegin', SL_SWITCH_HTML);

		let cc_on = "";
		if (this.model.isOn()) {
			cc_on = "checked";
		}
		// Try the Canvas switch way first
		const CC_BUNDLE_HTML = `
		<div class="cc-switch-container">
		  <div class="cc-switch-title">
	        <sl-tooltip id="cc-about-collections">
			  	<div slot="content"></div>
				<a target="_blank" href=""><i class="icon-question cc-module-icon"></i></a>
			</sl-tooltip>
		    <!-- <i id="configShowSwitch" class="icon-mini-arrow-right"></i> --> <small>Canvas Collections</small>
			<span style="font-size:50%">{${CC_VERSION}}</span></small>
		  </div>

		<label class="cc-switch">
		    <input type="checkbox" class="cc-toggle-checkbox" id="cc-switch" ${cc_on}>
			<span class="cc-slider cc-round"></span>
		</label>
		<div class="cc-save">
		  <button class="cc-save-button" id="cc-save-button">Save</button>
	    </div>
	   </div>
	   ${published}
		`;


		// find a#easy_student_view
		// insert before a#easy_student_view
		let easy_student_view = document.querySelector('a#easy_student_view');
		if (easy_student_view) {
			easy_student_view.insertAdjacentHTML('afterend', CC_BUNDLE_HTML);

			// calculate px of 15em
			let em = 15;
			let px = em * parseFloat(getComputedStyle(document.documentElement).fontSize);

/*			html5tooltips({
				contentText: `Find out more about Canvas Collections and how it can help 
				improve the user experience of your course site`,
				maxWidth: `${px}px`,
				targetSelector: "#cc-about-collections",
				animateFunction: "spin"
			}); */

			// add event handler to i#configShowSwitch
			if (this.model.isOn()) {
				this.addConfigShowSwitch();
			}

			//			const configShowSwitch = document.getElementById('configShowSwitch');
			//			configShowSwitch.onclick = (event) => this.controller.toggleConfigShowSwitch(event);
			// add event handler of input#cc-switch
			const ccSwitch = document.getElementById('cc-switch');
			ccSwitch.onchange = (event) => this.controller.toggleOffOnSwitch(event);

			// add event handler of button#cc-save-button
			const ccSaveButton = document.getElementById('cc-save-button');
			ccSaveButton.onclick = (event) => this.controller.saveConfig();


		} else {
			console.error('cc_ConfigurationView.addCcBundle() - could not find a#easy_student_view');
		}
	}

	/**
	 * @descr change the button#cc-save-button
	 * - if change is true change class to cc-active-save-button
	 * - if change is false change class to cc-save-button
	 */

	changeSaveButton(change) {
		const saveButton = document.getElementById('cc-save-button');
		if (change) {
			saveButton.className = 'cc-active-save-button';
		} else {
			saveButton.className = 'cc-save-button';
		}
	}

	/**
	 * @descr remove the configShowSwitch
	 */

	removeConfigShowSwitch() {
		const configShowSwitch = document.getElementById('configShowSwitch');
		if (configShowSwitch) {
			configShowSwitch.remove();
		}
	}

	/**
	 * @descr - add i#configShowSwitch back into div.cc-switch-title and probably add
	 * the handler back in?
	 */

	addConfigShowSwitch() {
		const currentSwitch = document.getElementById('configShowSwitch');

		if (!currentSwitch) {
			const switchHtml = `
		<i id="configShowSwitch" class="icon-mini-arrow-right"></i> 
		`;
			// insert switchHtml into div.cc-switch-title
			const switchTitle = document.querySelector('div.cc-switch-title');
			if (switchTitle) {
				switchTitle.insertAdjacentHTML('afterbegin', switchHtml);
				// add the handler
				const configShowSwitch = document.getElementById('configShowSwitch');
				if (configShowSwitch) {
					configShowSwitch.onclick = (event) => this.controller.toggleConfigShowSwitch(event);
				}
			}
		}

	}

	/**
	 * Simple harness to test for file creation 
	 */

	fileTest(event) {
		console.log("---------------------- fileTest clicked");
	}

	/**
	 * Given an error string generated by adding a new collection, insert
	 * an error div into the end of div#cc-config-new-collection > div.cc-config-collection 
	 */

	displayNewCollectionError(error, removeExisting = true) {
		const errorHtml = `<div class="cc-config-error">${error}</div>`;

		const newCollection = document.querySelector('div#cc-config-new-collection');
		if (newCollection) {
			const collection = newCollection.querySelector('div.cc-config-collection');
			if (collection) {
				if (removeExisting) {
					this.removeCollectionErrors();
				}
				collection.insertAdjacentHTML('beforeend', errorHtml);
			}
		}
	}

	removeCollectionErrors() {
		const collection = document.querySelector('div#cc-config-new-collection');
		if (collection) {
			const existingErrors = collection.querySelectorAll('div.cc-config-error');
			for (let i = 0; i < existingErrors.length; i++) {
				existingErrors[i].remove();
			}
		}
	}

	/**
	 * Given a collections date info hash, return a string with a human readable
	 * version of the date using the calendar to calculate
	 * Return "No set date" if no date is set
	 * @param {Object} dateInfo - object with keys label, week, date, month, day, time
	 *     moving to haveing .start and .end
	 */
	calculateDate(dateInfo) {
		// valid date combinations will be
		// 1. week
		// 2. week and day
		// 3. week and day and time
		// - must have a week

		if (dateInfo.week === '') {
			return "No date set";
		}

		let calcDate = {};

		if (dateInfo.day === '') {
			// no day
			calcDate = this.controller.parentController.calendar.getDate(dateInfo.week);
		} else {
			calcDate = this.controller.parentController.calendar.getDate(
				dateInfo.week, false, dateInfo.day
			);
		}
		let dateString = `${calcDate.date} ${calcDate.month} ${calcDate.year}`;

		if (calcDate.hasOwnProperty('day')) {
			dateString = `${calcDate.day} ${dateString}`;
		}
		if (dateInfo.time !== '') {
			// no time
			dateString = `${dateInfo.time} ${dateString}`;
		}
		if (dateInfo.hasOwnProperty('label') && dateInfo.label !== '') {
			dateString = `${dateInfo.label} ${dateString}`;
		}
		return dateString;
	}

}
