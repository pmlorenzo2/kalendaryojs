
/**
 * TASK: Upload CDN
 * DESC: Creates a distribution copy and uploads it to the specified server's CDN
 */

"use strict";
const del = require("del"),
    fs = require("fs"),
    ftp = require("vinyl-ftp"),
    gulp = require("gulp");


// Define constants
const DIST_DIR = "kalendaryojs";
const REM_DIR = "/cdn/" + DIST_DIR;
const SRC_DIR = "src";


// Create FTP connection
const conn = ftp.create({
    host: process.env.FTP_HOST,
    user: process.env.FTP_USER,
    password: process.env.FTP_PASS,
    parallel: 10
});


// GULP FUNCTION SECTION
// ---------------------

// Copy essential files in project root of DIST_DIR
function build_root() {
    const files = ["README.md"];
    return gulp.src(files).pipe(gulp.dest(DIST_DIR));
}

// Copy files and folders of src to DIST_DIR/SRC_DIR
function build_src_dir() {
    const files = ["src/**"];
    return gulp.src(files).pipe(gulp.dest(`${DIST_DIR}/${SRC_DIR}`));
}

// Upload DIST_DIR to the specified REM_DIR
function upload_dist() {
    try {
        fs.accessSync(DIST_DIR, fs.constants.R_OK);
    } catch (err) {
        return console.log(`Cannot upload. Directory ${DIST_DIR} not found.\n`);
    }

    return gulp.src(`${DIST_DIR}/**`, { base: DIST_DIR, buffer: false })
        .pipe(conn.newer(REM_DIR))
        .pipe(conn.dest(REM_DIR));
}

// Remove build files and folders
function clean() {
    return del(DIST_DIR);
}


// GULP TASKS SECTION
// ------------------

module.exports = gulp.series(
    gulp.parallel(
        build_root,
        build_src_dir),
    upload_dist,
    clean
);

//- End
