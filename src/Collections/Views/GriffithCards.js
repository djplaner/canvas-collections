/**
 * GriffithCards.js 
 * - implement a view for a Canvas Collection implementing the Card Interface
 *   functionality
 * 
 * Has two main functions used by controllers
 * - display - actively inserts the representation into the DOM
 * - generateHTML - returns a HTML string version of representation for further use
 */

import { cc_View } from '../../cc_View.js';

//import { UniversityDateCalendar } from '../../university-date-calendar.js';

import { CircularProgressBar } from "../../../node_modules/circular-progress-bar/public/circular-progress-bar.min.js";

//const DEFAULT_DATE_LABEL = "Commencing";

export default class GriffithCardsView extends cc_View {

	/**
	 * @descr Initialise the view
	 * @param {Object} model
	 * @param {Object} controller
	 */
	constructor(model, controller) {
		super(model, controller);


		this.currentCollection = this.model.getCurrentCollection();
	}

	/*showOnlyCurrentCollectionModules() {
		// call the parent method
		super.showOnlyCurrentCollectionModules();
	}*/

	/**
	 * @descr insert a nav bar based on current collections
	 */

	display() {
		DEBUG && console.log('-------------- GriffithCardsView.display()');
		let div = document.getElementById('cc-canvas-collections');



		// create a simple message div element
		let message = document.createElement('div');
		message.className = 'cc-message';
		message.innerHTML = '';

		const PROGRESS_BAR_JS = '<script src="https://unpkg.com/circular-progress-bar@2.1.0/public/circular-progress-bar.min.js"></script>';
		document.body.insertAdjacentHTML('afterbegin', PROGRESS_BAR_JS);

		const currentCollection = this.model.getCurrentCollection();
		const cardsHtml = this.generateHTML(currentCollection);
		//const cards = this.generateCards();

		div.insertAdjacentElement('beforeend', message);
		// insert cardsHtml before the end of div
		div.insertAdjacentHTML('beforeend', cardsHtml);
		//		div.insertAdjacentElement('beforeend', cards);

		// this event generation stuff, probably belongs here, not the HTML
		this.stopCardDescriptionPropagation();
		this.makeCardsClickable();
	}

	/**
	 * Return a HTML string containing the cards representation for the given collection
	 * using the specified variety
	 * TODO
	 * - add support for different varieties
	 * @param {String} collectionName 
	 * @param {String} variety 
	 */
	generateHTML(collectionName, variety = '') {
		let cardsHtml = this.generateCards(collectionName);

		if (variety === 'claytons') {
			cardsHtml = this.convertToClaytons(cardsHtml);
		}

		return cardsHtml;

	}

	generateCards(collectionName) {
		DEBUG && console.log('-------------- griffithCardsView.generateCards()');

		// create cardCollection div element
		let cardCollection = document.createElement('div');
		// set the cardCollection classlist
		//cardCollection.classList.add('flex', 'flex-wrap', '-m-3');
		cardCollection.id = "cc-card-interface";
		// set class to cc-representation - that all representations should use
		cardCollection.classList.add('cc-representation');

		const cardStyles = `
		<style>
		#cc-canvas-collections{
			overflow:hidden;
		}

		#cc-card-interface { 
			margin-top: 0.5em !important;
			flex-wrap: wrap;
			display: flex;
		}

		.cc-clickable-card, .cc-unclickable-card {
			padding: 0.75rem;
			flex-direction: column;
			display: flex;
			width: 30%;
		}

		@media (max-width:640px) {
			.cc-clickable-card,  .cc-coming-soon-card {
				width: 50%
			}
		}

		@media (max-width:480px) { 
		    .cc-coming-soon-card, .cc-clickable-card {
				width:100%;
			}
		}

		.cc-clickable-card:hover {
			cursor: pointer;
			opacity: 0.8;
		}

		.cc-card, .cc-card-unclickable {
			box-shadow: 0 10px 15px -3px rgb(0 0 0/ 0.1);
			background-color: #fff;
			border-radius: 1em;
		}

		.cc-card-flex {
			overflow: hidden;
			flex-direction: column;
			flex: 1 1 0%;
			display: flex;
			position:relative;
			border-radius: 1em;
		}

		.cc-card-banner-container {
			position: relative;
		}

		.cc-card:hover{
			background-color: #f5f5f5;
			box-shadow: none;
		}

		.cc-card-image {
			height: 10rem;
			width: 100%;
		}

		.cc-object-fit-old-kludge {
			background-size: contain !important; 
			background-repeat: no-repeat; 
			background-position: center;
		}

		.cc-object-fit-cover {
			object-fit: cover;
		}

		.cc-object-fit-contain {
			object-fit: contain;
		}

		.cc-object-fit-fill {
			object-fit: fill;
		}

		.cc-object-fit-scale-down {
			object-fit: scale-down;
		}

		.cc-object-fit-none {
			object-fit: none;
		}

		.cc-card-content-height {
			height: 12rem;
			overflow: auto;
			border-bottom-left-radius: 0.5rem;
			border-bottom-right-radius: 0.5rem;
			position: relative;
		}

		.cc-card-content, .cc-unclickable-card-content {
			padding: 0.5rem;
			flex: 1 1 0%;
			display: flex;
			flex-direction: column;
		}

		.cc-card-content:hover {
			cursor: pointer;
		}

		.cc-card-description {
			font-size: 0.75rem;
		}

	    .cc-card-description a {
			text-decoration: underline;
			flex: 1 1 0%;
			margin-bottom: 1rem;
		}

		.cc-progress {
			position: absolute;
			bottom: 0;
			left: 0;
			padding: 0.5em;
		}

		.cc-card-title {
			font-size: 1rem;
			font-weight: bold;
		}

		.cc-card-label {
			font-size: 0.9rem;
			/*margin-bottom: 1rem; */
		}

		.cc-card-footer {
			height: 4rem;
			position: relative;
		}

		.cc-card-engage {
			/*padding: 1rem;
			padding-top: 1.5rem; */
			padding-right: 1rem;
		}

		.cc-card-engage-button {
			float: right;
			padding-top: 0.5rem;
			padding-bottom: 0.5rem;
			padding-left: 1rem;
			padding-right: 1rem;
			color: rgba(30,58,138,1);
			border-style: solid;
			border-width: 1px;
			border-radius: 0.25rem;
			border-color: rgba(30,58,138,1);
		}

		.cc-card-engage-button:hover {
			background-color: rgba(30,58,138,1);
			color: white;
			text-decoration: none !important;
			border: transparent;
			border-radius: 0.25rem;
		}

		.cc-card-date {
			text-align: center;
			background-color: #f5f5f5;
			border-radius: 0.25rem;
			overflow: hidden;
			width: 5rem;
			display:block;
			position: absolute;
			top: 0;
			right: 0;
		}

		.cc-card-date-label { 
			color: white;
			font-size: 0.75rem;
			padding-top: 0.25rem;
			padding-bottom: 0.25rem;
			background-color: black;
			border-color: black;
			border-left-width: 1px;
			border-right-width: 1px;
			border-top-width: 1px;
		}

		.cc-card-hide {
			display: none;
		}

		.cc-card-date-week {
			color: black;
			background-color: #fff9c2;
			font-size: 0.75rem;
			padding-top: 0.15rem;
		}

		.cc-card-date-time {
			font-size: 0.75rem;
			color: black;
			background-color: #fff382;	
			padding-top: 0.25rem;
			padding-bottom: 0.25rem;
		}

		.cc-card-date-dual-time {
			display: flex;
			font-size: 0.7rem;
			color: black;
			background-color: #fff382;	
			padding-top: 0.25rem;
			padding-bottom: 0.25rem;
		}


		.cc-card-date-month {
			color: white;
			background-color: red;
			padding-top: 0.25rem;
			padding-bottom: 0.25rem;
			border-color: black;
			border-top-width: 1px;
			font-size: 0.9rem;
			line-height: 1rem;
		}

		.cc-card-date-dual-month {
			text-align:center;
			align-items: stretch;
			display: flex;
			color: white;
			background-color: red;
			padding-top: 0.25rem;
			padding-bottom: 0.25rem;
			border-color: black;
			border-top-width: 1px;
		}

		.cc-card-date-month-from {
			width:50%;
		}
		.cc-card-date-month-to {
			width:50%;
		}

		.cc-card-date-date {
			padding-top: 0.25rem;
			padding-bottom: 0.25rem;
			border-left-width: 1px;
			border-bottom-right-radius: 0.25rem;
			border-bottom-left-radius: 0.25rem;
			border-color: black;
			font-size: 0.9rem;
			font-weight: bold;
			line-height: 1rem;
		}

		.cc-card-date-dual-date {
			text-align:center;
			padding-top: 0.25rem;
			align-items: stretch;
			display: flex;
			border-left-width: 1px;
			border-right-width: 1px;
			border-bottom-right-radius: 0.25rem;
			border-bottom-left-radius: 0.25rem;
			border-color: black;
		}

		.cc-card-date-date-from {
			width:50%;
		}

		.cc-card-date-date-to {
			width:50%;
		}

		.cc-card-date-time-from {
			width: 50%;
		}
		.cc-card-date-time-to {
			width: 50%;
		}

		.cc-card-date-day {
			font-size: 0.7rem;
		}

		.cc-card-date-day-from {
			width: 50%;
		}
		.cc-card-date-day-to {
			width: 50%;
		}

		.cc-card-date-dual-day {
			display:flex;
			font-size: 0.7rem;
		}

		.cc-progress {
			float: right;
		}

		.cc-card-fyi {
			position: absolute;
			bottom: 0;
			background: rgba(0,0,0,0.75);
			color: white;
			width: 100%;
			padding: 0.25rem;
			font-size: x-small;
			text-align: center;
		}

		.cc-card-published {
			position: absolute;
			bottom: 0;
			background: rgba(255,0,0,0.75);
			color: white;
			font-size: x-small;
			font-weight: bold;
			padding-top: 0.25rem;
			padding-bottom: 0.25rem;
			text-align: center;
			width: 100%;
		}

		.cc-coming-soon-message {
			font-size: 0.75rem;
			padding: .5em;
            background-color: #feee88;
		}

		.gu-engage {
			text-decoration: none;
		}

/*		a.cc-card-link {
			position: absolute;
        	width: 100%;
        	height: 100%;
        	top: 0;
        	left: 0;
        	z-index: 1;
		} */
		</style>`;

		cardCollection.innerHTML = cardStyles;


		//        const numModules = this.modules.length;
		//        const numRequiredRows = Math.ceil(numModules/3);

		//        let cardsShown = 0;

		//	let count = 0;
		//const currentCollection = this.model.getCurrentCollection();
		const modulesCollections = this.model.getModulesCollections();
		for (let module of modulesCollections) {
			DEBUG && console.log(module);
			// still need to skip generate card

			if (module.collection !== collectionName) {
				continue;
			}

			const card = this.generateCard(module);
			if (card !== null) {
				cardCollection.insertAdjacentElement('beforeend', card);
			}
		}

		// probably deprecated due to FYI approach
		//cardCollection = this.addComingSoonCards(cardCollection);

		// generate HTML version of cardCollection
		const cardCollectionHTML = cardCollection.outerHTML;

		return cardCollectionHTML;
	}

	/**
	 * Harness to generate HTML for a single card. Calls various other functions
	 * to get various component
	 * @param {Object} module 
	 * @param {boolean} published is the module published (initially used for "coming soon" cards)
	 * @returns {DOMElement} for a single card
	 */
	generateCard(module) {

		const published = module.published;
		const banner = module.banner;

		// need to figure out if we want to add the card or not
		const editMode = this.model.getEditMode();
		if (!editMode) {
			// if the module/card is unpublished and not an FYI card, then don't add it
			if (!published) {
				if (module.hasOwnProperty('fyi') && !module.fyi) {
					return null;
				}
			}
		}

		const moduleName = this.model.deLabelModuleName(module);

		const LINK_ITEM = this.generateCardLinkItem(module);
		const PUBLISHED = this.generateCardPublished(module);

		let DATE_WIDGET = "";
		// only generateCardDate if module.date includes attributes
		// week or month and date
		if (module.date && (module.date.week || (module.date.month && module.date.date))) {
			DATE_WIDGET = this.generateCardDate(module.date);
		}

		let IMAGE_IFRAME = this.generateBanner(module);

		let description = module.description;
		if (description === "" || description === "undefined") {
			// add some content so that the RCE doesn't remove the div entirely
			description = "<p>&nbsp;</p>";
		}

		const FYI_TEXT = this.generateFyiText(module);
		//let COMING_SOON = this.generateComingSoon(module);
		const REVIEW_ITEM = "";
		const DATE = "";
		//		const completion = this.generateCardCompletion( module );
		const IFRAME = "";
		const EDIT_ITEM = "";

		let CARD_LABEL = "";
		if (module.label) {
			CARD_LABEL = module.label;
		}
		if (module.actualNum) {
			CARD_LABEL += ` ${module.actualNum}`;
			// remove first char from CARD_LABEL if it is a space
			if (CARD_LABEL.charAt(0) === ' ') {
				CARD_LABEL = CARD_LABEL.substring(1);
			}
		}

		let cardClass = "cc-card";
		let cardContentClass = "cc-card-content";
		const modulesUrl = this.model.getModulesUrl();
		// link class can't be set if there's an iframe
		let cardLinkStyle = ` position: absolute; width: 100%; height: 100%;
        	top: 0; left: 0; z-index: 1; `;
		// if there's no link in the module.description then make the CONTENT_CARD_LINK
		// the same as CARD_LINK
		let CONTENT_CARD_LINK = `<a href="${modulesUrl}#module_${module.id}" 
		                  class="cc-card-link" style="${cardLinkStyle}"></a>`;

		// if the banner is an iframe, then the header link doesn't expand
		// but it's still needed
		if (banner==="iframe") {
			cardLinkStyle = "";
		}
		let CARD_LINK = `<a href="${modulesUrl}#module_${module.id}" 
		                  class="cc-card-link" style="${cardLinkStyle}"></a>`;
		if (module.hasOwnProperty('fyi') && module.fyi) {
			cardClass = 'cc-card-unclickable';
			cardContentClass = "cc-unclickable-card-content";
			CARD_LINK = '';
			CONTENT_CARD_LINK='';
		}

		const cardHtml = `
    <div id="cc_module_${module.id}" class="${cardClass}">
		<div class="cc-card-flex">
	    	<div class="cc-card-banner-container" data-moduleid="${module.id}">
			    ${CARD_LINK}
		  		${IMAGE_IFRAME}
      	  		${DATE_WIDGET}
	 	  		${PUBLISHED}
		  		${FYI_TEXT}
			</div>
	  		<div class="cc-card-content-height">
			    ${CONTENT_CARD_LINK}
      			<div class="${cardContentClass}">
					<div class="cc-card-label">
	    				<span class="cc-card-label"> ${CARD_LABEL} </span>
	    				<h3 class="cc-card-title" data-moduleid="${module.id}">${moduleName}</h3>
					</div>
      				<div class="cc-card-description">
	  					${description}
					</div>
				</div> 
			</div>
			<div class="cc-card-footer">
	 			${LINK_ITEM}
	 			${REVIEW_ITEM}
	 			${EDIT_ITEM}
	 			${DATE} 
	 			<div class="cc-progress"></div>
			</div>
      	</div>
	  </div> 
    </div>
    `;

		// convert cardHtml into DOM element
		let wrapper = document.createElement('div');
		if (module.hasOwnProperty('fyi') && module.fyi) {
			wrapper.classList.add('cc-unclickable-card');
		} else {
			wrapper.classList.add('cc-clickable-card');
		}
		wrapper.innerHTML = cardHtml;

		const progress = this.getCardProgressElement(module);
		if (progress) {
			// find div.cc_progress in wrapper
			const progressDiv = wrapper.querySelector('.cc-progress');
			if (progressDiv) {
				//progressDiv.insertAdjacentElement('beforeend', progress);
				progress.appendTo(progressDiv);
			}
		}

		// if wrapper (the card) includes .cc-card-published, then add class unpublished to wrapper
		if (wrapper.querySelector('.cc-card-published')) {
			wrapper.classList.add('unpublished');
		}

		return wrapper;
	}

	generateFyiText(module) {

		if (!module.hasOwnProperty('fyi') || !module.fyi || !module.hasOwnProperty('fyiText')) {
			return "";
		}

		if (module.fyi && module.fyiText !== "") {
			return `<div class="cc-card-fyi">${module.fyiText}</div>`;
		}

		return "";
	}

	/**
	 * @function generateBanner
	 * @description Using the value of "banner" and other module settings, generate the
	 * HTML to fill the card banner section
	 * @param {Object} module - specifying configuration for current module
	 */
	generateBanner(module) {
		// a default check for old configs that didn't specify module.banner
		if (!module.hasOwnProperty('banner')) {
			module.banner = 'image';
		}
		// TODO need to handle any defaults that might have iframe
		// - maybe isn't any yet

		if (module.banner === 'colour') {
			return this.generateBannerColour(module);
		} else if (module.banner === 'iframe') {
			// TODO
			return this.generateBannerIframe(module);
		} else { // image is the default
			return this.generateCardImage(module);
		}
	}

	/**
	 * @function generateBannerIframe
	 * @description	Return HTML for a iframe banner
	 * If the iframe object is empty, return a basic div
	 * @param {Object} module 
	 */
	generateBannerIframe(module) {
		if (module.hasOwnProperty('iframe') && module.iframe !== '') {
			// TODO should probably do some checks on the iframe
			const match = module.iframe.match(/<iframe.*src="(.*)".*<\/iframe>/);
			if (match) {
				return module.iframe;
			}
			return `<div class="cc-banner-colour" style="background-color:#ffffff;width:100%;height:10rem;">
			   <p>Iframe doesn't match expected iframe HTML format.</p></div>`;
		}
		return `<div class="cc-banner-colour" style="background-color:#ffffff;width:100%;height:10rem;">(<em>No iframe specified</em>)</div>`;
	}

	/**
	 * @function generateBannerColour
	 * @description Return HTML for a colour banner uuing the value of module.bannerColour
	 * @param {Object} module - specifying configuration for current module
	 * @returns {String} HTML for a colour banner
	 */

	generateBannerColour(module) {
		let bgColour = '#ffffff';
		if (module.hasOwnProperty('bannerColour')) {
			// default to card if no banner colour set
			bgColour = module.bannerColour;
		}

		return `<div class="cc-banner-colour"style="background-color:${bgColour};width:100%;height:10rem;">&nbsp;</div>`;
	}

	/**
	 * Given details of a module, generate HTML string for the module.image representation
	 * Two possible cases
	 * 1. module.image is the URL for an image
	 * 2. module.image is the HTML for an iframe 
	 */


	generateCardImage(module) {
		let escModuleName = '';
		if (module.hasOwnProperty('name')) {
			escModuleName = module.name.replace(/(["'])/g, "\\$1");
		}

		// return placeholder if no image
		if (!module.hasOwnProperty('image')) {
			return `<img class="cc-card-image" src="https://www.signfix.com.au/wp-content/uploads/2017/09/placeholder-600x400.png"
					data-moduleid="${module.id}" alt="Image representing '${escModuleName}'"> `;
		}

		// is module.image an iframe?
		const match = module.image.match(/<iframe.*src="(.*)".*<\/iframe>/);
		if (match) {
			return module.image;
		}
		const imageUrl = this.generateCardImageUrl(module);
		const imageSize = this.generateCardImageSize(module);
		// escModuleName is a version of moduleName with all HTML and special characters escaped

		return `<img class="cc-card-image ${imageSize}" src="${imageUrl}" 
					data-moduleid="${module.id}"
		 				alt="Image representing '${escModuleName}'"> `;
	}
	/**
	 * generate a coming soon html element for the current module
	 * @param {Object} module 
	 * @returns html string for coming soon block
	 * @deprecated FYI Object
	 */

	/*generateComingSoon(module) {
		// empty string if there is no coming soon attribute for module
		if (!module.comingSoon) {
			return "";
		}

		// TODO 
		// - handle also the calculation of dual dates
		// - move these date functions to the Uni Date class
		let date = this.convertUniDateToReal(module.comingSoon.date);
		// TODO
		// - handle all the date variations
		const message = `Available ${date.MONTH} ${date.DATE}`;

		return `
		<div class="cc-coming-soon-message">
		  <span>🚧</span>
		  <span>${message}</span>
		</div>
		`;
	}*/

	/**
	 * Generate the HTML for the date widget, features include
	 * - single date or date period
	 * - university week date
	 * - specific date
	 * - optional time
	 * @param {Object} module 
	 */
	generateCardDate(dateJson) {
		this.model.addCalendarDate(dateJson);
		return this.convertDateToHtml(dateJson);
	}

	/**
	 * Convert from and to dates to HTML
	 * @param {Object} date with two attributes from and to
	 * @returns  HTML
	 * date object format
	 *   - label - ignore here (string)
	 *   - week - the week of the study period (string)
	 *   - day - full string containing day of the week
	 *   - time - string with time
	 *   - to
	 *     - which also contains week, day, time
	 *   this method will add/modify existing values for both the main level and the "to" date
	 *   - month - three letter string month name
	 *   - date - numeric data of the month (string)
	 */

	convertDateToHtml(date) {
		const fields = ['day', 'week', 'time'];
		let singleDate = "";
		for (let field of fields) {
			if (date.hasOwnProperty(field)) {
				singleDate = `${singleDate}${date[field]}`;
			}
		}


		let extraDateLabelClass = '';
		if (date.label === '') {
			extraDateLabelClass = ' cc-card-hide';
		}

		// create day const with the first 3 letters of date.day
		// stay empty if no date specified
		const day = date.day || ""; //date.day.substring(0, 3);
		const month = date.month.substring(0, 3);
		let time = '';
		if (date.time) {
			time = this.model.convertFrom24To12Format(date.time);
		}

		// if there's a to date, call generateDualDate
		if (date.hasOwnProperty('to')) {
			// only generate dual date if there are values in to
			let dualDate = "";
			for (let field of fields) {
				if (date.to.hasOwnProperty(field)) {
					dualDate = `${dualDate}${date.to[field]}`;
				}
			}
			// is there no value set for to date?
			if (dualDate !== "") {
				if (singleDate === "") {
					// if also no value set for from date, then no date displayed
					return '';
				}
				// but if both from and to dates have some value
				return this.generateDualDate(date);
			}
		}
		if (singleDate === "") {
			return '';
		}

		const singleDateHtml = `
		<div class="cc-card-date">
		  <div class="cc-card-date-label${extraDateLabelClass}">
             ${date.label}
          </div>
		  <div class="cc-card-date-week">
          	Week ${date.week}
		  </div>
		  <div class="cc-card-date-time">
          ${time}
		  </div>
		  <div class="cc-card-date-day">
		    ${day}
		  </div>
		  <div class="cc-card-date-month">
      	     ${month}
          </div>
		  <div class="cc-card-date-date">
      	     ${date.date}
          </div>
        </div>
		`;

		// TODO remove the elements that aren't needed
		// Convert singleDateHtml to dom element
		let element = new DOMParser().parseFromString(singleDateHtml, 'text/html').body.firstChild;
		if (time === "") {
			// remove the div.cc-card-date-time from element
			element.removeChild(element.querySelector('.cc-card-date-time'));
		}
		if (date.week === "") {
			// remove the div.cc-card-date-week from element
			element.removeChild(element.querySelector('.cc-card-date-week'));
		}
		if (day === "") {
			// remove the div.cc-card-date-day from element
			element.removeChild(element.querySelector('.cc-card-date-day'));
		}
		// return element converted to string
		return element.outerHTML;
	}

	/**
	 * Given a date object that contains both a to/from date. Generate appropriate card html
	 * @param {Object} date 
	 * @returns String of HTML
	 */

	generateDualDate(date) {

		let showDate = {
			fromDay: "", toDay: "",
			fromDate: "", toDate: "", fromMonth: "", toMonth: "",
			fromTime: "", toTime: "",
			week: ""
		};

		if (date.hasOwnProperty('week')) {
			showDate.week = `${date.week}`;
		}
		if (date.hasOwnProperty('day')) {
			showDate.fromDay = date.day.substring(0, 3);
		}
		if (date.hasOwnProperty('date')) {
			showDate.fromDate = date.date;
		}
		if (date.hasOwnProperty('month')) {
			showDate.fromMonth = date.month.substring(0, 3);
		}
		if (date.hasOwnProperty('time')) {
			showDate.fromTime = this.model.convertFrom24To12Format(date.time);
		}

		if (date.hasOwnProperty('to')) {
			if (date.to.hasOwnProperty('date')) {
				showDate.toDate = date.to.date;
			}
			if (date.to.hasOwnProperty('week')) {
				showDate.week = `${showDate.week} - ${date.to.week}`;
			}
			if (date.to.hasOwnProperty('day')) {
				showDate.toDay = date.to.day.substring(0, 3) || "";
			}
			if (date.to.hasOwnProperty('month')) {
				showDate.toMonth = date.to.month.substring(0, 3);
			}
			if (date.to.hasOwnProperty('time')) {
				showDate.toTime = this.model.convertFrom24To12Format(date.to.time);
			}
		}

		// create week showing "Week X to X"
		const dualDateHtml = `
		<div class="cc-card-date">
		  <div class="cc-card-date-label">
             ${date.label}
          </div>
		  <div class="cc-card-date-week">
          	Week ${showDate.week}
		  </div>
		  <div class="cc-card-date-dual-time">
		    <div class="cc-card-date-time-from">${showDate.fromTime}</div>
            <div class="cc-card-date-time-to">${showDate.toTime}</div>
		  </div>
		  <div class="cc-card-date-dual-day">
		  	<div class="cc-card-date-day-from">${showDate.fromDay}</div>
			<div class="cc-card-date-day-to">${showDate.toDay}</div>
		  </div> 
		  <div class="cc-card-date-dual-month">
		     <div class="cc-card-date-month-from">${showDate.fromMonth}</div>
			 <div class="cc-card-date-month-to">${showDate.toMonth}</div>	
          </div>
		  <div class="cc-card-date-dual-date">
		     <div class="cc-card-date-date-from">${showDate.fromDate}</div>
		     <div class="cc-card-date-date-to">${showDate.toDate}</div>
          </div>
        </div>
`;

		// TODO remove the elements that aren't needed
		// Convert singleDateHtml to dom element
		let element = new DOMParser().parseFromString(dualDateHtml, 'text/html').body.firstChild;
		if (date.label === "") {
			element.removeChild(element.querySelector('.cc-card-date-label'));
		}
		if (showDate.toTime === "" && showDate.fromTime === "") {
			// remove the div.cc-card-date-time from element
			element.removeChild(element.querySelector('.cc-card-date-dual-time'));
		}
		if (showDate.toWeek === "" && showdate.fromWeek === "") {
			// remove the div.cc-card-date-week from element
			element.removeChild(element.querySelector('.cc-card-date-dual-week'));
		}
		if (showDate.toDay === "" && showDate.fromDay === "") {
			// remove the div.cc-card-date-dual-day from element
			element.removeChild(element.querySelector('.cc-card-date-dual-day'));
		}
		// return element converted to string
		return element.outerHTML;

	}

	/**
	 * @descr generate ribbon/html to add to card to show completion status
	 * Can be 
	 * - Completed - cc_itemsCompleted defined & numRequired == numCompleted
	 * - In Progress - cc_itemsCompleted defined & numCompleted < numRequired
	 * - Locked - Unsure how this happens
	 * - nothing/empty - cc_itemsCompleted is undefined (and absence of any locked info)
	 * @param String completionStatus 
	 * @returns html 
	 */
	generateCardCompletion(module) {
		DEBUG && console.log("----------- griffithCardsView.generateCardCompletion()");

		const colour = {
			'Completed': 'bg-green-500',
			'In Progress': 'bg-yellow-500',
			'Locked': 'bg-red-500'
		};

		// return if module.cc_itemsCompleted is undefined
		if (module.cc_itemsCompleted === undefined) {
			return '';
		}

		let completionStatus = 'In Progress';

		if (module.cc_itemsCompleted.numCompleted === module.cc_itemsCompleted.numRequired) {
			completionStatus = 'Completed';
		}

		if (!(completionStatus in colour)) {
			return '';
		}

		const length = completionStatus.length;
		let completionHtml = `
      <div  class="${colour[completionStatus]} text-xs rounded-full py-1 text-center font-bold"
	    style="width:${length}em" >
	<div class="">${completionStatus}</div>
      </div>
	    `;

		return completionHtml;
	}

	/**
 * If module has completion requirements return a progress bar element
 * - use https://github.com/GMartigny/circular-progress-bar
 * 
 * @param Object module 
 * @returns DOM element representing progress bar
 */
	getCardProgressElement(module) {
		if (module.cc_itemsCompleted === undefined) {
			return undefined;
		}

		const percentComplete = (100 * module.cc_itemsCompleted.numCompleted) / module.cc_itemsCompleted.numRequired;

		let valueBackground = "#ccc";

		if (percentComplete >= 100) {
			valueBackground = "rgb(16,185,129)";
		} else if (percentComplete < 50) {
			valueBackground = "rgb(245,158,11)";
		}

		const options = {
			size: 50,
			background: "#eee",
			valueBackground: valueBackground,
			colors: ["#0484d1", "#e53b44", "#2ce8f4", "#ffe762", "#63c64d", "#fb922b"]
		};
		const progress = new CircularProgressBar(percentComplete, options);
		return progress;
	}

	generateCardImageUrl(module) {
		let imageUrl = "https://www.signfix.com.au/wp-content/uploads/2017/09/placeholder-600x400.png";
		if (('image' in module) && (module.image !== "")) {
			imageUrl = module.image;
		}
		return imageUrl;
	}

	generateCardEngage(module) {
		let engage = '';
		// set the "text" for the engage button
		if (module.hasOwnProperty('engageText')) {
			engage = module.engageText;
		}
		return engage;
	}

	/**
	 * @descr figures out what CSS class fits for the image based on the CSS object fit values
	 * @param {Object} module 
	 * @returns 
	 */
	generateCardImageSize(module) {
		let imageSize = "";
		const allowedObjectFit = ['contain', 'cover', 'scale-down', 'fill'];
		if ("imageSize" in module && module.imageSize !== "") {
			if (module.imageSize === "bg-contain") {
				// some sort of dodgy kludge to handle legacy methods
				//imageSize = "background-size: contain !important; background-repeat: no-repeat; background-position: center;";
				imageSize = "cc-object-fit-old-kludge";
			} else if (allowedObjectFit.includes(module.imageSize)) {
				imageSize = `cc-object-fit-${module.imageSize}`;
				//				imageSize = `object-fit: ${module.imageSize} !important;`;
			}
		}
		return imageSize;
	}

	/**
	 * @function generateCardLinkItem
	 * @description generate HTML to show an fyi message if fyi is true and there is a message
	 * @param {Object} module - configuration details for module
	 */
	generateCardLinkItem(module) {
		if (!module.hasOwnProperty('engage') || module.engage === false) {
			return '';
		}
		const engage = this.generateCardEngage(module);
		const modulesUrl = this.model.getModulesUrl();
		let LINK_ITEM = `
<!--	    <p>&nbsp;<br /> &nbsp;</p> -->
		<div class="cc-card-engage">
			 <div class="cc-card-engage-button">
	       		<a href="${modulesUrl}#module_${module.id}" class="gu-engage">
			   ${engage}
			 </a>
	         </div>
	    </div>
	    `;

		if (
			//	Deprecated? ('noEngage' in module && module.noEngage) ||
			// don't show link for fyi object
			(module.hasOwnProperty('fyi') && module.fyi)
		) {
			LINK_ITEM = `
            `;
		}

		return LINK_ITEM;
	}

	/**
	  * @desc generate html showing if module is unpublished
	  * i.e. only show message if unpublished
	  * @param boolean true iff published
	  * @returns string html empty if published warning if unpublished
	  */
	generateCardPublished(module) {
		if (
			module.published || module.published === undefined ||
			// don't show unpublished for fyi cards ??
			(module.hasOwnProperty('fyi') && module.fyi)
		) {
			return '';
		}

		let publishedHtml = `
    <div class="cc-card-published">
	    Unpublished
    </div>
	    `;

		return publishedHtml;
	}


	/**
	 * @desc prevent links in card description from propagating to the 
	 * cards clickable link
	 */

	stopCardDescriptionPropagation() {
		// get all the links in .carddescription that are not .gu-engage
		let links = document.querySelectorAll('.carddescription a:not(.gu-engage)');

		// prevent propagation of the click event on all links
		for (let i = 0; i < links.length; i++) {
			links[i].addEventListener('click', function (e) {
				e.stopPropagation();
			});
		}
	}

	/**
	 * @desc add a click event to each .clickablecard based on their .cardmainlink
	 * child
	 */
	makeCardsClickable() {

		// get all the clickable cards
		let cards = document.getElementsByClassName('cc-clickable-card');
		for (let i = 0; i < cards.length; i++) {
			let card = cards[i];

			// add the event listener
			card.addEventListener('click', function (event) {
				let link = this.querySelector(".cc-card-link");
				if (link !== null) {
					link.click();
				}
			});
		}
	}

	/**
	 * Take the default view of cards and convert it into the claytons view
	 * i.e. ready for injection into the RCE
	 * @param {String} html 
	 */

	convertToClaytons(html) {
		DEBUG && console.log('-------------- GriffithCards::converToClaytons()');

		// convert html to DOM
		let parser = new DOMParser();
		let doc = parser.parseFromString(html, "text/html");

		const modules = this.model.getCollectionsModules();

		// get the div#cc-canvas-collections
		// TODO check - is this already there??
		//let div = doc.getElementById('cc-canvas-collections');
		let div = doc.getElementById('cc-card-interface');
		if (!div) {
			alert('GriffithCards::convertToClaytons() - div#cc-card-interface not found');
			return html;
		}
		// Don't think this is needed here
		//div = div.cloneNode(true);
		// remove the div#cc-nav within div.cc-canvas-collections
		/*		let nav = div.querySelector('.cc-nav');
				if (nav) {
					nav.remove();
				} 
				// remove the div#cc-message within div.cc-canvas-collections
				let message = div.querySelector('.cc-message');
				if (message) {
					message.remove();
				} */
		// find all the h3.cc-card-title
		let h3s = div.querySelectorAll('h3.cc-card-title');
		// loop through h3s and wrap innerHTML with <strong>
		for (let i = 0; i < h3s.length; i++) {
			let h3 = h3s[i];
			h3.innerHTML = '<strong>' + h3.innerHTML + '</strong>';
		}



		//----------------- 
		// remove all div.cc-progress
		let progresses = div.querySelectorAll('.cc-progress');
		for (let i = 0; i < progresses.length; i++) {
			let progress = progresses[i];
			progress.remove();
		}

		//---------------
		// update all the a.cc-card-link and a.gu-engage and add a href
		//		let currentUrl = window.location.href;
		// the current url should be the modules page, remove the # and anything after it
		/*		currentUrl = currentUrl.split('#')[0];
				// if no "modules" at end of url, add it
				if (currentUrl.indexOf('modules') === -1) {
					currentUrl += '/modules';
				} */

		const modulesUrl = this.model.getModulesUrl();
		let cardLinks = [];
		let links = div.querySelectorAll('a.cc-card-link');
		for (let i = 0; i < links.length; i++) {
			let link = links[i];
			//link.href = modulesUrl + link.getAttribute('href');
			link.href = link.getAttribute('href');
			cardLinks[i] = link;
		}

		/*		links = div.querySelectorAll('a.gu-engage');
				for (let i = 0; i < links.length; i++) {
					let link = links[i];
					link.href = currentUrl + link.getAttribute('href');
					// save the link for later use
					cardLinks[i] = link.href;
				} */
		// add a link around the img.cc-card-image
		//let images = div.querySelectorAll('img.cc-card-image');
		// add a link around the div.cc-card-banner-container
		let cardBanners = div.querySelectorAll('div.cc-card-banner-container');
		// to make the link work for all contents of banner need to use this approach
		// https://www.w3docs.com/snippets/css/how-to-make-a-div-a-clickable-link.html
		// i.e. add that styling to the existing a.cc-card-link
/*		for (let i = 0; i < cardBanners.length; i++) {
			let banner = cardBanners[i];
			const moduleId = banner.dataset.moduleid;
			const module = modules[parseInt(moduleId)];
			// don't add the link if it's an FYI module
			if (module && module.hasOwnProperty('fyi') && module.fyi) {
				continue;
			}

			// can't wrap a div in an anchor, canvas RCE breaks it
			// try wrapping the internals of the div

			let link = doc.createElement('a');
			link.classList.add('cc-card-link-image');
			link.href = `${modulesUrl}#modules_${moduleId}`;
			link.innerHTML = banner.innerHTML;
			banner.innerHTML = link.outerHTML;
			//banner.parentNode.replaceChild(link, banner);
		} */
		// add a link around cc-card-title innerHTML
		let titles = div.querySelectorAll('h3.cc-card-title');


		for (let i = 0; i < titles.length; i++) {
			let title = titles[i];
			// get the module
			if (title.dataset.hasOwnProperty('moduleid')) {
				const moduleid = title.dataset.moduleid;
				const module = modules[parseInt(moduleid)];
				if (!modules.hasOwnProperty(moduleid)) {
					continue;
				}
				// if an fyi module, continue
				if (module && module.hasOwnProperty('fyi') && module.fyi) {
					continue;
				}
				let link = doc.createElement('a');
				// set link class to cc-card-link-title
				link.classList.add('cc-card-link-title');
				//link.href = currentUrl;
				//link.href = cardLinks[i];
				link.href = `${modulesUrl}#modules_${moduleid}`;
				link.innerHTML = title.innerHTML;
				title.innerHTML = link.outerHTML;
			}
		}

		// change border style for all div.cc-card
		let cards = div.querySelectorAll('div.cc-card-flex');
		for (let i = 0; i < cards.length; i++) {
			let card = cards[i];
			card.style.borderStyle = 'outset';
			card.style.borderRadius = "1em";
		}

		// change background to #efefef for div.cc-card-content-height
		// Canvas RCE removes border-bottom-left-radius and right
		/*		let cardContents = div.querySelectorAll('.cc-card-content-height');
				for (let i = 0; i < cardContents.length; i++) {
					let cardContent = cardContents[i];
					cardContent.style.backgroundColor = '#efefef';
				}
				// change background to #efefef for div.cc-card-engage
				let cardEngages = div.querySelectorAll('.cc-card-engage');
				for (let i = 0; i < cardEngages.length; i++) {
					let cardEngage = cardEngages[i];
					cardEngage.style.backgroundColor = '#efefef';
				} 
				// change background to #efefef for div.cc-card-flex
				let cardFlexes = div.querySelectorAll('.cc-card-flex');
				for (let i = 0; i < cardFlexes.length; i++) {
					let cardFlex = cardFlexes[i];
					cardFlex.style.backgroundColor = '#efefef';
				} */

		// find any div.unpublished and remove it
		let unpublisheds = div.querySelectorAll('.unpublished');
		for (let i = 0; i < unpublisheds.length; i++) {
			let unpublished = unpublisheds[i];
			// only remove if unpublished doesn't contain div.cc-coming-soon-message
			if (!unpublished.querySelector('.cc-coming-soon-message')) {
				unpublished.remove();
			} else {
				// remove the span.cc-card-published from unpublished
				let span = unpublished.querySelector('.cc-card-published');
				if (span) {
					span.remove();
				}
				// set div.cc-card-engage-button to display:none
				let button = unpublished.querySelector('.cc-card-engage-button');
				if (button) {
					button.style.display = 'none';
				}
				// remove the a.cc-card-link-title, but keep innerHTML
				let link = unpublished.querySelector('.cc-card-link-title');
				if (link) {
					link.replaceWith(...link.childNodes);
				}
				link = unpublished.querySelector('.cc-card-link-image');
				if (link) {
					link.replaceWith(...link.childNodes);
				}
			}
		}

		// get the outerHTML of the div#cc-canvas-collections
		let newHtml = div.outerHTML;
		// run it through juice
		let juiceHTML = juice(newHtml);

		return juiceHTML;

	}

}

