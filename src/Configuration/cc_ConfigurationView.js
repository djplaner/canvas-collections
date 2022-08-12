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

const CC_VERSION = "0.8.7a";

export default class cc_ConfigurationView extends cc_View {

	/**
	 * @descr Initialise the view
	 * @param {Object} model
	 * @param {Object} controller
	 */
	constructor(model, controller) {
		super(model, controller);
	}

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
	}

	/**
	 * @descr Add the CC configuration interface to each module
	 * - source of module information
	 */

	addModuleConfiguration() {

		const moduleDetails = this.model.getModuleDetails();

		// loop through all the div.ig-header elements
		const moduleHeaders = document.getElementsByClassName('ig-header');
		// for each
		for (let i = 0; i < moduleHeaders.length; i++) {
			const moduleHeader = moduleHeaders[i];
			const id = moduleHeader.id;
			const moduleDetail = moduleDetails[id];

			if (moduleDetail === undefined) {
				continue;
			}

			this.addSingleModuleConfiguration(moduleHeader, moduleDetail, id);
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

		const moduleConfig = this.model.getModuleConfiguration(moduleDetail.name);

		const moduleConfigHtml = `
		<div class="cc-module-config border border-trbl" id="cc-module-config-${id}">
		<link href="//cdn.quilljs.com/1.0.0/quill.snow.css" rel="stylesheet" />
      		<span>
			  <i id="cc-module-config-${id}-switch" class="icon-mini-arrow-right"></i>
			  Canvas Collections Configuration</span>
			  ${showConfigHtml}
  		</div>`;

		// TO DO check that the id matches on of the module ids in data structure

		// insert moduleConfigHtml afterend of moduleHeader
		moduleHeader.insertAdjacentHTML('afterend', moduleConfigHtml);

		// try to start tinymce editor on the textarea
		//tinymce.init( {selector: 'textarea'});

		// add a click handler for i#cc-module-config-${id}-switch
		const moduleConfigSwitch = document.getElementById(`cc-module-config-${id}-switch`);
		if (moduleConfigSwitch) {
			moduleConfigSwitch.onclick = (event) => this.controller.toggleModuleConfigSwitch(event);
			// and update the class appropriately
			moduleConfigSwitch.className = moduleDetail.configClass;
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
				// set the event handler
				const editorChangeHandler = this.quillChange.bind(this);
				editor.on('selection-change', editorChangeHandler);
			}
		}

		const configDiv = document.querySelector(`#cc-module-config-${id}`);
		if (configDiv) {
			const configFields = configDiv.querySelectorAll('input, select');
			for (let j = 0; j < configFields.length; j++) {
				configFields[j].onchange = (event) => this.controller.updateModuleConfigField(event);
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
	 * Event handler for loss of focus on the quill edito
	 * TODO change this to an "update" description??
	 * @param {*} range 
	 * @param {*} oldRange 
	 * @param {*} source 
	 */
	quillChange(range, oldRange, source) {
		if (!range) {
			// assume user has changed focus
			if (this.currentQuill) {
				const parentId = this.currentQuill.root.parentNode.id;
				// extract the id from parentId with format cc-module-config-<id>-description
				//const id = parentId.substring(parentId.indexOf('-') + 1, parentId.lastIndexOf('-'));
				const event = {
					target: {
						id: parentId,
						value: this.currentQuill.root.innerHTML
					}
				};
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
		const moduleDetails = this.model.getModuleDetails();

		// does moduleDetails have the moduleId property
		if (!moduleDetails.hasOwnProperty(moduleId)) {
			// TODO handle the error
			return;
		}
		const singleModuleDetails = moduleDetails[moduleId];

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
	 * @descr generate the div.cc-module-config-details for the module
	 * @param {Object} moduleDetail
	 * @returns {string} html
	 */

	showModuleConfig(moduleDetail) {
		DEBUG && console.log('-------------- cc_ConfigurationView.showModuleConfig()');
		console.log(moduleDetail);

		const moduleConfig = this.model.getModuleConfiguration(moduleDetail.name);
		console.log('---- configuration');
		console.log(moduleConfig);

		const date = "";

		// get list of collections
		const collections = this.model.getCollections();
		let collectionsOptions = '';
		for (let i = 0; i < collections.length; i++) {
			let selected = '';
			const collection = collections[i];
			if (collection === moduleConfig.collection) {
				selected = 'selected';
			}
			collectionsOptions += `<option value="${collection}" ${selected}>${collection}</option>`;
		}
		// set the imageSizeOptions
		let imageSizeOptions = '';
		let imageSize = moduleConfig.imageSize;
		if (imageSize === "") {
			imageSize = "contain";
			moduleConfig.imageSize = imageSize;
		}
		const options = ['scale-down', 'fill', 'contain', 'cover', 'none'];
		for (let i = 0; i < options.length; i++) {
			let selected = '';
			const option = options[i];
			if (option === moduleConfig.imageSize) {
				selected = 'selected';
			}
			imageSizeOptions += `<option value="${option}" ${selected}>${option}</option>`;
		}
		let showConfigHtml = `
		<style>
		   .cc-collection-representation label {
			   width: 5rem;
			   font-size: 0.8rem;
		   }
		   .cc-collection-representation input {
			   font-size: 0.8rem;
		   }
		   .cc-module-config-detail {
			   padding-top: 0.5rem;
		   }
		   .cc-preview-container {
			   display:flex;
			   flex-wrap: wrap;
			   width: 100%;
		   }

		   .cc-preview-container .cc-card {
			   min-width: 50%;
		   }
		</style>

		<div class="cc-module-config-detail">
			<div>
				<div class="cc-collection-representation">
					<label for="cc-collection-representation-${moduleDetail.id}-collection">Collection</label>
					<select id="cc-module-config-${moduleDetail.id}-collection">
					  ${collectionsOptions}
					</select>
				</div>
				<div class="cc-collection-representation">
				    <label for="cc-module-config-${moduleDetail.id}-label">Label</label>
					<input type="text" id="cc-module-config-${moduleDetail.id}-label" 
						value="${moduleConfig.label}" />
					<br clear="all" />
				    <label for="cc-module-config-${moduleDetail.id}-num">Number</label>
					<input type="text" id="cc-module-config-${moduleDetail.id}-num" 
					     value="${moduleConfig.num}" />
					<br clear="all" />
				    <label for="cc-module-config-${moduleDetail.id}-date">Date</label>
					<style>
					   input[readonly] {
						display:none;
					   }
					   </style>
					<aeon-datepicker local="en-au">
					<input type="date" id="date" name="date" value="" />
					<input type="time" id="time" name="time" value="" />
					</aeon-datepicker>
					<!-- <input type="date" id="cc-module-config-${moduleDetail.id}-date"  -->
					      <!-- value="${date}"> -->
					<br clear="all" />
				    <label for="cc-module-config-${moduleDetail.id}-description">Description</label>
					<!-- <textarea id="cc-module-config-${moduleDetail.id}-description">${moduleConfig.description}</textarea> -->
					<div id="cc-module-config-${moduleDetail.id}-description" class="cc-module-config-description" style="height:8rem"> </div>
				</div>
		    </div>
			<div>
				<div class="cc-collection-representation">
					<label for="cc-collection-representation-${moduleDetail.id}-imageSize">Image size</label>
<!--					<input id="cc-module-config-${moduleDetail.id}-imageSize" value="${moduleConfig.imageSize}"> -->
		   		       <select id="cc-module-config-${moduleDetail.id}-imageSize">
					      ${imageSizeOptions}
						</select>
					<br clear="all" />
					<label for="cc-collection-representation-${moduleDetail.id}-image">Image URL</label>
					<input type="text" id="cc-module-config-${moduleDetail.id}-image" 
					        value="${moduleConfig.image}">
				</div>
				<div class="cc-module-config-imagePreview">
				  <div class="cc-preview-container">
				    <div class="cc-clickable-card" style="width:50%">
					  <div class="cc-card" aria-label="Preview">
					    <div class="cc-card-flex">
							<img class="cc-card-image" src="${moduleConfig.image}" 
							   style="object-fit: ${moduleConfig.imageSize};"
							   alt="${Image} representing ${moduleConfig.name}" />
							<div class="cc-card-date">
							  <div class="cc-card-date-label">${moduleConfig.date.label}</div>
							  <div class="cc-card-date-week">${moduleConfig.date.week}</div>
							  <div class="cc-card-date-month"> </div>
							  <div class="cc-card-date-date"> </div>
							</div>
							<div class="cc-card-content-height">
							  <div class="cc-card-content">
							    <div class="cc-card-label">
								  <span class="cc-card-label">${moduleConfig.label}
								     ${moduleConfig.num}</span>
								  <h3 class="cc-card-title">${moduleDetail.name}</h3>
 					        	<div class="cc-card-description"> ${moduleConfig.description} </div>

								</div>
							</div>
							<div class="cc-card-engage">
							  <div class="cc-card-engage-button">
							    <a class="gu-engage">Engage</a></div>
							</div>
						</div>
					  </div>
					</div>
				</div> <!-- TODO should replace this with a call to the proper representation view -->
							 
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
				width: 500px;
				padding-left: 0.5em;
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
				font-weight: bold;
			}

			#cc-config-new-collection {
			}

			#cc-config-new-collection-button {
				left: 50%;
				transform: translateX(-50%);
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

			</style>

			<div id="cc-config">
			 	<div class="cc-box-header">
		  		  <p>Configure Canvas Collections
						<span class="cc-version">(v${CC_VERSION})</span>
						</p>
				</div>
			    <div class="cc-box-body">
				  <div id="cc-config-body">
				    <div id="cc-config-existing-collections">
						<p>
						Existing collections 
						</p>
					</div>
					<div id="cc-config-new-collection">
						<p>Add a new collection</p>
						<div class="cc-config-collection border border-trbl">
						<div class="ic-Form-control" style="margin-bottom: 0px">
						  	<input type="text" id="cc-config-new-collection-name" 
							   placeholder="Name for new collection">
						</div>

						<div class="cc-collection-representation">
							<label for="cc-collection-newRepresentation">Representation</label>
							<select id="cc-collection-newRepresentation">
							  ${this.getAvailableRepresentations()}
							</select>
						</div>

						<fieldset class="ic-Fieldset ic-Fieldset--radio-checkbox">
							<div class="ic-Checkbox-group">
								<div class="ic-Form-control ic-Form-control--checkbox">
									<input type="checkbox" id="cc-config-new-collection-default">
									<label class="ic-Label" for="cc-config-new-collection-default">
										<small>Default collection?</small>
									</label>
								</div>
								<div class="ic-Form-control ic-Form-control--checkbox">
									<input type="checkbox" id="cc-config-new-collection-all">
									<label class="ic-Label" for="cc-config-new-collection-all">
										<small>Include all modules?</small>
									</label>
								</div>
								<div class="ic-Form-control ic-Form-control--checkbox">
									<input type="checkbox" id="cc-config-new-collection-unallocated">
									<label class="ic-Label" for="cc-config-new-collection-unallocated">
										<small>Include modules without a collection?</small>
									</label>
								</div>
							</div>
							<button class="btn btn-primary" id="cc-config-new-collection-button">Add</button>
						</fieldset>
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
		const divExistingCollection = `
			<div class="cc-existing-collection border border-trbl" id="cc-collection-${collectionName}">
				<p>${collectionName} - (${moduleCount} ${moduleName})
				<span class="cc-collection-move">
				<i class="icon-arrow-up cc-move-collection" id="cc-collection-${collectionName}-up"></i>
				<i class="icon-arrow-down cc-move-collection" id="cc-collection-${collectionName}-down"></i>
				</p>

				<div class="cc-collection-representation">
					<label for="cc-collection-${collectionName}-representation">Representation</label>
				 	<select id="cc-collection-${collectionName}-representation"
					    class="cc-collection-representation">
					  ${availableRepresentations}
					</select>
				</div>

				<!-- put the options -->
				<fieldset class="ic-Fieldset ic-Fieldset--radio-checkbox">
					<div class="ic-Checkbox-group">
						<div class="ic-Form-control ic-Form-control--checkbox">
							<input type="checkbox" id="cc-config-collection-${collectionName}-default">
							<label class="ic-Label" for="cc-config-collection-${collectionName}-default">
								Default collection?
							</label>
						</div>
						<div class="ic-Form-control ic-Form-control--checkbox">
							<input type="checkbox" id="cc-config-collection-${collectionName}-all">
							<label class="ic-Label" for="cc-config-collection-${collectionName}-all">
								Include all modules?
							</label>
						</div>
						<div class="ic-Form-control ic-Form-control--checkbox">
							<input type="checkbox" id="cc-config-collection-${collectionName}-unallocated">
							<label class="ic-Label" for="cc-config-collection-${collectionName}-unallocated">
								Include modules without a collection?
							</label>
						</div>
					</div>
				</fieldset>
			</div>
			`;


		// add the div.cc-existing-collection to div#cc-config-existing-collections
		existingCollectionsDiv.insertAdjacentHTML('beforeEnd', divExistingCollection);

		// TODO add an event handler for clicking the options

		// TODO add event handlers for the up and down buttons

		// set input#cc-config-collection-${collectionName}-default to checked
		if (defaultCollection === collectionName) {
			const defaultCheckbox = document.getElementById(`cc-config-collection-${collectionName}-default`);
			if (defaultCheckbox) {
				defaultCheckbox.checked = true;
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
	// add event handler for select.cc-collection-representation
	const representations = document.querySelectorAll('select.cc-collection-representation');
	representations.forEach(representation => {
		representation.onchange = (event) => this.controller.changeCollectionRepresentation(event);
	});



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
	}

	// add the bottom border from div.cc-switch-container
	const ccSwitchContainer = document.getElementsByClassName('cc-switch-container')[0];
	if (ccSwitchContainer) {
		ccSwitchContainer.style.borderBottom = '1px solid #c7cdd1';
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

.cc-switch-title {
	margin: 0.5rem
}

/* styles for the module configs */
		    .cc-module-config {
				padding-left: 0.5em;
				font-size: smaller;
				margin:0;
			/*	font-weight: bold; */
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
		    <!-- <i id="configShowSwitch" class="icon-mini-arrow-right"></i> --> <small>Canvas Collections
			<span style="font-size:50%">{${CC_VERSION}}</span></small>
			<a target="_blank"
			   href="https://github.com/djplaner/canvas-collections/blob/v1/user-docs/about.md#About-canvas-collections">
			   <i class="icon-question"></i>
		   </a>
		  </div>
		<label class="cc-switch">
		    <input type="checkbox" class="cc-toggle-checkbox" id="cc-switch" ${cc_on}>
			<span class="cc-slider cc-round"></span>
		</label>
		<div class="cc-save">
		  <button class="cc-save-button" id="cc-save-button">Save</button>
	    </div>
	   </div>
		`;


	// find a#easy_student_view
	// insert before a#easy_student_view
	let easy_student_view = document.querySelector('a#easy_student_view');
	if (easy_student_view) {
		easy_student_view.insertAdjacentHTML('afterend', CC_BUNDLE_HTML);

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



		//		const fileTest = document.getElementById('cc-file-test');
		//			fileTest.onclick = (event) => this.fileTest();

		// remove the configShowSwitch if no ccIsOn
		//if ( ! this.model.isOn()) {
		//this.removeConfigShowSwitch();
		//				configShowSwitch.remove();
		//} 
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

}
