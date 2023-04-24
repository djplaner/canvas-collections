// Copyright (C) 2023 s2986288
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
 * Entry point for CanvasCollections
 * - Check the URL and page contents extract some context
 * - insert div.canvas-collections as the first child of div.right-of-crumbs
 * - add the CanvasCollections app to that div
 */
import CanvasCollections from "./CanvasCollections.svelte";
import { checkContext } from "./lib/CanvasSetup";

// extract some useful context from the URL and the DOM
const context = checkContext();
let app = null;

// Only do this on the modules page
if (context['modulesPage']) {
  // insert the app as the first content of div.right-of-crumbs
  const rightOfCrumbs = document.querySelector(".right-of-crumbs");

  // TODO
  // - should more checks be done here?
  // - e.g. URL etc
  if (!rightOfCrumbs) {
    throw new Error("div.right-of-crumbs not found");
  }

  const div = document.createElement("div");
  div.className = "canvas-collections";
  div.style.display = "flex";
  rightOfCrumbs.appendChild(div);


  app = new CanvasCollections({
    target: div,
    id: "canvas-collections",
    props: context,
  });

  // make sure we tidy up
  addEventListener('beforeunload', (event) => {
    app.$destroy();
  })
} 

export default app;
