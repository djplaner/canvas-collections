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
   * Implement component to allow user to select the type of banner to use
   * with Cards when representing a module. Also configure the details of the
   * specific banner.
   *
   * Support types: image, iframe and colour
   *
   * TODO
   */
  import { collectionsStore, configStore } from "../../stores";

  import { ccConfirm, toastAlert } from "../../lib/ui";

  import sanitizeHtml from "sanitize-html";

  export let moduleId: Number;

  const imageScaleOptions = [
    "none",
    "contain",
    "cover",
    "fill",
    "scale-down",
    "auto",
  ];

  let module = $collectionsStore["MODULES"][moduleId];

  /**
   * @function updateBannerColour
   * @description Called when user changes shoelace colour picker
   * - get the value from the colour picker
   * - set the bannerColour attribute for the current module
   * - set the needToSave flag
   */

  function updateBannerColour() {
    const colourPicker = document.getElementById(
      `cc-module-config-${moduleId}-color`
    ) as HTMLInputElement;
    $collectionsStore["MODULES"][moduleId].bannerColour = colourPicker.value;
    $configStore["needToSaveCollections"] = true;
  }

  /**
   * @function updateActiveBanner
   * @param {Event} e - the event object
   * @description Called when user changes the active banner tab
   * - get the name of the active tab (e.detail.name)
   * - modify the modules banner value to match the active tab
   * - set the needToSave flag
   */

  function updateActiveBanner(e) {
    const activeTab = e.detail.name;
    // extract the name from activeTab
    const name = activeTab.split("-").pop();
    $collectionsStore["MODULES"][moduleId].banner = name;
    $configStore["needToSaveCollections"] = true;
  }

  /**
   * @function updateIframe
   * @description Called when user changes the iframe value
   * - sanity check the html allowing iframe tags only
   * - if any change update the user and ask them to confirm
   * - if confirmed update the iframe attribute for the current module
   * - set the needToSaveCollections flag
   */

  function updateIframe() {
    const iframe = document.getElementById(
      `cc-module-config-${moduleId}-iframe`
    ) as HTMLInputElement;

    // sanity check the html allowing iframe tags only
    const iframeValue = iframe.value;
    let sanitisedValue = sanitize(iframeValue);

    // remove anything from sanitisedValue that isn't <iframe>.*</iframe>
    sanitisedValue = sanitisedValue.replace(/.*(<iframe.*<\/iframe>).*/, "$1");

    // check that it actually contains an iframe, using regex match
    if (!sanitisedValue.match(/<iframe.*<\/iframe>/)) {
      // if not, tell them and make no more changes
      toastAlert(
        "The iframe value you provided does not contain an iframe tag.  Please check your input and try again.",
        "warning"
      );
      return;
    }

    if (iframeValue !== sanitisedValue) {
      // convert iframeValue to xmp but wrap at 40 characters
      let displayIframeValue = encodeHTML(iframeValue);
      let displaySanitisedValue = encodeHTML(sanitisedValue);

      ccConfirm(
        `The iframe value you provided appears to contain unnecessary, perhaps forbidden characters.  (NOTE: width and height will be removed to ensure the iframe is responsive.)

You provided
    <p style="font-family: monospace; font-size:small">${displayIframeValue}</p>
only the following is allowed
    <p style="font-family: monospace; font-size:small">${displaySanitisedValue}</p>
    
Do you wish to proceed?`
      ).then((ok) => {
        if (ok) {
          iframe.value = sanitisedValue;
          $collectionsStore["MODULES"][moduleId].iframe = sanitisedValue;
          $configStore["needToSaveCollections"] = true;
        }
      });
    } else {
      $collectionsStore["MODULES"][moduleId].iframe = sanitisedValue;
      $configStore["needToSaveCollections"] = true;
    }
    // if confirmed update the iframe attribute for the current module
  }

  function encodeHTML(html: string, json = true) {
    let txt = document.createElement("textarea");
    txt.innerHTML = html;
    let value = txt.innerHTML;
    return value;
  }

  /**
   * @function sanitize
   * @param {string} value - the value to be sanitised
   * @returns {string} - the sanitised value
   * @description Remove anything from the HTML that isn't <iframe>.*</iframe>
   */
  function sanitize(value: string): string {
    let allowedTags = ["iframe"];
    // sanitizeHtml.defaults.allowedTags;
    let allowedAttributes = {};
    //allowedTags = allowedTags.concat("iframe");
    allowedAttributes = {
      iframe: ["src", "frameborder", "allowfullscreen", "allow", "title"],
    };

    return sanitizeHtml(value, {
      allowedTags: allowedTags,
      allowedAttributes: allowedAttributes,
    });
  }

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
      href: "https://djplaner.github.io/canvas-collections/reference/conceptual-model/objects/banner/",
    },
    moduleImageScale: {
      tooltip:
        "Specify how the image will be scaled to fit the available space.",
      href: "https://djplaner.github.io/canvas-collections/reference/conceptual-model/objects/banner/#image-scale",
    },
    moduleImageUrl: {
      tooltip: "Provide the URL for an image to associate with this module.",
      href: "https://djplaner.github.io/canvas-collections/reference/conceptual-model/objects/banner/#image-url",
    },
    moduleImageBackgroundColour: {
      tooltip:
        "Use the current banner colour to change the image background colour from white.",
      href: "https://djplaner.github.io/canvas-collections/reference/conceptual-model/objects/banner/#image-background-colour",
    },

    moduleIframe: {
      tooltip: `<p>Provide an iframe (embed HTML) to place in a card's banner section.</p> <p>Notes:</p>
        <ol>
            <li> <em>height</em> and <em>width</em> will be removed to fit the available space</li>
            <li> any change will only take effect after you click outside the iframe box</li>
            </ol>
        `,
      href: "https://djplaner.github.io/canvas-collections/reference/conceptual-model/objects/banner/#iframe",
    },
    moduleColour: {
      tooltip:
        "<p>Choose a background colour for the card's banner section by clicking on the circle.",
      href: "https://djplaner.github.io/canvas-collections/reference/conceptual-model/objects/banner/#colour",
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
<sl-tab-group on:sl-tab-show={(e) => updateActiveBanner(e)}>
  <sl-tab
    class="cc-banner-tab"
    name="image"
    slot="nav"
    active={$collectionsStore["MODULES"][moduleId].banner === "image"}
    panel="cc-module-config-{moduleId}-image">Image</sl-tab
  >
  <sl-tab
    class="cc-banner-tab"
    name="iframe"
    slot="nav"
    active={$collectionsStore["MODULES"][moduleId].banner === "iframe"}
    panel="cc-module-config-{moduleId}-iframe">Iframe</sl-tab
  >
  <sl-tab
    class="cc-banner-tab"
    name="colour"
    slot="nav"
    active={$collectionsStore["MODULES"][moduleId].banner === "colour"}
    panel="cc-module-config-{moduleId}-colour">Colour</sl-tab
  >

  <sl-tab-panel name="cc-module-config-{moduleId}-image">
    <div class="cc-module-form">
      <span class="cc-module-label">
        <label for="cc-collection-representation-{moduleId}-imageSize">
          Image scale
        </label>
        <sl-tooltip>
          <div slot="content">{@html HELP.moduleImageScale.tooltip}</div>
          <a target="_blank" href={HELP.moduleImageScale.href} rel="noreferrer"
            ><i class="icon-question cc-module-icon" /></a
          >
        </sl-tooltip>
      </span>
      <span class="cc-module-input">
        <select
          id="cc-module-config-{moduleId}-imageSize"
          bind:value={$collectionsStore["MODULES"][moduleId].imageSize}
          on:change={() => ($configStore["needToSaveCollections"] = true)}
        >
          {#each imageScaleOptions as imageScaleOption}
            <option value={imageScaleOption}>{imageScaleOption}</option>
          {/each}
        </select>
      </span>
    </div>
    <div class="cc-module-form">
      <span class="cc-module-label">
        <label
          for="cc-module-config-collection-representation-{moduleId}-image"
        >
          Image URL
        </label>
        <sl-tooltip id="cc-about-module-image-url">
          <div slot="content">{@html HELP.moduleImageUrl.tooltip}</div>
          <a target="_blank" href={HELP.moduleImageUrl.href} rel="noreferrer"
            ><i class="icon-question cc-module-icon" /></a
          >
        </sl-tooltip>
      </span>
      <span class="cc-module-input">
        <input
          class="cc-module-config-input"
          on:keydown|stopPropagation
          on:change={() => ($configStore["needToSaveCollections"] = true)}
          type="text"
          id="cc-module-config-{moduleId}-image"
          bind:value={$collectionsStore["MODULES"][moduleId].image}
        />
      </span>
    </div>
    <div class="cc-module-form">
      <span class="cc-module-label">
        <label
          for="cc-module-config-collection-representation-{moduleId}-image-backgroundColour"
        >
          Background Colour
        </label>
        <sl-tooltip id="cc-about-module-image-url">
          <div slot="content">
            {@html HELP.moduleImageBackgroundColour.tooltip}
          </div>
          <a
            target="_blank"
            href={HELP.moduleImageBackgroundColour.href}
            rel="noreferrer"><i class="icon-question cc-module-icon" /></a
          >
        </sl-tooltip>
      </span>
      <span class="cc-module-input">
        <input
          on:keydown|stopPropagation
          on:change={() => ($configStore["needToSaveCollections"] = true)}
          type="checkbox"
          id="cc-module-config-{moduleId}-image"
          bind:checked={$collectionsStore["MODULES"][moduleId]
            .imageBackgroundColour}
          on:change={() => ($configStore["needToSaveCollections"] = true)}
        />
        {#if $collectionsStore["MODULES"][moduleId].imageBackgroundColour}
            {#if $collectionsStore["MODULES"][moduleId].bannerColour !== ""}
              <span
                class="cc-banner-colour"
                style="background: {$collectionsStore['MODULES'][moduleId]
                  .bannerColour}">&nbsp;&nbsp;</span
              >
            {:else}
              <span class="cc-banner-colour">No colour set</span>
            {/if}
        {/if}
      </span>
    </div>
  </sl-tab-panel>

  <sl-tab-panel name="cc-module-config-{moduleId}-iframe">
    <div class="cc-module-config-collection-representation">
      <label
        for="cc-collection-representation-{moduleId}-iframe"
        style="padding-top:0.8rem;"
      >
        iframe:
      </label>
      <sl-tooltip id="cc-about-module-iframe">
        <div slot="content">{@html HELP.moduleIframe.tooltip}</div>
        <a target="_blank" href={HELP.moduleIframe.href} rel="noreferrer"
          ><i class="icon-question cc-module-icon" /></a
        >
      </sl-tooltip>
      <textarea
        on:keydown|stopPropagation
        class="cc-module-iframe"
        cols="60"
        rows="10"
        id="cc-module-config-{moduleId}-iframe"
        on:focusout={updateIframe}
        value={$collectionsStore["MODULES"][moduleId].iframe}
      />
    </div>
  </sl-tab-panel>

  <sl-tab-panel name="cc-module-config-{moduleId}-colour">
    <div class="cc-module-config-collection-representation">
      <label
        for="cc-collection-representation-{moduleId}-color"
        style="padding-top:0.8rem;"
      >
        Colour:
      </label>
      <sl-tooltip id="cc-about-module-color">
        <div slot="content">{@html HELP.moduleColour.tooltip}</div>
        <a target="_blank" href={HELP.moduleColour.href} rel="noreferrer"
          ><i class="icon-question cc-module-icon" /></a
        >
      </sl-tooltip>
      <sl-color-picker
        id="cc-module-config-{moduleId}-color"
        on:sl-change={updateBannerColour}
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

  .cc-module-form {
    display: grid;
    grid-template-columns: 10em 1fr;
    grid-gap: 1em;
  }

  .cc-module-label {
    grid-column: 1/ 2;
    text-align: right;
    margin-top: 0.4em;
  }

  .cc-module-input {
    grid-column: 2/ 3;
  }

  sl-tooltip {
    text-align: left;
    white-space: normal;
  }

  .cc-module-iframe {
    width: 90%;
    height: 10em;
  }

  .cc-banner-colour {
    display: inline-block;
    width: 1em;
    height: 1em;
    vertical-align: middle;
    margin-top: 0.5em;
  }
</style>
