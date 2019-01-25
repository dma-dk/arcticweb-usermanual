# arcticweb-usermanual
User manual for the Arctic application. The user manual is a simple HTML page being accompanied
by CSS, JS and images. The user manual has been separated from the Arctic application, because it is
important, that Arctic users are only downloading the user manual upon first access or after an update.
This is ensured by maintaining the user manual in a separate project and only generating the usermanual.appcache
file upon changes to the user manual (in this project).

## Usage
The Arctic user manual is build and distributed as a war file. Include it in another web project by adding
the following dependency (in another maven web application project)

```
<dependency>
	<groupId>dk.dma.arcticweb</groupId>
	<artifactId>arcticweb-usermanual</artifactId>
	<version>2.3</version>
	<type>war</type>
</dependency>
```

And a overlay configuration to the maven-war-plugin

```
<plugin>
	<groupId>org.apache.maven.plugins</groupId>
	<artifactId>maven-war-plugin</artifactId>
	<version>2.4</version>
    <configuration>
        ...
		<overlays>
			<overlay>
				<groupId>dk.dma.arcticweb</groupId>
				<artifactId>arcticweb-usermanual</artifactId>
			</overlay>
		</overlays>
	</configuration>
</plugin>
```

## Requirements
[Maven 3.1 or higher](https://maven.apache.org/) is required to build a new war file.

An optional possibility is to view changes to the user manual in the browser using the
Livereload Grunt plugin This requires additional installation of
 * [node.js](https://nodejs.org/en/)
 * [npm] (https://www.npmjs.com/)
 * See [getting started](http://gruntjs.com/getting-started) for how to install grunt-cli.


## Continuous Integration
A Jenkins build job has been setup to continuously build and release the latest version of the user manual.
https://dma.ci.cloudbees.com/view/MaritimeWeb/job/arcticweb-usermanual/


## Building
Manipulation of HTML, CSS, JS and generation of usermanual.appcache are performed as part of the Maven
build, e.g. execute:
```
mvn clean package

```

## Live reload - See changes instantly
While performing changes on the sources files you can choose to see the (almost) final result instantly.
This is done by starting the live reload server, which will server the source files on http://localhost:9010:
```
grunt server
```
For this to work you will need to have installed node.js, NPM and grunt-cli globally (se requirements).

## Releases
 TODO



