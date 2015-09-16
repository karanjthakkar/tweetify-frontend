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
  isSaving: false,

  setup: Ember.on('init', function() {
    var initOptionValueList = this.get('initOptionValueList');

    this.setProperties({
      'optionValueList': Ember.A([]),
      'optionValueMinLimit': Constants[`MINIMUM_FAV_${this.get('optionType')}_${this.get('userType')}`],
      'optionValueMaxLimit': Constants[`MAXIMUM_FAV_${this.get('optionType')}_${this.get('userType')}`]
    });

    if (initOptionValueList) {
      let optionValueList = this.get('optionValueList');
      initOptionValueList.forEach((item) => {
        optionValueList.pushObject(item);
      });
    }
  }),

  focusOnInsert: Ember.on('didInsertElement', function() {
    if (this.get('optionType') === 'KEYWORDS' && this.get('redirect') === false) {
      return;
    }
    this.$('.js-option-value').focus();
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
        toastr.error(`Please add a minimum of ${this.get('optionValueMinLimit')} ${this.get('optionType').toLowerCase()}`);
        return;
      }

      if (this.get('isSaving')) {
        return;
      }

      var lowerCaseOption = this.get('optionType').toLowerCase(),
        saveOption = Ember.String.capitalize(lowerCaseOption);

      this.set('isSaving', true);

      this.get('user')[`saveFav${saveOption}`](this.get('optionValueList')).then(() => {
        if (this.get('redirect')) {
          this.get('eventBus').publish(`onboardComplete:fav_${lowerCaseOption}`);
        } else {
          toastr.success(`${Ember.String.capitalize(this.get('optionType').toLowerCase())} saved successfully.`);
        }
      }, () => {
        var errorMsg = 'Error saving data';
        if (error.jqXHR.status === 0) {
          errorMsg = 'You are offline.'
        }
        if (error.jqXHR.responseJSON) {
          errorMsg = error.jqXHR.responseJSON.message;
        }
        toastr.error(errorMsg);
      }).finally(() => {
        this.set('isSaving', false);
      });

    },
    checkValidity(text, event) {
      var keyCode = event.keyCode || event.which;

      if (keyCode === 13) {
        if (this.get('optionValueList.length') === this.get('optionValueMaxLimit')) {
          toastr.error(`You can only add upto ${this.get('optionValueMaxLimit')} ${this.get('optionType').toLowerCase()}`);
          return;
        }

        if (this.get('isAdding')) {
          return;
        }

        this.set('isAdding', true);

        var value = this.get('value');
        value = this.sanitizeValue(value);

        if (this.get('optionType') === 'USERS') {
          var isUsernameAlreadyPresent = this.get('optionValueList').filter((item) => {
            return item.username.toLowerCase() === value.toLowerCase();
          });
          if (isUsernameAlreadyPresent.length > 0) {
            this.set('isAdding', false);
            toastr.error('User is already in list');
            return;
          }
          this.get('user').checkUsernameValidity(value).then((response) => {
            this.get('optionValueList').pushObject(response.user);
          }, () => {
            toastr.error('This is not a valid twitter account');
          }).finally(() => {
            this.setProperties({
              'value': '',
              'isAdding': false
            });
            Ember.run.later(() => {
              this.$('.js-option-value').focus();
            }, 1);
          });
        } else {
          var isKeywordAlreadyPresent = this.get('optionValueList').filter((item) => {
            return item.keyword.toLowerCase() === value.toLowerCase();
          });
          if (isKeywordAlreadyPresent.length > 0) {
            this.set('isAdding', false);
            toastr.error('Keyword is already in list');
            return;
          }
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
      this.get('optionValueList').removeObject(value);    }
  }
});
