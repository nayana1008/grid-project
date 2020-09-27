<?php
require 'worksheet.php';
$data = json_decode(file_get_contents("php://input"));
$tableFieldName = mysqli_real_escape_string($conn, $data->tableFieldName);
if($tableFieldName){
  $sql = "DELETE FROM tableField WHERE tableFieldName =$tableFieldName";
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