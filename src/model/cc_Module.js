
import { cc_Item } from './cc_Item.js';


// Hard code default card values for 1031LAW_3215
// key is the module name

const DEFAULT_ACTIVE_COLLECTION = 'Study Guide';
const COLLECTIONS_DEFAULTS = [
    "Study Guide", "Assessment Essentials", "Online Workshops", "Student Support"
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
        'collection': 'Study Guide',
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
        'collection': 'Study Guide',
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
        'collection': 'Study Guide',
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
        'collection': 'Study Guide',
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
        'collection': 'Study Guide',
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
        'collection': 'Study Guide',
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
        'collection': 'Study Guide',
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
        'collection': 'Study Guide',
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
        'collection': 'Study Guide',
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


export default class cc_Module {
	constructor( element, options=null ) {
	    this.extractId(element);
	    this.extractTitle(element);
	    this.extractItems(element);
	    this.extractPublished(element);
	    this.extractCompletionStatus(element);
    
	    this.calculateItemProgress();
    
	    this.collection = null;
//	    this.options = DEFAULT_VIEW_OPTIONS;
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
