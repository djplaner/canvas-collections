/**
 * AssessmentTableView.js 
 * - implement a table view for a Canvas Collection using a responsive table design
 * https://github.com/Fenwick17/responsive-accessible-table
 * - attempting to support the columns similar to initial course site template
 *   - assessment task (module name)
 *   - Due date
 *   - Weighting/Marked out of
 *   - Learning Outcomes
 *   - Description
 * 
 * TODO
 * - Perhaps auto leaving out those for where there is no value?
 * - Connecting with the known assignment groups and deriving data from there?
 */


import { cc_View } from '../../cc_View.js';

const TABLE_STYLES = `
.cc-assessment-container { 
  margin: auto;
  max-width: 90%;
}

/* Standard table styling, change as desired */
.cc-assessment-container table {
  border-collapse: collapse;
  border-spacing: 0;
}
  
.cc-assessment-container caption { 
  font-size: 0.5em;
  font-weight: 700;
  text-align: left;
}

td.descriptionCell {
  width: 20rem;
}
  
.cc-assessment-container th {
  border-bottom: 1px solid #bfc1c3;
  font-size: 1em;
  padding: 0.5em 1em 0.5em 0;
  vertical-align:top;
  text-align: left;
  background-color: #e03e2d;
  color: #fff;
  font-weight: bold;
}
  
.cc-assessment-container td {
  border-bottom: 1px solid #bfc1c3;
  font-size: 1em;
  padding: 0.5em; /*1em 0.5em 0; */
  vertical-align: top;
}

/* Responsive table styling */
.cc-assessment-container .cc-responsive-table { 
  margin-bottom: 0;
  width: 100%;
}

.cc-assessment-container thead {
  border: 0;
  clip: rect(0 0 0 0);
  -webkit-clip-path: inset(50%);
  clip-path: inset(50%);
  height: 1px;
  margin: 0;
  overflow: hidden;
  padding: 0;
  position: absolute;
  white-space: nowrap;
  width: 1px;
}

.cc-assessment-container tbody tr {
  display: block;
  margin-bottom: 1.5em;
  padding: 0 0.5em;
}

.cc-assessment-container tr:nth-child(even) {
  background-color: rgb(245,245,245) 
}

/*.cc-assessment-container tr:nth-child(odd) {
  background-color: rgb(128,);
}*/

.cc-assessment-container tbody tr td {
  display: block; /* browsers that don't support flex */
  display: flex;
  justify-content: space-between;
  min-width: 1px;
  text-align: right;
}

@media all and (-ms-high-contrast: none) { /* IE11 flex fix */
  .cc-assessment-container tbody tr td {
    display: block;
  }
}

.cc-assessment-container .cc-responsive-table__heading {
  font-weight: 700;
  padding-right: 0.5em;
  text-align: left;
  word-break: initial;
}

@media (max-width: 768px) {
  .cc-assessment-container tbody tr td {
    padding-right: 0;
  }
  .cc-assessment-container tbody tr td:last-child {
    border-bottom: 0;
  }
  tbody tr {
    .cc-assessment-container border-bottom: 3px solid grey;
  }
}

@media (min-width: 769px) {
  .cc-assessment-container thead {
    clip: auto;
    -webkit-clip-path: none;
    clip-path: none;
    display: table-header-group;
    height: auto;
    overflow: auto;
    position: relative;
    width: auto;
  }
  
  .cc-assessment-container tbody tr {
    display: table-row;
  }
  
  .cc-assessment-container tbody tr td {
    display: table-cell;
    text-align: left;
  }
  
  .cc-assessment-container .cc-responsive-table__heading {
    display: none;
  }
}

  .cc-table-header-text {
    margin-left: 0.5rem;
  }

  .cc-table-cell-text {
    margin: 0;
  }

  .cc-table-cell-text > p {
    margin: 0.5rem;
    font-size: 0.8rem;
  }

  #cc-assessment-table {
    margin-top: 0.5rem !important;
  }
	`;

const TABLE_HTML = `
		<div id="cc-assessment-table" class="cc-assessment-container cc-representation">
		<style>
			${TABLE_STYLES}
		</style>

			<table class="cc-responsive-table" role="table">
      			<caption>{{CAPTION}}</caption>
      			<thead role="rowgroup">
        			<tr role="row">
          				<th role="columnheader" scope="col"><span class="cc-table-header-text">Title</span></th>
          				<th role="columnheader" scope="col"><span class="cc-table-header-text">Description</span></th>
          				<th role="columnheader" scope="col"><span class="cc-table-header-text">Weighting</span></th>
          				<th role="columnheader" scope="col"><span class="cc-table-header-text">Due Date</span></th>
          				<th role="columnheader" scope="col"><span class="cc-table-header-text">Learning Outcomes</span></th>
					</tr> 
				</thead>
   			<tbody>
		 	      {{TABLE-ROWS}}
				</tbody>
			</table>
		</div>
		`;

const TABLE_HTML_CLAYTONS = `
<div id="cc-assessment-table" class="cc-assessment-container">
<table class="cc-assessment-table ic-Table--hover-row ic-Table ic-Table--striped -ic-Table--condensed" 
   role="table">
  <thead role="rowgroup">
    <tr role="row">
      <th role="columnheader" scope="col" style="width:20%;background-color:#e03e2d">
        <span style="color:#ffffff">Title</span>
        </th>
      <th role="columnheader" scope="col" style="width:40%;background-color:#e03e2d">
        <span style="color:#ffffff">Description</span>
        </th>
      <th role="columnheader" scope="col" style="background-color:#e03e2d">
        <span style="color:#ffffff">Weighting</span>
        </th>
      <th role="columnheader" scope="col" style="background-color:#e03e2d">
        <span style="color:#ffffff">Due Date</span>
        </th>
      <th role="columnheader" scope="col" style="width:10%;background-color:#e03e2d">
        <span style="color:#ffffff">Learning Outcomes</span>
        </th>
    </tr>
  </thead>
  <tbody>
    {{TABLE-ROWS}}
  </tbody>
</table>
</div>
`;

const TABLE_ROW_HTML = `
		  <tr role="row">
          <td role="cell">
            <span class="cc-responsive-table__heading" aria-hidden="true">Title</span>
            <div class="cc-table-cell-text"><p><a href="{{MODULE-ID}}">
              {{TITLE}}

            </a></p> </div>
          </td>
          <td role="cell" class="descriptionCell">
            <span class="cc-responsive-table__heading" aria-hidden="true">Description</span>
            <div class="cc-table-cell-text">
            {{DESCRIPTION}}
            </div>
          </td>
          <td role="cell">
            <span class="cc-responsive-table__heading" aria-hidden="true">Weighting</span>
            <div class="cc-table-cell-text">
            <p>{{WEIGHTING}}</p>
            </div>
          </td>
          <td role="cell">
            <span class="cc-responsive-table__heading" aria-hidden="true">Due Date</span>
            <div class="cc-table-cell-text">
            <p>{{DATE-LABEL}}<br />{{DUE-DATE}}</p>
            </div>
          </td>
          <td role="cell">
            <span class="cc-responsive-table__heading" aria-hidden="true">Learning Outcomes</span>
            <div class="cc-table-cell-text">
            <p>{{LEARNING-OUTCOMES}}</p>
            </div>
          </td>
        </tr>
`;

const TABLE_ROW_HTML_CLAYTONS = `
		  <tr role="row">
          <td role="cell" style="vertical-align:top; padding: 0.5rem">
            <div class="cc-table-cell-text"><p><a href="{{MODULE-ID}}">
              {{TITLE}}
            </a></p> </div>
          </td>
          <td role="cell" class="descriptionCell" style="vertical-align:top; padding: 0.5rem">
            <div class="cc-table-cell-text">
            {{DESCRIPTION}}
            </div>
          </td>
          <td role="cell" style="vertical-align:top;padding:0.5rem">
            <div class="cc-table-cell-text">
            <p>{{WEIGHTING}}</p>
            </div>
          </td>
          <td role="cell" style="vertical-align:top;padding:0.5rem">
            <div class="cc-table-cell-text">
            <p>{{DATE-LABEL}}<br />{{DUE-DATE}}</p>
            </div>
          </td>
          <td role="cell" style="vertical-align:top;padding:0.5rem">
            <div class="cc-table-cell-text">
            <p>{{LEARNING-OUTCOMES}}</p>
            </div>
          </td>
        </tr>
`;


export default class AssessmentTableView extends cc_View {


  /**
   * @descr Initialise the view
   * @param {Object} model
   * @param {Object} controller
   */
  constructor(model, controller) {
    super(model, controller);

    this.TABLE_HTML = TABLE_HTML;

    this.TABLE_HTML_FIELD_NAMES = [
      'DESCRIPTION', 'CAPTION', 'TABLE-ROWS',
      'TITLE', 'TYPE', 'DATE-LABEL', 'DUE-DATE', 'WEIGHTING', 'LEARNING-OUTCOMES',
      'DESCRIPTION', 'MODULE-ID'
    ];

    this.currentCollection = this.model.getCurrentCollection();
  }

  /**
   * @descr insert a nav bar based on current collections
   */

  display() {
    DEBUG && console.log('-------------- AssessmentTable.display()');
    let div = document.getElementById('cc-canvas-collections');

    // remove any existing div.cc-assessment-table
    let existingDiv = document.querySelector('div.cc-assessment-table');
    if (existingDiv) {
      existingDiv.remove();
    }

    // create a simple message div element
    let message = document.createElement('div');
    message.className = 'cc-assessment-table';

		const currentCollection = this.model.getCurrentCollection();
    message.innerHTML = this.generateHTML(currentCollection);
    div.insertAdjacentElement('beforeend', message);

  }

  /**
   * Work through module details for this collection and generate HTML with
   * an assessment table
   */
  generateHTML(collectionName, variety='') {
    let messageHtml = this.TABLE_HTML;
    if (variety === 'claytons') {
      messageHtml = TABLE_HTML_CLAYTONS;
    }

    // TODO update the messageHTML
    const description = this.model.getCurrentCollectionDescription();

    // add a row for each module belonging to the collection
//    const collectionsModules = this.model.getModulesCollections(this.model.getCurrentCollection());
    // get an array of all modules in display order
 		const modules = this.model.getModulesCollections();
    const modulesUrl = this.model.getModuleViewUrl();
    let tableRows = '';
    for (let i = 0; i < modules.length; i++) {

      // skip if row doesn't match currentCollection
      if (modules[i].collection !== collectionName) {
        continue;
      }
      let rowHtml = TABLE_ROW_HTML;
      if (variety === 'claytons') {
        rowHtml = TABLE_ROW_HTML_CLAYTONS;
      }

      let calendarDate = this.generateCalendarDate(modules[i].date);
      // just work with a single date for now (date range to come)
      //const dueDate = modules[i].date;
      const dueDate = calendarDate.from;
      let dateLabel = '';
      let dueDateString = '';
      if (dueDate ) {
        if ( dueDate.MONTH) {
          dueDateString = `${dueDate.MONTH} ${dueDate.DATE}`;
        }
        if ( modules[i].date.label ) {
          dateLabel = modules[i].date.label;
        }
      }

      let mapping = {
        //'MODULE-ID': modules[i].id,
        'MODULE-ID': `${modulesUrl}/#${modules[i].id}`,
        'DESCRIPTION': modules[i].description,
        'TITLE': this.model.deLabelModuleName(modules[i]),
        'TYPE': modules[i].label,
        'DUE-DATE': dueDateString,
        'DATE-LABEL': dateLabel
      };

      // for a claytons view - MODULE-ID needs to become a full link
      if (variety === 'claytons') {
        mapping['MODULE-ID'] = `${modulesUrl}#module_${modules[i].id}`;
      }

      // check metadata for weighting and learning outcomes
      const metaData = modules[i].metadata;
      if (metaData) {
        if (metaData.hasOwnProperty('weighting')) {
          mapping['WEIGHTING'] = metaData.weighting;
        }
        if (metaData.hasOwnProperty('learning outcomes')) {
          mapping['LEARNING-OUTCOMES'] = metaData['learning outcomes'];
        }
      }

      // loop through mapping keys and replace the values in the row html
      for (let key in mapping) {
        if (mapping.hasOwnProperty(key)) {
          rowHtml = rowHtml.replace(`{{${key}}}`, mapping[key]);
        }
      }

      tableRows += rowHtml;
    }
    messageHtml = messageHtml.replace(/{{TABLE-ROWS}}/g, tableRows);

    // only do this if we're not in edit mode
    let editMode = false;
    //const ccController = this.controller.configurationController.parentController;
    const ccController = this.controller.parentController;
    if (ccController) {
      editMode = ccController.editMode;
    }

    if (!editMode || variety==='claytons') {
      messageHtml = this.emptyRemainingFields(messageHtml);
    }

    return messageHtml;

  }
  /**
   * Remove any remaining {{field-name}} from the message HTML
   * @param {String} message 
   * @returns String message with all remaining field names {{field-name}} removed
   */
  emptyRemainingFields(message) {
    this.TABLE_HTML_FIELD_NAMES.forEach(fieldName => {
      // replace any string {{fieldName}} with an empty string
      message = message.replaceAll(`{{${fieldName}}}`, '');
    });
    return message;
  }

}

