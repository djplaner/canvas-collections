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

<script lang="ts">
  /**
   * The simplest component, will not display any representation.
   * Intended for use when you just want to see
   * - the navigation bar between collections
   * - the list of Canvas module elements belonging to the collection
   */

    import { getRepresentationModules } from "./representationSupport";
	 import { collectionsStore, configStore } from "../../stores";

  export let collection: string;
  //  export let calendar: any;
  export let claytons: boolean;


  const modules = getRepresentationModules(
      collection,
      claytons,
      $collectionsStore["COLLECTIONS"][collection]["unallocated"]
    );
</script>

{#if $configStore['editMode'] && modules.length===0} 
  <div class="cc-no-modules">
	<p>No modules have been added to this collection.</p>
  </div>
{/if}

<style>
</style>
