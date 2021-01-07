firebase.auth().onAuthStateChanged(function(user) {
console.log("USer:",user);
if (user) {
    // User is signed in.
    var user1 = firebase.auth().currentUser;
    if(user1 != null){
        console.log(user.email);
        alert("Welcome:"+user.email);
        // window.location.href = "home.html"
        }   
    }
})