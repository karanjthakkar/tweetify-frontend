import Ember from 'ember';
import config from 'tweetify/config/environment';
import ajax from 'ic-ajax';

export default Ember.Service.extend({

  data: null,

  setUser(user) {
    this.set('data', user);
  },

  logout() {
    return ajax({
      url: config.apiDomain + '/logout',
      type: 'POST'
    });
  },

  checkUsernameValidity(username) {
    return ajax({
      url: config.apiDomain + '/check_username',
      type: 'GET',
      data: {
        username: username
      }
    });
  },

  saveFavUsers(users) {
    this.setProperties({
      'data.fav_users': users,
      'data.onboard_fav_users': true
    });
    return ajax({
      url: config.apiDomain + '/fav_users',
      type: 'POST',
      contentType: 'application/json; charset=utf-8',
      data: JSON.stringify({
        fav_users: users.map(function(user) {
          return user.username
        })
      })
    });
  },

  saveFavKeywords(keywords) {
    this.setProperties({
      'data.fav_keywords': keywords,
      'data.onboard_fav_keywords': true
    });
    return ajax({
      url: config.apiDomain + '/fav_keywords',
      type: 'POST',
      contentType: 'application/json; charset=utf-8',
      data: JSON.stringify({
        fav_keywords: keywords.map(function(keyword) {
          return keyword.keyword;
        })
      })
    });
  },

  saveTweetAction(tweetAction) {
    this.setProperties({
      'data.tweet_action': tweetAction,
      'data.onboard_tweet_action': true
    });
    return ajax({
      url: config.apiDomain + '/tweet_action',
      type: 'POST',
      contentType: 'application/json; charset=utf-8',
      data: JSON.stringify({
        tweet_action: tweetAction
      })
    });
  },

  getScheduledTweets(id) {
    return ajax({
      url: `${config.apiDomain}/scheduled_tweets/${id}`,
      type: 'GET'
    });
  },

  getPostedTweets(id) {
    return ajax({
      url: `${config.apiDomain}/posted_tweets/${id}`,
      type: 'GET'
    });
  }
});
