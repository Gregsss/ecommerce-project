<?php
header('Access-Control-Allow-Origin:*');

if(isset($_FILES["image"])){
    $id = $_POST["id"];
    $name = $_POST["name"];
    $description = $_POST["description"];
    $img = $_FILES["image"];
    $price = $_POST["price"];

    $path = "images/";
    $imgName = $img["name"];
    
    //Create the new filepath
    $newPath = $path.$imgName;
    move_uploaded_file( $img["tmp_name"], '../'.$newPath);
    
    //Create array
    $array = array(
        "id" => intval($id),
        "name"=> $name,
        "description"=> $description,
        "image"=> $newPath,
        "price"=> floatval($price),
    );

    //Get content of json file
    $filecontent = file_get_contents('../products.json');
    //Decode content
    $oldArray = json_decode($filecontent,true);
    //Merge the files
    array_push($oldArray, $array);
    //encode
    $jsonData = json_encode($oldArray);
    //Put the file content back to the file
    file_put_contents("../products.json", $jsonData);

    echo " Success ";
} else {
    echo " Oops ";
}

?>