import Ember from 'ember';

export function initialize() {
  Ember.$.ajaxSetup({
    crossDomain: true,
    xhrFields: {
      withCredentials: true
    }
  });
}

export default {
  name: 'ajax',
  initialize: initialize
};
