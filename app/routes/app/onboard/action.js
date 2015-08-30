import Ember from 'ember';
import Base from 'tweetify/routes/base';

export default Base.extend({
  user: Ember.inject.service(),
  redirect() {
    if(this.get('user.data.onboard_tweet_action')) {
      this.transitionTo('app.profile');
    }
  }
});
