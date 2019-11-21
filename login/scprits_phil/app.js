// ---------------------------------------------
// If the currently logged in user is authenticated,
// then signout this person "user".
// ---------------------------------------------
function logoutUser() {
  firebase.auth().onAuthStateChanged(function (user) {
    var promise = firebase.auth().signOut();
    promise.then(function () {
      //alert("logged out");
    });
  });
}

// ---------------------------------------------
// If the currently logged in user is authenticated,
// then show the person's name in the header (id="name")
// ---------------------------------------------
function showName() {
  firebase.auth().onAuthStateChanged(function (user) {
    console.log(user);
    document.getElementById("you").innerHTML = user.displayName;
  });
}