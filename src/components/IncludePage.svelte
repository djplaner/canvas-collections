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
  export let collectionName: string = ""

  let pageName : string = ""
  let pageContent: string = ""

  // reactively update the page as the collection's includePage changes
  $: {
    pageName = $collectionsStore["COLLECTIONS"][collectionName].includePage
    if (pageName!=="") {
      getPageName(pageName, $configStore["courseId"], addIncludePage)
    } else {
      pageContent=""
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
