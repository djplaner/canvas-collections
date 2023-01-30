<script>
  /**
   * @file ProcessImportedCollections.svelte
   * @property {Object} collectionsDetails - the details of the collections
   * @description Display a modal component used to modify the imported collection config to
   * work with the current one
   */

  import { configStore } from "../stores";

  import { wf_fetchData } from "../lib/CanvasSetup";

  import ImportModules from "./Import/ImportModules.svelte";
  import ImportImages from "./Import/ImportImages.svelte";

  export let collectionsDetails;

  const currentHostName = document.location.hostname;
  const baseApiUrl = `https://${currentHostName}/api/v1`;

  // status placeholders for sub-component completion
  let modulesCompleteStatus;
  let imagesCompleteStatus;

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

  /**
   * @function proceedChoice
   * @param choice
   * @description Handle the user's choice to proceed with the import
   * and then close the dialog
   */
  function proceedChoice(choice) {
    const dialog = document.querySelector(".cc-dialog");
    dialog.remove();
    $configStore["migrationOutcome"] = choice;
  }

  const HELP = {
    copy: {
      tooltip: `<p>Collections configuration copied from another course will need to be modified.</p>`,
      url: "https://djplaner.github.io/canvas-collections/walk-throughs/course-copy/process/",
    },
    summary: {
      tooltip: `<p>What was found? What might you do next?`,
      url: "https://djplaner.github.io/canvas-collections/walk-throughs/course-copy/process/",
    },
    modules: {
      tooltip: `<p>Changes required for module configuration in Collections</p>`,
      url: "https://djplaner.github.io/canvas-collections/walk-throughs/course-copy/process/#modules",
    },
    images: {
      tooltip: `<p>Status of any course-based module module images in Collections configuration</p>`,
      url: "https://djplaner.github.io/canvas-collections/walk-throughs/course-copy/process/#images",
    },
    proceed: {
      tooltip: `<p>Collections will update its configuration and you can proceed using Canvas Collections</p>`,
      url: "https://djplaner.github.io/canvas-collections/walk-throughs/course-copy/process/#proceed",
    },
    cancel: {
      tooltip: `<p>Cancel the import, return to the course make any changes, and then recommence the import.</p>
	  <p><sl-icon name="info-circle"></sl-icon> You cannot use Collections in this courses until the migration process
		is complete.</p>`,
      url: "https://djplaner.github.io/canvas-collections/walk-throughs/course-copy/process/#cancel",
    },
    refresh: {
      tooltip: `<p>Refresh Collections configuration to a blank state. Allowing you to start fresh 
			and use the Collections interface to customise design for the new course.</p>`,
      url: "https://djplaner.github.io/canvas-collections/walk-throughs/course-copy/process/#refresh",
    },
  };
</script>

<sl-dialog
  class="cc-dialog"
  style="--width: 75vw"
  label="How to proceed with the import of Canvas Collections configuration?"
  open
>
  <div class="cc-process-import">
    <sl-tab-group placement="start">
      <sl-tab slot="nav" panel="summary">
        <sl-tooltip>
          <div slot="content">{@html HELP.summary.tooltip}</div>
          <a target="_blank" rel="noreferrer" href={HELP.summary.url}
            ><i class="icon-question cc-module-icon" /></a
          >
        </sl-tooltip> &nbsp; Summary</sl-tab
      >
      <sl-tab slot="nav" panel="modules">
        <sl-tooltip>
          <div slot="content">{@html HELP.modules.tooltip}</div>
          <a target="_blank" rel="noreferrer" href={HELP.modules.url}
            ><i class="icon-question cc-module-icon" /></a
          >
        </sl-tooltip>
        &nbsp; Modules &nbsp;
        {#if modulesCompleteStatus}
          <sl-badge variant="success">Ok</sl-badge>
        {:else}
          <sl-spinner />
        {/if}
      </sl-tab>
      <sl-tab slot="nav" panel="images">
        <sl-tooltip>
          <div slot="content">{@html HELP.images.tooltip}</div>
          <a target="_blank" rel="noreferrer" href={HELP.images.url}
            ><i class="icon-question cc-module-icon" /></a
          >
        </sl-tooltip>
        &nbsp; Images &nbsp;
        {#if imagesCompleteStatus}
          <sl-badge variant="success">Ok</sl-badge>
        {:else}
          <sl-spinner />
        {/if}
      </sl-tab>

      <sl-tab-panel name="summary">
        <div class="cc-import-intro">
          <p>
            <a
              href="/courses/{currentCourseId}/pages/canvas-collections-configuration"
              target="_blank"
              rel="noreferrer">Collections configuration page</a
            >
            has been imported from another course
            {#if importCourseDetails}
              (
              <a
                href="/courses/{importCourseId}/"
                target="_blank"
                rel="noreferrer"
              >
                {importCourseDetails.course_code} - {importCourseDetails.name}
              </a>
              )
            {/if}. Check the status and details here and choose whether to
          </p>
          <ul class="cc-horizontal-list">
            <li>
              <sl-tooltip>
                <div slot="content">{@html HELP.proceed.tooltip}</div>
                <a target="_blank" rel="noreferrer" href={HELP.proceed.url}
                  ><i class="icon-question cc-module-icon" /></a
                >
              </sl-tooltip>
              &nbsp; Proceed
            </li>
            <li>
              <sl-tooltip>
                <div slot="content">{@html HELP.cancel.tooltip}</div>
                <a target="_blank" rel="noreferrer" href={HELP.cancel.url}
                  ><i class="icon-question cc-module-icon" /></a
                >
              </sl-tooltip>
              &nbsp; Cancel
            </li>
            <li>
              <sl-tooltip>
                <div slot="content">{@html HELP.refresh.tooltip}</div>
                <a target="_blank" rel="noreferrer" href={HELP.refresh.url}
                  ><i class="icon-question cc-module-icon" /></a
                >
              </sl-tooltip>
              &nbsp; Refresh
            </li>
          </ul>


          <div class="cc-footer">
            <sl-button
              slot="footer"
              variant="success"
              type="submit"
              on:click={() => proceedChoice("proceed")}
              on:keydown={() => proceedChoice("proceed")}>Proceed</sl-button
            >
            <sl-button
              slot="footer"
              variant="warning"
              type="submit"
              on:click={() => proceedChoice("cancel")}
              on:keydown={() => proceedChoice("cancel")}>Cancel</sl-button
            >
            <sl-button
              slot="footer"
              variant="danger"
              type="submit"
              on:click={() => proceedChoice("refresh")}
              on:keydown={() => proceedChoice("refresh")}>Refresh</sl-button
            >
          </div>
        </div>

        <p />
      </sl-tab-panel>
      <sl-tab-panel name="modules">
        <ImportModules
          bind:modulesCompleteStatus
          {currentCourseId}
          {importCourseId}
          {collectionsDetails}
        />
      </sl-tab-panel>
      <sl-tab-panel name="images">
        <ImportImages
          bind:imagesCompleteStatus
          {currentCourseId}
          {importCourseId}
          {collectionsDetails}
        />
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
    --header-spacing: 0.5rem;
  }

  sl-dialog::part(body) {
    padding: 0.5rem;
  }

  sl-dialog:part(title) {
    font-size: 1.2rem;
  }

  .cc-process-import {
    border-top-style: solid;
    border-color: #cccccc;
  }

  .cc-footer {
	margin-top: 2rem;
    text-align: right;
  }

  .cc-horizontal-list {
	list-style : none;
  }

  ul.cc-horizontal-list li {
	display: inline-block;
	padding-right: 1rem;
	padding: 0 0.5rem;
  }

  ul.cc-horizontal-list li:not(:last-child) {
	border-right: 1px solid #ccc;
  }
</style>
