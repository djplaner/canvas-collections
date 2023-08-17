// Copyright (C) 2023 Griffith University
// 
// This file is part of Canvas Collections.
// 
// Canvas Collections is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
// 
// Canvas Collections is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
// 
// You should have received a copy of the GNU General Public License
// along with Canvas Collections.  If not, see <http://www.gnu.org/licenses/>.

/**
 * @file ui.ts
 * @description UI helper functions
 */

/**
 * @function toastAlert
 * @param {string} message - HTML to be displayed in the toast
 * @param {string} status - primary, success, neutral, warning, danger
 * @description Quick implementation of the shoelace style toast alert notification
 * https://shoelace.style/components/alert
 */

export function toastAlert(message, variant = "primary", duration = null) {
  const iconMapping = {
    primary: "info-circle",
    success: "check2-circle",
    neutral: "gear",
    warning: "exclamation-triangle",
    danger: "exclamation-octagon",
  };
  // create a shoelace style sl-alert element
  const alert = Object.assign(document.createElement("sl-alert"), {
    variant,
    closable: true,
    innerHTML: `
    <sl-icon slot="icon" name="${iconMapping[variant]}"></sl-icon>
    ${message}
    `
  });

  document.body.append(alert);
  return alert.toast();
  // alert.toast();
}

/**
 * @function ccConfirm
 * @param message 
 * @description Controller to implement a confirm dialog using shoelace style 
 * copied from https://jsfiddle.net/claviska/s3vdafmw/7/
 */
export const ccConfirm = (message) => {
  return new Promise((resolve, reject) => {
    const div = document.createElement("div");
    div.innerHTML = `
      <sl-dialog label="Confirm">
        ${message}
        <sl-button slot="footer">Cancel</sl-button>
        <sl-button slot="footer" type="primary">OK</sl-button>
      </sl-dialog>    
    `;

    const dialog = div.querySelector("sl-dialog");
    const cancel = div.querySelector("sl-button");
    const ok = cancel.nextElementSibling;

    document.body.appendChild(dialog);

    customElements.whenDefined("sl-dialog").then(() => {
      dialog.show();

      ok.addEventListener("click", () => {
        resolve(true);
        dialog.hide();
      });

      cancel.addEventListener("click", () => {
        resolve(false);
        dialog.hide();
      });

      dialog.addEventListener("sl-hide", () => {
        resolve(false);
      });
    });
  });
};

