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

<script>
  /**
   * @file ProcessImportedCollections.svelte
   * @property {Object} collectionsDetails - the details of the collections
   * @description Display a modal component used to modify the imported collection config to
   * work with the current one
   */

  import { configStore } from "../stores";

  import { wf_fetchData } from "../lib/CanvasSetup";

  import { EDITING_ON_STATUS } from "../lib/editingOnController";

  import ImportModules from "./Import/ImportModules.svelte";
  import ImportImages from "./Import/ImportImages.svelte";

  export let collectionsDetails;

  const currentHostName = document.location.hostname;
  const baseApiUrl = `https://${currentHostName}/api/v1`;

  // status placeholders for sub-component completion
  let modulesCompleteStatus;
  let imagesCompleteStatus; // 0 = not started, 1 = complete, -1 = error

  let currentCourseId = $configStore["courseId"];
  let importCourseId = collectionsDetails.getImportedCourseId();

  let currentCourseDetails = null;
  let importCourseDetails = null;

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
    /*    copy: {
      tooltip: `<p>Collections configuration copied from another course will need to be modified.</p>`,
      url: "https://djplaner.github.io/canvas-collections/reference/course-copy/process/",
    }, */
    summary: {
      tooltip: `<p>It appears Collections has been copied from another course. Details on the 
        source/destination courses below.</p><p>How do you wish to proceed?</p>`,
      url: "https://djplaner.github.io/canvas-collections/reference/lifecycle/course-copy/import/",
    },
    modules: {
      tooltip: `<p>Analysis of the "imported" modules (in Collections configuration) and "current" modules
        (in the current course). Decide if any action is required before import.</p>`,
      url: "https://djplaner.github.io/canvas-collections/reference/lifecycle/course-copy/import/#modules",
    },
    images: {
      tooltip: `<p>Status of any course-based module module images in Collections configuration</p>`,
      url: "https://djplaner.github.io/canvas-collections/reference/lifecycle/course-copy/import/#images",
    },
    proceed: {
      tooltip: `<p>Start the Collections import process. Modify the Collections configuration to match the new course. 
        (Note: use Canvas history to restore previous configuration, if there are problems)</p>`,
      url: "https://djplaner.github.io/canvas-collections/reference/lifecycle/course-copy/import/#proceed",
    },
    cancel: {
      tooltip: `<p>Cancel the import, return to the course make any changes, and then recommence the import.</p>
	  <p>You cannot use Collections in this courses until the migration process is complete.</p>`,
      url: "https://djplaner.github.io/canvas-collections/reference/lifecycle/course-copy/import/#cancel",
    },
    refresh: {
      tooltip: `<p>Refresh Collections configuration to a blank state. Allowing you to start fresh 
			and use the Collections interface to customise design for the new course.</p>`,
      url: "https://djplaner.github.io/canvas-collections/reference/lifecycle/course-copy/import/#refresh",
    },
  };
</script>

NO_ONE_EDITING = 0, SOMEONE_ELSE_EDITING = 1, YOU_EDITING_ELSEWHERE = 2,
YOU_EDITING = 3,
{#if $configStore["editingOn"] === EDITING_ON_STATUS.YOU_EDITING_ELSEWHERE || $configStore["editingOn"] === EDITING_ON_STATUS.SOMEONE_ELSE_EDITING}
  <sl-dialog
    class="cc-dialog"
    style="--width: 75vw"
    label="Unable to import Canvas Collections' configuration?"
    open
  >
    <div class="cc-process-import">
      <h2>Import required</h2>

      <p>
        The existing Canvas Collections' configuration is from another course.
        It needs to be imported into this course.
      </p>

      <h2>Problem - you don't have edit access</h2>

      <p>
        This can't be currently done because the import process has already been
        started
        {#if $configStore["editingOn"] === EDITING_ON_STATUS.YOU_EDITING_ELSEWHERE}
          by you in another tab.
        {:else}
          by someone else is editing the course.
        {/if}
      </p>

      <h2>Next step?</h2>

      <p>
        Click the <em>Return</em> button. Wait for the import process to be completed.
      </p>
      <p>
        Once the import is complete, you can refresh the Modules page and use
        Collections.
      </p>
    </div>

    <div class="cc-footer">
      <sl-button
        slot="footer"
        variant="success"
        type="submit"
        on:click={() => proceedChoice("cancel")}
        on:keydown={() => proceedChoice("cancel")}>Return</sl-button
      >
    </div>
  </sl-dialog>
{:else}
   <!-- no-one is editing, or user is editing (prob. not possible) -->
  <sl-dialog
    class="cc-dialog"
    style="--width: 75vw"
    label="How to proceed with the import of Canvas Collections' configuration?"
    open
  >
    <div class="cc-process-import">
      <sl-tab-group placement="start">
        <sl-tab slot="nav" panel="summary"> &nbsp; Summary</sl-tab>
        <sl-tab slot="nav" panel="modules">
          &nbsp; Modules &nbsp;
          {#if modulesCompleteStatus === 1}
            <sl-badge variant="success">Ok</sl-badge>
          {:else if modulesCompleteStatus === -1}
            <sl-badge variant="warning">Warning</sl-badge>
          {:else}
            <sl-spinner />
          {/if}
        </sl-tab>
        <sl-tab slot="nav" panel="images">
          &nbsp; Images &nbsp;
          {#if imagesCompleteStatus === 1}
            <sl-badge variant="success">Ok</sl-badge>
          {:else if imagesCompleteStatus === -1}
            <sl-badge variant="warning">Warning</sl-badge>
          {:else}
            <sl-spinner />
          {/if}
        </sl-tab>

        <sl-tab-panel name="summary">
          <div class="cc-import-intro">
            <h3>
              <sl-tooltip>
                <div slot="content">{@html HELP.summary.tooltip}</div>
                <a target="_blank" rel="noreferrer" href={HELP.summary.url}>
                  <i class="icon-question cc-module-icon" />
                </a>
              </sl-tooltip>
              Summary
            </h3>
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
          <h3>
            <sl-tooltip>
              <div slot="content">{@html HELP.modules.tooltip}</div>
              <a target="_blank" rel="noreferrer" href={HELP.modules.url}>
                <i class="icon-question cc-module-icon" />
              </a>
            </sl-tooltip>
            Modules
          </h3>

          <ImportModules
            bind:modulesCompleteStatus
            {currentCourseId}
            {importCourseId}
            {collectionsDetails}
          />
        </sl-tab-panel>
        <sl-tab-panel name="images">
          <h3>
            <sl-tooltip>
              <div slot="content">{@html HELP.images.tooltip}</div>
              <a target="_blank" rel="noreferrer" href={HELP.images.url}>
                <i class="icon-question cc-module-icon" />
              </a>
            </sl-tooltip>
            Images
          </h3>

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
{/if}

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
    list-style: none;
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
