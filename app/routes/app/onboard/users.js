import Ember from 'ember';
import Base from 'tweetify/routes/base';

export default Base.extend({
  user: Ember.inject.service(),
  eventBus: Ember.inject.service(),
  setupEvents: Ember.on('activate', function() {
    this.controllerFor('app.onboard').set('activeRoute', 'users');
    this.get('eventBus').subscribe('onboardComplete:fav_users', this, 'redirect');
  }),
  teardownEvents: Ember.on('deactivate', function() {
    this.get('eventBus').unsubscribe('onboardComplete:fav_users', this, 'redirect');
  }),
  redirect() {
    if(this.get('user.data.onboard_fav_users')) {
      this.transitionTo('app.onboard.keywords');
    }
  }
});
