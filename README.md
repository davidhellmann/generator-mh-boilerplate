# YO
This is kind of special and mostly suited for my own requirements

Thanks to [Sascha Fuchs](https://github.com/gisu) for the help and his framework [Kittn](https://github.com/kittn/generator-kittn/) for the inspiration.

Also thanks to [David Hellmann](https://github.com/davidhellmann) and his [baukasten boilerplate](https://github.com/davidhellmann/generator-baukasten).

## Requirements
* composer
* git

## Nice to Have
* Craft CLI
* Wordpress CLI

## External Libraries
- Include Media ([include-media.com](http://include-media.com/)) - Easy Media Queries
- Modularscale Scss ([modularscale.com](http://www.modularscale.com/), [https://github.com/modularscale/modularscale-sass](https://github.com/modularscale/modularscale-sass)) - generate a Modular Scale
- family.scss ([https://github.com/LukyVj/family.scss](https://github.com/LukyVj/family.scss)) - handy mixins managing nth-child
- lazysizes.js ([https://github.com/aFarkas/lazysizes](https://github.com/aFarkas/lazysizes)) - Lazyload Images
- fluid type mixin ([http://www.sassmeister.com/gist/7f22e44ace49b5124eec](http://www.sassmeister.com/gist/7f22e44ace49b5124eec))



## Craft
If you have installed [Craft CLI](https://github.com/rsanchez/craft-cli) it will be used to install Craft otherwise please install it by yourself

We can give you two Config Presets
* [NY Studio 107 Craft Multi Environment](https://github.com/nystudio107/craft-multi-environment) (Recommended)
* [Hearty Conf](https://github.com/mmikkel/HeartyConfig-Craft) 


## Laravel
If you choose to Install Laravel it will create a new Project with composer

## Wordpress
When you choose Wordpress the installer will do a 
fresh install of Wordpress via the WP-CLI tool, you need to install this tool [http://wp-cli.org/](http://wp-cli.org/)

# Install

```npm install -g generator-mh-boilerplate```

# Usage
Jump to your Project Folder and type:
```yo mh-boilerplate```

Yeoman will set all necessary paths and other configs in the config.json

Yeoman will initialize a git repo and will fire `npm run init` to initialize the project

# Important Commands
### Initialize the Project
```
npm run init
```

### Development Task
```
npm run dev
```
Runs webpack-dashboard so you have an overview of your build packages, including the Default Gulp Task with BrowserSync, also webpack is compiling JavaScript and CSS

### Gulp Task
You can run every Gulp Task with
```
npm run gulp $TASK_NAME$
```

## Special Thanks
- webdevs: [Website](http://webdevs.xyz)
- Sascha Fuchs: [GitHub](https://github.com/gisu)
- David Hellmann: [GitHub](https://github.com/davidhellmann)
- CSS Tricks -  for Easing Map: [Website](https://css-tricks.com/snippets/sass/easing-map-get-function/)
- Hugo Giraudel & Eduardo Bouças - for include media: [Website](http://include-media.com/)
- @LukyVj - for family.scss: [Website](http://lukyvj.github.io/family.scss/)
- inuitcss - for some snippets and inspiration: [website](https://github.com/inuitcss/inuitcss)

--
Using functions of Hugo Giraudel
[http://hugogiraudel.com/2013/08/05/offsets-sass-mixin/](http://hugogiraudel.com/2013/08/05/offsets-sass-mixin/)
[http://www.sitepoint.com/sass-mixin-css-triangles/](http://www.sitepoint.com/sass-mixin-css-triangles/)

Using the REM Calc function of Foundation by zurb
[http://foundation.zurb.com](http://foundation.zurb.com)
--
