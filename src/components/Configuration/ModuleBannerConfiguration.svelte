<script lang="ts">
  /**
   * Implement component to allow user to select the type of banner to use
   * with Cards when representing a module. Also configure the details of the
   * specific banner.
   *
   * Support types: image, iframe and colour
   *
   * TODO
   * - make reactive
   * - Ensure iframe is being cleansed and in the right format
   * - formatting and outline
   * - consider implementing a test that the image actually exists
   * - on changing imageScale will need to explicitly update the style on the image
   *   since it isn't based on the value - unless we change this class name to match
   *   the names of the imageScale value
   */
  import { collectionsStore, configStore } from "../../stores";

  import { debug } from "../../lib/debug";

  export let moduleId: Number;

  debug("______________ ModuleBannerConfiguration.svelte _______________");
  debug($collectionsStore["MODULES"][moduleId]);

  const imageScaleOptions = [
    "none",
    "contain",
    "cover",
    "fill",
    "scale-down",
    "auto",
  ];

  /**
   * Define the tooltip and help site links for this module
   */
  const HELP = {
    moduleBanner: {
      tooltip: `<p>Choose one of three possible banner types (for Card representations) and configure it. Options are:</p> 
		<ol>
		  <li> <strong>Image</strong> - a banner image</li>
		  <li> <strong>Colour</strong> - a solid colour</li>
		  <li> <strong>Iframe</strong> - HTML embed code (e.g. YouTube video)</li>
		  </ol>`,
      href: "https://djplaner.github.io/canvas-collections/reference/objects/overview/#dates",
    },
    moduleImageScale: {
      tooltip:
        "Specify how the image will be scaled to fit the available space`",
      href: "https://djplaner.github.io/canvas-collections/reference/objects/overview/#image-scale",
    },
    moduleImageUrl: {
      tooltip: "Provide the URL for an image to associate with this module.",
      href: "https://djplaner.github.io/canvas-collections/reference/objects/overview/#image-url",
    },
    moduleIframe: {
      tooltip:
        "Provide an iframe (embed HTML) to place in a card's banner section.",
      href: "https://djplaner.github.io/canvas-collections/reference/objects/overview/#iframe",
    },
    moduleColour: {
      tooltip:
        "Choose a colour for the background of the card's banner section.",
      href: "https://djplaner.github.io/canvas-collections/reference/objects/overview/#iframe",
    },
  };
</script>

<sl-tooltip id="cc-about-module-banner">
  <div slot="content">{@html HELP.moduleBanner.tooltip}</div>
  <a target="_blank" href={HELP.moduleBanner.href} rel="noreferrer">
    <i class="icon-question cc-module-icon" /></a
  >
</sl-tooltip>
<strong>Banner</strong>
<sl-tab-group>
  <sl-tab
    class="cc-banner-tab"
    slot="nav"
    panel="cc-module-config-${moduleId}-image">Image</sl-tab
  >
  <sl-tab
    class="cc-banner-tab"
    slot="nav"
    panel="cc-module-config-${moduleId}-iframe">Iframe</sl-tab
  >
  <sl-tab
    class="cc-banner-tab"
    slot="nav"
    panel="cc-module-config-${moduleId}-colour">Colour</sl-tab
  >

  <sl-tab-panel name="cc-module-config-${moduleId}-image">
    <div
      class="cc-module-config-collection-representation"
      style="padding-left: 0.5rem;"
    >
      <sl-tooltip>
        <div slot="content">{@html HELP.moduleImageScale.tooltip}</div>
        <a target="_blank" href={HELP.moduleImageScale.href} rel="noreferrer"
          ><i class="icon-question cc-module-icon" /></a
        >
      </sl-tooltip>
      <label
        for="cc-collection-representation-${moduleId}-imageSize"
        style="float:left;padding-top:0.8rem;"
      >
        Image scale
      </label>
      <select
        id="cc-module-config-${moduleId}-imageSize"
        bind:value={$collectionsStore["MODULES"][moduleId].imageSize}
      >
        {#each imageScaleOptions as imageScaleOption}
          <option value={imageScaleOption}>{imageScaleOption}</option>
        {/each}
      </select>
    </div>
    <div class="cc-module-config-collection-representation">
      <sl-tooltip id="cc-about-module-image-url">
        <div slot="content">{@html HELP.moduleImageUrl.tooltip}</div>
        <a target="_blank" href={HELP.moduleImageUrl.href} rel="noreferrer"
          ><i class="icon-question cc-module-icon" /></a
        >
      </sl-tooltip>
      <label
        for="cc-module-config-collection-representation-${moduleId}-image"
        style="float:left;padding-top:0.8rem"
      >
        Image URL
      </label>
      <input
        class="cc-module-config-input"
        on:click={() => ($configStore["needToSaveCollections"] = true)}
        on:keydown|stopPropagation={() =>
          ($configStore["needToSaveCollections"] = true)}
        type="text"
        id="cc-module-config-${moduleId}-image"
        bind:value={$collectionsStore["MODULES"][moduleId].image}
      />
    </div>
  </sl-tab-panel>

  <sl-tab-panel name="cc-module-config-${moduleId}-iframe">
    <div class="cc-module-config-collection-representation">
      <sl-tooltip id="cc-about-module-iframe">
        <div slot="content">{@html HELP.moduleIframe.tooltip}</div>
        <a target="_blank" href={HELP.moduleIframe.href} rel="noreferrer"
          ><i class="icon-question cc-module-icon" /></a
        >
      </sl-tooltip>
      <label
        for="cc-collection-representation-${moduleId}-iframe"
        style="padding-top:0.8rem;"
      >
        iframe
      </label>
      <textarea
        id="cc-module-config-${moduleId}-iframe"
        bind:value={$collectionsStore["MODULES"][moduleId].iframe}
      />
    </div>
  </sl-tab-panel>

  <sl-tab-panel name="cc-module-config-${moduleId}-colour">
    <div class="cc-module-config-collection-representation">
      <sl-tooltip id="cc-about-module-color">
        <div slot="content">{@html HELP.moduleColour.tooltip}</div>
        <a target="_blank" href={HELP.moduleColour.href} rel="noreferrer"
          ><i class="icon-question cc-module-icon" /></a
        >
      </sl-tooltip>
      <label
        for="cc-collection-representation-${moduleId}-color"
        style="padding-top:0.8rem;"
      >
        colour
      </label>
      <sl-color-picker
        id="cc-module-config-${moduleId}-color"
        value={$collectionsStore["MODULES"][moduleId].bannerColour}
        label="Select a color"
      />
    </div>
  </sl-tab-panel>
</sl-tab-group>

<style>
  .cc-module-config-input {
    width: 30em;
  }
</style>
