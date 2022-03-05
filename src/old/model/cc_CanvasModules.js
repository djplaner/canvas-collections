
import { cc_Module} from './cc_Module.js';

export default class cc_CanvasModules {
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
