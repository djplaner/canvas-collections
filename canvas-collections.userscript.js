// ==UserScript==
// @name         canvas-collections
// @namespace    https://www.griffith.edu.au/
// @version      0.1
// @description  Enable creation of collection of Canvas modules and alternate representations
// @author       David Jones
// @match        https://lms.griffith.edu.au/*/modules
// @icon         https://www.google.com/s2/favicons?domain=griffith.edu.au
// @grant        none
// ==/UserScript==

const COURSE_ID=ENV.COURSE_ID;
const BOOTSTRAP_CSS_URL='<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">';

// Much code adapted from https://gist.github.com/theotherdy/60ced3e955813861142f60bd3ea70ff4

function cc_pageLoaded( label){
    console.log(`canvas-collections: for ${COURSE_ID} was here - ${label}`);

    // extract all module information
    let modules = new cc_CanvasModules();
    // update the page to add Card Information
    let view = new cc_CanvasModulesView(modules);

//    view.render();
}

/****************
 * CanvasModulesViews - render the updated module information
 */

class cc_CanvasModulesView {

    /**
     * @desc insert HTML into Canvas modules page offering different representation of module information
     * @param modules cc_CanvasModules object containing all info about current pages modules
     */
    constructor(modules) {
        this.modules = modules.modules;

        // element where all the Canvas page content resides
        // We'll be inserting our content before this
        let canvasContent = document.getElementById('context_modules');

        if (canvasContent===null) {
            alert("no content element found");
        }

        // create the cc-canvas-collections div
        let ccCanvasCollections = this.createElement('div', 'cc-canvas-collections');

/*        let simpleTitle = this.createElement('h2', 'cc-canvas-collections-title');
        simpleTitle.textContent = 'Canvas Collections';

        ccCanvasCollections.appendChild(simpleTitle);*/

        let cards = this.generateCards();
        ccCanvasCollections.appendChild(cards);

        // insert the collections before canvasContent
        //result = canvasContent.insertBefore(ccCanvasCollections, canvasContent.firstChild);
        const result = canvasContent.insertBefore(ccCanvasCollections, canvasContent.firstChild);

        // Experiment with MIcrosoft's adaptive cards
    }

    /**
     * @desc generate a DOM element that represents cards for all the modules
     * Currently hard-coded dumb to do rows of three
     * @returns DOM element - representing all the cards
     */
    generateCards() {

        let cardCollection = this.createElement('div', 'cc-canvas-collections-cards');
        const numModules = this.modules.length;
        const numRequiredRows = Math.ceil(numModules/3);

        let module = 0;
        for (let row=0; row<numRequiredRows; row++) {
            let rowCollection = this.createElement('div', 'row');
            for (let col=0; col<3; col++) {
                if (module<numModules) {
                    let card = this.generateCard(this.modules[module]);
                    rowCollection.appendChild(card);
                    module++;
                }
            }
            cardCollection.appendChild(rowCollection);
        }

        return cardCollection;
    }

    /**
     * @desc generate a DOM element representing a module for insertion into page
     * @param cc_Module module - object with module data
     * @returns DOMelement - representing card
     */
    generateCard(module) {
        const cardHtml = `
        <div class="card">
  <img class="card-img-top" src="https://www.signfix.com.au/wp-content/uploads/2017/09/placeholder-600x400.png" alt="Card image cap">
  <div class="card-body">
    <h5 class="card-title">${module.title}</h5>
    <p class="card-text">This module has ${module.items.length} items in it.</p>
    <a href="#${module.id}" class="btn btn-primary">Engage</a>
  </div>
</div>`;

        // convert cardHtml into DOM element
        let wrapper = this.createElement('div', 'col-sm');
        wrapper.innerHTML = cardHtml;
        return wrapper; 
    }

    /**
     * Create an element with an option css class
     * @param string tag 
     * @param string className 
     * @returns element - created DOM element
     */
    createElement(tag, className) {
        const element = document.createElement(tag)
        if (className) element.classList.add(className)
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
        console.log(`canvas-collection:    about ${JSON.stringify(this.about)}`);
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
        this.collection = null;

        // TODO 
        // - prerequisites
        // - requirements_message

        console.log(`canvas-collections: Module ${this.id} title ${this.title}`);
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
}

class cc_CanvasModules {
    constructor( ){
        // get all the div with ids starting with context_module_ within div#context_modules
        this.moduleElements = document.querySelectorAll( 'div#context_modules > div[id^=context_module_]');

        // loop thru each moduleElement and construct a cc_Module object
        this.modules = Array.from( this.moduleElements).map( ( moduleElement) => {
            return new cc_Module( moduleElement);
        });
    }
}


(function() {
    'use strict';
    document.head.insertAdjacentHTML( 'beforeend', BOOTSTRAP_CSS_URL );


    // Wait for everything to load
    window.addEventListener('load', function(){
        cc_pageLoaded( "waiting" );
    }, false);





})();