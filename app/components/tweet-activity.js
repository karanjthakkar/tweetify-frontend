import Ember from 'ember';

export default Ember.Component.extend({
  user: Ember.inject.service(),
  isTweetActivityOn: Ember.computed.equal('user.data.activity', 'ON'),
  isSaving: false,
  toggleTweetActivity: Ember.observer('isTweetActivityOn', function() {
    this.set('isSaving', true);
    this.get('user').saveTweetActivity(this.get('isTweetActivityOn')).then(() => {
      toastr.success('Activity saved successfully');
      if (this.get('isTweetActivityOn')) {
        this.set('user.data.activity', 'ON');
      } else {
        this.set('user.data.activity', 'OFF');
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
    }).finally(() => {
      this.set('isSaving', false);
    });
  })
});
