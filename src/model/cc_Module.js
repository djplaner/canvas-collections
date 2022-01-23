

import { cc_Item } from './cc_Item.js';


// Hard code default card values for 1031LAW_3215
// key is the module name

const DEFAULT_ACTIVE_COLLECTION = 'Topics';

const META_DATA_FIELDS = [
    'image', 'label', 'imageSize', 'num', 'description', 'collection'
]

// Hard coded card values dict of dicts
// {
//       'canvasId': { card dict }

let CARD_DEFAULTS = {
    'https://griffith.instructure.com/courses/130': {
        'CC_COLLECTIONS_DEFAULTS': [ ],
        'CC_DEFAULT_ACTIVE_COLLECTION': '',
        'Introduction': {
            'image': 'https://s3.amazonaws.com/SSL_Assets/learning_services/Growing+with+Canvas/home-page-images/introduction.png',
            'label': '',
            'imageSize': 'bg-contain',
            'num': '',
            'description': `Getting oriented to the Canvas self-paced tutorial!`,
            'date': { }
        },
        ' Planting': {
            'image': 'https://s3.amazonaws.com/SSL_Assets/learning_services/Growing+with+Canvas/home-page-images/planting.png',
            'label': '',
            'imageSize': 'bg-contain',
            'num': '',
            'description': `Getting oriented to the Canvas self-paced tutorial!`,
            'collection': 'Topics',
            'date': { }
        },
        ' Nurturing': {
            'image': 'https://s3.amazonaws.com/SSL_Assets/learning_services/Growing+with+Canvas/home-page-images/nurturing.png',
            'label': '',
            'imageSize': 'bg-contain',
            'num': '',
            'description': `Getting oriented to the Canvas self-paced tutorial!`,
            'collection': 'Topics',
            'date': { }
        },
        ' Sprouting': {
            'image': 'https://s3.amazonaws.com/SSL_Assets/learning_services/Growing+with+Canvas/home-page-images/sprouting.png',
            'label': '',
            'imageSize': 'bg-contain',
            'num': '',
            'description': `Getting oriented to the Canvas self-paced tutorial!`,
            'collection': 'Topics',
            'date': { }
        },
        ' Flowering': {
            'image': 'https://s3.amazonaws.com/SSL_Assets/learning_services/Growing+with+Canvas/home-page-images/flowering.png',
            'label': '',
            'imageSize': 'bg-contain',
            'num': '',
            'description': `Getting oriented to the Canvas self-paced tutorial!`,
            'collection': 'Topics',
            'date': { }
        },
        ' Harvesting': {
            'image': 'https://s3.amazonaws.com/SSL_Assets/learning_services/Growing+with+Canvas/home-page-images/harvesting.png',
            'label': '',
            'imageSize': 'bg-contain',
            'num': '',
            'description': `Getting oriented to the Canvas self-paced tutorial!`,
            'collection': 'Topics',
            'date': { }
        },
        ' Completed Growing with Canvas': {
            'image': 'https://media0.giphy.com/media/xBqg5gAf1xINizpek6/200.gif',
            'label': '',
            'imageSize': 'bg-contain',
            'num': '',
            'description': `Getting oriented to the Canvas self-paced tutorial!`,
            'collection': 'Topics',
            'date': { }
        },
    },
    'https://griffith.instructure.com/courses/220': {
        'CC_COLLECTIONS_DEFAULTS': [
            "Topics", "Assessment", "Online Workshops", "Student Support"
        ],
        'CC_DEFAULT_ACTIVE_COLLECTION': 'Topics',
        'LEARNING_JOURNEY': 'https://griffith.instructure.com/courses/220/pages/learning-journey',
        'TEACHING_TEAM' : 'hello',
        'COURSE_PROFILES' : [
            { 
                'label': '1031LAW - Gold Coast Profile',
                'url': 'https://courseprofile.secure.griffith.edu.au/section1.php?profileId=122153'
            },
            { 
                'label': '7731LAW - Gold Coast Profile',
                'url': 'https://courseprofile.secure.griffith.edu.au/section1.php?profileId=122211'
            },
            { 
                'label': '1031LAW - Nathan Profile',
                'url': 'https://courseprofile.secure.griffith.edu.au/section1.php?profileId=122148'
            },
            { 
                'label': '7731LAW - Nathan Profile',
                'url': 'https://courseprofile.secure.griffith.edu.au/section1.php?profileId=122210'
            }
        ],
        'HOME_PAGE': `
        <div id="cc-home-page-nav">
        <table style="border-collapse: collapse; width: 97.5583%; background-color: #6f767e; border-color: #474747; margin-left: auto; margin-right: auto;" border="1">
            <tbody>
                <tr>
                    <td style="width: 33.2942%; text-align: center;">
                        <a class="tooltip" title="Learning Journey" data-tooltip-content="#cc-learning-journey-content"
                            href="https://griffith.instructure.com/courses/220/pages/learning-journey" data-api-endpoint="https://griffith.instructure.com/api/v1/courses/919/pages/learning-journey" data-api-returntype="Page"><span style="color: #ffffff;"><span style="font-family: wingdings, 'zapf dingbats';">O </span>Learning Journey</span></a></td>
                    <td style="width: 33.2942%; text-align: center;">
                        <span class="tooltip" id="cc-course-profile" data-tooltip-content="#cc-course-profile-content"
                            href="" rel="noopener"><span style="color: #ffffff;"><span style="font-family: wingdings, 'zapf dingbats';">&amp;</span>&nbsp; &nbsp;Course Profile</span></span></td>
                    <td style="width: 33.2978%; text-align: center;">
                        <a class="tooltip" title="Teaching Team" data-tooltip-content="#cc-teaching-team-content"
                            href="https://griffith.instructure.com/courses/220/pages/your-teaching-team?module_item_id=35489" data-api-endpoint="https://griffith.instructure.com/api/v1/courses/919/pages/teaching-team" data-api-returntype="Page"><span style="color: #ffffff;"><span style="font-family: webdings;">_</span>&nbsp; Your Teaching Team</span></a></td>
                </tr>
            </tbody>
        </table>
        </div>`,
        'Welcome': {
            'image': 'https://i.ytimg.com/vi/gkdGXFcxHw4/maxresdefault.jpg',
            'label': '',
            'imageSize': 'bg-contain',
            'num': '',
            'description': `<ul>
          <li> What will you learn? </li>
          <li> What do you need to do? </li>
          <li> How will you show what you've learnt?</li> </ul>
          <p><a href="https://google.com">Google</a>`,
            'collection': 'Topics',
            'date': {
                'label': 'Commencing',
                'week': 'Week 0',
                'month': 'Jul',
                'date': '12'
            }
        },
        'Introduction': {
            'image': 'https://griffith.instructure.com/courses/220/files/114366/preview',
            'label': 'Topic',
            'imageSize': 'bg-contain',
            'num': '1',
            'description': '<p>Overview of Foundations of Law and My Law Career</p>',
            'collection': 'Topics',
            'date': {
                'label': 'Commencing',
                'week': 'Week 1',
                'month': 'Jul',
                'date': '19'
            }
        },
        'Making and Finding Law': {
            'image': 'https://griffith.instructure.com/courses/220/files/114365/preview',
            'label': 'Topic',
            'imageSize': 'bg-cover',
            'num': '2',
            'description': 'How law is made - and how to find the law (legislation and case)',
            'collection': 'Topics',
            'date': {
                'label': 'From',
                'start': {
                    'week': '2',
                    'month': 'Jul',
                    'date': '26'
                },
                'stop': {
                    'week': '3',
                    'month': 'Aug',
                    'date': '6'
                },
            }
        },
        'Introduction to Legal Theory': {
            'image': 'https://griffith.instructure.com/courses/220/files/114369/preview',
            'label': 'Topic',
            'imageSize': 'bg-contain',
            'num': '3',
            'description': '',
            'collection': 'Topics',
            'date': {
                'label': 'Commencing',
                'week': 'Week 4',
                'month': 'Aug',
                'date': '16'
            }
        },
        'Statutory Interpretation': {
            //        'image': 'https://griffith.instructure.com/courses/220/files//preview',
            'label': 'Topic',
            'imageSize': 'bg-cover',
            'num': '4',
            'description': '<p>How to interpret legislation (i.e. work out what it means)</p>',
            'collection': 'Topics',
            'date': {
                'label': 'From',
                'start': {
                    'week': '5',
                    'month': 'Aug',
                    'date': '23'
                },
                'stop': {
                    'week': '7',
                    'month': 'Sep',
                    'date': '10'
                },
            }
        },
        'Case Law': {
            'image': 'https://griffith.instructure.com/courses/220/files/114363/preview',
            'label': 'Topic',
            'imageSize': 'bg-cover',
            'description': '<p>How to read and understand case law (i.e. written judgements)</p>',
            'num': '6',
            'collection': 'Topics',
            'date': {
                'label': 'From',
                'start': {
                    'week': '8',
                    'month': 'Sep',
                    'date': '13'
                },
                'stop': {
                    'week': '9',
                    'month': 'Sep',
                    'date': '24'
                },
            }
        },
        'The Legal Profession': {
            'image': 'https://griffith.instructure.com/courses/220/files/114367/preview',
            'label': 'Topic',
            'imageSize': 'bg-cover',
            'num': '7',
            'description': '<p>Introduction to the legal profession and legal professional ethics.</p>',
            'collection': 'Topics',
            'date': {
                'label': 'Commencing',
                'week': 'Week 10',
                'month': 'Sep',
                'date': '27'
            }
        },
        'First Nations People and the Law': {
            'image': 'https://griffith.instructure.com/courses/220/files/114368/preview',
            'label': 'Topic',
            'imageSize': 'bg-cover',
            'num': '8',
            'description': '<p>Introduction to First Nations people and the law</p>',
            'collection': 'Topics',
            'date': {
                'label': 'Commencing',
                'week': 'Week 11',
                'month': 'Oct',
                'date': '4'
            }
        },
        'Consolidating Knowledge': {
            'image': 'https://griffith.instructure.com/courses/220/files/114364/preview',
            'label': 'Topic',
            'imageSize': 'bg-cover',
            'num': '9',
            'description': '<p>Revision and preparation for final assessment</p>',
            'collection': 'Topics',
            'date': {
                'label': 'Commencing',
                'week': 'Week 12',
                'month': 'Oct',
                'date': '11'
            }
        },
        // Assessment 1031LAW
        'Accessing Case Law and Legislation': {
            'image': 'https://i.ytimg.com/vi/USreSduMgOc/maxresdefault.jpg',
            'label': 'Assessment',
            //        'imageSize': 'bg-cover',
            'num': '1',
            'description': `<p>Complete a 50 minute online exam. Released 9am on Tuesday of 
        Week 4 and closed at 5pm on Friday of Week 4.</p>`,
            'collection': 'Assessment',
            'date': {
                'label': 'From',
                'start': {
                    'week': null,
                    'month': 'Aug',
                    'date': '17'
                },
                'stop': {
                    'week': null,
                    'month': 'Aug',
                    'date': '20'
                },
            }
        },
        'Legislation, Case Law and Statutory Interpretation Assignment': {
            'image': 'https://blog.ipleaders.in/wp-content/uploads/2019/11/In-Law-Statutory-Interpretation-is-Important.jpg',
            'label': 'Assessment',
            //      'imageSize': 'bg-cover',
            'num': '2',
            'description': `<p>Prepare succinct memos explaining and commenting on a piece of legislation and a case
        respectively, and apply rules of statuory interpretation.</p>`,
            'collection': 'Assessment',
            'date': {
                'label': 'Due',
                'week': null,
                'month': 'Sep',
                'date': '27'
            }
        },
        'Take-Home Exam': {
            'image': 'https://www.lawyer-monthly.com/Lawyer-Monthly/wp-content/uploads/2017/11/5-Top-Tips-for-Passing-Your-Law-Exams-750x430.jpg',
            'label': 'Assessment',
            //        'imageSize': 'bg-cover',
            'num': '3',
            'description': `<p>Complete a 2 hour open-book take home exam with both short-answer and hypothetical questions.</p>`,
            'collection': 'Assessment',
            'date': {
                'label': 'From',
                'start': {
                    'week': null,
                    'month': 'Oct',
                    'date': '21'
                },
                'stop': {
                    'week': null,
                    'month': 'Oct',
                    'date': '30'
                },
            }
        },
        'Workshop Schedule': {
            'image': 'https://i0.wp.com/frescopad.com/wp-content/uploads/2020/10/webinar-png.png?resize=387%2C242&ssl=1',
            'label': '',
            //        'imageSize': 'bg-cover',
            'num': '',
            'description': `<p>Course online workshops: where, when and what for.</p>`,
            'collection': 'Online Workshops',
            'date':{}
        }, 
        'Teaching Team': {
            'image': 'https://s18670.pcdn.co/wp-content/uploads/2013/12/build-the-perfect-teacher-team.tmb-570.jpg',
            'label': '',
            //        'imageSize': 'bg-cover',
            'num': '',
            'description': `<p>Meet and contact your teachers.</p>`,
            'collection': 'Student Support',
            'date':{}
        }
    },

    'https://lms.griffith.edu.au/courses/122': {
    'CC_COLLECTIONS_DEFAULTS': [
        "Topics", "Assessment", "Online Workshops", "Student Support"
    ],
    'CC_DEFAULT_ACTIVE_COLLECTION': 'Topics',
    'Welcome': {
        'image': 'https://i.ytimg.com/vi/gkdGXFcxHw4/maxresdefault.jpg',
        'label': '',
        'imageSize': 'bg-contain',
        'num': '',
        'description': `<ul>
      <li> What will you learn? </li>
      <li> What do you need to do? </li>
      <li> How will you show what you've learnt?</li> </ul>
      <p><a href="https://google.com">Google</a>`,
        'collection': 'Topics',
        'date': {
            'label': 'Commencing',
            'week': 'Week 0',
            'month': 'Jul',
            'date': '12'
        }
    },
    'Introduction': {
        'image': 'https://lms.griffith.edu.au/courses/122/files/795/preview',
        'label': 'Topic',
        'imageSize': 'bg-contain',
        'num': '1',
        'description': '<p>Overview of Foundations of Law and My Law Career</p>',
        'collection': 'Topics',
        'date': {
            'label': 'Commencing',
            'week': 'Week 1',
            'month': 'Jul',
            'date': '19'
        }
    },
    'Making and Finding Law': {
        'image': 'https://lms.griffith.edu.au/courses/122/files/797/preview',
        'label': 'Topic',
        'imageSize': 'bg-cover',
        'num': '2',
        'description': 'How law is made - and how to find the law (legislation and case)',
        'collection': 'Topics',
        'date': {
            'label': 'From',
            'start': {
                'week': '2',
                'month': 'Jul',
                'date': '26'
            },
            'stop': {
                'week': '3',
                'month': 'Aug',
                'date': '6'
            },
        }
    },
    'Introduction to Legal Theory': {
        'image': 'https://lms.griffith.edu.au/courses/122/files/798/preview',
        'label': 'Topic',
        'imageSize': 'bg-contain',
        'num': '3',
        'description': '',
        'collection': 'Topics',
        'date': {
            'label': 'Commencing',
            'week': 'Week 4',
            'month': 'Aug',
            'date': '16'
        }
    },
    'Statutory Interpretation': {
        //        'image': 'https://lms.griffith.edu.au/courses/122/files//preview',
        'label': 'Topic',
        'imageSize': 'bg-cover',
        'num': '4',
        'description': '<p>How to interpret legislation (i.e. work out what it means)</p>',
        'collection': 'Topics',
        'date': {
            'label': 'From',
            'start': {
                'week': '5',
                'month': 'Aug',
                'date': '23'
            },
            'stop': {
                'week': '7',
                'month': 'Sep',
                'date': '10'
            },
        }
    },
    'Case Law': {
        'image': 'https://lms.griffith.edu.au/courses/122/files/799/preview',
        'label': 'Topic',
        'imageSize': 'bg-cover',
        'description': '<p>How to read and understand case law (i.e. written judgements)</p>',
        'num': '6',
        'collection': 'Topics',
        'date': {
            'label': 'From',
            'start': {
                'week': '8',
                'month': 'Sep',
                'date': '13'
            },
            'stop': {
                'week': '9',
                'month': 'Sep',
                'date': '24'
            },
        }
    },
    'The Legal Profession': {
        'image': 'https://lms.griffith.edu.au/courses/122/files/796/preview',
        'label': 'Topic',
        'imageSize': 'bg-cover',
        'num': '7',
        'description': '<p>Introduction to the legal profession and legal professional ethics.</p>',
        'collection': 'Topics',
        'date': {
            'label': 'Commencing',
            'week': 'Week 10',
            'month': 'Sep',
            'date': '27'
        }
    },
    'First Nations People and the Law': {
        'image': 'https://lms.griffith.edu.au/courses/122/files/801/preview',
        'label': 'Topic',
        'imageSize': 'bg-cover',
        'num': '8',
        'description': '<p>Introduction to First Nations people and the law</p>',
        'collection': 'Topics',
        'date': {
            'label': 'Commencing',
            'week': 'Week 11',
            'month': 'Oct',
            'date': '4'
        }
    },
    'Consolidating Knowledge': {
        'image': 'https://lms.griffith.edu.au/courses/122/files/800/preview',
        'label': 'Topic',
        'imageSize': 'bg-cover',
        'num': '9',
        'description': '<p>Revision and preparation for final assessment</p>',
        'collection': 'Topics',
        'date': {
            'label': 'Commencing',
            'week': 'Week 12',
            'month': 'Oct',
            'date': '11'
        }
    },
    // Assessment 1031LAW
    'Accessing Case Law and Legislation': {
        //        'image': 'https://lms.griffith.edu.au/courses/122/files/800/preview',
        'label': 'Assessment',
        //        'imageSize': 'bg-cover',
        'num': '1',
        'description': `<p>Complete a 50 minute online exam. Released 9am on Tuesday of 
    Week 4 and closed at 5pm on Friday of Week 4.</p>`,
        'collection': 'Assessment',
        'date': {
            'label': 'From',
            'start': {
                'week': null,
                'month': 'Aug',
                'date': '17'
            },
            'stop': {
                'week': null,
                'month': 'Aug',
                'date': '20'
            },
        }
    },
    'Legislation, Case Law and Statutory Interpretation Assignment': {
        //        'image': 'https://lms.griffith.edu.au/courses/122/files/800/preview',
        'label': 'Assessment',
        //      'imageSize': 'bg-cover',
        'num': '2',
        'description': `<p>Prepare succinct memos explaining and commenting on a piece of legislation and a case
    respectively, and apply rules of statuory interpretation.</p>`,
        'collection': 'Assessment',
        'date': {
            'label': 'Due',
            'week': null,
            'month': 'Sep',
            'date': '27'
        }
    },
    'Take-Home Exam': {
        //     'image': 'https://lms.griffith.edu.au/courses/122/files/800/preview',
        'label': 'Assessment',
        //        'imageSize': 'bg-cover',
        'num': '3',
        'description': `<p>Complete a 2 hour open-book take home exam with both short-answer and hypothetical questions.</p>`,
        'collection': 'Assessment'
    }
}

};



export default class cc_Module {
    constructor(element, options = null) {
        this.extractId(element);
        this.extractTitle(element);
        this.extractItems(element);
        this.extractPublished(element);
        this.extractCompletionStatus(element);

        this.calculateItemProgress();

        this.setConfiguration(options);


        this.addModuleDefaults();

        // TODO 
        // - prerequisites
        // - requirements_message

/*        console.log('------------------');
        console.log(`canvas-collections: Module ${this.id} title ${this.title}`);
        console.log(`--- location is ${location} -- courseUrl is ${this.courseUrl}`);
        console.log(`--- configured is ${this.configured}`); */
    }

    /**
     * @desc Configure the module model based on location, defaults etc
     * @param {Object} options - configuration options
     */
    setConfiguration(options) {
        // this.configured is true if there is some hard wired
        // card configuration content above
        this.configured = false;
        this.configuration = null;

        // extract https://hostname/courses/[0-9]* from location
        let location = window.location.href;

        this.courseUrl = location.match(/https:\/\/.*\/courses\/[0-9]*/);
        if (this.courseUrl) {
            // if CARD_DEFAULTS has key this.courseUrl we have config
            if (this.courseUrl in CARD_DEFAULTS) {
                // match with hard code configuration, set data members
                this.configured = true;
                this.configuration = CARD_DEFAULTS[this.courseUrl]
            }
        }

        // are we one the home page?
        this.courseHomePage = false;
        if (location.match(/^https:\/\/.*\/courses\/[0-9]*$/)) {
            this.courseHomePage = true;
        }

        // by default a module doesn't belong to a collection
        this.collection = null;
        //	    this.options = DEFAULT_VIEW_OPTIONS;
        if (options) {
            this.options = options;
        }
    }

    /**
     * @descr based on the module's title add some default values from this.configuration
     */
    addModuleDefaults() {
        // only add defaults if there is some configuration for this card

        // remove any non-asciis from title
        let title = this.title.replace(/[^\x00-\x7F]/g, "");

        if (!this.configured || !this.configuration || !(title in this.configuration)) {
            // loop through META_DATA_FIELDS list
            for (let field of META_DATA_FIELDS) {
                // if this has no member field
                if (!(field in this)) {
                    this[field] = '';
                }
            }
            return;
        }

        // we are configured so update the object
        let defaults = this.configuration[title];
        for (let key in defaults) {
            this[key] = defaults[key];
        }
    }

    /**
     * @desc Return the id of the module as specified in attribute data-module-id
     * @param DOMElement element - the module dom element
     */
    extractId(element) {
        this.id = null;
        // attribute data-module-id contains the id
        let id = element.getAttribute('data-module-id');
        if (id !== null) {
            this.id = parseInt(id);
        }
    }

    /**
     * @desc Return the title of the module - look for span.name value within element
     * @param {*} element 
     */
    extractTitle(element) {
        this.title = null;
        let nameSpan = element.querySelector('span.name');
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
    extractItems(element) {
        let items = [];
        let itemList = element.querySelector('ul.context_module_items');
        if (itemList !== null) {
            let itemElements = itemList.querySelectorAll('li.context_module_item');
            for (let itemElement of itemElements) {
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
    extractPublished(element) {
        this.published = true;
        // the icon can be unreliable
        //let unpublishIcon = element.querySelector('i.icon-unpublish');
        let unpublish = element.querySelector('span.publish-icon');
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
    extractCompletionStatus(element) {
        this.completionStatus = '';

        const statusCheck = {
            'i.complete_icon': 'Completed',
            'i.in_progress_icon': 'In Progress',
            'i.locked_icon': 'Locked'
        }

        for (let key in statusCheck) {
            let icon = element.querySelector(key);
            if (icon !== null) {
                // set completionStatus if display is visible
                let style = window.getComputedStyle(icon);
                if (style.display !== 'none') {
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
        this.percentItemsComplete = null;
        const numItems = this.items.length;
        // # of items that can be completed are those with item.status!=null
        const numItemsToComplete = this.items.filter(item => item.status !== null).length;
        // # of items completed are those with item.isComplete==true
        const numItemsCompleted = this.items.filter(item => item.isComplete).length;

        if (numItemsToComplete === 0) {
            return;
        }

        this.percentItemsComplete = Math.round(numItemsCompleted / numItemsToComplete * 100);

    }
}