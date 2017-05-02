'use strict';

const gulp = require("gulp");
const $ = require("gulp-load-plugins")();
const conf = require("../conf/.gulpfile.json");
const autopre = require(conf.css.autopre);

module.exports = (type) => {
	const compileFilter = $.filter(conf.css.referIg, {
			restore: true
		});

	const sassFilter = $.filter(conf.css.sass, {
			restore: true
		});

	const build = () => {
		return gulp.src(conf.css.src)
			.pipe($.plumber())
			.pipe($.watch(conf.css.src, {
				events: ["add", "change"],
				readDelay: 300
			})).pipe($.sourcemaps.init())
			.pipe(compileFilter)
			.pipe(sassFilter)
			.pipe($.sass())
			.pipe(sassFilter.restore)
			.pipe($.autoprefixer(autopre))
			.pipe($.csscomb(conf.css.beautify))
			.pipe(compileFilter.restore)
			.pipe($.debug({title: "Compile"}))
			.pipe($.sourcemaps.write())
			.pipe(gulp.dest(conf.css.build))
			.pipe($.livereload());
	};

	if (type === "build") {
		return build;
	} else {
		return () => {};
	}
}