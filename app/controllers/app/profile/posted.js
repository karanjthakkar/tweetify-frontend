import Ember from 'ember';

export default Ember.Controller.extend({
  user: Ember.inject.service(),
  analytics: Ember.inject.service(),
  isAccountCreatedTimeMoreThanHour: Ember.computed(function() {
    var created = this.get('user.data.created_at'),
      lastCron = this.get('user.data.last_cron_run_time');

    return (lastCron - created) > 365000;
  }),
  actions: {
    changeKeywordOrUsers(route, label) {
      this.get('analytics').captureEvent('buttonClick', 'changeKeywordOrUsers', label);
      this.transitionTo(route);
    },
    viewStatus(postedTweet) {
      this.get('analytics').captureEvent('buttonClick', 'viewStatus', 'posted');
      window.open(`//twitter.com/${postedTweet.original_tweet_author}/status/${postedTweet.posted_tweet_id}`, '_blank');
    }
  }
});
