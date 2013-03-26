require.config({
    paths: {
		zepto: '../components/zepto/zepto.js',
        underscore: '../components/underscore/underscore.js'
    },
    shim: {
        zepto: {
            exports: '$'
        }
    }
});

require(['{%= name %}'], function ({%= name %}) {
    'use strict';
    {%= name %}.initialize();
});