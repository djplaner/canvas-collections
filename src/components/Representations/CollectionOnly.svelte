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
   * The simplest component, will not display any representation.
   * Intended for use when you just want to see
   * - the navigation bar between collections
   * - the list of Canvas module elements belonging to the collection
   * - as a beginning template for producing your own representation
   */

  import { getRepresentationModules, getModuleUrl, deLabelModuleName } from "./representationSupport";
  import { collectionsStore, configStore } from "../../stores";

  export let collection: string;
  export let claytons: boolean = false;

  const modules = getRepresentationModules(
    collection,
    claytons,
    $collectionsStore["COLLECTIONS"][collection]["unallocated"]
  );

</script>

{#if $configStore["editMode"] && (modules.length === 0)}
  <div class="cc-no-modules">
    <p>No modules have been added to this collection.</p>
  </div>
{:else if $configStore["editMode"]}
  <div class="cc-collections-online">
    <p><strong>Current representation</strong>: <a href="http://localhost:8000/canvas-collections/reference/conceptual-model/representations/overview/#collections-only">CollectionsOnly</a></div>

{/if}

<!-- <h2>Hello world</h2> -->

<style>
</style>
