import Ember from 'ember';

export default Ember.Controller.extend({
  user: Ember.inject.service(),
  analytics: Ember.inject.service(),
  isAnalysedOnce: Ember.computed.gt('user.data.total_tweets_analysed', 0),
  isPostedOnce: Ember.computed.gt('user.data.total_tweets_posted', 0),
  isAccountCreatedTimeMoreThanHour: Ember.computed(function() {
    var created = this.get('user.data.created_at'),
      lastCron = this.get('user.data.last_cron_run_time');

    return (lastCron - created) > 365000;
  }),
  actions: {
    checkThemOut() {
      this.get('analytics').captureEvent('buttonClick', 'checkThemOut');
    },
    changeKeywordOrUsers(route, label) {
      this.get('analytics').captureEvent('buttonClick', 'changeKeywordOrUsers', label);
      this.transitionTo(route);
    },
    viewStatus(scheduledTweet) {
      this.get('analytics').captureEvent('buttonClick', 'viewStatus', 'original');
      window.open(`//twitter.com/${scheduledTweet.original_tweet_author}/status/${scheduledTweet.posted_tweet_id}`, '_blank');
    }
  }
});
