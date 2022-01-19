/****************
 * CanvasModulesViews - render the updated module information
 */

const DEFAULT_VIEW_OPTIONS = {
    // how to view collections: 
    // - current - show the current collection
    // - all - show all collections
    'collectionView': 'current',
    // whether to who nav bar
    'navBar': true,
    // whether to update the module title with collection name
    'updateTitle': true
};


export default class cc_CanvasModulesView {

    /**
     * @desc insert HTML into Canvas modules page offering different representation of module information
     * @param modules cc_CanvasModules object containing all info about current pages modules
     * @param collectionsClick eventHandler for click on named collection links
     * @param option object - defining how to configure the view
     */
    constructor(modules, collectionsClick, options = null) {
        this.model = modules;
        this.modules = this.model.modules;
        this.collectionsClick = collectionsClick;
        this.currentCollection = this.model.currentCollection;

        // update view configuration, if modules[0] is configured
        this.configuration = null;
        this.configured = false;
        if (this.modules.length > 0 && this.modules[0].configured) {
            this.configuration = this.modules[0].configuration;
            this.configured = true;
            console.log(this.configuration);
            this.collections = this.configuration['CC_COLLECTIONS_DEFAULTS'];
            this.defaultActiveCollection = this.configuration['CC_DEFAULT_ACTIVE_COLLECTION'];
        }
        console.log('-------------------- VIEW');
        console.log(`configured is ${this.configured}`);

        // default setting
        this.options = DEFAULT_VIEW_OPTIONS;
        if (options) {
            this.options = options;
        }
    }

    /**
     * @desc remove the div#cc-canvas-collections from the page
     */

    removeCanvasCollectionsView() {
        let canvasCollections = document.getElementById('cc-canvas-collections');
        canvasCollections.parentNode.removeChild(canvasCollections);
    }

    /**
     * @desc render the collections/module information
     */

    render() {

        // element where all the Canvas page content resides
        // We'll be inserting our content before this
        let canvasContent = document.getElementById('context_modules');

        // on a canvas page where there are no modules
        if (canvasContent === null) {
            return;
        }

        // create the cc-canvas-collections div
        let ccCanvasCollections = this.createElement('div', 'cc-canvas-collections');
        ccCanvasCollections.id = 'cc-canvas-collections';

        //if (this.options.navBar && this.configured) {
        if (this.configured) {
            let navBar = this.generateNavBar();
            ccCanvasCollections.appendChild(navBar);
        }

        let cards = this.generateCards();
        ccCanvasCollections.appendChild(cards);

        // insert the collections before canvasContent
        //result = canvasContent.insertBefore(ccCanvasCollections, canvasContent.firstChild);
        const result = canvasContent.insertBefore(ccCanvasCollections, canvasContent.firstChild);

        // cards are now in the DOM, do some final updates

        // Make the cards clickable
        this.stopCardDescriptionPropagation();
        this.makeCardsClickable();

        // Update the titles of the modules to add the collection name
        if (this.options.updateTitle) {
            this.updateCanvasModuleList();
        }
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

    /**
     * @desc Modify the Canvas module list DOM to represent collections, including:
     * - hide modules that aren't part of the current collection
     * - add the collection name to the module title
     * 
     */

    updateCanvasModuleList() {
        // update the Module titles div#module.id > span.name
        for (let numModule in this.modules) {
            let aModule = this.modules[numModule];
            // Find the module's name and it's title dom
            let divDom = document.querySelector(`div#context_module_${aModule.id}`);
            let spanDom = divDom.querySelector('span.name');

            // if we found the title, add the collection details
            if (spanDom) {
                // only if the module name isn't already there
                if (spanDom.textContent.indexOf(`(${aModule.collection})`) === -1) {
                    spanDom.innerHTML = `${spanDom.textContent} - <small>(${aModule.collection})</small>`;
                }
            } else {
                console.error(`no span.name found for module ${aModule.title}`);
            }

            // hide the module if it's not in the current collection
            // but make it's visible otherwise
            if (aModule.collection === this.currentCollection || this.canvasOption === 'all') {
                divDom.style.display = 'block';
            } else {
                divDom.style.display = 'none';
            }
        }
    }

    /**
     * @desc Based on collections in modules, generate nav bar to select collections
     * TODO
     * - Will need to dynamically generate based on collections in Modules
     * - Add javascript handler to make changes
     * - Modify other code
     * @returns DOMelment navBar the dom element for the nav bar
     */
    generateNavBar() {
        console.log('XXXXXXXXXXXXXXXXX nav bar');
        let navBar = this.createElement('div', ['flex', 'justify-between']);

        navBar.classList.add("p-4");
        navBar.classList.add("border-gray");


//        let collections = COLLECTIONS_DEFAULTS;

        let styles = {
            'active': 'inline-block border border-blue-500 rounded py-2 px-4 bg-blue-500 hover:bg-blue-700 text-white',
            'inactive': 'inline-block border border-white rounded hover:border-gray-200 text-blue-500 hover:bg-gray-200 py-2 px-4',
            'disabled': 'inline-block py-2 px-4 text-gray-400 cursor-not-allowed',
        }

        for (let collection of this.collections) {
            let navClass = ['li', 'mr-4'];
            let style = 'inactive';

            if (collection === this.currentCollection) {
                style = 'active';
            }

            let navElement = `
		  <a class="${styles[style]}" href="#">${collection}</a>
		`;
            let navItem = this.createElement('li', 'mr-4');
            //navItem.onclick = () => cc_collectionClick(collection,this);
            navItem.onclick = () => this.collectionsClick(collection, this);
            navItem.innerHTML = navElement;
            navBar.appendChild(navItem);
        }
        return navBar;
    }

    /**
     * @desc generate a DOM element that represents cards for all the modules
     * Currently hard-coded dumb to do rows of three
     * @returns DOM element - representing all the cards
     */
    generateCards() {

        //        let cardCollection = this.createElement('div', 'cc-canvas-collections-cards');
        let cardCollection = this.createElement('div', ['flex', 'flex-wrap', '-m-3']);
        cardCollection.id = "guCardInterface";
        const numModules = this.modules.length;
        //        const numRequiredRows = Math.ceil(numModules/3);

        let cardsShown = 0;

        // for each module generate card and append
        for (let i = 0; i < numModules; i++) {
            let module = this.modules[i];
            if (module.collection === this.currentCollection || this.options.collectionView === 'all') {
                let card = this.generateCard(module);
                cardCollection.appendChild(card);
                // once card is added to DOM, can do further updates
                this.updateProgress(module, cardCollection);
                this.updateImage(module, cardCollection);
                cardsShown += 1;
            }
        }

        // show appropriate message if no cards shown
        if (cardsShown === 0) {
            let noCards = this.createElement('div', 'cc-canvas-collections-no-cards');
            // add some padding-left
            noCards.style.paddingLeft = '2rem';
            noCards.style.paddingTop = '2rem';

            noCards.innerHTML = `
		<h3>No matching modules for this collection</h3>
    
		<p>No modules found in collection ${this.currentCollection}</p>`;
            cardCollection.appendChild(noCards);
        }

        //        let module = 0;
        /*        for (let row=0; row<numRequiredRows; row++) {
		let rowCollection = this.createElement('div', 'row');
		for (let col=0; col<3; col++) {
		    if (module<numModules) {
			let card = this.generateCard(this.modules[module]);
			rowCollection.appendChild(card);
			module++;
		    }
		}
		cardCollection.appendChild(rowCollection); */
        //        }

        return cardCollection;
    }


    /**
     * @desc generate a DOM element representing a module for insertion into page
     * @param cc_Module module - object with module data
     * @returns DOMelement - representing card
     */
    generateCard(module) {
        let imageUrl = "https://www.signfix.com.au/wp-content/uploads/2017/09/placeholder-600x400.png";
        let engage = 'Engage';

        if ('image' in module) {
            imageUrl = module.image;
        }
        if ('engage' in module) {
            engage = module.engage;
        }


        const completion = this.generateCompletionView(module.completionStatus)
        const DATE = this.generateDateView(module.date);

        //        let WIDTH="w-full sm:w-1/2 md:w-1/3";
        let COMING_SOON = "";
        let LINK_ITEM = `
	    <p>&nbsp;<br /> &nbsp;</p>
	    <div class="p-4 absolute pin-r pin-b" style="right:0;bottom:0">
	       <a href="#${module.id}" class="gu-engage"><div class="hover:bg-blue-100 text-blue-900 font-semibold hover:text-white py-2 px-4 border border-blue-900 hover:border-transparent rounded">
		${engage}
	    </div></a>
	    </div>
	    `;
        let EDIT_ITEM = "";
        let REVIEW_ITEM = ""

        let description = module.description;

        let published = this.generatePublishedView(module.published);

        let IFRAME = "";

        let imageSize = "bg-cover";
        if ("imageSize" in module) {
            imageSize = module.imageSize;
        }
        if (imageSize === "bg-contain") {
            imageSize = "bg-contain bg-no-repeat bg-center"
        }


        //<div class="clickablecard w-full sm:w-1/2 ${WIDTH} flex flex-col p-3">
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
        //</div>

        // convert cardHtml into DOM element
        let wrapper = this.createElement('div', [
            'clickablecard', 'w-full', 'sm:w-1/2', 'md:w-1/3', 'flex', 'flex-col', 'p-3'
        ]);
        wrapper.innerHTML = cardHtml;
        return wrapper;
    }


    /**
     * @desc add representation of student's progress to the card
     * - use https://github.com/GMartigny/circular-progress-bar
     * Create the progress bar component, using module.percentItemsComplete
     * and added it to div.cc_progress in the module's card
     * 
     * @param Object module 
     * @param cardCollection DOM element containing card collection to date
     */
    updateProgress(module, cardCollection) {
        // no progress if null
        if (module.percentItemsComplete === null) {
            return;
        }

        let valueBackground = "#ccc";

        if (module.percentItemsComplete >= 100) {
            valueBackground = "rgb(16,185,129)";
        } else if (module.percentItemsComplete < 50) {
            valueBackground = "rgb(245,158,11)";
        }

        const options = {
            size: 50,
            background: "#eee",
            valueBackground: valueBackground,
            colors: ["#0484d1", "#e53b44", "#2ce8f4", "#ffe762", "#63c64d", "#fb922b"]
        };
        const progress = new CircularProgressBar(module.percentItemsComplete, options);
        let card = cardCollection.querySelector(`div#cc_module_${module.id}`);
        let progressDiv = card.querySelector('div.cc_progress');
        if (progressDiv) {
            progress.appendTo(progressDiv);
        }
    }

    /**
     * @desc If there's no image, remove the div.cc_module_image for the
     * module's card
     * @param Object module 
     * @param DomElement cardCollection 
     */
    updateImage(module, cardCollection) {

        // if is an image, don't remove
        if ("image" in module && module.image !== "") {
            return;
        }

        // if there's a date, don't remove
        if (module.date !== undefined) {
            return;
        }

        let card = cardCollection.querySelector(`div#cc_module_${module.id}`);
        let imageDiv = card.querySelector('div.cc_module_image');
        // remove imageDiv
        if (imageDiv) {
            imageDiv.remove();
        }
    }

    /**
     * @descr generate ribbon/html to add to card to show completion status
     * @param String completionStatus 
     * @returns html 
     */
    generateCompletionView(completionStatus) {
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
     * @desc generate html showing if module is unpublished
     * i.e. only show message if unpublished
     * @param boolean true iff published
     * @returns string html empty if published warning if unpublished
     */
    generatePublishedView(published) {
        if (published) {
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
     * @desc generate HTML for representing the moduleDate
     * @param object moduleDate - object with date data
     * @returns string - HTML for representing the moduleDate
     */
    generateDateView(moduleDate) {

        // return '' if moduleData undefined
        if (moduleDate === undefined) {
            return '';
        }

        let date = {
            'label': '',
            'week': '',
            'time': '',
            'month': '',
            'date': ''
        };
        let dateSet = false;

        if ('start' in moduleDate) {
            return this.generateDualDate(moduleDate);
        }

        // loop thru each element of date
        for (let key in date) {
            if (key in moduleDate) {
                dateSet = true;
                date[key] = moduleDate[key];
            }
        }

        let week = '';
        let time = ''
        if (dateSet) {
            if ('week' in moduleDate) {
                week = `
		    <div class="bg-yellow-200 text-black py-0"> 
		    ${date.week}
		    </div>
		    `;
                if (moduleDate.week === null) {
                    week = '';
                }
            }
            if ('time' in moduleDate) {
                time = `
		    <div class="bg-yellow-200 text-black py-0 text-xs">
		    ${date.time}
		    </div>
		    `;
            }
        }

        let DATE = `
	<div class="block rounded-t rounded-b overflow-hidden bg-white text-center w-24 absolute"
	    style="right:0;top:0;"
	>
	  <div class="bg-black text-white py-0 text-xs border-l border-r border-t border-black">
	     ${date.label}
	  </div>
	  ${week}
	  ${time}
	  <div class="bg-red-900 text-white py-0 border-l border-r border-black">
	       ${date.month}
	  </div>
	  <div class="pt-1 border-l border-r border-b border-black rounded-b">
	       <span class="text-2xl font-bold">${date.date}</span>
	  </div>
	</div>
	    `;
        if (!dateSet) {
            DATE = '';
        }

        return DATE;
    }

    /**
     * @desc generate html to represent a dual date
     * @param Object moduleDate 
     * @returns html
     */
    generateDualDate(moduleDate) {

        let date = {
            'label': moduleDate.label,
            'monthStart': moduleDate.start.month,
            'dateStart': moduleDate.start.date,
            'monthStop': moduleDate.stop.month,
            'dateStop': moduleDate.stop.date,
        };

        let WEEK = `
		<div class="bg-yellow-200 text-black py-0 border-l border-r border-black">
		    Week ${moduleDate.start.week} to ${moduleDate.stop.week}
		</div>
	    `;
        if ((moduleDate.start.week === null) || (moduleDate.stop.week === null)) {
            WEEK = '';
        }
        let DAYS = ``;

        let DATE = `
	    <div class="block rounded-t rounded-b overflow-hidden bg-white text-center w-24 absolute"
		style="right:0;top:0">
		      <div class="bg-black text-white py-0 text-xs border-l border-r border-black">
			 ${date.label}
		      </div>
		      ${WEEK}
		      <div class="bg-red-900 text-white flex items-stretch py-0 border-l border-r border-black">
			  <div class="w-1/2 flex-grow">${date.monthStart}</div>
			  <div class="flex items-stretch border-l border-black flex-grow  -mt-1 -mb-1"></div>
			  <div class="w-1/2">${date.monthStop}</div>
		      </div>
		      <div class="border-l border-r border-b text-center flex border-black items-stretch pt-1 py-0">
			   <div class="w-1/2 text-2xl flex-grow font-bold">${date.dateStart}</div>
			   <div class="flex font-bolditems-stretch border-l border-black flex-grow -mt-1"></div>
			  <div class="w-1/2 text-2xl font-bold">${date.dateStop}</div>
		      </div>
		     </div> 
	    `;

        return DATE;
    }

    /**
     * Create an element with an option css class
     * @param string tag 
     * @param string className 
     * @returns element - created DOM element
     */
    createElement(tag, className) {
        const element = document.createElement(tag)
        if (className) {
            // if className is an array, add each class
            if (Array.isArray(className)) {
                for (let c of className) {
                    element.classList.add(c);
                }
            } else {
                element.classList.add(className)
            }
        }
        return element
    }

    /**
     * @param string selector 
     * @returns element - DOM element 
     */
    getElement(selector) {
        const element = document.querySelector(selector)

        return element
    }
}