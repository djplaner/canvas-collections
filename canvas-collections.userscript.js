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

// Much code adapted from https://gist.github.com/theotherdy/60ced3e955813861142f60bd3ea70ff4

function cc_pageLoaded( label){
    console.log(`canvas-collections: for ${COURSE_ID} was here - ${label}`);

    let modules = new cc_CanvasModules();
}

class cc_Item {
    /**
     * @descr construct object representing a Canvas module item
     * Data members includes
     * - id - unique id for item
     * - title - title of item
     * - itemType - type of item
     * - url - url for item
     * @param DOMelement element - item's DOM element
     */
    constructor(element){
        this.extractId(element);
        this.extractItemTypeAndId(element);
        this.extractTitleAndUrl(element)
        
        console.log(`canvas-collection:    -- item ${this.id} '<a href="${this.url}">${this.title}</a>' is ${this.itemType}`);
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


    // Wait for everything to load
    window.addEventListener('load', function(){
        cc_pageLoaded( "waiting" );
    }, false);





})();