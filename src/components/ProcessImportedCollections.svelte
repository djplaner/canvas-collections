<script>
  /**
   * @file ProcessImportedCollections.svelte
   * @description Display a modal component used to modify the imported collection config to
   * work with the current one
   */

   import ImportCourses from "./Import/ImportCourses.svelte";
   import ImportModules from "./Import/ImportModules.svelte";
   import ImportImages from "./Import/ImportImages.svelte";
   import ImportLinks from "./Import/ImportLinks.svelte";

  console.log("ProcessImportedCollections.svelte loaded");

</script>

<sl-dialog style="--width: 75vw" label="Update Imported Collections" open>
  <div class="cc-process-import">
	<sl-tab-group placement="start">
		<sl-tab slot="nav" panel="courses">Courses</sl-tab>
		<sl-tab slot="nav" panel="modules">Modules</sl-tab>
		<sl-tab slot="nav" panel="images">Images</sl-tab>
		<sl-tab slot="nav" panel="links">Links</sl-tab>

		<sl-tab-panel name="courses">
			<ImportCourses />
		</sl-tab-panel>
		<sl-tab-panel name="modules">
			<ImportModules />
		</sl-tab-panel>
		<sl-tab-panel name="images">
			<ImportImages />
		</sl-tab-panel>
		<sl-tab-panel name="links">
			<ImportLinks />
		</sl-tab-panel>
	</sl-tab-group>
  </div>

</sl-dialog>


<style>
	.cc-process-import {
		height:100%;
	}

</style>
