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
    constructor(element){
        
    }

}

class cc_Module {
    constructor( element ) {
        this.id = this.getId(element);
        this.title = this.getTitle(element);
        this.items = this.getItems(element);
        this.collection = null;

        // TODO 
        // - prerequisites
        // - requirements_message

        console.log(`canvas-collections: Module ${this.id} title ${this.title}`);
    }

    /**
     * @desc Return the id of the module as specified in attribute data-module-id
     * @param DOMElement element - the module dom element
     * @returns int (or NULL)
     */
    getId(element){
        // attribute data-module-id contains the id
        let id=element.getAttribute('data-module-id');
        if (id!==null){
            return parseInt(id);
        }
        return null;
    }

    /**
     * @desc Return the title of the module - look for span.name value within element
     * @param {*} element 
     */
    getTitle(element){
        let nameSpan = element.querySelector('span.name');
        if (nameSpan!==null){
            return nameSpan.innerText;
        }
        return null
    }

    /**
     * @desc generate an array of cc_Item objects for the module from 
     * div#context_module_content_ID > ul.context_module_items
     * @param DOMElement element 
     * @returns array of cc_Item objects
     */
    getItems(element) {
        let items = [];
        let itemList = element.querySelector('ul.context_module_items');
        if (itemList!==null){
            let itemElements = itemList.querySelectorAll('li.context_module_item');
            for (let itemElement of itemElements){
                items.push(new cc_Item(itemElement));
            }
        }
        return items;
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