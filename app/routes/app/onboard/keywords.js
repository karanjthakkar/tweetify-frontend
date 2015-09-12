import Ember from 'ember';
import Base from 'tweetify/routes/base';

export default Base.extend({
  eventBus: Ember.inject.service(),
  user: Ember.inject.service(),
  setupEvents: Ember.on('activate', function() {
    this.controllerFor('app.onboard').set('activeRoute', 'keywords');
    this.get('eventBus').subscribe('onboardComplete:fav_keywords', this, 'redirect');
  }),
  teardownEvents: Ember.on('deactivate', function() {
    this.get('eventBus').unsubscribe('onboardComplete:fav_keywords', this, 'redirect');
  }),
  redirect() {
    if(this.get('user.data.onboard_fav_keywords')) {
      this.transitionTo('app.onboard.action');
    }
  }
});
