'use strict';

const gulp = require("gulp");
const $ = require("gulp-load-plugins")();
const conf = require("../conf/.gulpfile.json");

module.exports = () => {
	return () => {
		gulp.src(conf.others.styleSrc)
			.pipe($.plumber({
				errorHandler: function(){
					this.emit("end");
				}
			})).pipe($.watch(conf.others.styleSrc, {
				events: ["add", "change"],
				readDelay: 300
			})).pipe($.debug({title: "Compile"}))
			.pipe(gulp.dest(conf.others.styleBuild))
			.pipe($.livereload());
		
		gulp.src(conf.others.javascriptSrc)
			.pipe($.plumber({
				errorHandler: function(){
					this.emit("end");
				}
			})).pipe($.watch(conf.others.javascriptSrc, {
				events: ["add", "change"],
				readDelay: 300
			})).pipe($.debug({title: "Compile"}))
			.pipe(gulp.dest(conf.others.javascriptBuild))
			.pipe($.livereload());

		gulp.src(conf.others.src)
			.pipe($.plumber({
				errorHandler: function(){
					this.emit("end");
				}
			})).pipe($.watch(conf.others.src, {
				events: ["add", "change"],
				readDelay: 300
			})).pipe($.debug({title: "Compile"}))
			.pipe(gulp.dest(conf.others.build))
			.pipe($.livereload());
	};
};