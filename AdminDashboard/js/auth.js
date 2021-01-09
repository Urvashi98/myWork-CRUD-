$(document).ready(function () {


    $('#login').click(function (e) { 
        e.preventDefault();
        var email = $('#email').val();
        var password= $('#password').val();
    
        if((email == 'admin') && (password == 'root')){
            window.location.href = "home-page.html";
        }else{
            alert('something went wrong!');
            $('#loginForm').trigger('reset');
         
        }
    });


  
});