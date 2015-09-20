import Ember from 'ember';

export function formatTime([timestamp]/*, hash*/) {
  return moment(timestamp).format("MMM Do YYYY, HH:mm");
}

export default Ember.Helper.helper(formatTime);
