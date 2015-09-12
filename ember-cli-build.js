/* global require, module */
var EmberApp = require('ember-cli/lib/broccoli/ember-app');

module.exports = function(defaults) {
  var app = new EmberApp(defaults, {
    // Add options here
  });

  // Semantic UI icons
  app.import(app.bowerDirectory + '/semantic/dist/themes/default/assets/fonts/icons.eot', {
    destDir: 'assets/themes/default/assets/fonts'
  });
  app.import(app.bowerDirectory + '/semantic/dist/themes/default/assets/fonts/icons.ttf', {
    destDir: 'assets/themes/default/assets/fonts'
  });
  app.import(app.bowerDirectory + '/semantic/dist/themes/default/assets/fonts/icons.woff', {
    destDir: 'assets/themes/default/assets/fonts'
  });
  app.import(app.bowerDirectory + '/semantic/dist/themes/default/assets/fonts/icons.woff2', {
    destDir: 'assets/themes/default/assets/fonts'
  });
  app.import(app.bowerDirectory + '/semantic/dist/themes/default/assets/fonts/icons.svg', {
    destDir: 'assets/themes/default/assets/fonts'
  });
  app.import(app.bowerDirectory + '/semantic/dist/semantic.js');
  app.import(app.bowerDirectory + '/nprogress/nprogress.css');
  app.import(app.bowerDirectory + '/nprogress/nprogress.js');
  app.import(app.bowerDirectory + '/numeral/numeral.js');
  app.import(app.bowerDirectory + '/moment/moment.js');
  app.import(app.bowerDirectory + '/toastr/toastr.js');
  app.import(app.bowerDirectory + '/toastr/toastr.css');
  app.import(app.bowerDirectory + '/twitter-text-js/js/twitter-text.js');

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
