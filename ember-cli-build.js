/* global require, module */
var EmberApp = require('ember-cli/lib/broccoli/ember-app');

module.exports = function(defaults) {
  var app = new EmberApp(defaults, {
    // Add options here
  });

  // Semantic UI icons
  app.import(app.bowerDirectory + '/semantic-ui-icon/assets/fonts/icons.eot', {
    destDir: 'assets/assets/fonts'
  });
  app.import(app.bowerDirectory + '/semantic-ui-icon/assets/fonts/icons.ttf', {
    destDir: 'assets/assets/fonts'
  });
  app.import(app.bowerDirectory + '/semantic-ui-icon/assets/fonts/icons.woff', {
    destDir: 'assets/assets/fonts'
  });
  app.import(app.bowerDirectory + '/semantic-ui-icon/assets/fonts/icons.woff2', {
    destDir: 'assets/assets/fonts'
  });
  app.import(app.bowerDirectory + '/semantic-ui-icon/assets/fonts/icons.svg', {
    destDir: 'assets/assets/fonts'
  });
  app.import(app.bowerDirectory + '/semantic-ui-icon/icon.css');
  app.import(app.bowerDirectory + '/semantic-ui-loader/loader.css');
  app.import(app.bowerDirectory + '/semantic-ui-label/label.css');
  app.import(app.bowerDirectory + '/semantic-ui-image/image.css');
  app.import(app.bowerDirectory + '/semantic-ui-form/form.css');
  app.import(app.bowerDirectory + '/semantic-ui-checkbox/checkbox.css');
  app.import(app.bowerDirectory + '/semantic-ui-menu/menu.css');
  app.import(app.bowerDirectory + '/semantic-ui-button/button.css');
  app.import(app.bowerDirectory + '/semantic-ui-input/input.css');

  // Use `app.import` to add additional libraries to the generated
  // output files.
  //
  // If you need to use different assets in different
  // environments, specify an object as the first parameter. That
  // object's keys should be the environment name and the values
  // should be the asset to use in that environment.
  //
  // If the library that you are including contains AMD or ES6
  // modules that you would like to import into your application
  // please specify an object with the list of modules as keys
  // along with the exports of each module as its value.

  return app.toTree();
};
