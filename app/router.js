import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType,
  analytics: Ember.inject.service(),
  notifyGoogleAnalytics: Ember.on('didTransition', function() {
    this.updateTitle(); //coz the title is not updated yet!
    switch (this.get('url')) {
      case '/': this.get('analytics').capturePageView('landing');
        break;
      case '/logout': this.get('analytics').capturePageView('logout');
        break;
      case '/app/onboard/users': this.get('analytics').capturePageView('onboard-user');
        break;
      case '/app/onboard/keywords': this.get('analytics').capturePageView('onboard-keyword');
        break;
      case '/app/onboard/action': this.get('analytics').capturePageView('onboard-keyword');
        break;
      case '/app/settings': this.get('analytics').capturePageView('settings');
        break;
      case '/app/profile/posted': this.get('analytics').capturePageView('posted');
        break;
      case '/app/profile/scheduled': this.get('analytics').capturePageView('scheduled');
        break;
    }
  })
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
    }, function() {
      this.route('posted');
      this.route('scheduled');
      this.route('dashboard');
    });
    this.route('settings');
  });
  this.route('notFound', {
    path: '/*path'
  });
  this.route('logout');
});

export default Router;
