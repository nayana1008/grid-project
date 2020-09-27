<?php
require 'worksheet.php';
$data = json_decode(file_get_contents("php://input"));
if(isset($data) && !empty($data)){
    $tableFieldName = mysqli_real_escape_string($conn, $data->tableFieldName);
    $secName = mysqli_real_escape_string($conn, $data->secName);
    $tableFieldOrder = mysqli_real_escape_string($conn, $data->tableFieldOrder);
    $type = mysqli_real_escape_string($conn, $data->type);
    $var = mysqli_real_escape_string($conn, $data->var);
    $expression = mysqli_real_escape_string($conn, $data->expression);
    $required = mysqli_real_escape_string($conn, $data->required);
    $validation = mysqli_real_escape_string($conn, $data->validation);
    $readOnly = mysqli_real_escape_string($conn, $data->readOnly);
  $sql = "UPDATE tableField SET secName='$secName',tableFieldOrder='$tableFieldOrder',type='$type',var='$var',expression='$expression',
            required='$required',validation='$validation',readOnly='$readOnly' WHERE tableFieldName = '$tableFieldName'";
  if ($conn->query($sql) === TRUE) {
	  echo "Record updated successfully";
  } else {
	  echo "Error: " . $sql . "<br>" . $conn->error;
  }
}
?>