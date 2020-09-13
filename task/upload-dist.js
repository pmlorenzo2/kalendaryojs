
/**
 * TASK: Upload Dist
 * DESC: Creates a distribution copy and uploads it to the specified server as a downloadable
 */

"use strict";
const del = require("del"),
    fs = require("fs"),
    ftp = require("vinyl-ftp"),
    gulp = require("gulp"),
    gzip = require("gulp-gzip"),
    tar = require("gulp-tar");


// Define constants
const DIST_DIR = "kalendaryojs";
const DIST_FILE = DIST_DIR + ".tar.gz";
const REM_DIR = "/download";
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

// Compress DIST_DIR into a single DIST_FILE
function compress_dist() {
    try {
        fs.accessSync(DIST_DIR, fs.constants.R_OK);
    } catch (err) {
        return console.log(`Cannot compress. Directory ${DIST_DIR} not found.\n`);
    }

    return gulp.src(`${DIST_DIR}/**`).pipe(tar(`${DIST_DIR}.tar`)).pipe(gzip()).pipe(gulp.dest("."));
}

// Upload DIST_FILE to the specified REM_DIR
function upload_dist() {
    try {
        fs.accessSync(DIST_FILE, fs.constants.R_OK);
    } catch (err) {
        return console.log(`Cannot upload. File ${DIST_FILE} not found.\n`);
    }

    return gulp.src(DIST_FILE).pipe(conn.newer(REM_DIR)).pipe(conn.dest(REM_DIR));
}

// Remove build files and folders
function clean() {
    return del([DIST_DIR, DIST_FILE]);
}


// GULP TASKS SECTION
// ------------------

module.exports = gulp.series(
    gulp.parallel(
        build_root,
        build_src_dir),
    compress_dist,
    upload_dist,
    clean
);

//- End
