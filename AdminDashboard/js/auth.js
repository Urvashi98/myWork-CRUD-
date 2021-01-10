$(document).ready(function () {


    $('#login').click(function (e) { 

        e.preventDefault();
        var email = $('#email').val();
        var password= $('#password').val();
    
        if((email == 'admin') && (password == 'root')){ //static password and name

            localStorage.setItem('loggedIn',"true");    //set the login status
            window.location.href = "dashboard.html";

        }else{

            alert('something went wrong!');
            $('#loginForm').trigger('reset'); 
        }
    });

    $('.logout').click(function (e) { 
        e.preventDefault();
        localStorage.setItem('loggedIn',"false");   //reset the login status to false
        window.location.href = "index.html";
    });


  
});