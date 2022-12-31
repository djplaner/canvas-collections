<script lang="ts">
	/**
	 * Display a list of the existing collections in the current order
	 * Each collection is displayed using the CollectionConfiguration component
	*/
	import { collectionsStore } from "../../stores";
	import CollectionConfiguration from "./CollectionConfiguration.svelte";

   console.log('------------------------- ExistingCollections')
   console.log($collectionsStore)

   let collectionNames
   $: collectionNames = $collectionsStore['COLLECTIONS_ORDER'];

</script>

<div id="cc-config-existing-collections">
	<a href="https://djplaner.github.io/canvas-collections/reference/collections/overview/#existing-collections" target="_blank" rel="noreferrer">
		<i class="icon-question cc-module-icon"></i>
	</a>
	<strong>Existing Collections</strong>

	{#each collectionNames as collectionName}
		<CollectionConfiguration collectionName={collectionName} />
	{/each}
</div>




<style>

</style>
