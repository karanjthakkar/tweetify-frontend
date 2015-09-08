import Ember from 'ember';

export function numberHumanize([value]/*, hash*/) {
  return numeral(value).format('0[.]0a');
}

export default Ember.Helper.helper(numberHumanize);
