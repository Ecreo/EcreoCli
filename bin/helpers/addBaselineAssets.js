'use strict';
const shell = require("shelljs");

const addAssetsToSln = require("./addAssetsToSln.js");
const getBaselineFolder = require("./getBaselineFolder.js");

module.exports = function (projectName) {
    if (shell.test("-e", projectName + ".Assets"))
    {
    shell.echo("error, assets folder already exists");
    shell.exit(-1);
    }
    else {
    addAssetsToSln(projectName);

    shell.exec("git add -A", {silent:true});
    shell.exec("git commit -m assets");

    getBaselineFolder(projectName, "Assets");
    }
}