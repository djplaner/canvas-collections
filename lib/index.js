'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _cc_Controller = require('./cc_Controller.js');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var COURSE_ID = ENV.COURSE_ID;
//const CSS_URL='<link rel="stylesheet" href="https://s3.amazonaws.com/filebucketdave/banner.js/cards.css" />';
var CSS_URL = '<link href="https://unpkg.com/tailwindcss@^2/dist/tailwind.min.css" rel="stylesheet">';

var DEFAULT_VIEW_OPTIONS = {
    // how to view collections: 
    // - current - show the current collection
    // - all - show all collections
    'collectionView': 'current',
    // whether to who nav bar
    'navBar': true,
    // whether to update the module title with collection name
    'updateTitle': true
};

// Hard code default card values for 1031LAW_3215
// key is the module name

var DEFAULT_ACTIVE_COLLECTION = 'Learning Journey';
var COLLECTIONS_DEFAULTS = ["Learning Journey", "Assessment Essentials", "Online Workshops", "Student Support"];

var META_DATA_FIELDS = ['image', 'label', 'imageSize', 'num', 'description', 'collection'];

var CARD_DEFAULTS = {
    'Welcome': {
        'image': 'https://i.ytimg.com/vi/gkdGXFcxHw4/maxresdefault.jpg',
        'label': '',
        'imageSize': 'bg-contain',
        'num': '',
        'description': '<ul>\n          <li> What will you learn? </li>\n          <li> What do you need to do? </li>\n          <li> How will you show what you\'ve learnt?</li> </ul>',
        'collection': 'Learning Journey',
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
        'collection': 'Learning Journey',
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
        'collection': 'Learning Journey',
        'date': {
            'label': 'From',
            'start': { 'week': '2', 'month': 'Jul', 'date': '26' },
            'stop': { 'week': '3', 'month': 'Aug', 'date': '6' }
        }
    },
    'Introduction to Legal Theory': {
        'image': 'https://lms.griffith.edu.au/courses/122/files/798/preview',
        'label': 'Topic',
        'imageSize': 'bg-contain',
        'num': '3',
        'description': '',
        'collection': 'Learning Journey',
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
        'collection': 'Learning Journey',
        'date': {
            'label': 'From',
            'start': { 'week': '5', 'month': 'Aug', 'date': '23' },
            'stop': { 'week': '7', 'month': 'Sep', 'date': '10' }
        }
    },
    'Case Law': {
        'image': 'https://lms.griffith.edu.au/courses/122/files/799/preview',
        'label': 'Topic',
        'imageSize': 'bg-cover',
        'description': '<p>How to read and understand case law (i.e. written judgements)</p>',
        'num': '6',
        'collection': 'Learning Journey',
        'date': {
            'label': 'From',
            'start': { 'week': '8', 'month': 'Sep', 'date': '13' },
            'stop': { 'week': '9', 'month': 'Sep', 'date': '24' }
        }
    },
    'The Legal Profession': {
        'image': 'https://lms.griffith.edu.au/courses/122/files/796/preview',
        'label': 'Topic',
        'imageSize': 'bg-cover',
        'num': '7',
        'description': '<p>Introduction to the legal profession and legal professional ethics.</p>',
        'collection': 'Learning Journey',
        'date': {
            'label': 'Commencing', 'week': 'Week 10', 'month': 'Sep', 'date': '27'
        }
    },
    'First Nations People and the Law': {
        'image': 'https://lms.griffith.edu.au/courses/122/files/801/preview',
        'label': 'Topic',
        'imageSize': 'bg-cover',
        'num': '8',
        'description': '<p>Introduction to First Nations people and the law</p>',
        'collection': 'Learning Journey',
        'date': {
            'label': 'Commencing', 'week': 'Week 11', 'month': 'Oct', 'date': '4'
        }
    },
    'Consolidating Knowledge': {
        'image': 'https://lms.griffith.edu.au/courses/122/files/800/preview',
        'label': 'Topic',
        'imageSize': 'bg-cover',
        'num': '9',
        'description': '<p>Revision and preparation for final assessment</p>',
        'collection': 'Learning Journey',
        'date': {
            'label': 'Commencing', 'week': 'Week 12', 'month': 'Oct', 'date': '11'
        }
    },
    // Assessment 1031LAW
    'Accessing Case Law and Legislation': {
        //        'image': 'https://lms.griffith.edu.au/courses/122/files/800/preview',
        'label': 'Assessment',
        //        'imageSize': 'bg-cover',
        'num': '1',
        'description': '<p>Complete a 50 minute online exam. Released 9am on Tuesday of \n        Week 4 and closed at 5pm on Friday of Week 4.</p>',
        'collection': 'Assessment Essentials',
        'date': {
            'label': 'From',
            'start': { 'week': null, 'month': 'Aug', 'date': '17' },
            'stop': { 'week': null, 'month': 'Aug', 'date': '20' }
        }
    },
    'Legislation, Case Law and Statutory Interpretation Assignment': {
        //        'image': 'https://lms.griffith.edu.au/courses/122/files/800/preview',
        'label': 'Assessment',
        //      'imageSize': 'bg-cover',
        'num': '2',
        'description': '<p>Prepare succinct memos explaining and commenting on a piece of legislation and a case\n        respectively, and apply rules of statuory interpretation.</p>',
        'collection': 'Assessment Essentials',
        'date': {
            'label': 'Due', 'week': null, 'month': 'Sep', 'date': '27'
        }
    },
    'Take-Home Exam': {
        //     'image': 'https://lms.griffith.edu.au/courses/122/files/800/preview',
        'label': 'Assessment',
        //        'imageSize': 'bg-cover',
        'num': '3',
        'description': '<p>Complete a 2 hour open-book take home exam with both short-answer and hypothetical questions.</p>',
        'collection': 'Assessment Essentials'
    }
};

/****************
 * CanvasModulesViews - render the updated module information
 */

var cc_CanvasModulesView = function () {

    /**
     * @desc insert HTML into Canvas modules page offering different representation of module information
     * @param modules cc_CanvasModules object containing all info about current pages modules
     * @param option object - defining how to configure the view
     */
    function cc_CanvasModulesView(modules) {
        var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

        _classCallCheck(this, cc_CanvasModulesView);

        this.model = modules;
        this.modules = this.model.modules;
        this.currentCollection = this.model.currentCollection;
        // default setting
        this.options = DEFAULT_VIEW_OPTIONS;
        if (options) {
            this.options = options;
        }
    }

    /**
     * @desc remove the div#cc-canvas-collections from the page
     */

    _createClass(cc_CanvasModulesView, [{
        key: 'removeCanvasCollectionsView',
        value: function removeCanvasCollectionsView() {
            var canvasCollections = document.getElementById('cc-canvas-collections');
            canvasCollections.parentNode.removeChild(canvasCollections);
        }

        /**
         * @desc render the collections/module information
         */

    }, {
        key: 'render',
        value: function render() {

            // element where all the Canvas page content resides
            // We'll be inserting our content before this
            var canvasContent = document.getElementById('context_modules');

            if (canvasContent === null) {
                alert("no content element found");
            }

            // create the cc-canvas-collections div
            var ccCanvasCollections = this.createElement('div', 'cc-canvas-collections');
            ccCanvasCollections.id = 'cc-canvas-collections';

            if (this.options.navBar) {
                var navBar = this.generateNavBar();
                ccCanvasCollections.appendChild(navBar);
            }

            var cards = this.generateCards();
            ccCanvasCollections.appendChild(cards);

            // insert the collections before canvasContent
            //result = canvasContent.insertBefore(ccCanvasCollections, canvasContent.firstChild);
            var result = canvasContent.insertBefore(ccCanvasCollections, canvasContent.firstChild);

            if (this.options.updateTitle) {
                this.updateCanvasModuleList();
            }
        }

        /**
         * @desc Modify the Canvas module list DOM to represent collections, including:
         * - hide modules that aren't part of the current collection
         * - add the collection name to the module title
         * 
         */

    }, {
        key: 'updateCanvasModuleList',
        value: function updateCanvasModuleList() {
            // update the Module titles div#module.id > span.name
            for (var numModule in this.modules) {
                var aModule = this.modules[numModule];
                // Find the module's name and it's title dom
                var divDom = document.querySelector('div#context_module_' + aModule.id);
                var spanDom = divDom.querySelector('span.name');

                // if we found the title, add the collection details
                if (spanDom) {
                    // only if the module name isn't already there
                    if (spanDom.textContent.indexOf('(' + aModule.collection + ')') === -1) {
                        spanDom.innerHTML = spanDom.textContent + ' - <small>(' + aModule.collection + ')</small>';
                    }
                } else {
                    console.error('no span.name found for module ' + aModule.title);
                }

                // hide the module if it's not in the current collection
                // but make it's visible otherwise
                if (aModule.collection === this.currentCollection || this.canvasOption === 'all') {
                    divDom.style.display = 'block';
                } else {
                    divDom.style.display = 'none';
                }
            }
        }

        /**
         * @desc Based on collections in modules, generate nav bar to select collections
         * TODO
         * - Will need to dynamically generate based on collections in Modules
         * - Add javascript handler to make changes
         * - Modify other code
         * @returns DOMelment navBar the dom element for the nav bar
         */

    }, {
        key: 'generateNavBar',
        value: function generateNavBar() {
            var _this = this;

            var navBar = this.createElement('div', ['flex', 'justify-between']);

            var collections = COLLECTIONS_DEFAULTS;

            var styles = {
                'active': 'inline-block border border-blue-500 rounded py-2 px-4 bg-blue-500 hover:bg-blue-700 text-white',
                'inactive': 'inline-block border border-white rounded hover:border-gray-200 text-blue-500 hover:bg-gray-200 py-2 px-4',
                'disabled': 'inline-block py-2 px-4 text-gray-400 cursor-not-allowed'
            };

            var _loop = function _loop(collection) {
                var navClass = ['li', 'mr-4'];
                var style = 'inactive';

                if (collection === _this.currentCollection) {
                    style = 'active';
                }

                var navElement = '\n              <a class="' + styles[style] + '" href="#">' + collection + '</a>\n            ';
                var navItem = _this.createElement('li', 'mr-4');
                navItem.onclick = function () {
                    return cc_collectionClick(collection, _this);
                };
                navItem.innerHTML = navElement;
                navBar.appendChild(navItem);
            };

            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = collections[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var collection = _step.value;

                    _loop(collection);
                }
            } catch (err) {
                _didIteratorError = true;
                _iteratorError = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion && _iterator.return) {
                        _iterator.return();
                    }
                } finally {
                    if (_didIteratorError) {
                        throw _iteratorError;
                    }
                }
            }

            return navBar;
        }

        /**
         * @desc generate a DOM element that represents cards for all the modules
         * Currently hard-coded dumb to do rows of three
         * @returns DOM element - representing all the cards
         */

    }, {
        key: 'generateCards',
        value: function generateCards() {

            //        let cardCollection = this.createElement('div', 'cc-canvas-collections-cards');
            var cardCollection = this.createElement('div', ['flex', 'flex-wrap', '-m-3']);
            cardCollection.id = "guCardInterface";
            var numModules = this.modules.length;
            //        const numRequiredRows = Math.ceil(numModules/3);

            var cardsShown = 0;

            // for each module generate card and append
            for (var i = 0; i < numModules; i++) {
                var module = this.modules[i];
                if (module.collection === this.currentCollection || this.options.collectionView === 'all') {
                    var card = this.generateCard(module);
                    cardCollection.appendChild(card);
                    cardsShown += 1;
                }
            }

            // show appropriate message if no cards shown
            if (cardsShown === 0) {
                var noCards = this.createElement('div', 'cc-canvas-collections-no-cards');
                // add some padding-left
                noCards.style.paddingLeft = '2rem';
                noCards.style.paddingTop = '2rem';

                noCards.innerHTML = '\n            <h3>No matching modules for this collection</h3>\n\n            <p>No modules found in collection ' + this.currentCollection + '</p>';
                cardCollection.appendChild(noCards);
            }

            //        let module = 0;
            /*        for (let row=0; row<numRequiredRows; row++) {
                        let rowCollection = this.createElement('div', 'row');
                        for (let col=0; col<3; col++) {
                            if (module<numModules) {
                                let card = this.generateCard(this.modules[module]);
                                rowCollection.appendChild(card);
                                module++;
                            }
                        }
                        cardCollection.appendChild(rowCollection); */
            //        }

            return cardCollection;
        }

        /**
         * @desc generate a DOM element representing a module for insertion into page
         * @param cc_Module module - object with module data
         * @returns DOMelement - representing card
         */

    }, {
        key: 'generateCard',
        value: function generateCard(module) {
            var imageUrl = "https://www.signfix.com.au/wp-content/uploads/2017/09/placeholder-600x400.png";
            var engage = 'Engage';

            if ('image' in module) {
                imageUrl = module.image;
            }
            if ('engage' in module) {
                engage = module.engage;
            }

            var completion = this.generateCompletionView(module.completionStatus);
            var DATE = this.generateDateView(module.date);

            //        let WIDTH="w-full sm:w-1/2 md:w-1/3";
            var COMING_SOON = "";
            var LINK_ITEM = '\n        <p>&nbsp;<br /> &nbsp;</p>\n        <div class="p-4 absolute pin-r pin-b" style="right:0;bottom:0">\n           <a href="#' + module.id + '" class="gu-engage"><div class="hover:bg-blue-100 text-blue-900 font-semibold hover:text-white py-2 px-4 border border-blue-900 hover:border-transparent rounded">\n            ' + engage + '\n        </div></a>\n        </div>\n        ';
            var EDIT_ITEM = "";
            var REVIEW_ITEM = "";

            var description = module.description;

            var published = this.generatePublishedView(module.published);

            var IFRAME = "";

            var imageSize = "bg-cover";
            if ("imageSize" in module) {
                imageSize = module.imageSize;
            }
            if (imageSize === "bg-contain") {
                imageSize = "bg-contain bg-no-repeat bg-center";
            }

            //<div class="clickablecard w-full sm:w-1/2 ${WIDTH} flex flex-col p-3">
            var cardHtml = '\n<div class="hover:outline-none hover:shadow-outline bg-white rounded-lg shadow-lg overflow-hidden flex-1 flex flex-col relative"> <!-- Relative could go -->\n  <a href="#' + module.id + '" class="cardmainlink"></a>\n  <div class="' + imageSize + ' h-48" style="background-image: url(\'' + imageUrl + '\'); background-color: rgb(255,255,255)">' + IFRAME + '\n  </div>\n  ' + COMING_SOON + '\n  <div class="carddescription p-4 flex-1 flex flex-col">\n    <span class="cardLabel">\n    ' + module.label + ' ' + module.num + '\n    </span>\n    <h3 class="mb-4 text-2xl">' + module.title + '</h3>\n    <div class="mb-4 flex-1">\n      ' + description + '\n    </div>\n    <p></p>\n     \n     ' + LINK_ITEM + '\n     ' + REVIEW_ITEM + '\n     ' + EDIT_ITEM + '\n     ' + DATE + ' \n     ' + published + '\n     ' + completion + '\n  </div>\n</div>\n';
            //</div>

            // convert cardHtml into DOM element
            var wrapper = this.createElement('div', ['clickablecard', 'w-full', 'sm:w-1/2', 'md:w-1/3', 'flex', 'flex-col', 'p-3']);
            wrapper.innerHTML = cardHtml;
            return wrapper;
        }

        /**
         * @descr generate ribbon/html to add to card to show completion status
         * @param String completionStatus 
         * @returns html 
         */

    }, {
        key: 'generateCompletionView',
        value: function generateCompletionView(completionStatus) {
            var colour = {
                'Completed': 'bg-green-500',
                'In Progress': 'bg-yellow-500',
                'Locked': 'bg-red-500'
            };

            if (!(completionStatus in colour)) {
                return '';
            }

            var length = completionStatus.length;
            var completionHtml = '\n  <div  class="' + colour[completionStatus] + ' text-xs rounded-full py-1 text-center font-bold"\n        style="width:' + length + 'em" >\n    <div class="">' + completionStatus + '</div>\n  </div>\n        ';

            return completionHtml;
        }

        /**
         * @desc generate html showing if module is unpublished
         * i.e. only show message if unpublished
         * @param boolean true iff published
         * @returns string html empty if published warning if unpublished
         */

    }, {
        key: 'generatePublishedView',
        value: function generatePublishedView(published) {
            if (published) {
                return '';
            }

            var publishedHtml = '\n<span class="bg-red-500 text-white text-xs rounded-full py-1 text-center font-bold"\n     style="width:8em">\n        Unpublished\n</span>\n        ';

            return publishedHtml;
        }

        /**
         * @desc generate HTML for representing the moduleDate
         * @param object moduleDate - object with date data
         * @returns string - HTML for representing the moduleDate
         */

    }, {
        key: 'generateDateView',
        value: function generateDateView(moduleDate) {

            // return '' if moduleData undefined
            if (moduleDate === undefined) {
                return '';
            }

            var date = {
                'label': '', 'week': '', 'time': '', 'month': '', 'date': ''
            };
            var dateSet = false;

            if ('start' in moduleDate) {
                return this.generateDualDate(moduleDate);
            }

            // loop thru each element of date
            for (var key in date) {
                if (key in moduleDate) {
                    dateSet = true;
                    date[key] = moduleDate[key];
                }
            }

            var week = '';
            var time = '';
            if (dateSet) {
                if ('week' in moduleDate) {
                    week = '\n                <div class="bg-yellow-200 text-black py-0"> \n                ' + date.week + '\n                </div>\n                ';
                    if (moduleDate.week === null) {
                        week = '';
                    }
                }
                if ('time' in moduleDate) {
                    time = '\n                <div class="bg-yellow-200 text-black py-0 text-xs">\n                ' + date.time + '\n                </div>\n                ';
                }
            }

            var DATE = '\n    <div class="block rounded-t rounded-b overflow-hidden bg-white text-center w-24 absolute"\n        style="right:0;top:0;"\n    >\n      <div class="bg-black text-white py-0 text-xs border-l border-r border-t border-black">\n         ' + date.label + '\n      </div>\n      ' + week + '\n      ' + time + '\n      <div class="bg-red-900 text-white py-0 border-l border-r border-black">\n           ' + date.month + '\n      </div>\n      <div class="pt-1 border-l border-r border-b border-black rounded-b">\n           <span class="text-2xl font-bold">' + date.date + '</span>\n      </div>\n    </div>\n        ';
            if (!dateSet) {
                DATE = '';
            }

            return DATE;
        }

        /**
         * @desc generate html to represent a dual date
         * @param Object moduleDate 
         * @returns html
         */

    }, {
        key: 'generateDualDate',
        value: function generateDualDate(moduleDate) {

            var date = {
                'label': moduleDate.label,
                'monthStart': moduleDate.start.month,
                'dateStart': moduleDate.start.date,
                'monthStop': moduleDate.stop.month,
                'dateStop': moduleDate.stop.date
            };

            var WEEK = '\n            <div class="bg-yellow-200 text-black py-0 border-l border-r border-black">\n                Week ' + moduleDate.start.week + ' to ' + moduleDate.stop.week + '\n            </div>\n        ';
            if (moduleDate.start.week === null || moduleDate.stop.week === null) {
                WEEK = '';
            }
            var DAYS = '';

            var DATE = '\n        <div class="block rounded-t rounded-b overflow-hidden bg-white text-center w-24 absolute"\n            style="right:0;top:0">\n                  <div class="bg-black text-white py-0 text-xs border-l border-r border-black">\n                     ' + date.label + '\n                  </div>\n                  ' + WEEK + '\n                  <div class="bg-red-900 text-white flex items-stretch py-0 border-l border-r border-black">\n                      <div class="w-1/2 flex-grow">' + date.monthStart + '</div>\n                      <div class="flex items-stretch border-l border-black flex-grow  -mt-1 -mb-1"></div>\n                      <div class="w-1/2">' + date.monthStop + '</div>\n                  </div>\n                  <div class="border-l border-r border-b text-center flex border-black items-stretch pt-1 py-0">\n                       <div class="w-1/2 text-2xl flex-grow font-bold">' + date.dateStart + '</div>\n                       <div class="flex font-bolditems-stretch border-l border-black flex-grow -mt-1"></div>\n                      <div class="w-1/2 text-2xl font-bold">' + date.dateStop + '</div>\n                  </div>\n                 </div> \n        ';

            return DATE;
        }

        /**
         * Create an element with an option css class
         * @param string tag 
         * @param string className 
         * @returns element - created DOM element
         */

    }, {
        key: 'createElement',
        value: function createElement(tag, className) {
            var element = document.createElement(tag);
            if (className) {
                // if className is an array, add each class
                if (Array.isArray(className)) {
                    var _iteratorNormalCompletion2 = true;
                    var _didIteratorError2 = false;
                    var _iteratorError2 = undefined;

                    try {
                        for (var _iterator2 = className[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                            var c = _step2.value;

                            element.classList.add(c);
                        }
                    } catch (err) {
                        _didIteratorError2 = true;
                        _iteratorError2 = err;
                    } finally {
                        try {
                            if (!_iteratorNormalCompletion2 && _iterator2.return) {
                                _iterator2.return();
                            }
                        } finally {
                            if (_didIteratorError2) {
                                throw _iteratorError2;
                            }
                        }
                    }
                } else {
                    element.classList.add(className);
                }
            }
            return element;
        }

        /**
         * @param string selector 
         * @returns element - DOM element 
         */

    }, {
        key: 'getElement',
        value: function getElement(selector) {
            var element = document.querySelector(selector);

            return element;
        }
    }]);

    return cc_CanvasModulesView;
}();

/******************************
 * CanvasModules - extract all module information
 */


var cc_Item = function () {
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
    function cc_Item(element) {
        _classCallCheck(this, cc_Item);

        this.extractId(element);
        this.extractItemTypeAndId(element);
        this.extractTitleAndUrl(element);
        this.extractAbout(element);

        //        console.log(`canvas-collection:    -- ${this.position}) item ${this.id} '<a href="${this.url}">${this.title}</a>' is ${this.itemType}`);
        //        console.log(`canvas-collection:    about ${JSON.stringify(this.about)}`);
    }

    /**
     * @desc Item's id is DOM element id = "context_module_item_" + id 
     * @param DOMElement element - for entire item
     */


    _createClass(cc_Item, [{
        key: 'extractId',
        value: function extractId(element) {
            this.id = null;
            // get dom element id
            var id = element.id;
            // extract id from context_module_item_ + id
            var regex = /context_module_item_(\d+)/;
            var match = id.match(regex);
            if (match) {
                this.id = parseInt(match[1]);
            }
        }

        /**
         * @desc Set the item's title specified in DOM element a.title innerText
         * - Except if itemType is SubHeader - which has no link span.title innerText
         * @param DOMEelement element 
         */

    }, {
        key: 'extractTitleAndUrl',
        value: function extractTitleAndUrl(element) {
            this.title = null;
            this.url = null;
            var titleLink = element.querySelector('a.title');
            if (titleLink !== null) {
                this.title = titleLink.innerText;
                this.url = titleLink.href;
            }

            // if still null, might be subHeader, try span.title
            var subHeaderTitle = element.querySelector('span.title');
            if (subHeaderTitle !== null) {
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

    }, {
        key: 'extractItemTypeAndId',
        value: function extractItemTypeAndId(element) {
            var classes = element.classList;

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

    }, {
        key: 'extractAbout',
        value: function extractAbout(element) {
            this.about = {};
            var aboutSpans = element.querySelectorAll('span.item_name > span');

            for (var i = 0; i < aboutSpans.length; i++) {
                var span = aboutSpans[i];
                // only if display is none
                if (span.style.display === 'none') {
                    var className = span.className;
                    var value = span.innerText;
                    this.about[className] = value;
                }
            }
            // set position data member if present in about
            if ('position' in this.about) {
                this.position = this.about.position;
            }
        }
    }]);

    return cc_Item;
}();

var cc_Module = function () {
    function cc_Module(element) {
        var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

        _classCallCheck(this, cc_Module);

        this.extractId(element);
        this.extractTitle(element);
        this.extractItems(element);
        this.extractPublished(element);
        this.extractCompletionStatus(element);

        this.collection = null;
        this.options = DEFAULT_VIEW_OPTIONS;
        if (options) {
            this.options = options;
        }

        this.addModuleDefaults();

        // TODO 
        // - prerequisites
        // - requirements_message

        console.log('canvas-collections: Module ' + this.id + ' title ' + this.title);
    }

    /**
     * @descr based on the module's title add some default values from CARD_DEFAULTS
     */


    _createClass(cc_Module, [{
        key: 'addModuleDefaults',
        value: function addModuleDefaults() {
            // only add defaults if the current location is griffith.edu.au and there's
            // an entry in CARD_DEFAULTS for this module
            if (!location.hostname.match(/griffith\.edu\.au/) || !(this.title in CARD_DEFAULTS)) {
                // loop through META_DATA_FIELDS list
                var _iteratorNormalCompletion3 = true;
                var _didIteratorError3 = false;
                var _iteratorError3 = undefined;

                try {
                    for (var _iterator3 = META_DATA_FIELDS[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                        var field = _step3.value;

                        // if this has no member field
                        if (!(field in this)) {
                            this[field] = '';
                        }
                    }
                } catch (err) {
                    _didIteratorError3 = true;
                    _iteratorError3 = err;
                } finally {
                    try {
                        if (!_iteratorNormalCompletion3 && _iterator3.return) {
                            _iterator3.return();
                        }
                    } finally {
                        if (_didIteratorError3) {
                            throw _iteratorError3;
                        }
                    }
                }

                return;
            }

            var defaults = CARD_DEFAULTS[this.title];
            for (var key in defaults) {

                this[key] = defaults[key];
            }
        }

        /**
         * @desc Return the id of the module as specified in attribute data-module-id
         * @param DOMElement element - the module dom element
         */

    }, {
        key: 'extractId',
        value: function extractId(element) {
            this.id = null;
            // attribute data-module-id contains the id
            var id = element.getAttribute('data-module-id');
            if (id !== null) {
                this.id = parseInt(id);
            }
        }

        /**
         * @desc Return the title of the module - look for span.name value within element
         * @param {*} element 
         */

    }, {
        key: 'extractTitle',
        value: function extractTitle(element) {
            this.title = null;
            var nameSpan = element.querySelector('span.name');
            if (nameSpan !== null) {
                this.title = nameSpan.innerText;
            }
        }

        /**
         * @desc generate an array of cc_Item objects for the module from 
         * div#context_module_content_ID > ul.context_module_items
         * @param DOMElement element 
         * @returns array of cc_Item objects
         */

    }, {
        key: 'extractItems',
        value: function extractItems(element) {
            var items = [];
            var itemList = element.querySelector('ul.context_module_items');
            if (itemList !== null) {
                var itemElements = itemList.querySelectorAll('li.context_module_item');
                var _iteratorNormalCompletion4 = true;
                var _didIteratorError4 = false;
                var _iteratorError4 = undefined;

                try {
                    for (var _iterator4 = itemElements[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
                        var itemElement = _step4.value;

                        items.push(new cc_Item(itemElement));
                    }
                } catch (err) {
                    _didIteratorError4 = true;
                    _iteratorError4 = err;
                } finally {
                    try {
                        if (!_iteratorNormalCompletion4 && _iterator4.return) {
                            _iterator4.return();
                        }
                    } finally {
                        if (_didIteratorError4) {
                            throw _iteratorError4;
                        }
                    }
                }
            }
            this.items = items;
        }

        /**
         * @desc set the published status of the module 
         * - default published==True, look for icon.unpublish value within element
         * @param DOMElement element
         */

    }, {
        key: 'extractPublished',
        value: function extractPublished(element) {
            this.published = true;
            // the icon can be unreliable
            //let unpublishIcon = element.querySelector('i.icon-unpublish');
            var unpublish = element.querySelector('span.publish-icon');
            // is unpublished in the class list
            if (unpublish !== null && unpublish.classList.contains('unpublished')) {
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

    }, {
        key: 'extractCompletionStatus',
        value: function extractCompletionStatus(element) {
            this.completionStatus = '';

            var statusCheck = {
                'i.complete_icon': 'Completed',
                'i.in_progress_icon': 'In Progress',
                'i.locked_icon': 'Locked'
            };

            for (var key in statusCheck) {
                var icon = element.querySelector(key);
                if (icon !== null) {
                    // set completionStatus if display is visible
                    var _style = window.getComputedStyle(icon);
                    if (_style.display !== 'none') {
                        this.completionStatus = statusCheck[key];
                        break;
                    }
                }
            }
        }
    }]);

    return cc_Module;
}();

var cc_CanvasModules = function cc_CanvasModules() {
    _classCallCheck(this, cc_CanvasModules);

    // get all the div with ids starting with context_module_ within div#context_modules
    this.moduleElements = document.querySelectorAll('div#context_modules > div[id^=context_module_]');

    this.currentCollection = DEFAULT_ACTIVE_COLLECTION;

    // loop thru each moduleElement and construct a cc_Module object
    this.modules = Array.from(this.moduleElements).map(function (moduleElement) {
        return new cc_Module(moduleElement);
    });

    // simple dump
    console.log(this.modules);
};

function canvasCollections() {
    document.head.insertAdjacentHTML('beforeend', CSS_URL);

    // Wait for everything to load
    window.addEventListener('load', function () {
        var controller = new _cc_Controller.cc_Controller();
    }, false);
}

//export default canvasCollections;