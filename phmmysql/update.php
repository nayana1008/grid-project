<?php
require 'index.php';
$postdata = file_get_contents('php://input');

if(isset($postdata) && !empty($postdata))
{
	$request = json_decode($postdata,true);
	if (trim($request['name']) == '' || (float)$request['price'] < 0) {
		return http_response_code(400);
	}
	$id = mysqli_real_escape_string($db, (int)$request['id']);
	$name = mysqli_real_escape_string($db, trim($request['name']));
    $location = mysqli_real_escape_string($db, trim$request['location']);
    $salary = mysqli_real_escape_string($db, (int)$request['salary']);
	$sql = "UPDATE customers SET name='$name',location='$location',salary='$salary' WHERE id = $id";
	
	if($db->query($sql))
	{
		http_response_code(204);
	}
	else
	{
		return http_response_code(422);
	}
}