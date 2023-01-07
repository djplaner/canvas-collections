<script lang="ts">
  /**
   * Display the content of a Canvas page (associated with the course)
   * - page name is given as a prop
   * - page content retrieved via Canvas API
   *
   */

  import { getPageName } from "../lib/CanvasSetup";
  import { configStore } from "../stores";

  export let pageName: string;

  getPageName(pageName, $configStore["courseId"], addIncludePage);

  /**
   * @function addIncludePage
   * @param pageName
   * @param pageObject
   * @description if able to retrieve the page add the content of that
   * page to the div with id="cc-include-page-" + pageName
   */
  function addIncludePage(pageName, pageObject) {
    if (pageObject) {
      let pageContent = pageObject.body;
      let pageDiv = document.getElementById("cc-include-page-" + pageName);
      if (pageDiv) {
        pageDiv.innerHTML = pageContent;
      }
    }
  }
</script>

<div class="cc-include-page" id={"cc-include-page-" + pageName} />

<style>
</style>
