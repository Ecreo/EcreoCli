#! /usr/bin/env node
var shell = require("shelljs");
var fs = require('fs'),
    path = require('path'),
    assetsDir = path.basename(process.cwd()) + '.Assets';
    
if (!shell.which('git')) {
  shell.echo('Sorry, this script requires git');
  shell.exit(1);
}

if (shell.exec('git remote add ecreobase https://ecreo.visualstudio.com/DefaultCollection/EcreoBase/_git/EcreoBase.Assets').code !== 0) {
  shell.echo('Error: Failed adding remote for EcreoBase.Assets');
  shell.exit(1);
}

if (shell.exec('git subtree add --prefix=' + assetsDir + '/ ecreobase master').code !== 0) {
  shell.echo('Error: Failed adding subtree for EcreoBase.Assets');
  shell.exit(1);
}

shell.cd(assetsDir);

if (shell.exec('npm install').code !== 0) {
  shell.echo('Error: Failed installing node-modules for ' + assetsDir);
  shell.exit(1);
}