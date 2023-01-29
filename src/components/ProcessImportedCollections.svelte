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
  import { handle_promise } from "svelte/internal";

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

  const HELP = {
    copy: {
      tooltip: `<p>Collections configuration copied from another course will need to be modified.</p>`,
      url: "https://djplaner.github.io/canvas-collections/walk-throughs/course-copy/process/",
    },
  };
</script>

<sl-dialog style="--width: 75vw" label="Processing imported Collections configuration" open>
  <div class="cc-import-intro">
    <p>
    <sl-tooltip>
      <div slot="content">{@html HELP.copy.tooltip}</div>
      <a target="_blank" rel="noreferrer" href={HELP.copy.url}
        ><i class="icon-question cc-module-icon" /></a
      >
    </sl-tooltip>
      <a
        href="/courses/{currentCourseId}/pages/canvas-collections-configuration"
        target="_blank"
        rel="noreferrer">Collections configuration page</a
      >
      copied from
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
	  <sl-tab slot="nav" panel="summary">Summary</sl-tab>
      <sl-tab slot="nav" panel="modules">Modules</sl-tab>
      <sl-tab slot="nav" panel="images">Images</sl-tab>
      <sl-tab slot="nav" panel="links">Links</sl-tab>

	  <sl-tab-panel name="summary">
		<h3>Status</h3>

		<p><em>some status</em></p>

		<h3>About</h3>

		<p></p>

	  </sl-tab-panel>
      <sl-tab-panel name="modules">
        <ImportModules
          {currentCourseId}
          {importCourseId}
          {collectionsDetails}
        />
      </sl-tab-panel>
      <sl-tab-panel name="images">
        <ImportImages 
          {currentCourseId}
          {importCourseId}
          {collectionsDetails}
		/>
      </sl-tab-panel>
      <sl-tab-panel name="links">
        <ImportLinks />
      </sl-tab-panel>
    </sl-tab-group>
  </div>
</sl-dialog>

<style>
  .cc-import-intro {
    padding: 0.5rem;
  }

  sl-dialog {
	font-size: 0.8rem;
	--header-spacing : 0.5rem;
  }

  sl-dialog::part(body) {
	padding: 0.5rem;
  }

  sl-dialog:part(title) {
	font-size: 1.2rem;
  }

  sl-tab-panel > h3 {
	font-size: 1rem;
  }

  .cc-process-import {
	border-top-style: solid;
	border-color: #cccccc;
  }
</style>
