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

		const collectionStyles = `
		<style>
			.cc-collection-container {
				display: block;
			}

			.cc-card {
				box-sizing: border-box;
				box-shadow: 0 2px 5px rgba(0,0,0,.3);
				border-radius: 4px;
				overflow: hidden;
				background: #fff;
				width: 262px;
				display: inline-block;
				vertical-align: top;
				margin: 36px 0 0 36px;
			}

			.cc-card-header {
				position: relative;
				cursor: pointer;
				box-sizing: border-box;
			}

			.screenreader-only {
				border: 0;
				clip: rect(0 0 0 0);
				height: 1px;
				margin: -1px;
				overflow: hidden;
				padding: 0;
				position: absolute;
				width: 1px;
				transform: translatez(0);
			}

			.cc-card-header-image {
				background-size: cover;
				background-position: center center;
				background-repeat: no-repeat;
			}

			.cc-card-header-hero {
				box-sizing: border-box;
				height: 146px;
				border: 1px solid rgb(0,0,0,.1);
			}

			.cc-card-link {
				color: var(--ic-link-color);
				text-decision: none;
			}

			.cc-card-header-content {
				box-sizing: border-box;
				padding: 12px 18px 0;
				background: #ffff;
			}

			.cc-card-header-title {
				transition: all .2s ease-out;
				transform: translate3d(0,0,0);
				padding: 0;
				margin: 0;
				line-height: 1.3;
				font-size: 0.875rem;
				font-weight: bold;
			}

			.cc-ellipsis {
				white-space: nowrap;
				overflow: hidden;
				text-overflow: ellipsis;
			}

			cc-card-header-subtitle {
				color: var(--ic-brand-font-color-dark-ligtened-30);
				line-height: 1.3;
				padding:0;
				margin-top: 4px
			}

			cc-card-header-term {
				line-height: 1.3;
				font-size: 12px;
				height: 1rem;
			}
		`;

        let cardContainer = document.createElement('div');
		cardContainer.class = "cc-collection-container";

		// insert styles into cardContainer
		cardContainer.insertAdjacentHTML('afterbegin', collectionStyles);

		let count = 0;
        for (let module of this.model.getModulesCollections()) {

			console.log(module);

			if ( module.collection !== this.currentCollection ) {
				// not the right collection, skip this one
				continue;
			}

			let cardHtml = `
<div class="cc-card" aria-label="Module ${module.name}" style="opacity:1;">
  <div class="cc-card-header">
    <span class="screenreader-only">Module image for ${module.name}</span>
	<div class="cc-card-header-image" style="background-image: url('${module.image}');">
	  <div class="cc-card-header-hero" aria-hidden="true" 
	     style="background-color: rgb(152,108,22); opacity:0.6;">
	  </div>
	</div>
	<a href="#module_${module.id}" class="cc-card-link">
	  <div class="cc-card-header-content">
	    <h3 class="cc-card-header-title cc-ellipsis" title="${module.name}">
		  ${module.name}
		</h3>
	    <div class="cc-card-header-subtitle cc-ellipsis" title="TODO SOME LABEL">
		</div>
		<div class="cc-card-header-term ellipsis" title="${module.description}">
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
		    cardContainer.insertAdjacentHTML('beforeend', cardHtml);
        }

		return cardContainer;
	}
}

