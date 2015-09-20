import Ember from 'ember';

export function autoLink([text, urlEntities, mediaEntities]) {
  text = twttr.txt.autoLink(text, {
    usernameIncludeSymbol: true,
    targetBlank: true,
    hashtagClass: 'tweet__link',
    urlClass: 'tweet__link',
    usernameClass: 'tweet__link',
    urlEntities: urlEntities.concat(mediaEntities)
  });
  return Ember.String.htmlSafe(text);
}

export default Ember.Helper.helper(autoLink);
