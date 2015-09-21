import Ember from 'ember';

export default Ember.Route.extend({
  redirect() {
    this.transitionTo('app.profile.dashboard', {
      queryParams: {
        posted: false,
        scheduled: false,
        pending: true
      }
    });
  }
});
