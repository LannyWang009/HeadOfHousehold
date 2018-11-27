// make sure that our global object "MYAPP" exists
window.MYAPP = window.MYAPP || {}

// annoymous function for module purpose
;(function () {
  const firebase = require('firebase')
  // Required for side-effects
  require('firebase/firestore')

  // Initialize Firebase
  firebase.initializeApp({
    apiKey: 'AIzaSyAfOH62OimyZABipB7qopRwtbbwuNdKGaA',
    authDomain: 'headofhousehold-222605.firebaseapp.com',
    databaseURL: 'https://headofhousehold-222605.firebaseio.com',
    projectId: 'headofhousehold-222605',
    storageBucket: 'headofhousehold-222605.appspot.com',
    messagingSenderId: '672191560403'
  })

  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
    // User is signed in.

      document.getElementById('user_div').style.display = 'block'
      document.getElementById('login_div').style.display = 'none'

      user = firebase.auth().currentUser

      if (user != null) {
        var emailId = user.email
        var emailVerified = user.emailVerified

        if (emailVerified) {
          document.getElementById('verify_btn').style.display = 'none'
        } else {
          document.getElementById('verify-btn').style.display = 'block'
        }
  } else {
    // No user is signed in

        document.getElementById('user_para').innerHTML = 'Welcome user : ' + emailId +
                                                             '</br>Verified : ' + emailVerified
      }
    } else {
    // No user is signed in

      document.getElementById('user_div').style.display = 'none'
      document.getElementById('login_div').style.display = 'block'
    }
  })

  // Login function
  function login () {
    var userEmail = document.getElementById('email_field').value
    var userPass = document.getElementById('password_field').value

    firebase.auth().signInWithEmailAndPassword(userEmail, userPass).catch(function (error) {
    // Handle Error here.
      var errorCode = error.code
      var errorMessage = error.message

      window.alert('Error code is:' + errorCode + '. Error message is :' + errorMessage)

    // ...
    })
  }

  // Sign up function
  function createAccount () {
    var userEmail = document.getElementById('email_field').value
    var userPass = document.getElementById('password_field').value

    firebase.auth().createUserWithEmailAndPassword(userEmail, userPass).catch(function (error) {
    // Handle Error here.
      var errorCode = error.code
      var errorMessage = error.message

      window.alert('Error code is:' + errorCode + '. Error message is :' + errorMessage)

    // ...
    })
  }

  // Logout function
  function logout () {
    firebase.auth().signOut()
  }
  // send verification function
  function sendVerification () {
    var user = firebase.auth().currentUser
    user.sendEmailVerification().then(function () {
    // Email sent.

      window.alert('Verification Sent')
    }).catch(function (error) {
    // An error happened.

      window.alert('Error : ' + error.message)
    })
  }

  // export function so it may be called outside of this module
  window.MYAPP.login = login
  window.MYAPP.createAccount = createAccount
  window.MYAPP.logout = logout
  window.MYAPP.sendVerification = sendVerification
})()

