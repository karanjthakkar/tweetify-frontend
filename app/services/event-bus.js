import Ember from 'ember';

export default Ember.Service.extend(Ember.Evented, {
  publish() {
    return this.trigger.apply(this, arguments);
  },
  subscribe() {
    return this.on.apply(this, arguments);
  },
  subscribeAll(eventMap, context, namespace) {
    var eventPrefix = namespace ? `${namespace}:` : '';
    for (var eventName in eventMap) {
      this.subscribe(`${eventPrefix}${eventName}`, context, eventMap[eventName]);
    }
  },
  unsubscribeAll(eventMap, context, namespace) {
    var eventPrefix = namespace ? `${namespace}:` : '';
    for (var eventName in eventMap) {
      this.unsubscribe(`${eventPrefix}${eventName}`, context, eventMap[eventName]);
    }
  },
  unsubscribe() {
    return this.off.apply(this, arguments);
  }
});
