import Ember from 'ember';

export function colorScore([score]/*, hash*/) {
  var color = 'grey';
  if (score < 5) {
    color = 'teal';
  } else if (score >= 5 && score < 15) {
    color = 'olive';
  } else if (score >= 15 && score < 30) {
    color = 'green';
  } else if (score >= 30) {
    color = 'blue';
  }
  return color;
}

export default Ember.Helper.helper(colorScore);
