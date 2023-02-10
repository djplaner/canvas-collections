
import { writable } from "svelte/store";

import GriffithCards from "./components/Representations/GriffithCards.svelte";
import CollectionOnly from "./components/Representations/CollectionOnly.svelte";
import AssessmentTable from "./components/Representations/AssessmentTable.svelte";
import CollectionsTable from "./components/Representations/CollectionsTable.svelte";

// currently collectionStore will contain the parsed collections JSON
// - COLLECTIONS - dict of dicts, keyed on module name, one per collection
// - COLLECTIONS_ORDER - array of collection names in order to display
// - DEFAULT_ACTIVE_COLLECTION
// - MODULES - dict of dicts, keyed on module id
// - VISIBILITY - string: no-one, students, staff, all
export const collectionsStore = writable({})

// Array of Canvas module information in order of display
export const modulesStore = writable([])

// Object providing basic info about context
// - courseId
// - editMode
export const configStore = writable({
    courseId: null,
    editMode: false,    // whether or not canvas is in edit mode (i.e. "Student View" is visible)
	editingOn: null,   // whether a current browser is editing COllections
	                   // might eventually hold details of who is, current user or not
    csrfToken: null,
    modulesPage: false, // boolean, is this the modules page? (bad name right?)
    currentCollection: null, // name of the current collection
    currentCollectionChanged: false, // has the current collection changed?
    needToSaveCollections: false,
    ccOn: false,       // older way to check if collection is on
    studyPeriod: null, // calculated by CanvasDetails
})

// List of available representations
// TODO bit of a kludge for now
export const representationsStore = writable({
	"GriffithCards" : GriffithCards, "CollectionOnly": CollectionOnly, 
	"AssessmentTable" : AssessmentTable,
	// CollectionsTable is very alpha, removed for now
//	"CollectionsTable" : CollectionsTable
})
