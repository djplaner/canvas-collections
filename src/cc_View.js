/**
 * cc_View.js - parent view class for cc 
 * - placeholder for any generic methods
 * 
 */



export default class cc_View {

	/**
	 * @descr Initialise the view
	 * @param {Object} model
	 * @param {Object} controller
	 */
	constructor( model, controller ) {
		this.model = model;
		this.controller = controller;
	}
}