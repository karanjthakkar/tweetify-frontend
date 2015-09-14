import Ember from 'ember';

export default Ember.Route.extend({
  title: 'Tweetify | Posted Tweets',
  user: Ember.inject.service(),
  model() {
    return this.get('user').getPostedTweets(localStorage.getItem('token'));
  }
});
