import Ember from 'ember';

export default Ember.Component.extend({

  user: Ember.inject.service(),
  eventBus: Ember.inject.service(),

  currentAction: null,
  redirect: true,

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

  setup: Ember.on('init', function() {
    var initCurrentAction = this.get('initCurrentAction');
    if (initCurrentAction) {
      this.set('currentAction', initCurrentAction);
    }
  }),

  actions: {
    setTweetAction(actionType) {
      this.set('currentAction', actionType);
    },
    saveTweetAction() {
      this.get('user').saveTweetAction(this.get('currentAction')).then(() => {
        if (this.get('redirect')) {
          this.get('eventBus').publish('onboardComplete:tweet_action');
        }
      }, () => {
        alert('error saving tweet action');
      });
    }
  }
});
