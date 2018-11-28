// make sure that our global object "MYAPP" exists
window.MYAPP = window.MYAPP || {}

;(function () {
  // NOTE: referencing "$" and "MYAPP" inside this module prevents standard from
  // yelling at us about unreferenced variables
  function initDisplay () {
    console.info('Intializing the application now.')
  }
  
})()

window.MYAPP.initDisplay = initDisplay
