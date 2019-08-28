'use strict';

module.exports = function (config) {
  config.set({
    basePath: './',
    frameworks: ['browserify', 'mocha', 'chai'],
    files: [
      'node_modules/es6-shim/es6-shim.js',
      'test/*.js'
    ],
    preprocessors: {
      'test/*.js': ['browserify']
    },
    browserify: {
      extensions: ['.js'],
      ignore: [],
      watch: true,
      debug: true,
      noParse: []
    },
    reporters: ['mocha'],
    port: 9876,
    colors: true,
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.INFO,
    autoWatch: false,
    singleRun: true,
    browsers: ['PhantomJS']
  });
};
