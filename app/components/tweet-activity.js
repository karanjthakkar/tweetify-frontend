import Ember from 'ember';

export default Ember.Component.extend({
  user: Ember.inject.service(),
  isTweetActivityOn: Ember.computed.equal('user.data.activity', 'ON'),
  isSaving: false,
  toggleTweetActivity: Ember.observer('isTweetActivityOn', function() {
    this.set('isSaving', true);
    this.get('user').saveTweetActivity(this.get('isTweetActivityOn')).then(() => {
      alert('activity saved');
    }, () => {
      alert('activity save error');
    }).finally(() => {
      this.set('isSaving', false);
    });
  })
});
