<!--
 Copyright (C) 2023 Griffith University
 
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

  import { getPageName, getUrlFromPage } from "../lib/CanvasSetup";
  import { toastAlert } from "../lib/ui";
  import { collectionsStore, configStore } from "../stores";

  //export let collectionName: string = ""
  export let collectionName: string = "";

  let pageName: string = "";
  let pageContent: string = "";
  let pageError : boolean = false;
  let pageErrorMessage : string = "";
  let pageUrl: string = undefined;


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
        pageUrl = getUrlFromPage(pageName, $configStore["courseId"], false)
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
    if (pageObject.hasOwnProperty("body")) {
        pageContent = pageObject.body || "";
        pageUrl = pageObject.html_url || undefined;
        pageError = false;
        pageErrorMessage = "";
    } else {
        pageContent = "";
        pageError = true;
        pageErrorMessage = pageObject.message;
    }
  }

  const HELP = {
    includePage: {
      tooltip: `<p>This content from the collection's include page. Edit that page to change this content. </p>
          `,
      url: "https://djplaner.github.io/canvas-collections/reference/conceptual-model/collections/existing-collections/#include-page",
    },
    includePageError: {
      tooltip: `<p>Most likely unable to find the provided include page amongst this course's pages.</p>`,
      url: "https://djplaner.github.io/canvas-collections/reference/conceptual-model/collections/existing-collections/#include-page",
    }
  };
</script>

<div class="cc-include-page" id="cc-include-page">
  {#if $configStore["editMode"]}
    {#if pageError}
      <div class="cc-error">
        <p>
          <sl-tooltip>
            <div slot="content">{@html HELP.includePageError.tooltip}</div>
            <a target="_blank" rel="noreferrer" href={HELP.includePageError.url}
              ><i class="icon-question cc-module-icon" /></a
            >
          </sl-tooltip>
          Following error reported trying to retrieve <a href="{pageUrl}">the include page (<em>{pageName}</em>)</a>.
        </p>
        <p class="cc-error-message">{pageErrorMessage}</p>
      </div>
    {:else}
    <div class="cc-include-help">
      <sl-tooltip>
        <div slot="content">{@html HELP.includePage.tooltip}</div>
        {#if pageUrl !== undefined}
            Include page <a href={pageUrl} target="_blank" rel="noreferrer"> (<em>{pageName}</em>)</a>
        {/if}
        <a target="_blank" rel="noreferrer" href={HELP.includePage.url}
          ><i class="icon-question cc-module-icon" /></a
        >
      </sl-tooltip>
    </div>
    {/if}
  {/if}
  {@html pageContent}
</div>

<style>
  .cc-error-message {
    padding-left: 1rem;
    margin-left: 1.5rem;
    border-left: 0.5rem solid #f44336;
  }

  .cc-error {
    background-color: #ffffe0;
    width: max-content;
    margin: 0.5rem;
    padding: 0.25rem;
    border-radius: 0.5rem;
  }

  .cc-include-page {
    position: relative;
  }

  .cc-include-help {
    position: absolute;
    top: 0;
    right: 0;
    background-color: #eee;
    padding: 0.2rem;
    margin: 0.2rem;
    font-size: 0.8rem;
    z-index: 100;
  }
</style>
