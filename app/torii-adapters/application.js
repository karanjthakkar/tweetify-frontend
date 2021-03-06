import Ember from 'ember';

var rejectPromise = function() {
  return new Ember.RSVP.Promise(function(resolve, reject) {
    reject('no code');
  });
};

export default Ember.Object.extend({

  user: Ember.inject.service(),

  open(auth) {
    if (!auth.code) {
      return rejectPromise();
    }
    localStorage.setItem('token', auth.code);
    return this.get('store').find('user', localStorage.getItem('token')).then((user) => {
      this.get('user').setUser(user);
      return {
        currentUser: user
      };
    });
  },

  fetch() {
    var token = localStorage.getItem('token');
    if (!token) {
      return rejectPromise();
    }
    return this.get('store').find('user', token).then((user) => {
      this.get('user').setUser(user);
      return {
        currentUser: user
      };
    });
  },

  close() {}
});
