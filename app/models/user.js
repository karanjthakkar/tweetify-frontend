import DS from 'ember-data';

export default DS.Model.extend({
  username: DS.attr('string'),
  description: DS.attr('string'),
  followers: DS.attr('string'),
  favorites: DS.attr('string'),
  statuses: DS.attr('string')
});
