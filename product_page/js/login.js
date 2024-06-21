//? START OF DOCUMENT READY
$(document).ready(function(){
    //START OF NORMAL LOGIN
    $("#loginAcc").click(function(event){
        event.preventDefault();
        //GET EMAIL AND PASSWORD
        var email = $('#emailVal').val();
        var password = $('#passVal').val();
        if(email !== "" && email !== " "){
            if(password !== "" && password !== " "){
                var emailforSes = email;
                //STRINGIFY THE CONTENT
                email = JSON.stringify(email);
                password = JSON.stringify(password);
                //BASE64 ENCODE THE DATA
                encodedEmail = btoa(email);
                encodedPassword = btoa(password);
        
                $.ajax({
                    type: "POST",
                    url: "http://localhost/Project/product_page/functions/validate.php",
                    data: {'email' : encodedEmail, 'password': encodedPassword},
                    success: function(data){
                            if(data == "Matched"){
                                sessionStorage.setItem("user", emailforSes);
                                window.location.replace("index.html");
                                alert("Success");
                            } else {
                                alert(data);
                            }
        
                    },
                    error: function(data){
                        if(data != "Matched"){
                            alert("An Error Occured");
                        }
                    },
                })
            } else {
                alert("Please enter your password")
            }
        } else {
            alert("Please enter your email")
        }

    })
    //END OF NORMAL LOGIN
    //START OF LOGIN AS GUEST FUNCTION
    $("#guestButton").click(function(){
        sessionStorage.setItem("user", "Guest")
        window.location.replace("index.html");
    })
    //END OF LOGIN AS GUEST
})
//? END OF DOCUMENT READY