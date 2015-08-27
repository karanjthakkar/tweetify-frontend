import DS from 'ember-data';

export default DS.RESTAdapter.extend({
  host: '//localhost:3000',
  ajax(url, method, hash) {
    hash = hash || {};
    hash.crossDomain = true;
    hash.xhrFields = { withCredentials: true };
    return this._super(url, method, hash);
  }
});
