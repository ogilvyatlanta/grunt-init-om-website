'use strict';

module.exports = function(grunt) {

	// load all grunt tasks
    require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

	grunt.initConfig({
		// parse the package.json to get props
		pkg: grunt.file.readJSON('package.json'),
		// create a banner to include ontop of js/css
		banner: '/* ! <%= pkg.name %> */\n',
		// clean folders
		clean: {
			dist: ['.tmp', 'dist'],
            server: '.tmp'
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
		//'jshint',
		'concat',
		'uglify'
	]);

	grunt.registerTask('default', [
		//'jshint',
		'test',
		'build'
	]);

};