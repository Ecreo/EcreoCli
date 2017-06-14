'use strict';
const shell = require("shelljs");

module.exports = function (foldername, checkIfFolderExists = true) {

    if (checkIfFolderExists && shell.test("-e", process.cwd() + foldername)) {
      shell.echo('Error, projectfolder already exists');
      shell.exit(1);
    }

    shell.mkdir(foldername);
    shell.cd(foldername);
}