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

  approveTweet(id) {
    return ajax({
      url: `${config.apiDomain}/approve/${id}`,
      type: 'POST'
    });
  },

  checkUsernameValidity(username) {
    return new Ember.RSVP.Promise(function(resolve, reject) {
      ajax({
        url: config.apiDomain + '/check_username',
        type: 'GET',
        data: {
          username: username
        }
      }).then(function(response) {
        resolve(response);
      }, function(response) {
        reject(response);
      })
    });
  },

  saveFavUsers(users) {
    this.setProperties({
      'data.fav_users': users,
      'data.onboard_fav_users': true
    });
    NProgress.start();
    return new Ember.RSVP.Promise(function(resolve, reject) {
      ajax({
        url: config.apiDomain + '/fav_users',
        type: 'POST',
        contentType: 'application/json; charset=utf-8',
        data: JSON.stringify({
          fav_users: users.map(function(user) {
            return {
              username: user.username,
              name: user.name,
              profile_image_url: user.profile_image_url
            };
          })
        })
      }).then(function(response) {
        resolve(response);
      }, function(response) {
        reject(response);
      }).finally(function() {
        NProgress.done();
      });
    });
  },

  saveFavKeywords(keywords) {
    this.setProperties({
      'data.fav_keywords': keywords,
      'data.onboard_fav_keywords': true
    });
    NProgress.start();
    return new Ember.RSVP.Promise(function(resolve, reject) {
      ajax({
        url: config.apiDomain + '/fav_keywords',
        type: 'POST',
        contentType: 'application/json; charset=utf-8',
        data: JSON.stringify({
          fav_keywords: keywords.map(function(keyword) {
            return {
              keyword: keyword.keyword
            };
          })
        })
      }).then(function(response) {
        resolve(response);
      }, function(response) {
        reject(response);
      }).finally(function() {
        NProgress.done();
      });
    });
  },

  saveTweetAction(tweetAction) {
    this.setProperties({
      'data.tweet_action': tweetAction,
      'data.onboard_tweet_action': true
    });
    NProgress.start();
    return new Ember.RSVP.Promise(function(resolve, reject) {
      ajax({
        url: config.apiDomain + '/tweet_action',
        type: 'POST',
        contentType: 'application/json; charset=utf-8',
        data: JSON.stringify({
          tweet_action: tweetAction
        })
      }).then(function(response) {
        resolve(response);
      }, function(response) {
        reject(response);
      }).finally(function() {
        NProgress.done();
      });
    });
  },

  getTweets(id) {
    NProgress.start();
    return new Ember.RSVP.Promise(function(resolve, reject) {
      ajax({
        url: `${config.apiDomain}/tweets/${id}`,
        type: 'GET'
      }).then(function(response) {
        var data = response.map(function(item) {
          return Ember.Object.create(item);
        });
        resolve(data);
      }, function(response) {
        reject(response);
      }).finally(function() {
        NProgress.done();
      });
    });
  },

  saveTweetActivity(isActivityOn) {
    var activity = isActivityOn === true ? 'ON' : 'OFF';
    NProgress.start();
    return new Ember.RSVP.Promise(function(resolve, reject) {
      ajax({
        url: config.apiDomain + '/activity',
        type: 'POST',
        contentType: 'application/json; charset=utf-8',
        data: JSON.stringify({
          activity: activity
        })
      }).then(function(response) {
        resolve(response);
      }, function(response) {
        reject(response);
      }).finally(function() {
        NProgress.done();
      });
    });
  }
});
