<?php
require 'worksheet.php';
$data = json_decode(file_get_contents("php://input"));
if(isset($data) && !empty($data)){
  $wname = mysqli_real_escape_string($conn, $data->wname);
  $type = mysqli_real_escape_string($conn, $data->type);
  $revisionNo = mysqli_real_escape_string($conn, $data->revisionNo);
  $var = mysqli_real_escape_string($conn, $data->var);
  $noOfSections = mysqli_real_escape_string($conn, $data->noOfSections);
  $sql = "INSERT INTO worksheet (wname,  type, reviSionNo, var, noOfSections) VALUES ('$wname', '$type', '$revisionNo', '$var', '$noOfSections')";
  if ($conn->query($sql) === TRUE) {
	  echo "New record created successfully";
  } 
  else {
	  echo "Error: " . $sql . "<br>" . $conn->error;
  }
}
?>
