const memFs = require('mem-fs');
const argv = require('yargs').argv;
const editor = require('mem-fs-editor');
const inquirer = require('inquirer');
const path = require('path');
const pkg = require('../package.json');


function createModule({moduleName, components = {} }) {
  var store = memFs.create();
  var fs = editor.create(store);
  const srcPath = path.resolve(pkg.srcPaths.views);
  const vuePath = `${path.resolve(pkg.srcPaths.js)}components/`;
  const dist = {
    path: moduleName.includes('/') ? moduleName.split('/')[0] + '/' : '',
    name: moduleName.includes('/') ? '_' + moduleName.split('/')[1] : `${moduleName}/_${moduleName}`,
    template: moduleName.includes('/') ? moduleName.split('/')[1] : `${moduleName}`,
  };
  const fileName = dist.path + dist.name;
  const fileExtension = <% if (projectUsage == 'craft') { -%>
  '.svg.html'
  <% } else if (projectUsage == 'laravel') { -%>
  '_svg.blade.php'
  <% } %>
  try {
    if (components.js) {
      fs.copyTpl(path.resolve(__dirname, './moduleTemplates/_script.js'), `${srcPath}/modules/${fileName}.scripts.js`, {
        moduleName: dist.template,
      });
      console.log(`${srcPath}/modules/${fileName}.scripts.js`);
    }


    if (components.css) {
      fs.copyTpl(path.resolve(__dirname, './moduleTemplates/_style.scss'), `${srcPath}/modules/${fileName}.styles.scss`, {
        moduleName: dist.template,
      });
      console.log(`${srcPath}/modules/${fileName}.styles.scss`);
    }

    if (components.template) {
      fs.copyTpl(path.resolve(__dirname, './moduleTemplates/_template.html'), `${srcPath}/modules/${fileName}-template${fileExtension}`, {
        moduleName: dist.template,
      });
      console.log(`${srcPath}/modules/${fileName}-template${fileExtension}`);
    }

    if (components.vue) {
      fs.copyTpl(path.resolve(__dirname, './moduleTemplates/_template.vue'), path.resolve(`${vuePath}/${moduleName}.vue`), {
        moduleName: dist.template,
      });
      console.log(`${vuePath}/${moduleName}.vue`);
    }

    console.log('Everything created');
    fs.commit(function(done) {
      console.log('done');
    });
  } catch(e) { console.error(e); }
}

if(argv._.length) {
  return createModule({
    moduleName: argv._[0],
    components: {
      js: argv.js || argv.javascript,
      css: argv.css || argv.scss || argv.style,
      template: argv.html || argv.template,
      vue: argv.vue
    }
  });
}

inquirer
  .prompt([
    {
      type: 'input',
      name: 'moduleName',
      message: 'Please input module name',
      default: 'module',
    },
    {
      type: 'checkbox',
      name: 'components',
      message: 'Module Components',
      choices: [
        {
          name: 'Style',
          value: 'css'
        },
        {
          name: 'JavaScript',
          value: 'js',
        },
        {
          name: 'Template',
          value: 'template'
        }
      ]
    }
  ])
  .then(async (answers) => {
    createModule({
      moduleName: answers.moduleName,
      components: {
        js: answers.components.includes('js') ? true : false,
        css: answers.components.includes('css') ? true : false,
        template: answers.components.includes('template') ? true : false
      }
    });
  });
