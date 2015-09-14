import DS from 'ember-data';

export default DS.Model.extend({
  description: DS.attr(),
  name: DS.attr(),
  username: DS.attr(),
  followers: DS.attr(),
  following: DS.attr(),
  profile_image_url: DS.attr(),
  profile_banner_url: DS.attr(),
  created_at: DS.attr(),
  last_cron_run_time: DS.attr(),
  total_tweets_posted: DS.attr(),
  total_tweets_scheduled: DS.attr(),
  total_tweets_analysed: DS.attr(),
  tweet_action: DS.attr(),
  fav_keywords: DS.attr(),
  fav_users: DS.attr(),
  user_type: DS.attr(),
  activity: DS.attr(),
  onboard_fav_users: DS.attr(),
  onboard_fav_keywords: DS.attr(),
  onboard_tweet_action: DS.attr()
});
