import Ember from 'ember';
import Base from 'tweetify/routes/base';

export default Base.extend({
  user: Ember.inject.service(),
  eventBus: Ember.inject.service(),
  setupEvents: Ember.on('activate', function() {
    this.controllerFor('app.onboard').set('activeRoute', 'action');
    this.get('eventBus').subscribe('onboardComplete:tweet_action', this, 'redirect');
  }),
  teardownEvents: Ember.on('deactivate', function() {
    this.get('eventBus').subscribe('onboardComplete:tweet_action', this, 'redirect');
  }),
  redirect() {
    if(this.get('user.data.onboard_tweet_action')) {
      this.transitionTo('app.profile');
    }
  }
});
