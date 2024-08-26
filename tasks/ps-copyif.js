/*
 * grunt-ps-copyif
 *
 * Copyright (c) 2017 Peter Selvaraj
 * Licensed under the MIT license.
 */

'use strict';

const CopySvc = require('./copy');
const logSvc = require('grunt-ps-log');

module.exports = function (grunt) {
  grunt.registerMultiTask('psCopyif', 'Copy files conditionally', function () {
    let fileCount = 0;
    const time = Date.now();
    const opt = this.options();

    this.files.forEach(function (file) {
      const options = Object.assign({}, opt, file.options);
      const copySvc = CopySvc.getNew(options);

      file.src.forEach(function (filePath) {
        const copied = copySvc.copyFile(filePath);

        if (copied) {
          fileCount++;
        }
      });
    });

    const files = fileCount + ` file${fileCount > 1 ? 's' : ''}`;

    logSvc.log(`Copied ${files} in ` + ((Date.now() - time) / 1000) + 's');
  });
};
