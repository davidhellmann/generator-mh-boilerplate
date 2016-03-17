# YO
This is kind of special and mostly suited for my own requirements

Thanks to [Sascha Fuchs](https://github.com/gisu) for the help and his framework [Kittn](http://kittn.de/) for the inspiration.

Also thanks to [David Hellmann](https://github.com/davidhellmann) and his [yo boilerplate](https://github.com/davidhellmann/generator-dhBoilerplate).

--
Using functions of Hugo Giraudel
[http://hugogiraudel.com/2013/08/05/offsets-sass-mixin/](http://hugogiraudel.com/2013/08/05/offsets-sass-mixin/)
[http://www.sitepoint.com/sass-mixin-css-triangles/](http://www.sitepoint.com/sass-mixin-css-triangles/)

Using the REM Calc function of Foundation by zurb
[http://foundation.zurb.com](http://foundation.zurb.com)
--


## Wordpress
When you choose Wordpress the installer will do a fresh install of Wordpress via the WP-CLI tool, you need to install this tool [http://wp-cli.org/](http://wp-cli.org/)

## Laravel
For laravel you need to follow these instructions first [http://laravel.com/docs/5.1/installation](http://laravel.com/docs/5.1/installation) because it uses the laravel bin to create a new laravel installation

## Craft
After intializing install craft in the dist folder

# Install

```npm install -g generator-mh-boilerplate```

# Usage
Jump to your Project Folder and type:
```yo mh-boilerplate```

Yeoman will set all necessary paths and other configs in the config.json

Yeoman will initialize a git repo and will fire `gulp init` to initialize the project

# Commands

Initialize Project
```gulp init```

Default task with BrowserSync
```
gulp
```

If you pull this project and the project owner hasn't done any JS work you will miss the JS Folders, to create them use:

```
gulp createDirs
```

This will create `src/js/json`, `src/js/my-scripts` and `src/js/single`

Move all your JSON Files into `src/js/json`

Move JS Files you write and want to get merged into `src/js/my-scripts` 
 
Move Single JS Files you *don't* want to be merged into a single file into `src/js/single` and define them in the config.json unter files.jsCopyScripts

Librarys you want to merge together in a plugins.min.js must be defined in the config.json unter files.jsCombinePlugins

# Build Tasks
There are several build tasks which will clean your assets at first and then call all necessary tasks to recreate them.

### Create Favicons from Single Picture under `src/favicons`
```
gulp favicons
```

### Complete Rebuild will clean Views, CSS, JS and Images
```
gulp build
```

### Publish, minifies css, js and images in the dist folder, you can use it before you zip your files
```
gulp publish
```

### Deploy, clears everything in the dist folder, then builds from scratch and after all minifies css, js and images, can be used for the Task Pipeline in your deployment tool
```
gulp deploy
```

# Production
We have a production task which will clean all assets at first, then recreate everything and finish with minifiyng CSS and JS