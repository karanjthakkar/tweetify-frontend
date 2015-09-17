import Ember from 'ember';

export default Ember.Component.extend({
  user: Ember.inject.service(),
  analytics: Ember.inject.service(),
  isTweetActivityOn: Ember.computed.equal('user.data.activity', 'ON'),
  isSaving: false,
  toggleTweetActivity: Ember.observer('isTweetActivityOn', function() {
    this.set('isSaving', true);
    this.get('user').saveTweetActivity(this.get('isTweetActivityOn')).then(() => {
      if (this.get('isTweetActivityOn')) {
        toastr.success('Yay! Content Sharing is now ON');
        this.set('user.data.activity', 'ON');
        this.get('analytics').captureEvent('buttonClick', 'changeTweetActivity', 'ON');
      } else {
        toastr.success('Content Sharing is now OFF');
        this.set('user.data.activity', 'OFF');
        this.get('analytics').captureEvent('buttonClick', 'changeTweetActivity', 'OFF');
      }
    }, (error) => {
      var errorMsg = 'Error saving activity';
      if (error.jqXHR.status === 0) {
        errorMsg = 'You are offline.'
      }
      if (error.jqXHR.responseJSON) {
        errorMsg = error.jqXHR.responseJSON.message;
      }
      toastr.error(errorMsg);
      this.get('analytics').captureEvent('error', 'changeTweetActivity', errorMsg);
    }).finally(() => {
      this.set('isSaving', false);
    });
  })
});
