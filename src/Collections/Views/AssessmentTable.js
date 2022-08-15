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
  font-size: 1em;
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
.cc-assessment-container .responsive-table { 
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

.cc-assessment-container .responsive-table__heading {
  font-weight: 700;
  padding-right: 1em;
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
  
  .cc-assessment-container .responsive-table__heading {
    display: none;
  }
}
	`;

const TABLE_HTML = `
		<style>
			${TABLE_STYLES}
		</style>
		<div id="cc-assessment-table" class="cc-assessment-container">

      <p>
      {{DESCRIPTION}}
      </p>

			<table class="responsive-table" role="table">
      			<caption>{{CAPTION}}</caption>
      			<thead role="rowgroup">
        			<tr role="row">
          				<th role="columnheader" scope="col">Title</th>
          				<th role="columnheader" scope="col">Description</th>
          				<th role="columnheader" scope="col">Weighting</th>
          				<th role="columnheader" scope="col">Due Date</th>
          				<th role="columnheader" scope="col">Learning Outcomes</th>
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
            <span class="responsive-table__heading" aria-hidden="true">Title</span>
            <p><a href="#{{MODULE-ID}}">
              {{TITLE}}
            </a> </p>
          </td>
          <td role="cell" class="descriptionCell">
            <span class="responsive-table__heading" aria-hidden="true">Description</span>
            {{DESCRIPTION}}
          </td>
          <td role="cell">
            <span class="responsive-table__heading" aria-hidden="true">Weighting</span>
            <p>{{WEIGHTING}} </p>
          </td>
          <td role="cell">
            <span class="responsive-table__heading" aria-hidden="true">Due Date</span>
            <p>{{DUE-DATE}}</p>
          </td>
          <td role="cell">
            <span class="responsive-table__heading" aria-hidden="true">Learning Outcomes</span>
            <p>{{LEARNING-OUTCOMES}}</p>
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
    super(model,controller);

    this.TABLE_HTML = TABLE_HTML;

    this.TABLE_HTML_FIELD_NAMES = [
      'DESCRIPTION', 'CAPTION', 'TABLE-ROWS',
      'TITLE', 'TYPE', 'DUE-DATE', 'WEIGHTING', 'LEARNING-OUTCOMES',
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


    // create a simple message div element
    let message = document.createElement('div');
    message.className = 'cc-message';

    let messageHtml = this.TABLE_HTML;

    // TODO update the messageHTML
    const description = this.model.getCurrentCollectionDescription();

    // add a row for each module belonging to the collection
    const collectionsModules = this.model.getModulesCollections(this.model.getCurrentCollection());
    let tableRows = '';
    for (let i = 0; i < collectionsModules.length; i++) {
      let rowHtml = TABLE_ROW_HTML;

      const dueDate = collectionsModules[i].date;
      let dueDateString = '';
      if (dueDate && dueDate.month) {
        dueDateString = `${dueDate.month} ${dueDate.date}`;
      }


      const mapping = {
        'MODULE-ID': collectionsModules[i].id,
        'DESCRIPTION': collectionsModules[i].description,
        'TITLE': collectionsModules[i].name,
        'TYPE': collectionsModules[i].label,
        'DUE-DATE': dueDateString
      };

      // loop through mapping keys and replace the values in the row html
      for (let key in mapping) {
        if (mapping[key]) {
          rowHtml = rowHtml.replace(`{{${key}}}`, mapping[key]);
        }
      }

      tableRows += rowHtml;
    }
    messageHtml = messageHtml.replace(/{{TABLE-ROWS}}/g, tableRows);


    messageHtml = this.emptyRemainingFields(messageHtml);
    message.innerHTML = messageHtml;
    div.insertAdjacentElement('beforeend', message);

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

