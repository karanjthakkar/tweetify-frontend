import Ember from 'ember';

var rejectPromise = function() {
  return new Ember.RSVP.Promise(function(resolve, reject) {
    reject('no code');
  });
};

export default Ember.Object.extend({
  open: function(auth) {
    if (!auth.code) {
      return rejectPromise();
    }
    localStorage.setItem('token', auth.code);
    return this.get('store').find('user', localStorage.getItem('token')).then(function(user) {
      return {
        currentUser: user
      };
    });
  },

  fetch: function() {
    var token = localStorage.getItem('token');
    if (!token) {
      return rejectPromise();
    }
    return this.get('store').find('user', token).then(function(user) {
      return {
        currentUser: user
      };
    });
  },

  close: function() {
    localStorage.removeItem('token', null);
    return new Ember.RSVP.Promise(function(resolve, reject) {
      Ember.$.ajax({
        url: '//api.tweetify.io/logout',
        type: 'POST',
        success: Ember.run.bind(null, resolve),
        error: Ember.run.bind(null, reject)
      });
    });
  }
});
