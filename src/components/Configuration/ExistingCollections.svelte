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
   * Display a list of the existing collections in the current order
   * Each collection is displayed using the CollectionConfiguration component
   */
  import { collectionsStore } from "../../stores";
  import CollectionConfiguration from "./CollectionConfiguration.svelte";

  export let includePageExists = {};
  export let outputPageExists = {};

  const HELP = {
    existing: {
      url: "https://djplaner.github.io/canvas-collections/reference/conceptual-model/collections/existing-collections/",
      tooltip: "<p>The collections already defined for this course.</p>",
    }
  }
</script>

<!-- div id="cc-config-existing-collections"> -->
  <strong>Existing collections</strong>
       <sl-tooltip>
        <div slot="content">
          {@html HELP.existing.tooltip}
        </div>
        <a
          href={HELP.existing.url}
          rel="noreferrer"
          target="_blank"
        >
          <i class="icon-question cc-module-icon" /></a
        >
      </sl-tooltip>

  {#if $collectionsStore["COLLECTIONS_ORDER"].length === 0}
    <p>No collections have been defined</p>
  {/if}
  {#each $collectionsStore["COLLECTIONS_ORDER"] as collectionName, i}
    <CollectionConfiguration
      on:message
      {collectionName}
      bind:includePageExists={includePageExists[collectionName]}
      bind:outputPageExists={outputPageExists[collectionName]}
      order={i}
      numCollections={$collectionsStore["COLLECTIONS_ORDER"].length}
    />
  {/each}

<style>
  p {
    font-size: 0.8em;
  }
</style>
