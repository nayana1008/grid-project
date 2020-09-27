<?php
require 'worksheet.php';
$formfields = [];
$data = json_decode(file_get_contents("php://input"));
if($data){
	$secName = mysqli_real_escape_string($conn, $data->secName);
	$sql = "SELECT * FROM formfield WHERE secName ='$secName'";
}
else{
	$sql = "SELECT * FROM formfield";
}

if($result = $conn->query($sql))
{
	$i = 0;
	while($row = $result->fetch_assoc())
	{
		$formfields[$i]['formFieldName'] = $row['formFieldName'];
		$formfields[$i]['secName'] = $row['secName'];
        $formfields[$i]['formFieldOrder'] = $row['formFieldOrder'];
        $formfields[$i]['type'] = $row['type'];
        $formfields[$i]['expression'] = $row['expression'];
        $formfields[$i]['var'] = $row['var'];
        $formfields[$i]['required'] = $row['required'];
        $formfields[$i]['validation'] = $row['validation'];
        $formfields[$i]['readOnly'] = $row['readOnly'];
		$i++;
	}
	echo json_encode($formfields);
}
else
{
	echo "Error: " . $sql . "<br>" . $conn->error;
}
?>
