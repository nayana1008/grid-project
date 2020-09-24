<?php
require 'worksheet.php';
$data = json_decode(file_get_contents("php://input"));
$secName = mysqli_real_escape_string($conn, $data->secName);
if($id){
  $sql = "DELETE FROM section WHERE secName =$secName";
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