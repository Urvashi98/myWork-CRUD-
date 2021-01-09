let displayForm=document.getElementById("disp");
let showData=document.getElementById("showDataonce");


window.addEventListener("load", logoutData);

// onstate

function logoutData (){
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) { 

                console.log(user);
                console.log("In Auth");
                displayForm.style.display="none";
                showData.style.display="block";
                document.getElementById("name").innerHTML = user.email;
                // window.location="home.html";
    } else {
        // No user is signed in
        console.log("In else of Auth");
    }
    });    
}

// signup
function signUp(){
    console.log("In signup");
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

                    console.log("ErrorMessage:",errorMessage);
                    document.getElementById("span").innerHTML = errorMessage
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

    firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION).then(() => {
        // firebase.auth().signInWithEmailAndPassword(getemail, getPwd)
            // .then((user) => {
            //         console.log(user);
            //     })
            //     .catch((error) => {
            //         console.log("In ELSE:")
            //     var errorCode = error.code;
            //     console.log(errorCode);
            //     var errorMessage = error.message;
            //     window.location.href = "test.html";
            // });

                // Existing and future Auth states are now persisted in the current
                // session only. Closing the window would clear any existing state even
                // if a user forgets to sign out.
                // ...
                // New sign-in will be persisted with session persistence.
                return firebase.auth().signInWithEmailAndPassword(getemail, getPwd);
              })
              .catch((error) => {
                // Handle Errors here.
                var errorCode = error.code; 
                var errorMessage = error.message;
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


