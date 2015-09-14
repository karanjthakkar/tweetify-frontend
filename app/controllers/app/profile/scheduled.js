import Ember from 'ember';

export default Ember.Controller.extend({
  user: Ember.inject.service(),
  isAccountCreatedTimeMoreThanHour: Ember.computed(function() {
    var created = this.get('user.data.created_at'),
      lastCron = this.get('user.data.last_cron_run_time');

    return (created - lastCron) > 365000;
  })
});
