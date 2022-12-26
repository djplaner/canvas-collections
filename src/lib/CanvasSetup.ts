/**
 * Define suite of methods to interact with Canvas during app set up
 */

const DEBUG = true;

/**
 * @function checkContext
 * @returns {Object} containing editMode, courseId, modulesPage
 * @description Check the current URL to determine it it is Canvas modules
 * page, identify the courseId and if we're in edit mode
 */

export function checkContext() : object {
  const location = window.location.href;

  let context = {
    editMode: false,
    courseId: null,
    modulesPage: false,
    csrfToken: null,
  };

  // replace # at end of string
  let url = new URL(window.location.href);

  // check if there's a cc-collection-\d+ in the hash
  // this is the case for internal navigation within collections
  // i.e. we're on a modules page
  let hash = url.hash;
  if (hash) {
    let checkNum = hash.match(/cc-collection-(\d+)/);
    if (checkNum) {
      this.URLCollectionNum = parseInt(checkNum[1]) - 1;
    }
  }
  url.hash = "";
  const documentUrl = url.href; //window.location.href;
  //this.documentUrl = this.documentUrl.replace(/#$/, '');

  // courseId
  // Following adapted from https://github.com/msdlt/canvas-where-am-I
  // if ENV object has a COURSE_ID field and it is an integer, set context.courseId
  if (ENV.COURSE_ID && ENV.COURSE_ID.match(/^\d+$/)) {
    context.courseId = ENV.COURSE_ID;
  } else {
    // try and extract it from the URL

    let urlPartIncludingCourseId = documentUrl.split("courses/")[1];
    if (urlPartIncludingCourseId) {
      const localCourseId = urlPartIncludingCourseId.split("/")[0];
      // if localCourseId is an integer, set context.courseId
      if (localCourseId.match(/^\d+$/)) {
        context.courseId = localCourseId;
      }
    }
  }

  // fail here if we've not gotten a courseId
  if (!context.courseId) {
    throw new Error("No courseId found");
  }

  // modulesPage true if location ends with courses/${courseId}/modules
  let regEx = new RegExp(`courses/${context.courseId}/modules(/*|#*|#[^/]+)$`);
  context.modulesPage = regEx.test(documentUrl);

  if (!context.modulesPage) {
    // check to see if the home page has been set to modules
    // homeModulesPage true iff
    // - location ends with courses/${courseId}
    // - div#context_modules is present
    regEx = new RegExp(`courses/${context.courseId}$`);
    context.modulesPage =
      regEx.test(documentUrl) &&
      document.getElementById("context_modules") !== null;
  }

  // editMode true iff a#easy_student_view exists
  // TODO - perhaps replace/extend this with another check using
  // the course object later
  context.editMode = document.getElementById("easy_student_view") !== null;

  context.csrfToken = setCsrfToken()

  return context;
}

	/**
   * @function setCsrfToken
   * @returns {String} csrfToken
	 * Following adapted from https://github.com/msdlt/canvas-where-am-I
	 * Function which returns csrf_token from cookie see: 
	 * https://community.canvaslms.com/thread/22500-mobile-javascript-development
	 */
function	setCsrfToken() : string {
		let csrfRegex = new RegExp('^_csrf_token=(.*)$');
		let cookies = document.cookie.split(';');
		for (let i = 0; i < cookies.length; i++) {
			let cookie = cookies[i].trim();
			let match = csrfRegex.exec(cookie);
			if (match) {
				return decodeURIComponent(match[1]);
			}
		}
    return null;
	}

/**
 * @function requestCourseObject
 * @param {Integer} courseId
 * @description Request the course object from Canvas
 */

export async function requestCourseObject(courseId: number, csrfToken: string) {
  let callUrl = `/api/v1/courses/${courseId}`;

  DEBUG &&
    console.log(`cc_Controller: requestCourseOjbect: callUrl = ${callUrl}`);

  const response = await fetch(callUrl, {
    method: "GET",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      "X-CSRF-Token": csrfToken,
    },
  });
  if (!response.ok) {
    throw new Error(
      `cc_Controller: requestCourseObject: error ${response.status}`
    );
  }

  const data = await response.json();

  if (data.length === 0) {
    // TODO unsure about the validity of this
    DEBUG &&
      console.log(
        `cc_Controller: requestCourseObject: couldn't get course object`
      );
  } else {
    return data;
    //			this.courseObject = data;
    /*			this.generateSTRM();
			this.requestModuleInformation(); */
  }
}


/**
 * Fetch function for retrieving information from a single endpoint request
 * @param {String} reqUrl Endpoint URL to query the Canvas API
 * @returns Response Object
 */
export const wf_fetchData = async (reqUrl) => {
	const url = reqUrl;
	try {
		const res = await fetch(url);
		if (res.status === 404) // Endpoint not found
			return null;
		if (res.status === 401) // User not authorized
			return null;
		const json = await res.json();
		return json;
	} catch (e) {
		console.error(`Could not fetch requested information: ${e}`);
	}
};

export const wf_deleteData = async (reqUrl, csrf) => {
	const url = reqUrl;
	try {
		const res = await fetch(url, {
			method: 'DELETE', credentials: 'include',
			headers: {
				"Content-Type": "application/json",
				"Accept": "application/json",
				"X-CSRF-Token": csrf
			}
		});
		if (res.status === 404) // Endpoint not found
			return null;
		if (res.status === 401) // User not authorized
			return null;
		const json = await res.json();
		return json;
	} catch (e) {
		console.error(`Could not delete requested information: ${e}`);
	}
}



export const wf_postData = async (reqUrl, data, csrf) => {
	const url = reqUrl;
	try {
		const res = await fetch(reqUrl, {
			method: 'POST', credentials: 'include',
			headers: {
				"Content-Type": "application/json",
				"Accept": "application/json",
				"X-CSRF-Token": csrf
			},
			body: JSON.stringify(data),
		});
		if (res.status === 404) // Endpoint not found
			return null;
		if (res.status === 401) // User not authorized
			return null;
		const json = await res.json();
		return json;
	} catch (e) {
		console.error(`Could not post requested information: ${e}`);
	}
}

/**
 * Fetch function for retrieving information from multiple endpoint requests
 * @param {Array} reqData Array of endpoint URL's to query the Canvas API
 * @returns Array of Response Objects
 */
export const wf_fetchDataMulti = async (reqData) => {
	return Promise.all(reqData.map(async (data) => {
		try {
			const res = await fetch(data);
			if (res.status === 404) // Endpoint not found
				return null;
			if (res.status === 401) // User not authorized
				return null;
			const json = await res.json();
			return json;
		} catch (e) {
			console.error(`Could not fetch requested information: ${e}`);
		}
	}));
};
