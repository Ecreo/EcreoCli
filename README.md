# Ecreo Cli
Command line tool for importing assets, setting up Umbraco Cloud projects etc.

## Getting Started

Ecreo Cli is a tool for working with Umbraco solutions at Ecreo. You can create a new solution for an Umbraco Cloud project, clone an existing, or add assets (css/js etc.) to an existing solution.

### Prerequisites

You need to have nodejs, npm and git installed.

### Installing

It's best to install globally. That way you can use the tool wherever you want to
```
npm install --global ecreo-cli
```

## Usage

  **Create new solution for Umbraco Cloud project**
 To create a new solution, in your command line of choice, type:

     ecreo cloud

This will start the tool, and prompt you for solution name, and a url to clone from Umbraco Cloud.
You can also specify this, when you start the tool:

    ecreo cloud MyProject https://myproject.scm.s1.umbraco.io/c72e616b-2857-4143-88b9-cf8f021c48dc.git

The tool will then clone the project from Umbraco Cloud, create a Core project (class library), clone the baseline for assets, install npm dependencies and add to a solution file. It also initializes a git repository for you, with a default .gitignore file. So all you have to do is to add a remote for Core and Assets, and your are good to go.

**Clone existing solution**
To clone an exising solution (Core+Assets from VSTS or other), type:

     ecreo clone

or

     ecreo clone https://ecreo.visualstudio.com/DefaultCollection/MyProject/_git/MyProject

The tool will then clone the repository, install npm dependencies, and clone an eventual Umbraco Cloud solution.

**Add Assets folder to existing solution**
To add assets folder (with css/js/svg, and default gulp setup) to an existing solution, navigate to the root directory of the solution and type:

     ecreo assets

The tool will find the directorys solution file (if there is more, you will be prompted for the right one), clone the baseline for assets, install npm dependencies and add the assets to your solution file.
