import Ember from 'ember';

export default Ember.Component.extend({

  user: Ember.inject.service(),
  eventBus: Ember.inject.service(),

  currentAction: null,

  actionTypes: [{
    type: 'COPY',
    labelText: 'Same Content'
  }, {
    type: 'NATIVE_RT',
    labelText: 'Native Retweet'
  }, {
    type: 'TEXT_RT',
    labelText: 'Text Retweet'
  }],

  actions: {
    setTweetAction(actionType) {
      this.set('currentAction', actionType);
    },
    saveTweetAction() {
      this.get('user').saveTweetAction(this.get('currentAction')).then(() => {
        this.get('eventBus').publish('onboardComplete:tweet_action');
      }, () => {
        alert('error saving tweet action');
      });
    }
  }
});
