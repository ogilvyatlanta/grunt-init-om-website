/*
 * grunt-init-om-template
 * https://gruntjs.com/
 * https://github.com/ogilvyatlanta/grunt-init-om-website
 *
 * Copyright (c) 2013 Ogilvy Atlanta, contributors
 * Licensed under the MIT license.
 */

 'use strict';

// Basic template description.
exports.description = 'Template for use by grunt-init';

// Template-specific notes to be displayed before question prompts.
exports.notes = '_Project name_';

// Template-specific notes to be displayed after question prompts.
exports.after = 'You should now install project dependencies with _npm ' +
  'install_ && _bower install_.';

// Any existing file or directory matching this wildcard will cause a warning.
exports.warnOn = '*';

// The actual init template.
exports.template = function(grunt, init, done) {

	init.process({}, [
	
		init.prompt('name')
	
	], function(err, props) {

		var files = init.filesToCopy(props);

		init.copyAndProcess(files, props);

		done();

	});

};