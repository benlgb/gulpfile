'use strict';

const gulp = require("gulp");
const $ = require("gulp-load-plugins")();
const conf = require("../conf/.gulpfile.json");

module.exports = (type) => {
	const build = () => {
		return gulp.src(conf.html.src)
			.pipe($.plumber({
				errorHandler: function(){
					this.emit("end");
				}
			})).pipe($.watch(conf.html.src, {
				events: ["add", "change"],
				readDelay: 300
			})).pipe($.sourcemaps.init())
			.pipe($.replace(new RegExp(conf.html.replace.css.match, 
				"g"), conf.html.replace.css.replace))
			.pipe($.replace(new RegExp(conf.html.replace.js.match, 
				"g"), conf.html.replace.js.replace))
			.pipe($.htmlBeautify(conf.html.beautify))
			.pipe($.debug({title: "Compile"}))
			.pipe($.sourcemaps.write())
			.pipe(gulp.dest(conf.html.build))
			.pipe($.livereload());
	};

	if (type === "build") {
		return build;
	} else {
		return () => {};
	}
}