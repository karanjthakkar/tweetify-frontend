import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('login', {
    path: '/'
  });
  this.route('app', {path: 'app'}, function() {
    this.route('profile', {path: 'profile'});
  });
});

export default Router;
