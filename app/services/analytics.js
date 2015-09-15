import Ember from 'ember';

export default Ember.Service.extend({
  createTrackers: Ember.on('init', function(){
    ga('create', 'UA-28477787-2', 'auto');
  }),
  capturePageView: function(page){
    var eventConfig = {
      'hitType': 'pageview',
      'page': page
    };
    ga('send', eventConfig);
  },
  captureEvent: function(action){
    var eventConfig = {
      'hitType': 'event',
      'eventAction': action,
    };
    ga('send', eventConfig);
  }
});
