import Ember from 'ember';

export function isEq([lhs, rhs]) {
  return lhs === rhs;
}

export default Ember.Helper.helper(isEq);
