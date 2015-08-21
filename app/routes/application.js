import Ember from 'ember';

export default Ember.Route.extend({
  beforeModel: function() {
    var route = this;
    return this.get('session').fetch().then(function() {
      route.transitionTo('app.profile');
    }, function() {
      route.transitionTo('login');
    });
  }
});
