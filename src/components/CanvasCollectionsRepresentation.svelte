<script lang="ts">

	import { collectionsStore } from "../stores";

	let collectionNames = [];
	if ( $collectionsStore.hasOwnProperty('COLLECTIONS_ORDER') ) {
		collectionNames = $collectionsStore.COLLECTIONS_ORDER;
	}
</script>

<h1>Canvas Collections</h1>
<p>From a component</p>

{#each collectionNames as collectionName}
	<p>{collectionName}</p>
{/each} 


<style>

</style>