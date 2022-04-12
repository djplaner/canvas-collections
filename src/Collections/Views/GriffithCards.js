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

		this.calendar = new UniversityDateCalendar();

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
		#cc-card-interface { 
			margin-top: 0.5em !important;
			flex-wrap: wrap;
			display: flex;
			margin: -0.75rem
		}

		.cc-clickable-card {
			padding: 0.75rem;
			flex-direction: column;
			display: flex;
			width: 30%;
		}

		@media (max-width:640px) {
			.cc-clickable-card {
				width: 50%
			}
		}

		@media (max-width:480px) {
			.cc-clickable-card {
				width:100%;
			}
		}

		.cc-clickable-card:hover {
			cursor: pointer;
			opacity: 0.8;
		}

		.cc-card {
			box-shadow: 0 10px 15px -3px rgb(0 0 0/ 0.1), 0 4px 6px -4px rgb(0 0 0/ 0.1);
			background-color: #fff;
/*			border: 1px solid #000; */
			border-radius: 0.5rem;
			overflow: hidden;
			flex-direction: column;
			flex: 1 1 0%;
			display: flex;
			position:relative;
		}

		.cc-card:hover{
			background-color: #f5f5f5;
			box-shadow: none;
		}

		.cc-card-image {
			background-repeat: no-repeat;
			background-position: center;
			background-size: cover;
			height: 10rem;
			border-radius: 0.5rem 0.5rem 0 0;
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
			font-size: 0.8em;
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
			position: absolute;
			right: 0;
			bottom: 0;
			padding: 1rem;
		}

		.cc-card-engage-button {
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
		</style>`;

		cardCollection.innerHTML = cardStyles;


		//        const numModules = this.modules.length;
		//        const numRequiredRows = Math.ceil(numModules/3);

		//        let cardsShown = 0;

		//	let count = 0;

		const currentCollection = this.model.getCurrentCollection();
		for (let module of this.model.getModulesCollections()) {
			DEBUG && console.log(module);
			if (module.collection !== currentCollection) {
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

		return cardCollection;
	}

	/**
	 * Harness to generate HTML for a single card. Calls various other functions
	 * to get various component
	 * @param {Object} module 
	 * @returns {DOMElement} for a single card
	 */
	generateCard(module) {
		const imageUrl = this.generateCardImageUrl(module);
		const imageSize = this.generateCardImageSize(module);

		const LINK_ITEM = this.generateCardLinkItem(module);
		const published = this.generateCardPublished(module);

		const DATE_WIDGET = this.generateCardDate(module);

		const description = module.description;

		const COMING_SOON = "";
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
      <a href="#${module.id}" class="cc-card-link"></a>
      <div class="cc-card-image" style="${imageSize} background-image: url('${imageUrl}')">
	    ${IFRAME}
      </div>
      ${DATE_WIDGET}
      ${COMING_SOON}
      <div class="cc-card-content">
	<div class=cc-card-label">
	    <span class="cc-card-label">
		${CARD_LABEL}
	    </span>
	    <h3 class="cc-card-title">${module.name}</h3>
	</div>
      <div class="cc-card-description">
	  ${description}
	</div>
	<p></p>
	 
	 ${LINK_ITEM}
	 ${REVIEW_ITEM}
	 ${EDIT_ITEM}
	 ${DATE} 
	 ${published}
	 <div class="cc-progress"></div>
      </div>
    </div>
    `;

		// convert cardHtml into DOM element
		let wrapper = document.createElement('div');
		wrapper.classList.add( 'cc-clickable-card');
		/*, 'w-full', 'sm:w-1/2', 'md:w-1/3', 'flex', 'flex-col', 'p-3',
			'hover:cursor-pointer'); */
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

		return wrapper;
	}

	/**
	 * Generate the HTML for the date widget, features include
	 * - single date or date period
	 * - university week date
	 * - specific date
	 * - optional time
	 * @param {Object} module 
	 */
	generateCardDate( module ) {
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

		// if module has no property date, return empty string
		if (!module.date) {
			return "";
		}

		let firstDate = {};

		firstDate.DATE_LABEL = module.date.label || DEFAULT_DATE_LABEL;

		firstDate.WEEK = module.date.week || "";
		firstDate.DAY = module.date.day || ""; // is this the right default
		// Week needs more work to add the the day and string "Week"
		// Also it should be HTML

		firstDate.TIME = module.date.time || "";

		firstDate.MONTH = module.date.month || "";
		firstDate.DATE = module.date.date || "";

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

		if (module.endDate) {
			return this.generateDualDate(module, firstDate);
		}

		const singleDateHtml = `
		<div class="cc-card-date">
		  <div class="cc-card-date-label">
             ${firstDate.DATE_LABEL}
          </div>
		  <div class="cc-card-date-week">
          	${firstDate.DAY} Week ${firstDate.WEEK}
		  </div>
		  <div class="cc-card-date-time">
          ${firstDate.TIME}
		  </div>
		  <div class="cc-card-date-month">
      	     ${firstDate.MONTH}
          </div>
		  <div class="cc-card-date-date">
      	     ${firstDate.DATE}
          </div>
        </div>
		`;

		// TODO remove the elements that aren't needed
		// Convert singleDateHtml to dom element
		let element = new DOMParser().parseFromString(singleDateHtml, 'text/html').body.firstChild;
		if (firstDate.TIME==="") {
			// remove the div.cc-card-date-time from element
			element.removeChild(element.querySelector('.cc-card-date-time'));
		}
		if (firstDate.WEEK==="" ) {
			// remove the div.cc-card-date-week from element
			element.removeChild(element.querySelector('.cc-card-date-week'));
		}
		// return element converted to string
		return element.outerHTML;
	}

	generateDualDate( module, firstDate ) {


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
	    <p>&nbsp;<br /> &nbsp;</p>
	  <!--  <div class="p-4 absolute pin-r pin-b" style="right:0;bottom:0"> -->
		<div class="cc-card-engage">
	       <a href="#${module.id}" class="gu-engage">
<!--		     <div class="hover:bg-blue-300 hover:text-white hover:no-underline text-blue-900 font-semibold hover:text-white py-2 px-4 border border-blue-900 hover:border-transparent rounded"> -->
			 <div class="cc-card-engage-button">
			   ${engage}
	         </div></a>
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
    <span class="bg-red-500 text-white text-xs rounded-full py-1 text-center font-bold"
	 style="width:8em">
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

