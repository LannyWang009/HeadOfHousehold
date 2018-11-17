firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        // User is signed in.
    } else {
        // No user is signed in
    }
})

// Login
function login() {
    var userEmail = document.getElementById("email_field").value
    var userPass = document.getElementById("password_field").value


}


// Sign up
// Logout
// Anonymous 
// onAuthStateChanged