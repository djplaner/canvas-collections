<script>
  /**
   * @file ProcessImportedCollections.svelte
   * @property {Object} collectionsDetails - the details of the collections
   * @description Display a modal component used to modify the imported collection config to
   * work with the current one
   */

  import { configStore, collectionsStore } from "../stores";

  import { wf_fetchData } from "../lib/CanvasSetup";

  import ImportModules from "./Import/ImportModules.svelte";
  import ImportImages from "./Import/ImportImages.svelte";
  import ImportLinks from "./Import/ImportLinks.svelte";

  export let collectionsDetails;

  const currentHostName = document.location.hostname;
  const baseApiUrl = `https://${currentHostName}/api/v1`;

  console.log("ProcessImportedCollections.svelte loaded");

  let currentCourseId = $configStore["courseId"];
  let importCourseId = collectionsDetails.getImportedCourseId();

  let currentCourseDetails = null;
  let importCourseDetails = null;

  console.log($configStore);

  wf_fetchData(`${baseApiUrl}/courses/${currentCourseId}`).then((msg) => {
    if (msg.status === 200) {
      currentCourseDetails = msg.body;
    }
  });
  wf_fetchData(`${baseApiUrl}/courses/${importCourseId}`).then((msg) => {
    if (msg.status === 200) {
      importCourseDetails = msg.body;
    }
  });
</script>

<sl-dialog style="--width: 75vw" label="Update Imported Collections" open>
  <div class="cc-import-intro">
    <p>
      Copying from
      {#if importCourseDetails}
        <a href="/courses/{importCourseId}/" target="_blank" rel="noreferrer">
          {importCourseDetails.course_code} - {importCourseDetails.name}
        </a>
      {/if}
      to
      {#if importCourseDetails}
        <a href="/courses/{currentCourseId}/" target="_blank" rel="noreferrer">
          {currentCourseDetails.course_code} - {currentCourseDetails.name}
        </a>
      {/if}
    </p>
  </div>
  <div class="cc-process-import">
    <sl-tab-group placement="start">
      <sl-tab slot="nav" panel="modules">Modules</sl-tab>
      <sl-tab slot="nav" panel="images">Images</sl-tab>
      <sl-tab slot="nav" panel="links">Links</sl-tab>

      <sl-tab-panel name="modules">
        <ImportModules {currentCourseId} {importCourseId} {collectionsDetails} />
      </sl-tab-panel>
      <sl-tab-panel name="images">
        <ImportImages />
      </sl-tab-panel>
      <sl-tab-panel name="links">
        <ImportLinks />
      </sl-tab-panel>
    </sl-tab-group>
  </div>
</sl-dialog>

<style>
  .cc-import-intro {
    padding: 1rem;
  }
</style>
