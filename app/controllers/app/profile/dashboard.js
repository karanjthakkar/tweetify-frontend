import Ember from 'ember';

export default Ember.Controller.extend({
  user: Ember.inject.service(),
  analytics: Ember.inject.service(),

  queryParams: ['posted', 'scheduled', 'pending'],

  posted: true,
  scheduled: true,
  pending: true,

  filterList: Ember.computed.filter('model', function(item) {
    var posted = this.get('posted'),
      scheduled = this.get('scheduled'),
      pending = this.get('pending');

    if (posted && pending && !scheduled) {
      return item.get('posted') === true || item.get('approved') === false;
    } else if (posted && !pending && scheduled) {
      return item.get('approved') === true;
    } else if (!posted && pending && scheduled) {
      return item.get('posted') === false;
    } else if (posted && !pending && !scheduled) {
      return item.get('posted') === true;
    } else if (!posted && pending && !scheduled) {
      return item.get('approved') === false;
    } else if (!posted && !pending && scheduled) {
      return item.get('approved') === true && item.get('posted') === false;
    } else if (!posted && !pending && !scheduled) {
      return false;
    } else {
      return true;
    }

  }),

  isAccountCreatedTimeMoreThanHour: Ember.computed(function() {
    var created = this.get('user.data.created_at'),
      lastCron = this.get('user.data.last_cron_run_time');

    return (lastCron - created) > 365000;
  }),
  actions: {
    approveTweet(tweet) {
      this.get('analytics').captureEvent('buttonClick', 'approve');
      tweet.set('isApproving', true);
      this.get('user').approveTweet(tweet.get('_id')).then((response) => {
        tweet.set('approved', true);
        tweet.set('scheduled_at', response.scheduled_at);
        this.notifyPropertyChange('model');

        /* Change tweets count in local store*/
        var scheduled = this.get('user.data.total_tweets_scheduled'),
          pendingApproval = this.get('user.data.total_tweets_pending_approval');

        this.get('user.data').setProperties({
          total_tweets_scheduled: ++scheduled,
          total_tweets_pending_approval: --pendingApproval
        });

      }, (error) => {
        var errorMsg = 'Error approving tweet.';
        if (error.jqXHR.status === 0) {
          errorMsg = 'You are offline.'
        }
        if (error.jqXHR.responseJSON) {
          errorMsg = error.jqXHR.responseJSON.message;
        }
        toastr.error(errorMsg);
      }).finally(() => {
        tweet.set('isApproving', false);
      })
    },
    changeKeywordOrUsers(route, label) {
      this.get('analytics').captureEvent('buttonClick', 'changeKeywordOrUsers', label);
      this.transitionTo(route);
    },
    viewStatus(tweet, type) {
      var author = `${type === 'original' ? type + '_' : ''}tweet_author`,
        id = `${type}_tweet_id`;
      this.get('analytics').captureEvent('buttonClick', 'viewStatus', type);
      window.open(`//twitter.com/${tweet[author]}/status/${tweet[id]}`, '_blank');
    }
  }
});
