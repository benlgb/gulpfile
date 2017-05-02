'use strict';

const gulp = require("gulp");
const $ = require("gulp-load-plugins")();
const conf = require("../conf/.gulpfile.json");
const beautify = require(conf.js.beautify);

module.exports = (type) => {
	const compileFilter = $.filter(conf.js.referIg, {
			restore: true
		});

	const build = () => {
		return gulp.src(conf.js.src)
			.pipe($.plumber())
			.pipe($.watch(conf.js.src, {
				events: ["add", "change"],
				readDelay: 1000
			})).pipe($.sourcemaps.init())
			.pipe(compileFilter)
			.pipe($.jshint(conf.js.jshint))
			.pipe($.jshint.reporter("default"))
			.pipe($.babel({presets: ["es2015", "stage-2"]}))
			.pipe($.jsbeautify(beautify))
			.pipe(compileFilter.restore)
			.pipe($.debug({title: "Compile"}))
			.pipe($.sourcemaps.write())
			.pipe(gulp.dest(conf.js.build))
			.pipe($.livereload());
	};

	if (type === "build") {
		return build;
	} else {
		return () => {};
	}
}