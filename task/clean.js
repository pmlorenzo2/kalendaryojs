
/**
 * TASK: Clean
 * DESC: Removes the unnecessary files and folders generated
 */

"use strict";
const del = require("del");


// Define constants
const DIST_DIR = "zavin-datepicker";
const DIST_FILE = DIST_DIR + ".tar.gz";


// GULP FUNCTION SECTION
// ---------------------

// Remove build files and folders
function clean() {
    return del([DIST_DIR, DIST_FILE]);
}


// GULP TASKS SECTION
// ------------------

module.exports = clean;

//- End
