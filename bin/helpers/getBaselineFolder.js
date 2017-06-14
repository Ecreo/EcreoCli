'use strict';
const shell = require("shelljs");

module.exports = function (projectName, folderName, destFolderName = folderName) {
    shell.echo("");
    shell.echo("");
    shell.echo("getting assets from baseline");
    shell.echo("");
    shell.echo("");

    if (!shell.test("-e", projectName + "." + folderName))
    {
        shell.exec("git remote remove ecreobase-" + folderName, {silent: true});
        shell.exec("git remote add ecreobase-" + folderName + " https://ecreo.visualstudio.com/DefaultCollection/EcreoBase/_git/EcreoBase." + folderName, {silent: true});
        shell.exec("git subtree add --prefix=" + projectName + "." + destFolderName + " ecreobase-" + folderName + " master", {silent: true})

        shell.cd(projectName + "." + destFolderName);
        if (shell.test("-e", "package.json")) {
            shell.echo("");
            shell.echo("");
            shell.echo("installing npm dependencies");
            shell.echo("");
            shell.echo("");
            shell.exec("npm install", {silent: true});
            // hide node_modules folder
            if (shell.test("-e", "node_modules")) {
                shell.exec("attrib +h node_modules", {silent: true})
            }
        }
        else {
        shell.echo("package.json not found");
        }
        shell.cd("..");
    }
    else {
        shell.echo("error, assets dir (" + projectName + "." + folderName + ") already exists");
        shell.exit(-1);
    }
}