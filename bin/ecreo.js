#! /usr/bin/env node
const shell = require("shelljs"),
    fs = require('fs'),
    path = require('path'),
    prompt = require('prompt');

const createAndGoToFolder = require("./helpers/createAndGoToFolder.js");
const addAssetsToSln = require("./helpers/addAssetsToSln.js");
const initGitRepository = require("./helpers/initGitRepository.js");
const getBaselineFolder = require("./helpers/getBaselineFolder.js");
const addBaselineAssets = require("./helpers/addBaselineAssets.js");

if (process.argv.length < 3) {
    shell.echo('Error, missing argument')
    shell.exit(1);
}


if (process.argv[2] == "assets")
{
  if (shell.exec('git diff-index --quiet --cached HEAD').code !== 0)
  {
    shell.echo("Error, git repository must be clean");
    shell.echo("Commit or stash your work, and try again");
    shell.exit(-1);
  }

  var slns = fs.readdirSync(process.cwd()).filter(file => file.endsWith(".sln"));
  if (slns.length == 0)
  {
    shell.echo("Error, no Solution files found");
    shell.exit(-1);
  }

  if (slns.length > 1)
  {
    prompt.start();
    prompt.get({
      properties: {
        sln: {
          description: 'Solution to add assets folder in (type the filename without the .sln extension)',
          type: 'string',
          default: process.argv[3] || slns[0].replace(".sln",""),
          required: true
        }
      }
    }, function (err, result) {
      if (shell.test("-e", sln + ".sln"))
      {
        addBaselineAssets(sln);
      }
      else {
        shell.echo("error, no solution file named " + sln + ".sln exists");
        shell.exit(-1);
      }
    })
  }
  else {
    var sln = slns[0].replace(".sln","")

    addBaselineAssets(sln);
  }
}

if (process.argv[2] == "clone")
{
  
  prompt.start();

  prompt.get({
    properties: {
      cloneUrl: {
        description: 'Clone URL',
        type: 'string',
        pattern: /^http.*/,
        default: process.argv[3],
        required: true
      }
    }
  }, function (err, result) {

      var foldername = result.cloneUrl.substring(result.cloneUrl.lastIndexOf("/") + 1).replace(".git", "");
      shell.exec("git clone " + result.cloneUrl);
      
      shell.cd(foldername);

      // find assets folder
      var folders = fs.readdirSync(process.cwd()).filter(file => fs.lstatSync(path.join(process.cwd(), file)).isDirectory() && file.endsWith(".Assets"));
      if (folders.length > 0)
      {
        // assets folder found, check for npm packages
        if (shell.test("-e", folders[0] + "/package.json")) {

          // packages.json found, install packages
          console.log("installing npm dependencies");
          shell.cd(folders[0]);
          shell.exec("npm install");

          // hide node_modules folder
          if (shell.test("-e", "node_modules")) {
            shell.exec("attrib +h node_modules")
          }

          // go back to top dir
          shell.cd("..");
        }
      }

      if (shell.test("-e", "UaasClone.cmd")) {
        shell.exec("UaaSClone.cmd");
      }



  });
}

if (process.argv[2] == "cloud")
{
  prompt.start();

  prompt.get({
    properties: {
      projectName: {
        description: 'ProjectName',
        type: 'string',
        pattern: /^([a-z]|[A-Z]|[0-9])*/,
        default: process.argv[3],
        required: true
      },
      cloneUrl: {
        description: 'Clone URL',
        type: 'string',
        pattern: /^http.*\.git/,
        default: process.argv[4],
        required: true
      }
    }
  }, function (err, result) {

    createAndGoToFolder(result.projectName);

    const uaasGuid = result.cloneUrl.substring(result.cloneUrl.lastIndexOf("/") + 1).replace(".git", "");


    initGitRepository(result.projectName);

    console.log("Downloading helper executable");
    shell.exec("powershell -ExecutionPolicy Bypass -Command \"(New-Object Net.WebClient).DownloadFile('https://umbracoreleases.blob.core.windows.net/download/Waasp.exe', 'Waasp.exe')");
    if (!shell.test("-e", result.projectName + ".Web"))
    {
      shell.exec("git clone " + result.cloneUrl);
    }

    if (shell.test("-e", uaasGuid))
    {
      shell.mv("-f", uaasGuid, result.projectName + ".Web");
    }



    shell.exec("Waasp.exe \"" + process.cwd() + "\" " + result.projectName + " " + result.cloneUrl);

    addBaselineAssets(result.projectName);

    shell.exec("DEL Waasp.exe /Q");

  });
}
    
