<?php
header('Access-Control-Allow-Origin:*');

if(isset($_POST["id"])){
    $id = $_POST["id"];
    //Get content of json file
    $filecontent = file_get_contents('../products.json');
    //Decode content
    $oldArray = json_decode($filecontent,true);
    //Remove the array
    unset($oldArray[intval($id) - 1]);
    $newArray = array();
    $i = 0;
    //Loop through each array in $oldArray and replace the id's with the new list length id
    foreach ($oldArray as $key => $value) {
        $newArray[] = array(
            'id' => $i++,
            'name' => $value["name"],
            'description' => $value["description"],
            'image' => $value["image"],
            'price' => $value["price"],
        );
    }
    //encode
    $jsonData = json_encode($newArray);
    //Put the file content back to the file
    file_put_contents("../products.json", $jsonData);
}
?>