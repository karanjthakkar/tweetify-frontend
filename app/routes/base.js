import Ember from 'ember';

export default Ember.Route.extend({
  beforeModel: function() {
    var route = this;
    if (this.get('session.isAuthenticated')) {
      return; // Already authenticated
    }
    return this.get('session').fetch().then(function() {
      route.transitionTo('app');
    }, function() {
      route.transitionTo('login');
    });
  }
});
