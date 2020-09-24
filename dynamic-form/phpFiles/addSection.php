<?php
require 'worksheet.php';
$data = json_decode(file_get_contents("php://input"));
if(isset($data) && !empty($data)){
  $wname = mysqli_real_escape_string($conn, $data->wname);
  $secName = mysqli_real_escape_string($conn, $data->secName);
  $layout = mysqli_real_escape_string($conn, $data->layout);
  $tableRowExpression = mysqli_real_escape_string($conn, $data->tableRowExpression);
  $var = mysqli_real_escape_string($conn, $data->var);
  $selectionOrder = mysqli_real_escape_string($conn, $data->noOfSection);
  $noOfFormFields = mysqli_real_escape_string($conn, $data->noOfFormFields);
  $noOfTableFields = mysqli_real_escape_string($conn, $data->noOfTableFields);
  $sql = "INSERT INTO section (wname,secName,layout,tableRowExpression,  var, selectionOrder, noOfFormFields,noOfTableFields) 
            VALUES ('$wname', '$secName', '$layout','$tableRowExpression' '$var', '$selectionOrder','$noOfFormFields','$noOfTableFields')";
  if ($conn->query($sql) === TRUE) {
	  echo "New record created successfully";
  } 
  else {
	  echo "Error: " . $sql . "<br>" . $conn->error;
  }
}
?>
