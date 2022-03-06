/**
 * cc_CardsView.js 
 * - insert the cards for the current collection
 *  
 */

import { cc_View } from '../cc_View.js';

export default class cc_CardsView extends cc_View {

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
		DEBUG && console.log('-------------- cc_CardsView.display()');
		let div = document.getElementById('cc-canvas-collections');


		// generate the HTML
//		let html ='<h1> Hello from CardsView </h1>';

		let navBar = this.generateNavBar();
		div.insertAdjacentElement('afterbegin', navBar);

		// add html to div#cc-canvas-collections
//		div.insertAdjacentHTML('afterbegin', html);
	}

	generateNavBar() { 
		let navBar = document.createElement('div');
		navBar.className = 'cc-nav';

//		const collectionNames = this.model.getCollectionNames();

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
				( collection === this.currentCollection) || 
			    ( this.currentCollection === undefined && count===0 )
			 ) {
                navItem.classList.add('cc-active');
            }
			count+=1;

            //navItem.onclick = () => cc_collectionClick(collection,this);
            navItem.onclick = () => this.collectionsClick(collection, this);
            navItem.innerHTML = navElement;
            navList.appendChild(navItem);
        }
		navBar.appendChild(navList);

		return navBar;
	}
}

