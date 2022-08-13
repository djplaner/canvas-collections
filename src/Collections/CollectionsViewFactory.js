/**
 * CollectionsViewFactory.js
 * - Factory class for creating different views for collections
 */

import { CardsView } from "./Views/Cards.js";
import { TableView } from "./Views/Table.js";
import { AssessmentTableView } from "./Views/AssessmentTable.js";
import { CollectionOnlyView } from "./Views/CollectionOnly.js";
import { GriffithCardsView } from "./Views/GriffithCards.js";

const VIEWS = {
	CardsView,
	TableView,
	AssessmentTableView,
	CollectionOnlyView,
	GriffithCardsView
}

export default class CollectionsViewFactory {

	/**
	 * Generate the right type of collections view object
	 * @param {String} viewType 
	 * @param {CollectionsModel} model 
	 * @param {CollectionsController} controller 
	 */
	static createView( viewType, model, controller) {

		// add "View" to end of viewType iff not already there
		if (viewType.endsWith(-4) !== 'View') {
			viewType += 'View';
		}

		const viewCreator = VIEWS[viewType];
		const view = viewCreator ? new viewCreator(model, controller) : null;

		return view;
	}
}