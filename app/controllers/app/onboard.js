import Ember from 'ember';

export default Ember.Controller.extend({
  user: Ember.inject.service(),
  isFavUsersDone: Ember.computed.equal('user.data.onboard_fav_users', true),
  isFavKeywordsDone: Ember.computed.equal('user.data.onboard_fav_keywords', true),
  isTweetActionDone: Ember.computed.equal('user.data.onboard_tweet_action', true)
});
