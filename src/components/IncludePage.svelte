<!--
 Copyright (C) 2023 David Jones
 
 This file is part of Canvas Collections.
 
 Canvas Collections is free software: you can redistribute it and/or modify
 it under the terms of the GNU General Public License as published by
 the Free Software Foundation, either version 3 of the License, or
 (at your option) any later version.
 
 Canvas Collections is distributed in the hope that it will be useful,
 but WITHOUT ANY WARRANTY; without even the implied warranty of
 MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 GNU General Public License for more details.
 
 You should have received a copy of the GNU General Public License
 along with Canvas Collections.  If not, see <http://www.gnu.org/licenses/>.
-->

<script lang="ts">
  /**
   * @file IncludePage.svelte
   * @property {string} collectionName - name of the collection to display includePage
   * @property {boolean} isAfter - if true this is the includePage display for after representation
   * @description Two of these are placed in CanvasCollectionsRepresentation.svelte. One before
   * and after the actual collection's representation.
   *
   * If the collectionName collection has an includePage and an includeAfter that matches
   * isAfter retrieve the content of the page and update pageContent. If not, set pageContent to ""
   */

  import { getPageName } from "../lib/CanvasSetup";
  import { toastAlert } from "../lib/ui";
  import { collectionsStore, configStore } from "../stores";

  //export let collectionName: string = ""
  export let collectionName: string = "";

  let pageName: string = "";
  let pageContent: string = "";

  // reactively update the page as the collection's includePage changes
  $: {
    if (
      collectionName !== "" &&
      $collectionsStore["COLLECTIONS"].hasOwnProperty(collectionName) &&
      $collectionsStore["COLLECTIONS"][collectionName].hasOwnProperty(
        "includePage"
      )
    ) {
      pageName = $collectionsStore["COLLECTIONS"][collectionName].includePage;
      if (pageName !== "") {
        getPageName(pageName, $configStore["courseId"], addIncludePage);
      } else {
        pageContent = "";
      }
    }
  }

  /**
   * @function addIncludePage
   * @param pageName
   * @param pageObject
   * @description Call back for the attempt to get the content of the includePage
   * If it succeeds set pageContent to the body of the pageObject. If not, set pageContent to ""
   */
  function addIncludePage(pageName, pageObject) {
    if (pageObject) {
      pageContent = pageObject.body || "";
    } else {
      pageContent = "";
    }
  }
</script>

<div class="cc-include-page" id="cc-include-page">
  {@html pageContent}
</div>

<style>
</style>
