'use strict';
var lrSnippet = require('grunt-contrib-livereload/lib/utils').livereloadSnippet;
var mountFolder = function(connect, dir) {
	return connect.static(require('path').resolve(dir));
};

module.exports = function(grunt) {

	// load all grunt tasks
	require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

	grunt.initConfig({
		// parse the package.json to get props
		pkg: grunt.file.readJSON('package.json'),
		// create a banner to include ontop of js/css
		banner: '/*! \n' + ' * Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.name %> \n' + ' */\n',
		// clean folders
		clean: {
			dist: ['.tmp', 'dist'],
			server: '.tmp'
		},
		//
		compass: {
			options: {
				sassDir: 'assets/css',
				cssDir: '.tmp/assets/css',
				imagesDir: 'assets/img',
				javascriptsDir: 'assets/js',
				fontsDir: 'assets/fonts',
				importPath: 'assets/components',
				relativeAssets: true
			},
			dist: {},
			server: {
				options: {
					debugInfo: true
				}
			}
		},
		// concat js files
		concat: {
			options: {
				banner: '<%= banner %>',
				stripBanners: true
			},
			dist: {
				src: ['assets/js/{,*}*.js'],
				dest: 'dist/assets/js/<%= pkg.name %>.js'
			}
		},
		//
		connect: {
			options: {
				port: 9000,
				hostname: 'localhost'
			},
			livereload: {
				options: {
					middleware: function(connect) {
						return [
						lrSnippet,
						mountFolder(connect, '.tmp'),
						mountFolder(connect, '')];
					}
				}
			}
		},
		open: {
			server: {
				path: 'http://<%= connect.options.hostname %>:<%= connect.options.port %>'
			}
		},
		//
		cssmin: {
			options: {
				banner: '<%= banner %>'
			},
			dist: {
				files: {
					'dist/assets/css/<%= pkg.name %>.css': [
						'.tmp/assets/css/{,*/}*.css',
						'assets/css/{,*/}*.css']
				}
			}
		},
		// check for js errors
		jshint: {
			options: {
				jshintrc: '.jshintrc'
			},
			all: [
				'Gruntfile.js',
				'/assets/js{,*/}*.js',
				'!assets/js/vendor/*',
				'test/spec/{,*/}*.js']
		},
		// minimize js files
		uglify: {
			options: {
				banner: '<%= banner %>'
			},
			dist: {
				src: '<%= concat.dist.dest %>',
				dest: 'dist/assets/js/<%= pkg.name %>-min.js'
			},
		},
		watch: {
			compass: {
				files: ['assets/css/{,*/}*.{scss,sass}'],
				tasks: ['compass']
			},
			livereload: {
				files: [
					'*.html',
					'.tmp/assets/css/*.css',
					'assets/js/{,*/}*.js',
					'assets/img/{,*/}*.{png,jpg,jpeg,webp}'],
				tasks: ['livereload']
			}
		}
	});

	grunt.renameTask('regarde', 'watch');

	grunt.registerTask('listen', [

	]);

	grunt.registerTask('server', function(target) {
		if (target === 'dist') {
			return grunt.task.run(['build'], 'open', 'connect:dist:keepalive');
		}

		grunt.task.run([
			'clean:server',
			'compass:server',
			'livereload-start',
			'connect:livereload',
			'open',
			'watch']);
	});

	grunt.registerTask('test', [
		'clean:server']);

	grunt.registerTask('build', [
		'clean:dist',
		'compass:dist',
	//'jshint',
	'concat',
		'uglify',
		'cssmin']);

	grunt.registerTask('default', [
	//'jshint',
	'test',
		'build']);

};