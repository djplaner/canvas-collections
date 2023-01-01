
import { writable } from "svelte/store";

import GriffithCards from "./components/Representations/GriffithCards.svelte";
import CollectionOnly from "./components/Representations/CollectionOnly.svelte";
import AssessmentTable from "./components/Representations/AssessmentTable.svelte";

// currently collectionStore will contain the parsed collections JSON
// - COLLECTIONS - dict of dicts, keyed on module name, one per collection
// - COLLECTIONS_ORDER - array of collection names in order to display
// - DEFAULT_ACTIVE_COLLECTION
// - MODULES - dict of dicts, keyed on module id
// - STATUS - string "on" or "off"
export const collectionsStore = writable({});

// To be a dict of dicts, containing Canvas module information
export const modulesStore = writable({});

// Object providing basic info about context
// - courseId
// - editMode
export const configStore = writable({});


// List of available representations
// TODO bit of a kludge for now
export const representationsStore = writable({
	"GriffithCards" : GriffithCards, "CollectionOnly": CollectionOnly, 
	"AssessmentTable" : AssessmentTable
});