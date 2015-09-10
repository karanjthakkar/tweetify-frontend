import Ember from 'ember';

export function autoLink([text]) {
  text = twttr.txt.autoLink(text, {
    usernameIncludeSymbol: true,
    targetBlank: true,
    urlClass: 'tweet__link',
    usernameClass: 'tweet__link'
  });
  return Ember.String.htmlSafe(text);
}

export default Ember.Helper.helper(autoLink);
