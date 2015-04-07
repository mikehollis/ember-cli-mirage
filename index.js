'use strict';
var path = require('path');

module.exports = {
  name: 'ember-cli-mirage',

  included: function included(app) {
    this.app = app;
    this.addonConfig = this.app.project.config(app.env)['ember-cli-mirage'];

    if (this._shouldIncludeFiles()) {
      app.import(app.bowerDirectory + '/FakeXMLHttpRequest/fake_xml_http_request.js');
      app.import(app.bowerDirectory + '/route-recognizer/dist/route-recognizer.js');
      app.import(app.bowerDirectory + '/pretender/pretender.js');
      app.import('vendor/ember-cli-mirage/pretender-shim.js', {
        type: 'vendor',
        exports: { 'pretender': ['default'] }
      });
      app.import(app.bowerDirectory + '/ember-inflector/ember-inflector.js');
      app.import(app.bowerDirectory + '/underscore/underscore.js');
      //app.import(app.bowerDirectory + '/underscore/underscore.js', {
        //exports: {
          //'underscore': ['default']
        //}
      //});
    }
  },

  blueprintsPath: function() {
    return path.join(__dirname, 'blueprints');
  },

  treeFor: function(name) {
    if (this._shouldIncludeFiles()) {
      return this._super.treeFor.apply(this, arguments);
    }
    this._requireBuildPackages();
    return this.mergeTrees([]);
  },

  postprocessTree: function(type, tree) {
    if(type === 'js' && !this._shouldIncludeFiles()) {
      return this._excludePretenderDir(tree);
    }
    return tree;
  },

  _shouldIncludeFiles: function() {
    var userDeclaredEnabled = typeof this.addonConfig.enabled !== 'undefined';
    var defaultEnabled = (this.app.env !== 'production');

    return userDeclaredEnabled ? this.addonConfig.enabled : defaultEnabled;
  },

  _excludePretenderDir: function(tree) {
    var modulePrefix = this.app.project.config(this.app.env)['modulePrefix'];
    return new this.Funnel(tree, {
      exclude: [new RegExp('^' + modulePrefix + '/mirage/')],
      description: 'Funnel: exclude mirage'
    });
  }

};
