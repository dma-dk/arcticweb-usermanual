# arcticweb-usermanual
User manual for the ArcticWeb application.

You can include the arcticweb-usermanual in your own project. Add it as a npm dependency. E.g.

```
npm install arcticweb-usermanual
```
or
```
npm install arcticweb-usermanual --save
```

## Requirements
[node.js](https://nodejs.org/en/), npm and grunt-cli must be installed globally.
- See [guidelines for installation of node.js and npm](https://docs.npmjs.com/getting-started/installing-node).
- See [getting started](http://gruntjs.com/getting-started) for how to install grunt-cli.

## Distribution
The distribution build for the user manual is put in the dist folder. The build is made by
```
grunt build
```
or
```
npm build
```

## Releases
 TODO

## Continuous Integration
A Jenkins build job has been setup to continuously build and release the latest version of the user manual.
https://dma.ci.cloudbees.com/view/MaritimeWeb/job/arcticweb-usermanual/



## Live reload - See changes instantly
While performing changes on the sources files you can choose to see the (almost) final result instantly.
This is done by starting the live reload server, which will server the source files on http://localhost:9010:
```
grunt server
```
T