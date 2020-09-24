<?php
require 'worksheet.php';
$data = json_decode(file_get_contents("php://input"));
if(isset($data) && !empty($data)){
  $formFieldName = mysqli_real_escape_string($conn, $data->formFieldName);
  $secName = mysqli_real_escape_string($conn, $data->secName);
  $formFieldOrder = mysqli_real_escape_string($conn, $data->formFieldOrder);
  $type = mysqli_real_escape_string($conn, $data->type);
  $var = mysqli_real_escape_string($conn, $data->var);
  $expression = mysqli_real_escape_string($conn, $data->expression);
  $required = mysqli_real_escape_string($conn, $data->required);
  $validation = mysqli_real_escape_string($conn, $data->validation);
  $readOnly = mysqli_real_escape_string($conn, $data->readOnly);
  $sql = "INSERT INTO formField (formFieldName,secName,formFieldOrder,type, var, expression, required, validation,readOnly) 
            VALUES ('$formFieldName', '$secName', '$formFieldOrder','$type' ,'$var','$expression', '$required','$validation','$readOnly')";
  if ($conn->query($sql) === TRUE) {
	  echo "New record created successfully";
  } 
  else {
	  echo "Error: " . $sql . "<br>" . $conn->error;
  }
}
?>
