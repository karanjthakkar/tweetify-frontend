import Ember from 'ember';
import Base from 'tweetify/routes/base';

export default Base.extend({
  analytics: Ember.inject.service(),
  actions: {
    footerUsernameClicked() {
      this.get('analytics').captureEvent('buttonClick', 'footerUsernameClicked');
      window.open('//twitter.com/geekykaran', '_blank');
    },
    footerContactMeClicked() {
      this.get('analytics').captureEvent('buttonClick', 'footerContactMeClicked');
      window.open('mailto:karan@tweetify.io?subject=I <3 Tweetify', '_blank');
    },
    headerFollowClicked() {
      this.get('analytics').captureEvent('buttonClick', 'headerFollowClicked');
      window.open('//twitter.com/tweetifyio', '_blank');
    },
    signInViaTwitter(type) {
      this.get('analytics').captureEvent('buttonClick', 'signInButtonClicked', type);
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
