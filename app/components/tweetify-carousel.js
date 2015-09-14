import Ember from 'ember';

export default Ember.Component.extend({
  features: [{
    title: 'STAY ACTIVE',
    text: 'We monitor your feed 24 x 7 behind the scenes and post great content every hour'
  }, {
    title: 'SHARE GREAT CONTENT',
    text: 'We find great content based on your user and keyword preferences'
  }, {
    title: 'NO SPAM',
    text: 'We only post the top tweets based on a smart algorithm that ranks tweets and filters spam'
  }, {
    title: 'SMART SCHEDULING',
    text: 'Top tweets are not posted in one go. They are scheduled over the next hour for maximum engagement.'
  }],

  initCarousel: Ember.on('didInsertElement', function() {
    var autohideTimeout,
      carousel = this.$('.home-carousel__list');

    carousel.owlCarousel({
      items: 1,
      animateOut: 'fadeOut',
      autoplay: true,
      mouseDrag: false,
      autoplayTimeout: 10000,
      loop: true,
      onInitialized: function () {
        carousel.find('.active').addClass('vis');
      },
      onTranslated: function () {
        carousel.trigger('stop.owl.autoplay');
        carousel.trigger('play.owl.autoplay');
      }
    });
  }),

  actions: {
    signInViaTwitter: function() {
      this.sendAction('signInViaTwitter');
    }
  }
});