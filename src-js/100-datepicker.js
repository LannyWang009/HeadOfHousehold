// make sure that our global object "MYAPP" exists
window.MYAPP = window.MYAPP || {}

;(function () {
  // TODO: code for the header goes here

  // NOTE: this "foo" is trapped inside the anonymous function that wraps this entire file
  // it has no relation to any of the other "foo" functions
  const $ = window.jQuery
  function initDatepicker () {
    console.log('loading datepicker')

    $(function () {
      $('#datepicker').datepicker()
    })
  }

  // export the initHeader function so it may be called outside of this module
  window.MYAPP.initDatepicker = initDatepicker
})()
