import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('login', {
    path: '/'
  });
  this.route('app', {
    path: 'app'
  }, function() {
    this.route('onboard', function() {
      this.route('users');
      this.route('keywords');
      this.route('action');
    });
    this.route('profile', {
      path: 'profile'
    });
  });
  this.route('notFound', {
    path: '/*path'
  });
  this.route('base');
});

export default Router;
