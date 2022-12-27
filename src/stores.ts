
import { writable } from "svelte/store";

// currently collectionStore will contain the parsed collections JSON
// - COLLECTIONS - dict of dicts, keyed on module name, one per collection
// - COLLECTIONS_ORDER - array of collection names in order to display
// - DEFAULT_ACTIVE_COLLECTION
// - MODULES - dict of dicts, keyed on module id
// - STATUS - string "on" or "off"
export const collectionsStore = writable({});
