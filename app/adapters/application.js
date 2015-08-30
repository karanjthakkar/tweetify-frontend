import DS from 'ember-data';
import config from 'tweetify/config/environment';

export default DS.RESTAdapter.extend({
  host: config.apiDomain,
  ajax(url, method, hash) {
    hash = hash || {};
    hash.crossDomain = true;
    hash.xhrFields = { withCredentials: true };
    return this._super(url, method, hash);
  }
});
