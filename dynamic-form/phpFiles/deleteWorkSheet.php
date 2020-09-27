<?php
require 'worksheet.php';
$data = json_decode(file_get_contents("php://input"));
$wname = mysqli_real_escape_string($conn, $data->wname);
if($wname){
  $sql = "DELETE FROM worksheet WHERE wname ='$wname'";
  if ($conn->query($sql) === TRUE) {
	  echo "Record deleted successfully";
  } 
  else {
	  echo "Error: " . $sql . "<br>" . $conn->error;
  }
}
else {
  echo "Cannot be deleted";
}
?>