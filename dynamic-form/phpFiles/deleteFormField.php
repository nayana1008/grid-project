<?php
require 'worksheet.php';
$data = json_decode(file_get_contents("php://input"));
$formFieldName = mysqli_real_escape_string($conn, $data->formFieldName);
if($formFieldName){
  $sql = "DELETE FROM formField WHERE formFieldName =$formFieldName";
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