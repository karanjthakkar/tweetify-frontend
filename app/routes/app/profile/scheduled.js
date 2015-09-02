import Ember from 'ember';

export default Ember.Route.extend({
  user: Ember.inject.service(),
  model() {
    return this.get('user').getScheduledTweets(localStorage.getItem('token'));
  }
});