import Ember from 'ember';
import { Constants } from 'tweetify/utils/constants';

export default Ember.Component.extend({

  optionType: 'KEYWORDS',
  redirect: true,

  value: '',
  optionValueList: null,

  eventBus: Ember.inject.service(),
  user: Ember.inject.service(),
  userType: Ember.computed.alias('user.data.user_type'),

  isAdding: false,

  setup: Ember.on('init', function() {

    if (!this.get('optionValueList')) {
      this.set('optionValueList', Ember.A([]));
    }

    this.setProperties({
      'optionValueMinLimit': Constants[`MINIMUM_FAV_${this.get('optionType')}_${this.get('userType')}`],
      'optionValueMaxLimit': Constants[`MAXIMUM_FAV_${this.get('optionType')}_${this.get('userType')}`]
    });
  }),

  sanitizeValue(value) {
    var length = value.length;
    if (value.charAt(0) === '@') {
      return value.slice(1, length);
    }
    return value;
  },

  actions: {
    submitFavList() {

      if (this.get('optionValueList.length') < this.get('optionValueMinLimit')) {
        return alert('Add more');
      }

      var lowerCaseOption = this.get('optionType').toLowerCase(),
        saveOption = Em.String.capitalize(lowerCaseOption);

      this.get('user')[`saveFav${saveOption}`](this.get('optionValueList')).then(() => {
        if (this.get('redirect')) {
          this.get('eventBus').publish(`onboardComplete:fav_${lowerCaseOption}`);
        }
      }, () => {
        alert('error saving fav');
      });

    },
    checkValidity() {
      var keyCode = event.keyCode || event.which;

      if (keyCode === 13) {
        if (this.get('optionValueList.length') === this.get('optionValueMaxLimit')) {
          return alert('Cannot add more');
        }

        this.set('isAdding', true);

        var value = this.get('value');
        value = this.sanitizeValue(value);

        if (this.get('optionType') === 'USERS') {
          this.get('user').checkUsernameValidity(value).then((response) => {
            this.get('optionValueList').pushObject(response.user);
            this.setProperties({
              'value': '',
              'isAdding': false
            });
            Ember.run.later(() => {
              this.$('.js-option-value').focus();
            }, 1);
          }, () => {
            alert('username not found');
          });
        } else {
          this.get('optionValueList').pushObject({
            keyword: value
          });
          this.setProperties({
            'value': '',
            'isAdding': false
          });
          Ember.run.later(() => {
            this.$('.js-option-value').focus();
          }, 1);
        }
      }
    },
    removeSpace(text, event) {
      var keyCode = event.keyCode || event.which;
      if (keyCode === 32) {
        event.preventDefault();
        return false;
      }
    },
    removeFavItem(value) {
      this.get('optionValueList').removeObject(value);
    }
  }
});
