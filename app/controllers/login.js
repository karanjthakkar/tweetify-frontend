import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    scrollToAnchor(anchor) {
      Ember.$('html,body').animate({
        scrollTop: Ember.$(`[data-anchor=${anchor}]`).offset().top
      }, 'slow');
    }
  }
});
