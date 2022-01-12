// ==UserScript==
// @name         canvas-collections
// @namespace    https://www.griffith.edu.au/
// @version      0.1
// @description  Enable creation of collection of Canvas modules and alternate representations
// @author       David Jones
// @match        https://lms.griffith.edu.au/*/modules
// @match        https://griffith.instructure.com/*/modules
// @icon         https://www.google.com/s2/favicons?domain=griffith.edu.au
// @grant        none
// ==/UserScript==

const COURSE_ID=ENV.COURSE_ID;
//const CSS_URL='<link rel="stylesheet" href="https://s3.amazonaws.com/filebucketdave/banner.js/cards.css" />';
const CSS_URL='<link href="https://unpkg.com/tailwindcss@^2/dist/tailwind.min.css" rel="stylesheet">';

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
          <li> How will you show what you've learnt?</li> </ul>`,
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

/**
 * @descr Basic controller, creates the model and generates the view
 */

function cc_pageLoaded( ){

    // check queryString for cc-collections
    // for some reason .search doesn't work on canvas
    // TODO this is currently not working
    const location = window.location.href;
    // extract from location everything after ?
    const queryString = location.substring(location.indexOf('?') + 1);

    const urlParams = new URLSearchParams(queryString);
    const collectionsOption = urlParams.get('cc-collections');

    // extract all module information
    let modules = new cc_CanvasModules();
    // update the page to add Card Information
    let view = new cc_CanvasModulesView(modules,collectionsOption);
    view.render();
}

/**
 * @desc Handle any clicks on the collections nav bar
 * @param collectionName string - name of the collection that was clicked on
 */

function cc_collectionClick( collectionName, view){
    // change current collection
    view.currentCollection = collectionName;
    // remove div#guCardInterface
    view.removeCanvasCollectionsView();
    view.render();
}

/****************
 * CanvasModulesViews - render the updated module information
 */

class cc_CanvasModulesView {

    /**
     * @desc insert HTML into Canvas modules page offering different representation of module information
     * @param modules cc_CanvasModules object containing all info about current pages modules
     */
    constructor(modules,canvasOption='collection') {
        this.model = modules;
        this.modules = this.model.modules;
        this.currentCollection = this.model.currentCollection;
        this.canvasOption = canvasOption;
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

        if (canvasContent===null) {
            alert("no content element found");
        }

        // create the cc-canvas-collections div
        let ccCanvasCollections = this.createElement('div', 'cc-canvas-collections');
        ccCanvasCollections.id = 'cc-canvas-collections';

        if ( location.hostname.match(/griffith\.edu\.au/)) {
            let navBar = this.generateNavBar();
            ccCanvasCollections.appendChild(navBar);
        }

/*        let simpleTitle = this.createElement('h2', 'cc-canvas-collections-title');
        simpleTitle.textContent = 'Canvas Collections';

        ccCanvasCollections.appendChild(simpleTitle);*/

        let cards = this.generateCards();
        ccCanvasCollections.appendChild(cards);

        // insert the collections before canvasContent
        //result = canvasContent.insertBefore(ccCanvasCollections, canvasContent.firstChild);
        const result = canvasContent.insertBefore(ccCanvasCollections, canvasContent.firstChild);

        if ( location.hostname.match(/griffith\.edu\.au/)) {
            this.updateCanvasModuleList();
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
            navItem.onclick = () => cc_collectionClick(collection,this);
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
            if ( module.collection===this.currentCollection || this.canvasOption==='all') {
                let card = this.generateCard(module);
                cardCollection.appendChild(card);
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


        // description is set to module description, but add unpublished message
        // if module is not published
        const UNPUBLISHED_MESSAGE = `
        <div class="inline-block bg-yellow-200 text-black text-xs rounded-t rounded-b">
        This module is <strong>not published</strong>
        </div>
        `;
        let description = module.description;
        if (!module.published){
            description = `${description}${UNPUBLISHED_MESSAGE}`
        }

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
<div class="hover:outline-none hover:shadow-outline bg-white rounded-lg shadow-lg overflow-hidden flex-1 flex flex-col relative"> <!-- Relative could go -->
  <a href="#${module.id}" class="cardmainlink"></a>
  <div class="${imageSize} h-48" style="background-image: url('${imageUrl}'); background-color: rgb(255,255,255)">${IFRAME}
  </div>
  ${COMING_SOON}
  <div class="carddescription p-4 flex-1 flex flex-col">
    <span class="cardLabel">
    ${module.label} ${module.num}
    </span>
    <h3 class="mb-4 text-2xl">${module.title}</h3>
    <div class="mb-4 flex-1">
      ${description}
    </div>
    <p></p>
     
     ${LINK_ITEM}
     ${REVIEW_ITEM}
     ${EDIT_ITEM}
     ${DATE} 
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
        
        console.log(`canvas-collection:    -- ${this.position}) item ${this.id} '<a href="${this.url}">${this.title}</a>' is ${this.itemType}`);
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

}

class cc_Module {
    constructor( element ) {
        this.extractId(element);
        this.extractTitle(element);
        this.extractItems(element);
        this.extractPublished(element);
        this.collection = null;

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
        let unpublishIcon = element.querySelector('i.icon-unpublish');
        if (unpublishIcon!==null){
            this.published = false;
        }
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
    }
}


(function() {
    'use strict';
    document.head.insertAdjacentHTML( 'beforeend', CSS_URL );


    // Wait for everything to load
    window.addEventListener('load', function(){
        cc_pageLoaded(  );
    }, false);





})();