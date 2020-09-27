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
    $sql = "UPDATE section SET layout='$layout',tableRowExpression='$tableRowExpression',var='$var',selectionOrder='$selectionOrder',
            noOfFormFields='$noOfFormFields',noOfTableFields='$noOfTableFields' WHERE secName = '$secName'";
  if ($conn->query($sql) === TRUE) {
	  echo "Record updated successfully";
  } else {
	  echo "Error: " . $sql . "<br>" . $conn->error;
  }
}
?>