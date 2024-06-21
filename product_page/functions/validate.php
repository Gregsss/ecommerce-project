<?php
header('Access-Control-Allow-Origin:*');

//ENSURE DATA HAS VALUE
if(isset($_POST["email"])){
    if(isset($_POST["password"])){
        //GET THE DATE
        $email = $_POST['email'];
        $password = $_POST['password'];

        //BASE64 DECODE
        $email = base64_decode($email);
        $password = base64_decode($password);
        
        //JSONDECODE
        $email = json_decode($email);
        $password = json_decode($password);

        //GET THE JSON FILE CONTENT
        $filecontent = file_get_contents('../users.json');
        //DECODE THE FILE CONTENT
        $oldArray = json_decode($filecontent,true);

        //LOOP THROUGH THE ARRAY
        foreach ($oldArray as $login) {
            //CHECK IF EMAIL ADDRESSES MATCH
            if($login["emial"] == $email){
                //CHECK IF PASSWORDS MATCH
                if($login["password"] == $password){
                    echo "Matched";
                } else {
                    echo "No Match";
                }
            } else {
                echo "No Matches";
            }
        }

    }
}
?>