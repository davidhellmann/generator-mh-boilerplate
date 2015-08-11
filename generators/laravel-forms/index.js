'use strict';
var yeoman = require('yeoman-generator');

module.exports = yeoman.generators.Base.extend({

  askFor: function() {
      var done = this.async();

      var prompts = [
        {
          type: 'input',
          name: 'databaseServer',
          message: 'Your Database Server',
          default: 'localhost'
        },{
          type: 'input',
          name: 'databaseUser',
          message: 'Username for your database',
          default: ' '
        },{
          type: 'input',
          name: 'databasePassword',
          message: 'Password for your database',
          default: ' '
        },{
          type: 'input',
          name: 'databaseName',
          message: 'Name of the Database',
          default: ' '
        }
      ];

      this.prompt(prompts, function(props) {
        this.databaseServer = props.databaseServer;
        this.databaseUser = props.databaseUser;
        this.databasePassword = props.databasePassword;
        this.databaseName = props.databaseName;
        done();
      }.bind(this));

  },

  app: function() {
    this.directory('app/', 'dist/app/');
    this.directory('database/', 'dist/database/');
    this.directory('resources/', 'dist/resources/');
  },

  writing: function () {
    this.copy('env', 'dist/.env');
  }
});
