'use strict';

module.exports = function(grunt) {

	// load all grunt tasks
    require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

	grunt.initConfig({
		// parse the package.json to get props
		pkg: grunt.file.readJSON('package.json'),
		// create a banner to include ontop of js/css
		banner: '/*! \n' +
			' * Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.name %> \n' +
			' */\n',
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
		cssmin: {
			options: {
				banner: '<%= banner %>'
			},
            dist: {
                files: {
                    'dist/assets/css/<%= pkg.name %>.css': [
                        '.tmp/assets/css/{,*/}*.css',
                        'assets/css/{,*/}*.css'
                    ]
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
                'test/spec/{,*/}*.js'
            ]
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
		}
	});

	// grunt.registerTask('listen', []);

	// grunt.registerTask('server', []); 

	grunt.registerTask('test', [
		'clean:server'
	]);

	grunt.registerTask('build', [
		'clean:dist',
		'compass:dist',
		//'jshint',
		'concat',
		'uglify',
		'cssmin'
	]);

	grunt.registerTask('default', [
		//'jshint',
		'test',
		'build'
	]);

};