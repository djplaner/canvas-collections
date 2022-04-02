/**
 * cc_NavView.js 
 * - insert the navigation elements into div#cc-canvas-collections 
 * - initially just a simple navBar
 * - TODO better and more varied representations
 *  
 */

import { cc_View } from '../cc_View.js';

export default class NavView extends cc_View {

	/**
	 * @descr Initialise the view
	 * @param {Object} model
	 * @param {Object} controller
	 */
	constructor( model, controller ) {
		super( model, controller );

	}

	/**
	 * @descr insert a nav bar based on current collections
	 */

	display() {
		DEBUG && console.log('-------------- cc_NavView.display()');
		let div = document.getElementById('cc-canvas-collections');


		// generate the HTML
//		let html ='<h1> Hello from NavView </h1>';

		let navBar = this.generateNavBar();
		div.insertAdjacentElement('beforeend', navBar);

		// add html to div#cc-canvas-collections
//		div.insertAdjacentHTML('afterbegin', html);
	}

	generateNavBar() { 
		let navBar = document.createElement('div');
		navBar.className = 'cc-nav';


		const navBarStyles = `
		<style>
.cc-content {
    clear:both;
}

.cc-nav { 
    font-size: small;
}

.cc-nav ul  {
	list-style-type: none;
    margin: 0;
    padding: 0;
    overflow: hidden ;
    background-color: #eee; 
    width:100%;
}

li.cc-active {
    background-color: var(--ic-brand-button--primary-bgd);
    /* font-weight: bold; */
}

li.cc-active a {
	color: var(--ic-brand-button--primary-text) !important;
}

li.cc-close {
    float: right !important;
    border-right: none !important;
}

.cc-nav ul li {
    float:left;
    border-right: 1px solid #000;
}

li.cc-active a {
  /*  color: black !important; */
}

li.cc-nav a {
    display: block;
    padding: 0.5em;
    text-align: center;
    text-decoration: none;
    color: #2d3b45;  
}

.cc-nav li a:hover {
    background-color: #111;
}

.cc-nav li:nth-child(4) {
    border-right: none;
}
</style>
		`;

		// insert styles in navBar
		navBar.insertAdjacentHTML('afterbegin', navBarStyles);

		let count = 0;
		let navList = document.createElement('ul');
        for (let collection of this.model.getCollectionNames()) {
            let navClass = ['li', 'mr-4'];
            let style = 'cc-nav';


            let navElement = `
		  <a href="#">${collection}</a>
		`;
            let navItem = document.createElement('li');
			navItem.className = "cc-nav";

			// set the active navigation item if currentCollection is defined and matches OR
			// currentCollection is undefined and we're at the first one
            if ( 
				( collection === this.model.currentCollection) || 
			    ( this.model.currentCollection === undefined && count===0 )
			 ) {
                navItem.classList.add('cc-active');
            }
			count+=1;

            navItem.onclick = (event) => this.controller.navigateCollections(event);
			// TODO probably shouldn't be on this view the click? SHouldn't it be the
			// controller?, 
            //navItem.onclick = () => this.collectionsClick(collection, this);
            navItem.innerHTML = navElement;
            navList.appendChild(navItem);
        }
		navBar.appendChild(navList);

		return navBar;
	}
}

