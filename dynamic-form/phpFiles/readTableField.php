<?php
require 'worksheet.php';
$tablefields = [];
$data = json_decode(file_get_contents("php://input"));
if($data){
	$secName = mysqli_real_escape_string($conn, $data->secName);
	$sql = "SELECT * FROM tablefield WHERE secName ='$secName'";
}
else{
	$sql = "SELECT * FROM tablefield";
}

if($result = $conn->query($sql))
{
	$i = 0;
	while($row = $result->fetch_assoc())
	{
		$tablefields[$i]['tableFieldName'] = $row['tableFieldName'];
		$tablefields[$i]['secName'] = $row['secName'];
        $tablefields[$i]['tableFieldOrder'] = $row['tableFieldOrder'];
        $tablefields[$i]['type'] = $row['type'];
        $tablefields[$i]['expression'] = $row['expression'];
        $tablefields[$i]['var'] = $row['var'];
        $tablefields[$i]['required'] = $row['required'];
        $tablefields[$i]['validation'] = $row['validation'];
        $tablefields[$i]['readOnly'] = $row['readOnly'];
		$i++;
	}
	echo json_encode($tablefields);
}
else
{
	echo "Error: " . $sql . "<br>" . $conn->error;
}
?>
