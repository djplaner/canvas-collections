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
		DEBUG && console.log('-------------- GriffithCardsView.display()');
		let div = document.getElementById('cc-canvas-collections');


		// create a simple message div element
		let message = document.createElement('div');
		message.className = 'cc-message';
		message.innerHTML = '<h1> Hello from GriffithCardsView </h1>';

		const TAILWIND_CSS='<link href="https://unpkg.com/tailwindcss@^2/dist/tailwind.min.css" rel="stylesheet">';
		document.head.insertAdjacentHTML( 'beforeend', TAILWIND_CSS );

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
		cardCollection.classList.add('flex', 'flex-wrap', '-m-3');
        cardCollection.id = "guCardInterface";

		const cardStyles = `
		<style>
	    .cc-card-description a {
			text-decoration: underline;
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
	generateCard( module ) { 
		const imageUrl = this.generateCardImageUrl( module );
		const imageSize = this.generateCardImageSize( module );

		const LINK_ITEM = this.generateCardLinkItem( module );
		const published = this.generateCardPublished( module );

		const description = module.description;

		const COMING_SOON = "";
		const REVIEW_ITEM = "";
		const DATE = "";
		const completion = this.generateCardCompletion( module );
		const IFRAME="";
		const EDIT_ITEM="";

		const cardHtml = `
    <div id="cc_module_${module.id}" class="hover:bg-gray-200 hover:shadow-outline bg-white rounded shadow-lg overflow-hidden flex-1 flex flex-col relative">
      <a href="#${module.id}" class="cardmainlink"></a>
      <div class="cc_module_image ${imageSize} h-48" style="background-image: url('${imageUrl}'); background-color: rgb(255,255,255)">${IFRAME}
      </div>
      ${COMING_SOON}
      <div class="carddescription p-4 flex-1 flex flex-col hover:cursor-pointer">
	<!-- <div class="cc_progress absolute top-0 right-0 p-2"></div> -->
	<div class=cc_card_label">
	    <div class="cc_progress float-right"></div>
	    <span class="cardLabel">
	    ${module.label} ${module.num}
	    </span>
	    <h3 class="mb-4 text-2xl">${module.name}</h3>
	</div>
	<div class="cc-card-description mb-4 flex-1">
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
		let wrapper = document.createElement('div');
		wrapper.classList.add(
			'clickablecard', 'w-full', 'sm:w-1/2', 'md:w-1/3', 'flex', 'flex-col', 'p-3',
			'hover:cursor-pointer');
        wrapper.innerHTML = cardHtml;
        return wrapper;
	}

    /**
     * @descr generate ribbon/html to add to card to show completion status
     * @param String completionStatus 
     * @returns html 
     */
    generateCardCompletion(module) {
        const colour = {
            'Completed': 'bg-green-500',
            'In Progress': 'bg-yellow-500',
            'Locked': 'bg-red-500'
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

	generateCardImageUrl( module ) {
	    let imageUrl = "https://www.signfix.com.au/wp-content/uploads/2017/09/placeholder-600x400.png";
        if ('image' in module) {
            imageUrl = module.image;
        }
		return imageUrl;
	}

	generateCardEngage( module ) {
        let engage = 'Engage';
        // set the "text" for the engage button
        if ('engage' in module) {
            engage = module.engage;
        }
		return engage;
	}

	generateCardImageSize( module ) {
		let imageSize = "bg-cover";
        if ("imageSize" in module) {
            imageSize = module.imageSize;
        }
        if (imageSize === "bg-contain") {
            imageSize = "bg-contain bg-no-repeat bg-center"
        }
		return imageSize;
	}

	generateCardLinkItem( module ) {
		const engage = this.generateCardEngage( module ); 
		let LINK_ITEM = `
	    <p>&nbsp;<br /> &nbsp;</p>
	    <div class="p-4 absolute pin-r pin-b" style="right:0;bottom:0">
	       <a href="#${module.id}" class="gu-engage"><div class="hover:bg-blue-300 hover:text-white hover:no-underline text-blue-900 font-semibold hover:text-white py-2 px-4 border border-blue-900 hover:border-transparent rounded">
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
        if (module.published) {
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
     * @descr generate ribbon/html to add to card to show completion status
     * @param String completionStatus 
     * @returns html 
     */
    generateCardCompletion(completionStatus) {
        const colour = {
            'Completed': 'bg-green-500',
            'In Progress': 'bg-yellow-500',
            'Locked': 'bg-red-500'
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
        let cards = document.getElementsByClassName('clickablecard');
        for (let i = 0; i < cards.length; i++) {
            let card = cards[i];

            // add the event listener
            card.addEventListener('click', function (event) {
                let link = this.querySelector(".cardmainlink");
                if (link !== null) {
                    link.click();
                }
            });
        }
    }

}

