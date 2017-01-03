# <%= projectName %>

# External Libraries
- Include Media ([include-media.com](http://include-media.com/)) - Easy Media Queries
- Modularscale Scss ([modularscale.com](http://www.modularscale.com/), [https://github.com/modularscale/modularscale-sass](https://github.com/modularscale/modularscale-sass)) - generate a Modular Scale
- family.scss ([https://github.com/LukyVj/family.scss](https://github.com/LukyVj/family.scss)) - handy mixins managing nth-child
- lazysizes.js ([https://github.com/aFarkas/lazysizes](https://github.com/aFarkas/lazysizes)) - Lazyload Images
- fluid type mixin ([http://www.sassmeister.com/gist/7f22e44ace49b5124eec](http://www.sassmeister.com/gist/7f22e44ace49b5124eec))
- 
# Commands

Initialize Project
```
npm run init
```

Default task with BrowserSync
```
npm run dev
```

Running every other gulp task
```
npm run gulp $TASK$
```

Run just Webpack for JavaScript Bundling
```
npm run webpack
```

# Craft
<% if(projectUsage == 'Craft') { %>
## Installation
If you choose to install Craft via the boilerplate you need https://github.com/rsanchez/craft-cli#composer-installation installed.
<% } %>

<% if(projectUsage == 'Craft' && craftHearty) { %>
## Hearty Config
If you use the Hearty Config you can get more Information about here https://github.com/mmikkel/HeartyConfig-Craft/
<% } %>
It keeps stuff out of of the Craft Folder and you can split the configuration for multiple Environments in different Files clearer View on all the Files

# Build Tasks
There are several build tasks which will clean your assets at first and then call all necessary tasks to recreate them.

### Create Favicons from Single Picture under `src/favicons`
```
npm run gulp favicons
```


### Minifies Everything
```
npm run production
```
