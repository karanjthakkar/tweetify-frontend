export function initialize(/* container, application */) {
  toastr.options = {
    "closeButton": true,
    "debug": false,
    "newestOnTop": true,
    "positionClass": "toast-top-center",
    "showDuration": "300",
    "hideDuration": "300",
    "timeOut": "1500",
    "extendedTimeOut": "100",
    "preventDuplicates": true
  };
}

export default {
  name: 'toastr',
  initialize: initialize
};
