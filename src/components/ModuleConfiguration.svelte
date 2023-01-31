<script lang="ts">
  /**
   * Define the component for configuring and individual module
   * @property {Number} module - the module being configured
   * @property {Boolean} allocated - whether the module has been allocated to a collection
   */
  import { collectionsStore, configStore } from "../stores";
  import ModuleDateConfiguration from "./Configuration/ModuleDateConfiguration.svelte";
  import ModuleGeneralConfiguration from "./Configuration/ModuleGeneralConfiguration.svelte";
  import ModuleBannerConfiguration from "./Configuration/ModuleBannerConfiguration.svelte";
  import ModuleMetaDataConfiguration from "./Configuration/ModuleMetaDataConfiguration.svelte";

  import { removeModuleConfiguration } from "../lib/CanvasSetup";

  export let module: Number;

  $: allocated =
    $collectionsStore["MODULES"][module].collection !== null &&
    $collectionsStore["MODULES"][module].collection !== "";

  function toggleModuleConfigShow() {
    $collectionsStore["MODULES"][module].configVisible =
      !$collectionsStore["MODULES"][module].configVisible;
    $configStore["needToSaveCollections"] = true;
  }

  const HELP = {
    moduleConfiguration: {
      tooltip:
        "Click the arrow to open/close the Collections interface to configure data about this module",
      url: "https://djplaner.github.io/canvas-collections/walk-throughs/new/configure-modules/",
    },
    generalTab: {
      tooltip:
        "Configure common collections settings: collections, description, label, engage button etc.",
    },
    moduleDates: {
      tooltip: `<p>Choose from the three supported "date types" and configure it. Options include:</p> <ol> <li> <strong>Single date</strong> - a specific date (and time) </li>
		  <li> <strong>Date range</strong> - a start and end date (and time) </li>
		  <li> 🏗 <strong>Coming soon</strong> 🏗 - (soon you'll be able to) specify a single date (and time) when the module will be available.</li>
		</ol>
		<p><em>Coming Soon</em> will be able to be used with one of the other options</em></p>
		`,
      url: "https://djplaner.github.io/canvas-collections/reference/objects/overview/#dates",
    },
    moduleBanner: {
      tooltip: `<p>Choose one of three possible banner types (for Card representations) and configure it. Options are:</p> <ol> <li> <strong>Image</strong> - a banner image</li> <li> <strong>Colour</strong> - a solid colour</li> <li> <strong>Iframe</strong> - HTML embed code (e.g. YouTube video)</li> </ol>
		`,
      url: "https://djplaner.github.io/canvas-collections/reference/objects/overview/#dates",
    },
    moduleMetaData: {
      tooltip: `Flexibly add, delete, and modify additional information about this module, which
		may be used by collections and representations - or for your own purposes.`,
      url: "https://djplaner.github.io/canvas-collections/reference/objects/overview/#additional-metadata",
    },
  };
</script>

<div class="cc-module-config border border-trbl" id="cc-module-config-{module}">
  {#if !allocated}
    <div
      class="cc-module-no-collection"
      id="cc-module-config-no-collection-{module}"
    >
      No collection allocated
    </div>
  {/if}
  <span>
    <i
      id="cc-module-config-{module}-switch"
      class={$collectionsStore["MODULES"][module].configVisible
        ? "icon-mini-arrow-down"
        : "icon-mini-arrow-right"}
      on:click={toggleModuleConfigShow}
      on:keydown={toggleModuleConfigShow}
    />

    Configure Collections for
    <em>{@html $collectionsStore["MODULES"][module].name}</em>
    <sl-tooltip>
      <div slot="content">
        {HELP.moduleConfiguration.tooltip}
      </div>
      <a
        href={HELP.moduleConfiguration.url}
        target="_blank"
        rel="noreferrer"
        class="cc-module-link"
      >
        <i class="icon-question" />
      </a>
    </sl-tooltip>
  </span>
</div>

{#if $collectionsStore["MODULES"][module].configVisible}
  <div class="cc-module-config-tabs border border-trbl">
    <sl-tab-group placement="start">
      <sl-tab slot="nav" panel="general" style="text-align:right">
        General &nbsp;
        <sl-tooltip hoist>
          <div slot="content">{@html HELP.generalTab.tooltip}</div>
          <a
            href={HELP.generalTab.url}
            target="_blank"
            rel="noreferrer"
            class="cc-module-link"
          >
            <i class="icon-question" />
          </a>
        </sl-tooltip>
      </sl-tab>
      <sl-tab slot="nav" panel="dates" style="text-align:right">
        Dates &nbsp;
        <sl-tooltip>
          <div slot="content">{@html HELP.moduleDates.tooltip}</div>
          <a
            href={HELP.moduleDates.url}
            target="_blank"
            rel="noreferrer"
            class="cc-module-link"
          >
            <i class="icon-question" />
          </a>
        </sl-tooltip>
      </sl-tab>
      <sl-tab slot="nav" panel="banner" style="text-align:right">
        Banner &nbsp;
        <sl-tooltip>
          <div slot="content">{@html HELP.moduleBanner.tooltip}</div>
          <a href={HELP.moduleBanner.url} target="_blank" rel="noreferrer"
            ><i class="icon-question" /></a
          >
        </sl-tooltip>
      </sl-tab>
      <sl-tab slot="nav" panel="metadata" style="text-align:right">
        <div>
          Metadata&nbsp;
          <sl-tooltip>
            <div slot="content">{@html HELP.moduleMetaData.tooltip}</div>
            <a href={HELP.moduleMetaData.url} target="_blank" rel="noreferrer">
              <i class="icon-question" />
            </a>
          </sl-tooltip>
        </div>
      </sl-tab>

      <sl-tab-panel name="general">
        <ModuleGeneralConfiguration moduleId={module} />
      </sl-tab-panel>
      <sl-tab-panel name="dates">
        <ModuleDateConfiguration moduleId={module} />
      </sl-tab-panel>
      <sl-tab-panel name="banner">
        <ModuleBannerConfiguration moduleId={module} />
      </sl-tab-panel>
      <sl-tab-panel name="metadata">
        <ModuleMetaDataConfiguration moduleId={module} />
      </sl-tab-panel>
    </sl-tab-group>
  </div>
{/if}

<style>
  .cc-module-config {
    padding: 1em;
    font-size: smaller;
    margin: 0;
  }

  .cc-module-no-collection {
    float: right;
    background: red;
    color: white;
    border-radius: 0.25rem;
    padding-left: 0.5rem;
    padding-right: 0.5rem;
  }

  sl-tab {
    font-size: var(--sl-font-size-small);
  }

  .cc-module-config-tabs {
    padding-top: 0.5em;
    padding-bottom: 0.5em;
  }

  sl-tooltip {
    text-align: left;
    white-space: normal;
  }
</style>
