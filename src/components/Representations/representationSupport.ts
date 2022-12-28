/**
 * @function getCollectionModuleIds
 * @param collection - Collection name
 * @param modules - Array of modules
 * @returns {Number[]} - Array of module ids
 * @description - Returns an array of module ids for a given collection
 */
export function getCollectionModuleIds(collection, modules) {
  const moduleIds = Object.keys(modules).filter((module) => {
    return (
      /*(
				! allModules[module].published &&
				$configStore['editMode']
			) && */
      // the module belongs to the collection
      modules[module].collection === collection
    );
  });
  // convert all the moduleIds to numbers
  return moduleIds.map((moduleId) => {
    return parseInt(moduleId, 10);
  });

}

	/**
	 * @function checkModuleMetaData
	 * @param module : string
	 * @param metaDataValue : string
	 * @returns string - the value to display in the table for the metaDataValue
	 * Will return
	 * - the value of the metadataValue if it exists
	 * - the string {metaDataValue} if it does not exist and we're in editMode
	 * - an empty string if it does not exist and we're not in editMode
	 */

	export function checkModuleMetaData(module, metaDataValue, editMode) {
		if (module.hasOwnProperty('metadata') &&
		    module['metadata'].hasOwnProperty(metaDataValue) 		
		) {
			return module['metadata'][metaDataValue];
		}
		if ( editMode) {
			return `{${metaDataValue}}`;
		}
		return '';
	}

	/**
	 * @function generateModuleDate
	 * @param module
	 * @return string - the date to display in the table
	 * Handle the conversion of a module's collection date (if any) into a 
	 * string to insert into the table
	 */
	export function generateModuleDate( module) {
		// TODO need generateCalendarDate properly

		if ( ! module.hasOwnProperty('date') ) {
			return '🚧 no date';
		}
		const date = module.date;
		return `🚧 ${date.label} ${date.day} Week ${date.week}`;
	}

