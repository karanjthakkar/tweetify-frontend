import Ember from 'ember';

export default Ember.Component.extend({

  user: Ember.inject.service(),
  eventBus: Ember.inject.service(),

  currentAction: null,
  redirect: true,

  isSaving: false,

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

      if (this.get('isSaving')) {
        return;
      }

      this.set('isSaving', true);

      this.get('user').saveTweetAction(this.get('currentAction')).then(() => {
        if (this.get('redirect')) {
          this.get('eventBus').publish('onboardComplete:tweet_action');
        } else {
          toastr.success(`Tweet action saved successfully.`);
        }
      }, () => {
        var errorMsg = 'Error saving tweet action';
        if (error.jqXHR.status === 0) {
          errorMsg = 'You are offline.'
        }
        if (error.jqXHR.responseJSON) {
          errorMsg = error.jqXHR.responseJSON.message;
        }
        toastr.error(errorMsg);
      }).finally(() => {
        this.set('isSaving', false);
      });
    }
  }
});
