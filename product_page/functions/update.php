<?php
header('Access-Control-Allow-Origin:*');

if(isset($_POST["id"])){
    $id = $_POST["id"];
    $name = $_POST["name"];
    $description = $_POST["description"];
    $price = $_POST["price"];

    $id = intval($id);

    //Get content of json file
    $filecontent = file_get_contents('../products.json');
    //Decode content
    $oldArray = json_decode($filecontent,true);
    $newArray = array();

    foreach($oldArray as $product){
        if($product["id"] == $id){
            // unset($product);
            $product["id"] = $id;
            $product["name"] = $name;
            $product["description"] = $description;
            $product["price"] = $price;
            //Check if a new image is uploaded
            if(!empty($_FILES["image"])){
                unlink("../".$product["image"]);

                $img = $_FILES["image"];
                $path = "images/";
                $imgName = $img["name"];
        
                //Create the new filepath
                $newPath = $path.$imgName;
                $product["image"] = $newPath;
                move_uploaded_file( $img["tmp_name"], '../'.$newPath);
            }
        }
        $newArray[] = $product;
    }
    //Merge the files
    // array_push($oldArray, $array);
    //encode
    $jsonData = json_encode($newArray);
    //Put the file content back to the file
    file_put_contents("../products.json", $jsonData);

    echo " Success ";
} else {
    echo " Oops ";
}

?>