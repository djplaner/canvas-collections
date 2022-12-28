<script lang="ts">
	/**
	 * Wrapper component for the representation which collections will add
	*/

	import { configStore } from "../stores";
	import CollectionsNavigation from "./CollectionsNavigation.svelte";
	import CollectionRepresentation from "./CollectionRepresentation.svelte";

</script>

<CollectionsNavigation />
<div class="collection-message">
   <em>Message for current collection</em>
</div>
<CollectionRepresentation collection={$configStore['currentCollection']}/>


<style>

</style>