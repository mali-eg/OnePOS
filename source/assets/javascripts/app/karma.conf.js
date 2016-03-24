// Karma configuration
// Generated on Wed Sep 16 2015 10:19:54 GMT+0200 (Egypt Standard Time)

module.exports = function (config) {
    config.set({

        // base path that will be used to resolve all patterns (eg. files, exclude)
        basePath: '',


        // frameworks to use
        // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
        frameworks: ['jasmine'],


        // list of files / patterns to load in the browser
        files: [
            '../_core/lib/jquery-1.9.1.min.js',
            '../_angular-core/angular.min.js',
            '../_angular-core/angular-ui-router.min.js',
            '../_angular-core/angular-mocks.js',
            'modules/app.js',
            'core/core.module.js',
            'widgets/**/*.module.js',
            'widgets/**/*.js',
            'modules/**/*.module.js',
            'modules/**/*.route.js',
            'modules/**/*.js',
            'modules/**/**.spec.js',
            'widgets/**/*.html'
            //'test/**/*.js'
        ],


        // list of files to exclude
        exclude: [],


        // preprocess matching files before serving them to the browser
        // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
        preprocessors: {
            'widgets/**/*.html': 'ng-html2js'
        },


        // test results reporter to use
        // possible values: 'dots', 'progress'
        // available reporters: https://npmjs.org/browse/keyword/karma-reporter
        //reporters: ['progress'],
        reporters: ['spec'],

        // web server port
        port: 9876,


        // enable / disable colors in the output (reporters and logs)
        colors: true,


        // level of logging
        // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
        logLevel: config.LOG_INFO,


        // enable / disable watching file and executing tests whenever any file changes
        autoWatch: false,


        // start these browsers
        // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
        //browsers: ['PhantomJS'],
        browsers: ['Chrome'],

        // Continuous Integration mode
        // if true, Karma captures browsers, runs the tests and exits
        singleRun: true,
        ngHtml2JsPreprocessor:{
            prependPrefix:'/assets/javascripts/app/'
        }
    })
}
