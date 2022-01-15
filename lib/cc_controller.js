'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * cc_controller.js
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */

var _cc_CanvasModules = require('./cc_CanvasModules.js');

var _cc_CanvasModulesView = require('./cc_CanvasModulesView.js');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * @descr Basic controller, creates the model and generates the view
 */

var cc_Controller = function () {
	function cc_Controller() {
		_classCallCheck(this, cc_Controller);

		// check queryString for cc-collections
		// for some reason .search doesn't work on canvas
		// TODO this is currently not working
		var location = window.location.href;
		// extract from location everything after ?
		var queryString = location.substring(location.indexOf('?') + 1);

		// define options
		var options = DEFAULT_VIEW_OPTIONS;

		var urlParams = new URLSearchParams(queryString);
		var collectionsOption = urlParams.get('cc-collections');
		if (collectionsOption) {
			options.collectionView = collectionsOption;
		}
		if (!window.location.hostname.match(/griffith\.edu\.au/)) {
			options.collectionView = 'all';
			options.navBar = false;
			options.updateTitle = false;
		}

		// extract all module information
		this.modules = new _cc_CanvasModules.cc_CanvasModules();
		// update the page to add Card Information
		this.view = new _cc_CanvasModulesView.cc_CanvasModulesView(modules, options);
		this.view.render();
	}

	/**
  * @desc Handle any clicks on the collections nav bar
  * @param collectionName string - name of the collection that was clicked on
  */

	_createClass(cc_Controller, [{
		key: 'collectionClick',
		value: function collectionClick(collectionName, view) {
			// change current collection
			view.currentCollection = collectionName;
			// remove div#guCardInterface
			view.removeCanvasCollectionsView();
			view.render();
		}
	}]);

	return cc_Controller;
}();

exports.default = cc_Controller;