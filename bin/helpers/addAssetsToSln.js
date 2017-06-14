'use strict';
const shell = require("shelljs"),
    fs = require('fs'),
    guid = require('guid');

module.exports = function (projectName) {
  shell.echo("");
  shell.echo("");
  shell.echo("adding assets website to sln");
  shell.echo("");
  shell.echo("");
  var slnFileLines = fs.readFileSync(process.cwd() + "/" + projectName + ".sln").toString().split("\n");
  var assetsProjectTemplate = fs.readFileSync(__dirname + "/../assetsproject.txt").toString();

  var projectGuid = guid.create().toString().toUpperCase();
  var portNumber = Math.floor(Math.random()*(9999-1000+1)+1000);
  var assetsProject = assetsProjectTemplate.replace(/%ASSETSPROJECTGUID%/g, projectGuid).replace(/%PROJECTNAMESPACE%/g, projectName).replace(/%PORTNUMBER%/g, portNumber);

  slnFileLines.splice(3, 0, assetsProject);
  var slnFile = slnFileLines.join("\n");

  fs.writeFileSync(process.cwd() + "/" + projectName + ".sln", slnFile);
}