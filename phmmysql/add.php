<?php
include 'index.php';
$postdata = file_get_contents("php://input");
if(isset($postdata) && !empty($postdata))
{
	$request = json_decode($postdata,true);
	$id = mysqli_real_escape_string($db, (int)$request['id']);
	$name = mysqli_real_escape_string($db, trim($request['name']));
	$location = mysqli_real_escape_string($db, trim($request['location']));
	$salary = mysqli_real_escape_string($db, (int)$request['salary']);
	$sql = "INSERT INTO customers (id,name,price) VALUES ($id,'$name',$location,$salary)";
	if($db->query($sql))
	{
		http_response_code(201);
		$customer = [
        'id' => $id,
        'name' => $name,
        'location' => $location,
        'salary'=>$salary];
		echo json_encode($customer);
	}
	else
	{
		http_response_code(422);
	}
}
