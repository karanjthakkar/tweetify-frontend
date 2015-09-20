import Ember from 'ember';

export default Ember.Route.extend({
  title: 'Tweetify | Dashboard',
  user: Ember.inject.service(),
  model() {
    return this.get('user').getTweets(this.get('user.data.id'));
  },
  actions: {
    queryParamsDidChange() {
      this.controllerFor('app.profile.dashboard').notifyPropertyChange('model');
    }
  }
});
