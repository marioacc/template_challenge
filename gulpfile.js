'use strict';



//GULP PLUGINS
var gulp = require('gulp'),
	url = require('url'),
	proxy = require('proxy-middleware'),
	watch = require('gulp-watch'),
	autoprefixer = require('gulp-autoprefixer'),
	sass = require('gulp-sass'),
	imageop = require('gulp-image-optimization'),
	browserSync = require("browser-sync"),
	reload = browserSync.reload,
	rimraf = require('rimraf').sync,
	runSequence = require('run-sequence'),
	sourcemaps = require('gulp-sourcemaps');



//PATHS FOR THE WORKFLOW
var path = {
	src: {
		index: "src/index.html",
		img: 'src/img/**/*.*',
		fonts: 'src/fonts/**/*.*',
		sass: 'src/sass/**/*.sass',
		js: 'src/js/**/*.*',
		bower: 'bower_components/**/*.*'
	},
	build: {
		img: 'build/img/',
		fonts: 'build/fonts/',
		css: 'build/css/',
		js: 'build/js/',
		bower: 'build/bower/',
		index: 'build/'
	},
	watch: {
		img: 'src/img/**/*.*',
		fonts: 'src/fonts/**/*.*',
		sass: 'src/sass/**/*.sass',
		js: 'src/js/**/*.*',
		index: "src/index.html",
		bower: 'bower_components/**/*.*'
	},
	clean: 'build'
};

var proxyOptions = url.parse('http://localhost:8080/');
proxyOptions.route = '/data';
var browserSyncOptions = {
	server: {
		baseDir: "./build",
		middleware: [proxy(proxyOptions)]
	},
	files: ['./build'],
	host: 'localhost',
	port: 80,
	watchTask: true
};

function printError(error) {
	console.log(error.toString());
	this.emit('end');
}

gulp.task('serve', function () {
	return setTimeout(function () {
		browserSync(browserSyncOptions);
	}, 5000)
});

//COPY THE index.html TO THE BUILD DIRECTORY
gulp.task('html_build', function () {
	return gulp.src(path.src.index)
		.pipe(gulp.dest(path.build.index))
		.pipe(reload({
			stream: true
		}))
		.on('error', printError);
});


//COPY bower folders TO THE BUILD DIRECTORY
gulp.task('bower_build', function () {
	return gulp.src(path.src.bower)
		.pipe(gulp.dest(path.build.bower))
		.on('error', printError)
});


//COPY js folders TO THE BUILD DIRECTORY
gulp.task('js_build', function () {
	return gulp.src(path.src.js)
		.pipe(gulp.dest(path.build.js))
		.pipe(reload({
			stream: true
		}))
		.on('error', printError);
});



//BUILD & COPY sass TO THE BUILD DIRECTORY
gulp.task('css_build', function (cb) {
	return gulp
		.src(path.src.sass)
		.pipe(sourcemaps.init())
		.pipe(sass({
			outputStyle: 'compressed'
		}).on('error', printError))
		.pipe(sourcemaps.write())
		.pipe(autoprefixer({
			browsers: ['last 10 versions', '> 1%', 'ie 9'],
			cascade: true
		}))
		.pipe(gulp.dest(path.build.css));
});



//OPTIMIZE & COPY images TO THE BUILD DIRECTORY
gulp.task('img_build', function (cb) {
	return gulp.src(path.src.img)
		.pipe(imageop({
			optimizationLevel: 5,
			progressive: true,
			interlaced: true
		}))
		.pipe(gulp.dest(path.build.img))
		.on('error', printError)
});



//COPY fonts TO THE BUILD DIRECTORY
gulp.task('fonts_build', function () {
	return gulp.src(path.src.fonts)
		.pipe(gulp.dest(path.build.fonts))
		.on('error', printError)
});


//RUNS ALL THE builds TASKS
gulp.task('build', function (cb) {
	runSequence('clean', [
		'img_build',
		'html_build',
		'fonts_build',
		'css_build',
		'js_build',
		'bower_build'
	], cb)

});


//WATCH ALL
gulp.task('watch', function () {
	watch([path.watch.index], function () {
		gulp.start('html_build');
	});
	watch([path.watch.img], function () {
		gulp.start('img_build');
	});
	watch([path.watch.fonts], function () {
		gulp.start('fonts_build');
	});
	watch([path.watch.sass], function () {
		gulp.start('css_build');
	});
	watch([path.watch.js], function () {
		gulp.start('js_build');
	});
	watch([path.watch.bower], function () {
		gulp.start('bower_build');
	});
});

gulp.task('clean', function () {
	return rimraf(path.clean);
});

gulp.task('default', ['build', 'serve', 'watch']);