
export default class cc_Item {
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