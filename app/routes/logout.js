import Ember from 'ember';

export default Ember.Route.extend({
  user: Ember.inject.service(),
  redirect() {
    if (this.get('session.isAuthenticated')) {
      this.get('session').close();
    }
    localStorage.removeItem('token', null);
    this.get('user').logout().finally(() => {
      this.transitionTo('login');
    });
  }
});
