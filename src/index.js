
import { cc_Controller } from './cc_controller';

const COURSE_ID=ENV.COURSE_ID;
//const CSS_URL='<link rel="stylesheet" href="https://s3.amazonaws.com/filebucketdave/banner.js/cards.css" />';
//const TAILWIND_CSS='<link href="https://unpkg.com/tailwindcss@^2/dist/tailwind.min.css" rel="stylesheet">';
const CANVAS_COLLECTIONS_CSS='<link href="https://djon.es/gu/canvas/canvas-collections.css" rel="stylesheet">';


function canvasCollections() {

    // Wait for everything to load
    window.addEventListener('load', function(){
        // getting very kludgy here, haven't got a good solution...yet #14
        // - module content is dynamically loaded, wait (dumbly) for it to finish
        this.setTimeout(
            () => {
                let controller = new cc_Controller();
            }, 2000
        );
    }, false);
}

canvasCollections();
