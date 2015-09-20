import Ember from 'ember';

export function formatTime([timestamp]/*, hash*/) {
  return moment(timestamp).format("MMM Do YYYY, H:mm");
}

export default Ember.Helper.helper(formatTime);
