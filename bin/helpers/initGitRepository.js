'use strict';
const shell = require("shelljs"),
    fs = require('fs');

module.exports = function (projectName) {
    shell.exec("git init", {silent: true});
    var gitIgnoreTemp = fs.readFileSync(__dirname + "/../gitignore.txt").toString();
    var gitignore = gitIgnoreTemp.replace("##PROJECTNAME##", projectName);
    fs.writeFileSync(process.cwd() + "/.gitignore", gitignore);
}