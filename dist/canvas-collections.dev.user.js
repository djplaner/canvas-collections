// ==UserScript==
// @name        canvas-collections -> dev
// @description Modify Canvas LMS' modules view to support collections of modules and alternate representations
// @namespace   https://djon.es/
// @version     1.0.2
// @homepage    https://github.com/djplaner/canvas-collections#readme
// @updateURL	 https://raw.githubusercontent.com/djplaner/canvas-collections/main/dev/canvas-collections.dev.user.js
// @downloadURL	 https://raw.githubusercontent.com/djplaner/canvas-collections/main/dev/canvas-collections.dev.user.js
// @author      David Jones
// @resource css file:/Users/davidjones/Documents/GitHub/canvas-collections/dev/canvas-collections.css
// @match       https://*/courses/*
// @run-at      document-idle
// @require file:/Users/davidjones/Documents/GitHub/canvas-collections/dev/canvas-collections.
// @grant       GM_addStyle
// @grant       GM_getResourceText
// @grant       GM_xmlhttpRequest
// ==/UserScript==

/**
 * Userscript for local development i.e. you're making changes
 * - Will only work with the Chrome browser see
 *   https://www.tampermonkey.net/faq.php#Q204
 * - Modify the file paths for the css and Javascript from
 *       file:///C:/Users/djones/code/svelte/canvas-collections/dist/canvas-collections.js
 *   to the path you've installed the Canvas Collections src code
 */