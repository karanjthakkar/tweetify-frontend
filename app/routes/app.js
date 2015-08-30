import Ember from 'ember';
import Base from 'tweetify/routes/base';

export default Base.extend({
  actions: {
    logout: function() {
      this.get('session').close().then(() => {
        this.transitionTo('login');
      });
    }
  }
});
