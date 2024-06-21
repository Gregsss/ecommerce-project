<?php
header('Access-Control-Allow-Origin:*');
// header('Content-Type: application/json');
$filecontent = file_get_contents('../products.json');
$data = json_decode($filecontent,true);

foreach($data as $i){
    $array[] = array(
        'id' => $i['id'],
        'name' => $i['name'],
        'image' => $i["image"],
        'description' => $i['description'],
        'price' => $i['price'],
    );
}
echo json_encode($array);
?>