const gulp = require("gulp");
const htmlTask = require("./settings/htmlTask");
const cssTask = require("./settings/cssTask");
const jsTask = require("./settings/jsTask");
const othersTask = require("./settings/othersTask");
const $ = require("gulp-load-plugins")();

gulp.task("default", ["build"]);

gulp.task("build", ["build-init"]);

gulp.task("build-init", () => {
	$.livereload.listen();
	gulp.start(["build-html", "build-css", "build-js", "build-others"])
});

gulp.task("build-html", htmlTask("build"));

gulp.task("build-css", cssTask("build"));

gulp.task("build-js", jsTask("build"));

gulp.task("build-others", othersTask());