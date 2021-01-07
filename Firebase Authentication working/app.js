// onstate
firebase.auth().onAuthStateChanged(function(user) {
    console.log("USer:",user);
    if (user) {
    var userId = firebase.auth().currentUser.uid;     // User is signed in.
    console.log("UserId",userId);
        if(userId != null){
        // console.log(userId);

        // firebase.database().ref('Users/'+ userId).once('value').then(function(snapshot) {  
        //     if(snapshot.val()){
        //         console.log("In snapshot"); 
        //         window.location.href = "updateForm.html"
        //     }
        //     else{
        //         console.log("In once again else");
        //     }
        // })
        alert("Welcome:"+user.email);
        window.location.href = "updateForm.html"
    }   
} else {
    // No user is signed in
    console.log("In else");
}
}); 

// signup
function signUp(){
    
    email = document.getElementById("email").value;
    password = document.getElementById("pwd").value;
    confirmPassword = document.getElementById("cnfpwd").value;

    if(email != "" && password!= "" && confirmPassword!= ""){
        if(password == confirmPassword){
            firebase.auth().createUserWithEmailAndPassword(email, password)
                .then((user) => {
                    // Signed in 
                    alert("Signed Up");
                    // window.location.href = "home.html"
                })
                .catch((error) => {
                    var errorCode = error.code;
                    var errorMessage = error.message;
                    // ..
            });
        }
    }
}


// login
function login(){
    console.log("Login");
    getemail = document.getElementById("email").value;
    getPwd = document.getElementById("pwd").value;

        firebase.auth().signInWithEmailAndPassword(getemail, getPwd)
            .then((user) => {
                    console.log(user);
                })
                .catch((error) => {
                    console.log("In ELSE:")
                var errorCode = error.code;
                console.log(errorCode);
                var errorMessage = error.message;
                window.location.href = "test.html";
            });
            document.getElementById("myForm").reset();
}

function logout(){
    firebase.auth().signOut().then(() => {
        // Sign-out successful.
        alert("Logout");
        window.location.href="test.html";
      }).catch((error) => {
        // An error happened.
      });
}

function update(){
    fname = document.getElementById("fname").value;
    mobile = document.getElementById("mobile").value;

    let rootRef = firebase.database().ref("Users");
    console.log("rootRed",rootRef);
    let userId= firebase.auth().currentUser.uid;
    console.log("CurrentUser:",userId);
    let userRef = rootRef.child(userId);

    if(fname != "" && mobile!= ""){
        let userData = {
            "Name":fname,
            "phone":mobile
        }
    }
    userRef.set(userData,function(){
        if(error){
            var errorCode = error.code;
            var errorMessage = error.message;
        }
    })
}


