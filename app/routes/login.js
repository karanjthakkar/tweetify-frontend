import Ember from 'ember';
import Base from 'tweetify/routes/base';

export default Base.extend({
  actions: {
    signInViaTwitter: function() {
      if (this.get('session.isAuthenticated')) {
        this.transitionTo('app');
        return; // Already authenticated
      } else {
        this.get('session').open('twitter').then(() => {
          this.transitionTo('app');
        }, () => {
          this.transitionTo('login');
        });
      }
    }
  }
});
