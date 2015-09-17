import Ember from 'ember';

export default Ember.Service.extend({
  user: Ember.inject.service(),
  createTrackers: Ember.on('init', function(){
    ga('create', 'UA-28477787-2', 'auto');
  }),
  capturePageView: function(page){
    var pageConfig = {
      'hitType': 'pageview',
      'page': page,
      'dimension1': this.get('user.data.id')
    };
    ga('send', pageConfig);
  },
  captureEvent: function(category, action, label){
    var eventConfig = {
      'hitType': 'event',
      'eventCategory': category,
      'eventAction': action,
      'eventLabel': label,
      'dimension1': this.get('user.data.id')
    };
    ga('send', eventConfig);
  }
});
