# <%= projectName %>

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

### Build CSS
```
gulp build-css
```

### Build JS
```
gulp build-js
```

# Production
We have a production task which will clean all assets at first, then recreate everything and finish with minifiyng CSS and JS