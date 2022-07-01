/**
 * GriffithCards.js 
 * - implement a view for a Canvas Collection implementing the Card Interface
 *   functionality
 */

import { cc_View } from '../../cc_View.js';

import { UniversityDateCalendar } from '../../university-date-calendar.js';

import { CircularProgressBar } from "../../../node_modules/circular-progress-bar/public/circular-progress-bar.min.js";

const DEFAULT_DATE_LABEL="Commencing";

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

	/**
	 * @descr insert a nav bar based on current collections
	 */

	display() {
		DEBUG && console.log('-------------- GriffithCardsView.display()');
		let div = document.getElementById('cc-canvas-collections');

		this.calendar = new UniversityDateCalendar(this.controller.parentController.strm);

		// create a simple message div element
		let message = document.createElement('div');
		message.className = 'cc-message';
		message.innerHTML = '';

		const PROGRESS_BAR_JS = '<script src="https://unpkg.com/circular-progress-bar@2.1.0/public/circular-progress-bar.min.js"></script>';
		document.body.insertAdjacentHTML('afterbegin', PROGRESS_BAR_JS);

		const cards = this.generateCards();

		div.insertAdjacentElement('beforeend', message);
		div.insertAdjacentElement('beforeend', cards);

		this.stopCardDescriptionPropagation();
		this.makeCardsClickable();
	}

	generateCards() {
		DEBUG && console.log('-------------- griffithCardsView.generateCards()');

		// create cardCollection div element
		let cardCollection = document.createElement('div');
		// set the cardCollection classlist
		//cardCollection.classList.add('flex', 'flex-wrap', '-m-3');
		cardCollection.id = "cc-card-interface";

		const cardStyles = `
		<style>
		#cc-canvas-collections{
			overflow:hidden;
		}

		#cc-card-interface { 
			margin-top: 0.5em !important;
			flex-wrap: wrap;
			display: flex;
			margin: -0.75rem
		}

		.cc-clickable-card, .cc-coming-soon-card {
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

		.cc-card {
			box-shadow: 0 10px 15px -3px rgb(0 0 0/ 0.1);
			background-color: #fff;
		}

		.cc-card-flex {
			overflow: hidden;
			flex-direction: column;
			flex: 1 1 0%;
			display: flex;
			position:relative;
			border-radius: 1em;
		}

		.cc-card:hover{
			background-color: #f5f5f5;
			box-shadow: none;
		}

		.cc-card-image {
			height: 10rem;
			width: 100%;
			object-fit: cover;
		}

		.cc-card-content-height {
			height: 12rem;
			overflow: auto;
			border-bottom-left-radius: 0.5rem;
			border-bottom-right-radius: 0.5rem;
		}

		.cc-card-content {
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
			margin-bottom: 1rem;
		}

		.cc-card-engage {
			padding: 1rem;
			padding-top: 1.5rem;
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

		.cc-card-date-month {
			color: white;
			background-color: red;
			padding-top: 0.25rem;
			padding-bottom: 0.25rem;
			border-color: black;
			border-left-width: 1px;
			border-right-width: 1px;
			border-top-width: 1px;
			font-size: 0.9rem;
			line-height: 1rem;
		}

		.cc-card-date-date {
			padding-top: 0.25rem;
			padding-bottom: 0.25rem;
			border-left-width: 1px;
			border-bottom-width: 1px;
			border-right-width: 1px;
			border-bottom-right-radius: 0.25rem;
			border-bottom-left-radius: 0.25rem;
			border-color: black;
			font-size: 0.9rem;
			font-weight: bold;
			line-height: 1rem;
		}

		.cc-progress {
			float: right;
		}

		.cc-card-published {
			background-color: red;
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
		</style>`;

		cardCollection.innerHTML = cardStyles;


		//        const numModules = this.modules.length;
		//        const numRequiredRows = Math.ceil(numModules/3);

		//        let cardsShown = 0;

		//	let count = 0;

		//const currentCollection = this.model.getCurrentCollection();
		for (let module of this.model.getModulesCollections()) {
			DEBUG && console.log(module);
			if (module.collection !== this.model.getCurrentCollection()) {
				// not the right collection, skip this one
				// set the Canvas module div to display:none
				// find div.context_module with data-module-id="${module.id}"
				const contextModule = document.querySelector(`div.context_module[data-module-id="${module.id}"]`);
				contextModule.style.display = 'none';
				continue;
			} else {
				const contextModule = document.querySelector(`div.context_module[data-module-id="${module.id}"]`);
				contextModule.style.display = 'block';
			}

			const card = this.generateCard(module);
			cardCollection.insertAdjacentElement('beforeend', card);
		}

		cardCollection = this.addComingSoonCards(cardCollection);

		return cardCollection;
	}

	/**
	 * Add any "coming soon" cards for currentCollection to cardCollection 
	 * @param {DomElement} cardCollection - contains cards for all the published modules for current collection
	 * @param {String} currentCollection - name of current visible collection
	 * @returns 
	 */

	addComingSoonCards(cardCollection) {
		// loop through all modules in the current canvas collections configuration
		// includes both published and unpubished modules

		const collectionsModules = this.model.getCollectionsModules(this.currentCollection);

		// no modules for the current collection
		if ( ! collectionsModules ) {
			return cardCollection;
		}

		// if the total num modules equals the canvas collections list of modules, then 
		// all modules were being displayed in Canvas. i.e. no need to add additional
		// coming soon cards
		// TODO only want to get the modules for the current collection
		const allModules = this.model.getModulesCollections();
		// filter allModules to only include items for this.currentCollection
		const currentCollectionModules = allModules.filter(
			module => module.collection === this.model.getCurrentCollection());
		if (currentCollectionModules.length===collectionsModules.length) {
			return cardCollection;
		}

		// filter collectionsModules for those that have a comingSoon attribute
		const comingSoonModules = collectionsModules.filter(module => module.comingSoon);

//		DEBUG && console.log(`################## addComingSoonCards`) && console.log(comingSoonModules);

		// loop through each coming soon module and add a card for it
		for (let module of comingSoonModules) {
			const card = this.generateCard(module,false);
			// TODO actually want to place this in order
			const order = module.comingSoon.order-1;
			// get a list of all div.cc-clickable-card elements in cardCollection
			const cards = cardCollection.querySelectorAll('.cc-clickable-card');
			// insert card before cards[order]
			cardCollection.insertBefore(card, cards[order]);
		}

		return cardCollection;
	}

	/**
	 * Harness to generate HTML for a single card. Calls various other functions
	 * to get various component
	 * @param {Object} module 
	 * @param {boolean} published is the module published (initially used for "coming soon" cards)
	 * @returns {DOMElement} for a single card
	 */
	generateCard(module, published=true) {
		const imageUrl = this.generateCardImageUrl(module);
		const imageSize = this.generateCardImageSize(module);

		const LINK_ITEM = this.generateCardLinkItem(module);
		const PUBLISHED = this.generateCardPublished(module);

		let DATE_WIDGET="";
		// only generateCardDate if module.date includes attributes
		// week or month and date
		if ( module.date && (module.date.week || (module.date.month && module.date.date)) ) {
			DATE_WIDGET = this.generateCardDate(module.date);
		}

		const description = module.description;

		let COMING_SOON = this.generateComingSoon(module);
		const REVIEW_ITEM = "";
		const DATE = "";
		//		const completion = this.generateCardCompletion( module );
		const IFRAME = "";
		const EDIT_ITEM = "";

		let CARD_LABEL = "";
		if (module.label && module.num) {
			CARD_LABEL = `${module.label} ${module.num}`;
		}

		const cardHtml = `
    <div id="cc_module_${module.id}" class="cc-card">
	  <div class="cc-card-flex">
	      <a href="#${module.id}" class="cc-card-link"></a>
		  <img class="cc-card-image" src="${imageUrl}" alt="Image representing '${module.name}'">
      	${DATE_WIDGET}
      	${COMING_SOON}
	 	${PUBLISHED}
	  <div class="cc-card-content-height">
      <div class="cc-card-content">
		<div class=cc-card-label">
	    	<span class="cc-card-label"> ${CARD_LABEL} </span>
	    	<h3 class="cc-card-title">${module.name}</h3>
		</div>
      	<div class="cc-card-description">
	  		${description}
		</div>
		</div> <!-- cc-card-content-height -->
	  </div> 
	 
	 ${LINK_ITEM}
	 ${REVIEW_ITEM}
	 ${EDIT_ITEM}
	 ${DATE} 
	 <div class="cc-progress"></div>
      </div>
    </div>
    `;

		// convert cardHtml into DOM element
		let wrapper = document.createElement('div');
		if ( published ) {
			wrapper.classList.add( 'cc-clickable-card');
			wrapper.innerHTML = cardHtml;
		} else {
			// unpublished card needs a different class and the card link removed
			wrapper.classList.add( 'cc-coming-soon-card');
			wrapper.innerHTML = cardHtml;
			// remove the a.cc-card-link from wrapper
			wrapper.querySelector('.cc-card-link').remove();
			// remove the div.cc-card-engage-button if it exists
			const button = wrapper.querySelector('.cc-card-engage-button');
			if ( button ) {
				button.remove();
			}
		}

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
		if ( wrapper.querySelector('.cc-card-published') ) {
			wrapper.classList.add('unpublished');
		}

		return wrapper;
	}

	/**
	 * generate a coming soon html element for the current module
	 * @param {Object} module 
	 * @returns html string for coming soon block
	 */

	generateComingSoon(module) {
		// empty string if there is no coming soon attribute for module
		if ( ! module.comingSoon ) {
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
	}

	/**
	 * Generate the HTML for the date widget, features include
	 * - single date or date period
	 * - university week date
	 * - specific date
	 * - optional time
	 * @param {Object} module 
	 */
	generateCardDate( dateJson ) {
		/* date information in 
		   All attributes are optional
		   module.date {

			label:
			week:  
			day:
			month:
			date:
			endDate: { repeat all of first date, except label}
		} */

		const date = {
			"from": {},
			"to": undefined
		}; 
		
		date.from = this.convertUniDateToReal(dateJson);
		if (dateJson.endDate) {
			date.to = this.convertUniDateToReal(dateJson.endDate);
			this.generateDualDate(date);
		}

		return this.convertDateToHtml(date);

	}

	/**
	 * Take a Uni date in "JSON" format and convert to an object with 
	 * actual real dates
	 * @param {Object} dateJson 
	 * @returns 
	 */

	convertUniDateToReal(dateJson) {

		let firstDate = {};

		firstDate.DATE_LABEL = dateJson.label || DEFAULT_DATE_LABEL;

		firstDate.WEEK = dateJson.week || "";
		firstDate.DAY = dateJson.day || ""; // is this the right default
		// Week needs more work to add the the day and string "Week"
		// Also it should be HTML

		firstDate.TIME = dateJson.time || "";

		firstDate.MONTH = dateJson.month || "";
		firstDate.DATE = dateJson.date || "";

		// With week defined, we need to calculate MONTH and DATE based
		// on university trimester
		if (firstDate.WEEK!=="") {
			// TODO should check for a day, if we wish to get the day
			let actualDate = {};
			if (firstDate.DAY==="") {
				// no special day specified, just get the start of the week
				actualDate = this.calendar.getDate(firstDate.WEEK);
			} else {
				// need go get the date for a particular day
				actualDate = this.calendar.getDate(firstDate.WEEK, false, firstDate.DAY);	
			}
			// actualDate { date/month/year }
			firstDate.DATE = actualDate.date;
			firstDate.MONTH = actualDate.month;
		}

		// no date information defined, no date widget
		if ( firstDate.WEEK==="" && firstDate.TIME=== "" && 
				firstDate.MONTH === "" && firstDate.DATE === "") {
			return "";
		}
		return firstDate;
	}

	/**
	 * Convert from and to dates to HTML
	 * @param {Object} date with two attributes from and to
	 * @returns  HTML
	 */

	convertDateToHtml(date) {

		const singleDateHtml = `
		<div class="cc-card-date">
		  <div class="cc-card-date-label">
             ${date.from.DATE_LABEL}
          </div>
		  <div class="cc-card-date-week">
          	${date.from.DAY} Week ${date.from.WEEK}
		  </div>
		  <div class="cc-card-date-time">
          ${date.from.TIME}
		  </div>
		  <div class="cc-card-date-month">
      	     ${date.from.MONTH}
          </div>
		  <div class="cc-card-date-date">
      	     ${date.from.DATE}
          </div>
        </div>
		`;

		// TODO remove the elements that aren't needed
		// Convert singleDateHtml to dom element
		let element = new DOMParser().parseFromString(singleDateHtml, 'text/html').body.firstChild;
		if (date.from.TIME==="") {
			// remove the div.cc-card-date-time from element
			element.removeChild(element.querySelector('.cc-card-date-time'));
		}
		if (date.from.WEEK==="" ) {
			// remove the div.cc-card-date-week from element
			element.removeChild(element.querySelector('.cc-card-date-week'));
		}
		// return element converted to string
		return element.outerHTML;
	}

	generateDualDate( date )  {

		const dualDateHtml = `
<div class="block rounded-t rounded-b overflow-hidden bg-white text-center w-24 absolute pin-t pin-r">
          <div class="bg-black text-white py-1 text-xs border-l border-r border-black">
             {DATE_LABEL}
          </div>
          {WEEK}
          {DAYS}
          {TIME}
          <div class="bg-red text-white flex items-stretch py-1 border-l border-r border-black">
              <div class="w-1/2 flex-grow">{MONTH_START}</div>
              <div class="flex items-stretch border-l border-black flex-grow  -mt-1 -mb-1"></div>
              <div class="w-1/2">{MONTH_STOP}</div>
          </div>
          <div class="border-l border-r border-b text-center flex border-black items-stretch pt-1">
      	     <div class="w-1/2 text-2xl flex-grow font-bold">{DATE_START}</div>
      	     <div class="flex font-bolditems-stretch border-l border-black flex-grow -mt-1"></div>
              <div class="w-1/2 text-2xl font-bold">{DATE_STOP}</div>
          </div>
         </div> 
`; 

		return dualDateHtml;

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
		if ('image' in module) {
			imageUrl = module.image;
		}
		return imageUrl;
	}

	generateCardEngage(module) {
		let engage = 'Engage';
		// set the "text" for the engage button
		if ('engage' in module) {
			engage = module.engage;
		}
		return engage;
	}

	/**
	 * module.imageSize will contain user spec for sizing the background image for a card
	 * Options are
	 * - bg-contain
	 * - bg-cover
	 * These need to be supplemented 
	 * @param {Object} module 
	 * @returns 
	 */
	generateCardImageSize(module) {
		let imageSize = "";
		if ("imageSize" in module && module.imageSize!=="" ) {
			if (module.imageSize === "bg-contain") {
				imageSize = "background-size: contain !important; background-repeat: no-repeat; background-position: center;";
			}
		}
		return imageSize;
	}

	generateCardLinkItem(module) {
		const engage = this.generateCardEngage(module);
		let LINK_ITEM = `
<!--	    <p>&nbsp;<br /> &nbsp;</p> -->
		<div class="cc-card-engage">
			 <div class="cc-card-engage-button">
	       		<a href="#${module.id}" class="gu-engage">
			   ${engage}
			 </a>
	         </div>
	    </div>
	    `;

		if ('noEngage' in module && module.noEngage) {
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
		if (module.published || module.published === undefined) {
			return '';
		}

		let publishedHtml = `
    <span class="cc-card-published">
	    Unpublished
    </span>
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

}

