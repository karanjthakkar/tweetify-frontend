import Ember from 'ember';
import Base from 'tweetify/routes/base';

export default Base.extend({
  user: Ember.inject.service(),
  eventBus: Ember.inject.service(),
  setupEvents: Ember.on('init', function() {
    this.get('eventBus').subscribe('onboardComplete:fav_users', this, 'redirect');
  }),
  redirect() {
    if(this.get('user.data.onboard_fav_users')) {
      this.transitionTo('app.onboard.keywords');
    }
  }
});
