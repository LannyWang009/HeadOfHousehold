// Initialize Firebase
var config = {
  apiKey: 'AIzaSyAfOH62OimyZABipB7qopRwtbbwuNdKGaA',
  authDomain: 'headofhousehold-222605.firebaseapp.com',
  databaseURL: 'https://headofhousehold-222605.firebaseio.com',
  projectId: 'headofhousehold-222605',
  storageBucket: 'headofhousehold-222605.appspot.com',
  messagingSenderId: '672191560403'
}
firebase.initializeApp(config)


const auth = firebase.auth()
const btnLogout = document.getElementById('btnLogout')

btnLogout.addEventListener('click', e => {
  firebase.auth().signOut().then(function () {
      // Redirect to google sign out.
      window.location.assign('https://www.techbalancedhome.com');
      console.log('click logout')
  })
})

auth.onAuthStateChanged(firebaseUser => {
  if (firebaseUser) {
      console.log('logged in as: ', firebaseUser)
  } else {
      console.log('not logged in')
  }
})