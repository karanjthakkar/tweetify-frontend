import Ember from 'ember';

export function formatTime([timestamp]/*, hash*/) {
  return moment(timestamp).format('MMMM Do YYYY, h:mm:ss a');
}

export default Ember.Helper.helper(formatTime);
