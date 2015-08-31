import Ember from 'ember';

export default Ember.Route.extend({
  beforeModel: function() {
    if (this.get('session.isAuthenticated')) {
      return; // Already authenticated
    }
    return this.get('session').fetch().then(() => {
      if (this.routeName !== 'app.settings' && this.routeName !== 'app.profile') {
        this.transitionTo('app');
      }
    }, () => {
      this.transitionTo('login');
    });
  }
});
