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
  import { collectionsStore, configStore } from "../stores";

  export let collectionName: string = "";
  export let isAfter: boolean = false;

  let pageContent: string = "";
  let pageName: string = "";
  // each one has a unique class
  let divId: string = "cc-include-page-before";
  if (isAfter) {
    divId = "cc-include-page-after";
  }

  $: {
    // Reactively update changes based on the collections includeAfter and includePage
    if (
      isAfter === $collectionsStore["COLLECTIONS"][collectionName].includeAfter
    ) {
      pageName = $collectionsStore["COLLECTIONS"][collectionName].includePage;
      if (pageName !== "") {
        getPageName(pageName, $configStore["courseId"], addIncludePage);
      } else {
        pageContent = "";
      }
    } else {
      pageContent = "";
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

<div class="cc-include-page" id={divId}>
  {@html pageContent}
</div>

<style>
</style>
