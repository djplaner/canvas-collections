/**
 * GriffithCards.js 
 * - implement a view for a Canvas Collection implementing the Card Interface
 *   functionality
 */

import { cc_View } from '../../cc_View.js';

export default class GriffithCardsView extends cc_View {

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
		DEBUG && console.log('-------------- TableView.display()');
		let div = document.getElementById('cc-canvas-collections');


		// create a simple message div element
		let message = document.createElement('div');
		message.className = 'cc-message';
		message.innerHTML = '<h1> Hello from GriffithCardsView </h1>';

		const TAILWIND_CSS='<link href="https://unpkg.com/tailwindcss@^2/dist/tailwind.min.css" rel="stylesheet">';
		document.head.insertAdjacentHTML( 'beforeend', TAILWIND_CSS );

		const cards = this.generateCards();

		div.insertAdjacentElement('beforeend', message);

	}

	generateCards() {
		DEBUG && console.log('-------------- griffithCardsView.generateCards()');

        let cardCollection = this.createElement('div', ['flex', 'flex-wrap', '-m-3']);
        cardCollection.id = "guCardInterface";
        const numModules = this.modules.length;
        //        const numRequiredRows = Math.ceil(numModules/3);

        let cardsShown = 0;

		let count = 0;

		const currentCollection = this.model.getCurrentCollection();
        for (let module of this.model.getModulesCollections()) {
			DEBUG && console.log(module);
			if ( module.collection !== currentCollection ) {
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

			const card = this.generateCard( module );
			cardCollection.insertAdjacentElement('beforeend', cardHtml);
        }

		return cardCollection;
	}


	generateCard( module ) { 
        let imageUrl = "https://www.signfix.com.au/wp-content/uploads/2017/09/placeholder-600x400.png";
        let engage = 'Engage';

        if ('image' in module) {
            imageUrl = module.image;
        }
        // set the "text" for the engage button
        if ('engage' in module) {
            engage = module.engage;
        }

		let imageSize = "bg-cover";
        if ("imageSize" in module) {
            imageSize = module.imageSize;
        }
        if (imageSize === "bg-contain") {
            imageSize = "bg-contain bg-no-repeat bg-center"
        }

		const description = module.description;

		const COMING_SOON = "";
		const LINK_ITEM = "";
		const REVIEW_ITEM = "";
		const DATE = "";
		const published = "";
		const completion = "";

		const cardHtml = `
    <div id="cc_module_${module.id}" class="hover:bg-gray-200 bg-white rounded-lg shadow-lg overflow-hidden flex-1 flex flex-col relative">
      <a href="#${module.id}" class="cardmainlink"></a>
      <div class="cc_module_image ${imageSize} h-48" style="background-image: url('${imageUrl}'); background-color: rgb(255,255,255)">${IFRAME}
      </div>
      ${COMING_SOON}
      <div class="carddescription p-4 flex-1 flex flex-col">
	<!-- <div class="cc_progress absolute top-0 right-0 p-2"></div> -->
	<div class=cc_card_label">
	    <div class="cc_progress float-right"></div>
	    <span class="cardLabel">
	    ${module.label} ${module.num}
	    </span>
	    <h3 class="mb-4 text-2xl">${module.title}</h3>
	</div>
	<div class="mb-4 flex-1">
	  ${description}
	</div>
	<p></p>
	 
	 ${LINK_ITEM}
	 ${REVIEW_ITEM}
	 ${EDIT_ITEM}
	 ${DATE} 
	 ${published}
	 ${completion}
      </div>
    </div>
    `;

        // convert cardHtml into DOM element
        let wrapper = this.createElement('div', [
            'clickablecard', 'w-full', 'sm:w-1/2', 'md:w-1/3', 'flex', 'flex-col', 'p-3'
        ]);
        wrapper.innerHTML = cardHtml;
        return wrapper;
	}
}

