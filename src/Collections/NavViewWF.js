/**
 * cc_NavView.js 
 * - insert the navigation elements into div#cc-canvas-collections 
 * - initially just a simple navBar
 * - TODO better and more varied representations
 *  
 */

import { cc_View } from '../cc_View.js';

const NAV_WF_TOOLTIPS = [
	{
		contentText: `<p>Collection hidden from students. Any published modules for this collection
		may be visible to students.</p>`,
		targetSelector: '#cc-about-hide-collection',
		animateFunction: "spin",
		href: "https://djplaner.github.io/canvas-collections/reference/#hide-a-collection"
	}
];


export default class NavView extends cc_View {

	/**
	 * @descr Initialise the view
	 * @param {Object} model
	 * @param {Object} controller
	 */
	constructor(model, controller) {
		super(model, controller);

		this.TOOLTIPS = NAV_WF_TOOLTIPS;
	}

	/**
	 * @descr insert a nav bar based on current collections
	 */

	display() {
		DEBUG && console.log('-------------- cc_NavView.display()');
		let div = document.getElementById('cc-canvas-collections');


		// generate the HTML
		//		let html ='<h1> Hello from NavView </h1>';

		//let navBar = this.generateNavBar();
		let navBarHTML = this.generateHTML();
		div.insertAdjacentHTML('beforeend', navBarHTML);

		// add event handler
		const navItems = document.querySelectorAll('li.cc-nav');
		// loop thru each navItem
		for (let i=0; i<navItems.length; i+=1) {
			navItems[i].onclick = (event) => this.controller.navigateCollections(event);
		}

		this.addTooltips();

		// add html to div#cc-canvas-collections
		//		div.insertAdjacentHTML('afterbegin', html);
	}

	/**
	 * 
	 * @param {String} collectionName 
	 * @param {String} variety 
	 * @returns String HTML containing the navBar
	 */
	generateHTML(collectionName = '', variety = '') {
		if (variety === 'claytons') {
			return this.generateClaytonsNavBar(collectionName);
		}
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
	display: table;
	table-layout: fixed;
	width: 100%
}

li.cc-active {
    background-color: var(--ic-brand-button--primary-bgd) !important; 
    font-weight: bold; 
}

li.cc-active a {
	color: var(--ic-brand-button--primary-text) !important; 
	border-top: 4px solid var(--ic-brand-button--primary-bgd) !important; 
}

li.cc-close {
    float: right !important;
    border-right: none !important;
}

.cc-nav ul li {
	display: table-cell;
	width: 100%;
 /*   border-right: 1px solid #000; */
	float: none;
}

li.cc-nav a {
    display: block;
    text-align: center !important;
    text-decoration: none;
    color: #2d3b45;  
	padding: 1em 0.8em !important;
	border-top: 4px solid #eee; 
	box-sizing: border-box;
	font-size: 1.2em;
	transition: background 0.3s linear 0s !important;
}

.cc-nav li a:hover {
 /*   background-color: #111; */
    background-color: var(--ic-brand-button--primary-bgd); 
	border-top: 4px solid var(--ic-brand-button--primary-bgd); 
	  color: rgb(255, 255, 255) !important;
  background: rgba(51, 51, 51, 0.9) !important;
  text-decoration: none !important;
  color: rgb(255, 255, 255) !important;
/*  border-top: 4px solid #c12525; */
}

.cc-nav li:nth-child(4) {
    border-right: none;
}

.cc-collection-hidden {
	background: #cacaca;
	text-align:center;
}
div.cc-collection-hidden > a {
	display:inline;
}
</style>
		`;

		// insert styles in navBar
		navBar.insertAdjacentHTML('afterbegin', navBarStyles);

		const editMode = this.controller.parentController.editMode;

		let count = 0;
		let navList = document.createElement('ul');
		// iterate through all the collections
		for (let collection of this.model.getCollectionNames()) {
			let navClass = ['li', 'mr-4'];
			let style = 'cc-nav';

			// get the collection details for this collection
			// KLUDGE TODO fix this up
			let collectionDetails = this.model.cc_configuration.COLLECTIONS[collection];
			let icon = "";
			if (collectionDetails.icon !== "") {
				icon = `<i class="${collectionDetails.icon}"></i>`;
			}
			//console.log(collectionDetails);

			// - how to know if we're in staff view
			if (collectionDetails.hide) {
				if (!editMode) {
					// skip this collection if not in editMode (student)
					// and the collection is hidden
					continue;
				}
			}


			let navElement = `<a href="#">${icon} ${collection}</a> `;
			let navItem = document.createElement('li');
			navItem.className = "cc-nav";

			// set the active navigation item if currentCollection is defined and matches OR
			// currentCollection is undefined and we're at the first one
			if (
				(collection === this.model.currentCollection) ||
				(this.model.currentCollection === undefined && count === 0)
			) {
				navItem.classList.add('cc-active');
			}
			count += 1;

//			navItem.onclick = (event) => this.controller.navigateCollections(event);
			// TODO probably shouldn't be on this view the click? SHouldn't it be the
			// controller?, 
			//navItem.onclick = () => this.collectionsClick(collection, this);
			navItem.innerHTML = navElement;

			if (collectionDetails.hide && editMode) {
				// insert a div.cc-collection-hidden to indicate that this collection is hidden
				// and only visible in editMode
				let hiddenDiv = document.createElement('div');
				hiddenDiv.className = 'cc-collection-hidden';
				hiddenDiv.innerHTML = `Hidden
						<a id="cc-about-hide-collection" target="_blank" href="">
			   					<i class="icon-question"></i></a>`;
				navItem.insertAdjacentElement('beforeend', hiddenDiv);
			}

			navList.appendChild(navItem);
		}
		navBar.appendChild(navList);

		return navBar.outerHTML;
	}

	/**
	 * Return HTML for nav bar that is HTML/CSS only. to be inserted into a Canvas
	 * page as part of the Full Claytons
	 * @param {String} collectionName 
	 * @returns {String} HTML for nav bar
	 */
	generateClaytonsNavBar(collectionName = '') {
		let CLAYTONS_NAVBAR_HTML = `
		<div id="bannerNav">
		  <ul id="courseBannerNav">
		  {{NAVBAR_ITEMS}}
		  </ul>
	    </div>`;

		// get list of collection details without output pages(including output page)
		const collectionsOutput = this.model.getOutputPageCollections();
		const activeLi = ' style="background-color: #c02424"';
		const activeA = ' style="text-decoration: none;color: #fff; font-weight: bold;font-size:1.2em;"';

		let items = '';

		collectionsOutput.forEach(collection => {
			let liStyle ='';
			let aStyle = '';
			if (collection.name === collectionName) {
				liStyle = activeLi;
				aStyle = activeA;
			}
			let pageUrl = this.model.calculatePageUrl(collection.outputPage);
			items = `${items}
		   <li${liStyle}>
		     <a${aStyle} href="${pageUrl}">${collection.name}</a>
		   </li>
		`;

		});

		// loop through each collection
		// get the names of collection with output pages
		// include those collection names in the nav bar


		return CLAYTONS_NAVBAR_HTML.replace('{{NAVBAR_ITEMS}}', items);
	}
}

