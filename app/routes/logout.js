import Ember from 'ember';

export default Ember.Route.extend({
  redirect() {
    this.get('session').close().finally(() => {
      this.transitionTo('login');
    });
  }
});
