// Copyright (C) 2023 Griffith University
// 
// This file is part of Canvas Collections.
// 
// Canvas Collections is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
// 
// Canvas Collections is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
// 
// You should have received a copy of the GNU General Public License
// along with Canvas Collections.  If not, see <http://www.gnu.org/licenses/>.

/**
 * Define suite of methods to interact with Canvas during app set up
 */

// Kludge 
let BASE_API_URL = "";
let BASE_URL = "";

/**
 * @function checkContext
 * @returns {Object} containing editMode, courseId, modulesPage
 * @description Check the current URL to determine it it is Canvas modules
 * page, identify the courseId and if we're in edit mode
 */

export function checkContext(): object {
  const location = window.location.href;

  let context = {
    editMode: false,
    courseId: null,
    modulesPage: false,
    csrfToken: null,
    currentCollection: 0,
    showConfig: false,
    baseApiUrl: ""
  };

  // replace # at end of string
  let url = new URL(window.location.href);

  // Kludge for local development (without SSL)
  // - set 
  context["baseApiUrl"] = `${url.protocol}//${url.hostname}/api/v1/`;
  BASE_API_URL = context["baseApiUrl"];
  BASE_URL = `${url.protocol}//${url.hostname}/`;

  // check if there's a cc-collection-\d+ in the hash
  // this is the case for internal navigation within collections
  // i.e. we're on a modules page
  /*  let hash = url.hash;
  if (hash) {
    let checkNum = hash.match(/cc-collection-(\d+)/);
    if (checkNum) {
      // will set this to a number now, for later translation to collectionName
      context.currentCollection = parseInt(checkNum[1]) ;
    }
  } */
  url.hash = "";
  const documentUrl = url.href;
  //documentUrl = documentUrl.replace(/#$/, '');

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

  context.csrfToken = setCsrfToken();

  return context;
}

/**
 * @function setCsrfToken
 * @returns {String} csrfToken
 * Following adapted from https://github.com/msdlt/canvas-where-am-I
 * Function which returns csrf_token from cookie see:
 * https://community.canvaslms.com/thread/22500-mobile-javascript-development
 */
function setCsrfToken(): string {
  let csrfRegex = new RegExp("^_csrf_token=(.*)$");
  let cookies = document.cookie.split(";");
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
  let callUrl = `${BASE_API_URL}/api/v1/courses/${courseId}`;


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

  if (data.length !== 0) {
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
    /*    if (res.status === 404)
          // Endpoint not found
          return null;
        if (res.status === 401)
          // User not authorized
          return null; */
    const body = await res.json();
    const msg = {
      status: res.status,
      res: res,
      body: body,
    };
    return msg;
  } catch (e) {
    console.error(`Could not fetchData(${reqUrl}) requested information: ${e}`);
  }
};

export const wf_deleteData = async (reqUrl, csrf) => {
  const url = reqUrl;
  try {
    const res = await fetch(url, {
      method: "DELETE",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "X-CSRF-Token": csrf,
      },
      keepalive: true
    });
    if (res.status === 404) {
      // Endpoint not found
      return null;
    }
    if (res.status === 401) {

      // User not authorized
      return null;
    }
    const json = await res.json();
    return json;
  } catch (e) {
    console.error(`Could not delete requested information: ${e}`);
  }
};

/**
 * @function wf_postData
 * @param reqUrl
 * @param data
 * @param csrf
 * @param post - POST or PUT
 * @returns json response (if successful), null otherwise
 *
 */

export const wf_postData = async (
  reqUrl: string,
  data: string,
  csrf: string,
  post = "POST"
) => {
  const url = reqUrl;
  try {
    const res = await fetch(reqUrl, {
      method: post,
      credentials: "include",
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
        Accept: "application/json; charset=UTF-8",
        "X-CSRF-Token": csrf,
      },
      body: data,
    });
    if (res.status === 404)
      // Endpoint not found
      return null;
    if (res.status === 401)
      // User not authorized
      return null;
    const json = await res.json();
    return json;
  } catch (e) {
    console.error(`Could not post requested information: ${e}`);
  }
};

/**
 * Fetch function for retrieving information from multiple endpoint requests
 * @param {Array} reqData Array of endpoint URL's to query the Canvas API
 * @returns Array of Response Objects
 */
export const wf_fetchDataMulti = async (reqData) => {
  return Promise.all(
    reqData.map(async (data) => {
      try {
        const res = await fetch(data);
        if (res.status === 404)
          // Endpoint not found
          return null;
        if (res.status === 401)
          // User not authorized
          return null;
        const json = await res.json();
        return json;
      } catch (e) {
        console.error(`Could not fetch requested information: ${e}`);
      }
    })
  );
};

/**
 * add the div#canvas-collections-representation to the DOM ready for
 * the Svelte component to be added
 * Return the div if added, null if not
 */

export function addCollectionsRepresentation() {

  // check that there isn't already a div#canvas-collections-representation
  // if there is, do nothing
  const representation = document.querySelector(
    "div#canvas-collections-representation"
  );
  if (representation) {
    // if it's already there, empty it
    return null
  }

  // get the div#context-modules
  const contextModules = document.querySelector("div#context_modules");
  if (!contextModules) {
    return null;
  }
  // add a div#canvas-collections-representation as first child of div#context-modules
  let canvasCollectionsRepresentation = document.createElement("div");
  canvasCollectionsRepresentation.id = "canvas-collections-representation";
  contextModules.prepend(canvasCollectionsRepresentation);

  return canvasCollectionsRepresentation;
}

/**
 * @function removeCollectionsRepresentation
 * @description Remove the div#canvas-collections-representation from the DOM
 */

export function removeCollectionsRepresentation() {
  const representation = document.querySelector(
    "div#canvas-collections-representation"
  );
  if (representation) {
    representation.remove();
  }
}

/**
 * @function removeModuleConfiguration
 * @param {Object} modules - hash of module objects keyed on moduleId
 * @description loop through all the modules and remove div#cc-module-config-<moduleId>
 */

export function removeModuleConfiguration(modules: any) {
  // loop thru the keys of the modules hash
  Object.keys(modules).forEach((moduleId) => {
    const moduleConfig = document.querySelector(
      `div#cc-module-config-${moduleId}`
    );
    if (moduleConfig) {
      moduleConfig.remove();
    }
    // make sure all the modules are visible
    const module = document.getElementById(`context_module_${moduleId}`);
    if (module) {
      module.style.display = "block";
    }
  });
}

/**
 * @function getPageName
 * @param {String} pageName - name of the page
 * @param {String} courseId - id of the course
 * @param {Function} callBack - function to call when the page name is found (or not)
 * @description Given the visible name of a page (e.g. "Canvas Collections Configuration")
 * - Slugify the name (e.g. "canvas-collections-configuration")
 * - use the Canvas API to get the page Object
 * - return the pageName and the results (positive or not) to the callBack function
 * - The pageObject will be null if page not found
 */

export function getPageName(
  pageName: string,
  courseId: string,
  callBack: Function
) {

  if (pageName === undefined) {
    console.trace()
    alert("getPageName: pageName is undefined")
    return
  }

  if (pageName !== "") {
    const url = getUrlFromPage(pageName, courseId)

    wf_fetchData(url).then((msg) => {
      callBack(pageName, msg.body);
    });
  }
}

export function getUrlFromPage(pageName, courseId, api = true) {
  // only do this if we've a valid page name
  String.prototype.slugify = function (separator = "-") {
    return this.toString()
      .normalize("NFD") // split an accented letter in the base letter and the acent
      .replace(/[\u0300-\u036f]/g, "") // remove all previously split accents
      .toLowerCase()
      .trim()
      .replace("@", "at")
      .replace(/[^a-z0-9 ]/g, "") // remove all chars not letters, numbers and spaces (to be replaced)
      .replace(/\s+/g, separator);
  };
  const slugifiedPageName = pageName.slugify();

  if (api) {
    return `${BASE_API_URL}/courses/${courseId}/pages/${slugifiedPageName}`;
  } else {
    return `${BASE_URL}/courses/${courseId}/pages/${slugifiedPageName}`;
  }
}