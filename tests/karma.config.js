// Karma configuration
// Generated on Tue Oct 07 2014 22:16:54 GMT+0530 (India Standard Time)

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '../',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine'],


    // list of files / patterns to load in the browser
    files: [
		'node_modules/angular/angular.js',
		'node_modules/angular-route/angular-route.js',
		'node_modules/angular-resource/angular-resource.js',
		'node_modules/angular-sanitize/angular-sanitize.js',
		'node_modules/angular-animate/angular-animate.js',
		'node_modules/angular-mocks/angular-mocks.js',
		'node_modules/angular-messages/angular-messages.js',
		'node_modules/angular-ui-bootstrap/ui-bootstrap-tpls.js',
		'js/angular-media-player/angular-media-player.js',
		'js/angular-local-storage/angular-local-storage.js',
		'app/app.js',
		'app/config.js',
		'app/workout/workoutApp/*.js',
		'app/workout/shared/*.js',
		'app/workout/shared/Directives/*.js',
		'app/workout/workoutBuilder/*.js',
		'template/**/*.html',
    ],


    // list of files to exclude
    exclude: [

    ],


    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress'],


    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['Chrome'],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false
  });
};
