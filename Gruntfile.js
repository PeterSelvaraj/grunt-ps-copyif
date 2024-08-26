/*
 * grunt-ps-copyif
 *
 * Copyright (c) 2021 Peter Selvaraj
 * Licensed under the MIT license.
 */

'use strict';

const glob = require('fast-glob');
const { log } = require('console');

module.exports = function (grunt) {
  grunt.initConfig({
    jshint: {
      all: [
        'Gruntfile.js',
        'tasks/**/*.js'
      ],

      options: {
        jshintrc: '.jshintrc'
      }
    },

    clean: {
      tests: ['tmp', '.grunt-cache']
    },

    // Configuration to be run (and then tested).
    psCopyif: {
      job1: {
        options: {
          copyFile: filePath => filePath.match('min.css'),
          rename: filePath => filePath.replace('test/fixtures/src' , 'tmp')
        },

        files: [{
          expand: true,
          src: ['test/fixtures/src/**/*.min.css']
        }]
      }
    }
  });

  // Actually load this plugin's task(s).
  grunt.loadTasks('tasks');

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-clean');

  grunt.registerTask('psCopyifTest', () => {
    const src = glob.sync('test/fixtures/expected/**');
    const out = glob.sync('tmp/**');

    if (src.length === out.length) {
      log('Test passed!');
    } else {
      log('Test failed!');
    }
  });

  // Whenever the "dev" task is run, first lint, then run this
  // plugin's task(s).
  grunt.registerTask('dev', ['jshint', 'psCopyif']);

  // Whenever the "test" task is run, first clean the "tmp" dir, then run this
  // plugin's task(s), then test the result.
  grunt.registerTask('test', ['clean', 'psCopyif', 'psCopyifTest']);

  // By default, lint and run all tests.
  // grunt.registerTask('default', ['jshint', 'test']);
  grunt.registerTask('default', ['psCopyif']);
};
