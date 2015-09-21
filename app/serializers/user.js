import Ember from 'ember';
import DS from 'ember-data';

export default DS.JSONSerializer.extend({
  extractSingle(store, type, payload, id) {
    payload.total_tweets_scheduled = payload.total_tweets_approved - payload.total_tweets_posted;
    return payload;
  }
});
