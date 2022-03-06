/**
 * cc_CardsView.js 
 * - insert the cards for the current collection
 * - initially trying to use the Canvas cards
 *  
 */

import { cc_View } from '../cc_View.js';

export default class cc_CardsView extends cc_View {

	/**
	 * @descr Initialise the view
	 * @param {Object} model
	 * @param {Object} controller
	 */
	constructor( model, controller ) {
		super( model, controller );

		this.currentCollection = this.model.getCurrentCollection();
	}

	/**
	 * @descr insert a nav bar based on current collections
	 */

	display() {
		DEBUG && console.log('-------------- cc_CardsView.display()');
		let div = document.getElementById('cc-canvas-collections');


		// generate the HTML
//		let html ='<h1> Hello from CardsView </h1>';

		let cards = this.generateCards();
		div.insertAdjacentElement('beforeend', cards);

		// add html to div#cc-canvas-collections
//		div.insertAdjacentHTML('afterbegin', html);
	}

	generateCards() { 

        let cardContainer = document.createElement('div');
		cardContainer.class = "DashboardCard_Container";
		cardContainer.style = "display:block";

		let box = document.createElement('div');
		box.className = 'ic-DashboardCard__box__container';

		cardContainer.appendChild(box);


		let count = 0;
        for (let module of this.model.getModulesCollections()) {

			console.log(module);

			if ( module.collection !== this.currentCollection ) {
				// not the right collection, skip this one
				continue;
			}

			let cardHtml = `
<div class="ic-DashboardCard" aria-label="Module ${module.name}" style="opacity:1;">
  <div class="ic-DashboardCard__header">
    <span class="screenreader-only">Module image for ${module.name}</span>
	<div class="ic-DashboardCard__header_image" style="background-image: url(${module.image});">
	  <div class="ic-DashboardCard__header__hero" aria-hidden="true" 
	     style="background-color: rgb(152,108,22); opacity:0.6;">
	  </div>
	</div>
	<a href="#module_${module.id}" class="ic-DashboardCard__link">
	  <div class="ic-DashboardCard__header__content">
	    <h3 class="ic-DashbaordCard__header-title ellipsis" title="${module.name}">
		  ${module.name}
		</h3>
	    <div class="ic-DashboardCard__header__subtitle ellipsis" title="TODO SOME LABEL">
		  Some label #1
		</div>
		<div class="ic-DashboardCard__header-term ellipsis" title="${module.description}">
		  ${module.description}
		</div>
	  </div>
	</a>
	<div>
       <!-- the date stuff could go here -->
	</div>
  </div>
  <nav class="ic-DashboardCard__action-container" aria-label="Actions for ${module.name}"></nav>
</div>
			`;
		    box.insertAdjacentHTML('beforeend', cardHtml);
        }

		return cardContainer;
	}
}

