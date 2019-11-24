
// Fucntion that creates a new document in the users collection
function createUser() {

    // if the current user logged in user
    // is authenticated, then grab "uid" "displayName" and "email"
    // use "set()" with merge (if document did not exist it will be created)
    firebase.auth().onAuthStateChanged(function(user){
        db.collection("people").doc(User.uid).set(
    	{
        "Username":user.displayName, 
         "Email":user.email,
        },{ merge: true });
    });
}