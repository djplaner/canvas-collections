

const COURSE_ID=ENV.COURSE_ID;
//const CSS_URL='<link rel="stylesheet" href="https://s3.amazonaws.com/filebucketdave/banner.js/cards.css" />';
const TAILWIND_CSS='<link href="https://unpkg.com/tailwindcss@^2/dist/tailwind.min.css" rel="stylesheet">';
const CANVAS_COLLECTIONS_CSS='<link href="https://djon.es/gu/canvas/canvas-collections.css" rel="stylesheet">';

const DEFAULT_VIEW_OPTIONS = {
    // how to view collections: 
    // - current - show the current collection
    // - all - show all collections
    'collectionView': 'current',  
    // whether to who nav bar
    'navBar' : true,
    // whether to update the module title with collection name
    'updateTitle' : true
};


// Hard code default card values for 1031LAW_3215
// key is the module name

const DEFAULT_ACTIVE_COLLECTION = 'Learning Journey';
const COLLECTIONS_DEFAULTS = [
    "Learning Journey", "Assessment Essentials", "Online Workshops", "Student Support"
];

const META_DATA_FIELDS = [
    'image', 'label', 'imageSize', 'num', 'description', 'collection'
]

const CARD_DEFAULTS = {
    'Welcome' : {
        'image': 'https://i.ytimg.com/vi/gkdGXFcxHw4/maxresdefault.jpg',
        'label': '',
        'imageSize': 'bg-contain',
        'num': '',
        'description': `<ul>
          <li> What will you learn? </li>
          <li> What do you need to do? </li>
          <li> How will you show what you've learnt?</li> </ul>
          <p><a href="https://google.com">Google</a>`,
        'collection': 'Learning Journey',
        'date': {
            'label': 'Commencing', 'week': 'Week 0', 'month': 'Jul', 'date': '12'
        }
    },
    'Introduction': {
        'image': 'https://lms.griffith.edu.au/courses/122/files/795/preview',
        'label': 'Topic',
        'imageSize': 'bg-contain',
        'num': '1',
        'description': '<p>Overview of Foundations of Law and My Law Career</p>',
        'collection': 'Learning Journey',
        'date': {
            'label': 'Commencing', 'week': 'Week 1', 'month': 'Jul', 'date': '19'
        }
    },
    'Making and Finding Law': {
        'image': 'https://lms.griffith.edu.au/courses/122/files/797/preview',
        'label': 'Topic',
        'imageSize': 'bg-cover',
        'num': '2',
        'description': 'How law is made - and how to find the law (legislation and case)',
        'collection': 'Learning Journey',
        'date': {
            'label': 'From',
            'start' : { 'week': '2', 'month': 'Jul', 'date': '26'},
            'stop': { 'week': '3', 'month': 'Aug', 'date': '6'},
        }
    },
    'Introduction to Legal Theory' : {
        'image': 'https://lms.griffith.edu.au/courses/122/files/798/preview',
        'label': 'Topic',
        'imageSize': 'bg-contain',
        'num': '3',
        'description': '',
        'collection': 'Learning Journey',
        'date': {
            'label': 'Commencing', 'week': 'Week 4', 'month': 'Aug', 'date': '16'
        }
    },
    'Statutory Interpretation': {
//        'image': 'https://lms.griffith.edu.au/courses/122/files//preview',
        'label': 'Topic',
        'imageSize': 'bg-cover',
        'num': '4',
        'description': '<p>How to interpret legislation (i.e. work out what it means)</p>',
        'collection': 'Learning Journey',
        'date': {
            'label': 'From',
            'start' : { 'week': '5', 'month': 'Aug', 'date': '23'},
            'stop': { 'week': '7', 'month': 'Sep', 'date': '10'},
        }
    },
    'Case Law' : {
        'image': 'https://lms.griffith.edu.au/courses/122/files/799/preview',
        'label': 'Topic',
        'imageSize': 'bg-cover',
        'description': '<p>How to read and understand case law (i.e. written judgements)</p>',
        'num': '6',
        'collection': 'Learning Journey',
        'date': {
            'label': 'From',
            'start' : { 'week': '8', 'month': 'Sep', 'date': '13'},
            'stop': { 'week': '9', 'month': 'Sep', 'date': '24'},
        }
    },
    'The Legal Profession' : {
        'image': 'https://lms.griffith.edu.au/courses/122/files/796/preview',
        'label': 'Topic',
        'imageSize': 'bg-cover',
        'num': '7',
        'description': '<p>Introduction to the legal profession and legal professional ethics.</p>',
        'collection': 'Learning Journey',
        'date': {
            'label': 'Commencing', 'week': 'Week 10', 'month': 'Sep', 'date': '27'
        }
    },
    'First Nations People and the Law' : {
        'image': 'https://lms.griffith.edu.au/courses/122/files/801/preview',
        'label': 'Topic',
        'imageSize': 'bg-cover',
        'num': '8',
        'description': '<p>Introduction to First Nations people and the law</p>',
        'collection': 'Learning Journey',
        'date': {
            'label': 'Commencing', 'week': 'Week 11', 'month': 'Oct', 'date': '4'
        }
    },
    'Consolidating Knowledge' : {
        'image': 'https://lms.griffith.edu.au/courses/122/files/800/preview',
        'label': 'Topic',
        'imageSize': 'bg-cover',
        'num': '9',
        'description': '<p>Revision and preparation for final assessment</p>',
        'collection': 'Learning Journey',
        'date': {
            'label': 'Commencing', 'week': 'Week 12', 'month': 'Oct', 'date': '11'
        }
    },
    // Assessment 1031LAW
    'Accessing Case Law and Legislation' : {
//        'image': 'https://lms.griffith.edu.au/courses/122/files/800/preview',
        'label': 'Assessment',
//        'imageSize': 'bg-cover',
        'num': '1',
        'description': `<p>Complete a 50 minute online exam. Released 9am on Tuesday of 
        Week 4 and closed at 5pm on Friday of Week 4.</p>`,
        'collection': 'Assessment Essentials',
        'date': {
            'label': 'From',
            'start' : { 'week': null, 'month': 'Aug', 'date': '17'},
            'stop': { 'week': null, 'month': 'Aug', 'date': '20'},
        }
    },
    'Legislation, Case Law and Statutory Interpretation Assignment' : {
//        'image': 'https://lms.griffith.edu.au/courses/122/files/800/preview',
        'label': 'Assessment',
  //      'imageSize': 'bg-cover',
        'num': '2',
        'description': `<p>Prepare succinct memos explaining and commenting on a piece of legislation and a case
        respectively, and apply rules of statuory interpretation.</p>`,
        'collection': 'Assessment Essentials',
        'date': {
            'label': 'Due', 'week': null, 'month': 'Sep', 'date': '27'
        }
    },
    'Take-Home Exam' : {
   //     'image': 'https://lms.griffith.edu.au/courses/122/files/800/preview',
        'label': 'Assessment',
//        'imageSize': 'bg-cover',
        'num': '3',
        'description': `<p>Complete a 2 hour open-book take home exam with both short-answer and hypothetical questions.</p>`,
        'collection': 'Assessment Essentials'
    }
};


/****************
 * CanvasModulesViews - render the updated module information
 */

class cc_CanvasModulesView {

    /**
     * @desc insert HTML into Canvas modules page offering different representation of module information
     * @param modules cc_CanvasModules object containing all info about current pages modules
     * @param collectionsClick eventHandler for click on named collection links
     * @param option object - defining how to configure the view
     */
    constructor(modules,collectionsClick,options=null) {
        this.model = modules;
        this.modules = this.model.modules;
        this.collectionsClick = collectionsClick;
        this.currentCollection = this.model.currentCollection;

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
        if (canvasContent===null) {
            return;
        }

        // create the cc-canvas-collections div
        let ccCanvasCollections = this.createElement('div', 'cc-canvas-collections');
        ccCanvasCollections.id = 'cc-canvas-collections';

        if ( this.options.navBar ) {
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
        if ( this.options.updateTitle) {
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
        for (let i=0; i<links.length; i++) {
            links[i].addEventListener('click', function(e) {
                e.stopPropagation();
            });
        }
    }

    /**
     * @desc add a click event to each .clickablecard based on their .cardmainlink
     * child
     */
    makeCardsClickable(){

        // get all the clickable cards
        let cards = document.getElementsByClassName('clickablecard');
        for (let i=0; i<cards.length; i++) {
            let card = cards[i];

            // add the event listener
            card.addEventListener('click', function (event)  {
                let link = this.querySelector(".cardmainlink");
                if (link!==null) {
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
        for ( let numModule in this.modules ) {
            let aModule = this.modules[numModule];
            // Find the module's name and it's title dom
            let divDom = document.querySelector( `div#context_module_${aModule.id}`);
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
            if (aModule.collection === this.currentCollection || this.canvasOption==='all') {
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
    generateNavBar(){
        let navBar = this.createElement('div', ['flex','justify-between']);

        let collections = COLLECTIONS_DEFAULTS;

        let styles = {
            'active': 'inline-block border border-blue-500 rounded py-2 px-4 bg-blue-500 hover:bg-blue-700 text-white',
            'inactive': 'inline-block border border-white rounded hover:border-gray-200 text-blue-500 hover:bg-gray-200 py-2 px-4',
            'disabled': 'inline-block py-2 px-4 text-gray-400 cursor-not-allowed',
        }

        for (let collection of collections) {
            let navClass = ['li', 'mr-4'];
            let style = 'inactive';

            if (collection === this.currentCollection) {
                style='active';
            }

            let navElement = `
              <a class="${styles[style]}" href="#">${collection}</a>
            `;
            let navItem = this.createElement('li', 'mr-4');
            //navItem.onclick = () => cc_collectionClick(collection,this);
            navItem.onclick = () => this.collectionsClick(collection,this);
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
        let cardCollection = this.createElement('div', ['flex','flex-wrap','-m-3']);
        cardCollection.id ="guCardInterface";
        const numModules = this.modules.length;
//        const numRequiredRows = Math.ceil(numModules/3);

        let cardsShown = 0;

        // for each module generate card and append
        for (let i=0; i<numModules; i++) {
            let module = this.modules[i];
            if ( module.collection===this.currentCollection || this.options.collectionView==='all') {
                let card = this.generateCard(module);
                cardCollection.appendChild(card);
                // once card is added to DOM, can do further updates
                this.updateProgress(module,cardCollection);
                this.updateImage(module,cardCollection);
                cardsShown+=1;
            }
        }

        // show appropriate message if no cards shown
        if (cardsShown===0) {
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

        if ('image' in module){
            imageUrl = module.image;
        }
        if ('engage' in module){
            engage = module.engage;
        }

        
        const completion = this.generateCompletionView(module.completionStatus)
        const DATE = this.generateDateView(module.date);

//        let WIDTH="w-full sm:w-1/2 md:w-1/3";
        let COMING_SOON="";
        let LINK_ITEM=`
        <p>&nbsp;<br /> &nbsp;</p>
        <div class="p-4 absolute pin-r pin-b" style="right:0;bottom:0">
           <a href="#${module.id}" class="gu-engage"><div class="hover:bg-blue-100 text-blue-900 font-semibold hover:text-white py-2 px-4 border border-blue-900 hover:border-transparent rounded">
            ${engage}
        </div></a>
        </div>
        `;
        let EDIT_ITEM="";
        let REVIEW_ITEM=""

        let description = module.description;

        let published = this.generatePublishedView(module.published);

        let IFRAME="";

        let imageSize = "bg-cover";
        if ("imageSize" in module ) {
            imageSize = module.imageSize;
        }
        if (imageSize==="bg-contain") {
            imageSize="bg-contain bg-no-repeat bg-center"
        }


//<div class="clickablecard w-full sm:w-1/2 ${WIDTH} flex flex-col p-3">
        const cardHtml =`
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
            'clickablecard','w-full','sm:w-1/2','md:w-1/3', 'flex', 'flex-col', 'p-3'
        ] );
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
    updateProgress(module,cardCollection) {
        // no progress if null
        if (module.percentItemsComplete===null ) {
            return;
        }

        let valueBackground = "#ccc";

        if (module.percentItemsComplete>=100) {
            valueBackground = "rgb(16,185,129)";
        } else if (module.percentItemsComplete<50) {
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
    updateImage(module,cardCollection) {

        // if is an image, don't remove
        if ( "image" in module && module.image!=="") {
            return;
        }

        // if there's a date, don't remove
        if (module.date!==undefined) {
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

        if (!(completionStatus in colour) ){
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
        if (published){
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
        if (moduleDate===undefined) {
            return '';
        }

        let date = {
            'label': '', 'week': '', 'time': '', 'month': '', 'date': ''
        };
        let dateSet = false;

        if ('start' in moduleDate) {
            return this.generateDualDate(moduleDate);
        }

        // loop thru each element of date
        for (let key in date) {
            if ( key in moduleDate) {
                dateSet = true;
                date[key] = moduleDate[key];
            }
        }

        let week = '';
        let time = ''
        if ( dateSet) {
            if ('week' in moduleDate) {
                week = `
                <div class="bg-yellow-200 text-black py-0"> 
                ${date.week}
                </div>
                `;
                if (moduleDate.week===null) {
                    week='';
                }
            }
            if ('time' in moduleDate){
                time=`
                <div class="bg-yellow-200 text-black py-0 text-xs">
                ${date.time}
                </div>
                `;
            }
        }

        let DATE=`
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
        if ( ! dateSet ) {
            DATE='';
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
        if ( (moduleDate.start.week===null) || (moduleDate.stop.week===null) ) {
            WEEK='';
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

/******************************
 * CanvasModules - extract all module information
 */
class cc_Item {
    /**
     * @descr construct object representing a Canvas module item
     * Data members includes
     * - id - unique id for item
     * - title - title of item
     * - itemType - type of item
     * - url - url for item
     * - about - simple object containing the item's additional information
     * @param DOMelement element - item's DOM element
     */
    constructor(element){
        this.extractId(element);
        this.extractItemTypeAndId(element);
        this.extractTitleAndUrl(element)
        this.extractAbout(element)

        this.extractStatus(element)
        
//        console.log(`canvas-collection:    -- ${this.position}) item ${this.id} '<a href="${this.url}">${this.title}</a>' is ${this.itemType}`);
//        console.log(`canvas-collection:    about ${JSON.stringify(this.about)}`);
    }

    /**
     * @desc Item's id is DOM element id = "context_module_item_" + id 
     * @param DOMElement element - for entire item
     */
    extractId(element){
        this.id = null;
        // get dom element id
        let id = element.id;
        // extract id from context_module_item_ + id
        const regex = /context_module_item_(\d+)/;
        let match = id.match(regex);
        if (match) {
            this.id = parseInt(match[1]);
        }
    }

    /**
     * @desc Set the item's title specified in DOM element a.title innerText
     * - Except if itemType is SubHeader - which has no link span.title innerText
     * @param DOMEelement element 
     */
    extractTitleAndUrl(element){
        this.title = null;
        this.url = null
        let titleLink = element.querySelector('a.title');
        if (titleLink!==null){
            this.title = titleLink.innerText;
            this.url = titleLink.href;
        }

        // if still null, might be subHeader, try span.title
        let subHeaderTitle = element.querySelector('span.title');
        if (subHeaderTitle!==null){
            this.title = subHeaderTitle.innerText;
        }
    }

    /**
     * @desc Item's type defined by Canvas
     * https://canvas.instructure.com/doc/api/modules.html#method.context_module_items_api.create
     * But class name will be slightly different. Also includes an "id" for the type
     * API type / class name / type id
     * 
     * File / attachment / Attachment_786
     * Page / wiki_page / WikiPage_466
     * Discussion / discussion_topic / DiscussionTopic_\d+
     * Quiz 
     * Assignment / assignment / Assignment_\d+
     * ExternalTool / content_external_tool / ContentExternalTool_\d+
     * ExternalUrl / external_url / ExternalUrl_\d+
     * SubHeader / context_module_sub_header / ContextModuleSubHeader_\d+
     * 
     * ?? / lti-quiz / Assignment_\d+
     * 
     * Will be one of the class attributes - but may not use exactly these names
     * @param DOMElement element - for entire item
     */
    extractItemTypeAndId(element){
        let classes = element.classList;


        this.itemType = classes;
        this.typeId = null;

    }

    /**
     * @desc HTML for each item also contains additional information
     * within span.item_name. Each information is stored in a span with a
     * class name that labels the information, style="display:none" and values
     * 
     * Extract this information and story in the about "object"
     * 
     * Includes "position" which is also set at the object level
     * 
     * @param DOMElement element - for entire item
     */

    extractAbout(element){
        this.about = {};
        let aboutSpans = element.querySelectorAll('span.item_name > span');

        for (let i=0; i<aboutSpans.length; i++){
            let span = aboutSpans[i];
            // only if display is none
            if (span.style.display==='none'){ 
                let className = span.className;
                let value = span.innerText;
                this.about[className] = value;
            }
        }
        // set position data member if present in about
        if ( 'position' in this.about ) {
            this.position = this.about.position;
        } 
    }

    /**
     * @desc Extract the status for a module item from the domelement
     * div.module-item-status-icon will contain the icon
     * - completed = i.class="icon-check" title="Completed"
     * - MarkAsRead = i.class="icon-mark-as-read" title="Must view the page"
     * 
     * Set 
     * - this.status with the name of the status
     * - this.isComplete with true iff completed
     * @param {*} element 
    */
    extractStatus(element){

        this.status = null;
        this.isComplete = false;
        // get the div.module-item-status
        let statusDiv = element.querySelector('div.module-item-status-icon');

        if (!statusDiv) {
            return;
        }
        // try markAsRead
        let markAsRead = statusDiv.querySelector('i.icon-mark-as-read');
        if (markAsRead) {
            this.status = 'MarkAsRead';
            return;
        }
        // try completed
        let completed = statusDiv.querySelector('i.icon-check');
        if (completed) {
            this.status = 'Completed';
            this.isComplete = true;
        }
    }


}

class cc_Module {
    constructor( element, options=null ) {
        this.extractId(element);
        this.extractTitle(element);
        this.extractItems(element);
        this.extractPublished(element);
        this.extractCompletionStatus(element);

        this.calculateItemProgress();

        this.collection = null;
        this.options = DEFAULT_VIEW_OPTIONS;
        if (options) {
            this.options = options;
        }

        this.addModuleDefaults();

        // TODO 
        // - prerequisites
        // - requirements_message

        console.log(`canvas-collections: Module ${this.id} title ${this.title}`);
    }


    /**
     * @descr based on the module's title add some default values from CARD_DEFAULTS
     */
    addModuleDefaults() {
        // only add defaults if the current location is griffith.edu.au and there's
        // an entry in CARD_DEFAULTS for this module
        if (! location.hostname.match(/griffith\.edu\.au/) || !(this.title in CARD_DEFAULTS)) {
            // loop through META_DATA_FIELDS list
            for (let field of META_DATA_FIELDS) {
                // if this has no member field
                if (! (field in this)) {
                    this[field] = '';
                }
            }
            return;
        }

        let defaults = CARD_DEFAULTS[this.title];
        for (let key in defaults) {

            this[key] = defaults[key];
        }

    }

    /**
     * @desc Return the id of the module as specified in attribute data-module-id
     * @param DOMElement element - the module dom element
     */
    extractId(element){
        this.id = null;
        // attribute data-module-id contains the id
        let id=element.getAttribute('data-module-id');
        if (id!==null){
            this.id = parseInt(id);
        }
    }

    /**
     * @desc Return the title of the module - look for span.name value within element
     * @param {*} element 
     */
    extractTitle(element){
        this.title = null;
        let nameSpan = element.querySelector('span.name');
        if (nameSpan!==null){
            this.title = nameSpan.innerText;
        }
    }

    /**
     * @desc generate an array of cc_Item objects for the module from 
     * div#context_module_content_ID > ul.context_module_items
     * @param DOMElement element 
     * @returns array of cc_Item objects
     */
    extractItems(element) {
        let items = [];
        let itemList = element.querySelector('ul.context_module_items');
        if (itemList!==null){
            let itemElements = itemList.querySelectorAll('li.context_module_item');
            for (let itemElement of itemElements){
                items.push(new cc_Item(itemElement));
            }
        }
        this.items = items;
    } 

    /**
     * @desc set the published status of the module 
     * - default published==True, look for icon.unpublish value within element
     * @param DOMElement element
     */
    extractPublished(element){
        this.published = true;
        // the icon can be unreliable
        //let unpublishIcon = element.querySelector('i.icon-unpublish');
        let unpublish = element.querySelector('span.publish-icon');
        // is unpublished in the class list
        if (unpublish!==null && unpublish.classList.contains('unpublished')){
//        if (unpublishIcon!==null){
            this.published = false;
        }
    }

    /**
     * @desc figure out the modules completion status
     * - Completed - i.complete_icon is display:visible
     * - In Progress - i.in_progress_icon is display:visible
     * - Locked - i.locked_icon is display:visible
     * @param DOM Element Module dom element
     */
    extractCompletionStatus(element){
        this.completionStatus = '';

        const statusCheck = {
            'i.complete_icon': 'Completed',
            'i.in_progress_icon': 'In Progress',
            'i.locked_icon': 'Locked'
        }

        for (let key in statusCheck) {
            let icon = element.querySelector(key);
            if (icon!==null){
                // set completionStatus if display is visible
                let style = window.getComputedStyle(icon);
                if (style.display!=='none'  ){
                    this.completionStatus = statusCheck[key];
                    break;
                }
            }
        }
    }

    /**
     * @desc based on the completion status of items set % of items completed
     * for the module
     * 
     * set this.percentItemsComplete = % of itemsToComplete completed
     */
    calculateItemProgress() {
        // null if there is no item progress in this module
        this.percentItemsComplete=null;
        const numItems = this.items.length;
        // # of items that can be completed are those with item.status!=null
        const numItemsToComplete = this.items.filter(item => item.status!==null).length;
        // # of items completed are those with item.isComplete==true
        const numItemsCompleted = this.items.filter(item => item.isComplete).length;

        if (numItemsToComplete===0 ) {
            return;
        }

        this.percentItemsComplete = Math.round(numItemsCompleted / numItemsToComplete * 100);

    }
}

class cc_CanvasModules {
    constructor( ){
        // get all the div with ids starting with context_module_ within div#context_modules
        this.moduleElements = document.querySelectorAll( 'div#context_modules > div[id^=context_module_]');

        this.currentCollection = DEFAULT_ACTIVE_COLLECTION;

        // loop thru each moduleElement and construct a cc_Module object
        this.modules = Array.from( this.moduleElements).map( ( moduleElement) => {
            return new cc_Module( moduleElement);
        });

        // simple dump
        console.log(this.modules);
    }
}

/**
 * cc_controller.js
 */


 /**
  * @descr Basic controller, creates the model and generates the view
  */
 
class cc_Controller {
 
     constructor() {
 
         // check queryString for cc-collections
         // for some reason .search doesn't work on canvas
         // TODO this is currently not working
         const location = window.location.href;
         // extract from location everything after ?
         const queryString = location.substring(location.indexOf('?') + 1);
     
         // define options
         let options = DEFAULT_VIEW_OPTIONS;
     
         const urlParams = new URLSearchParams(queryString);
         const collectionsOption = urlParams.get('cc-collections');
         if (collectionsOption) {
             options.collectionView = collectionsOption;
         }
         if (!window.location.hostname.match(/griffith\.edu\.au/)) {
             options.collectionView='all';
             options.navBar = false;
             options.updateTitle = false;
         }
     
         // extract all module information
         this.modules = new cc_CanvasModules();
         // update the page to add Card Information
         this.view = new cc_CanvasModulesView(this.modules,this.collectionClick,options);
         this.view.render();
     }
     
     /**
      * @desc Handle any clicks on the collections nav bar
      * @param collectionName string - name of the collection that was clicked on
      */
     
     collectionClick( collectionName, view){
         // change current collection
         view.currentCollection = collectionName;
         // remove div#guCardInterface
         view.removeCanvasCollectionsView();
         view.render();
     }
 }



function canvasCollections() {
    document.head.insertAdjacentHTML( 'beforeend', TAILWIND_CSS );

    // Wait for everything to load
    window.addEventListener('load', function(){
        // getting very kludgy here, haven't got a good solution...yet #14
        this.setTimeout(
            () => {
                let controller = new cc_Controller();
            }, 2000
        );

        
    }, false);

}
