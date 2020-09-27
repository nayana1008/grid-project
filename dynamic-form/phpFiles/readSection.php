<?php
require 'worksheet.php';
$sections = [];
$data = json_decode(file_get_contents("php://input"));
if($data){
	$wname = mysqli_real_escape_string($conn, $data->wname);
	$sql = "SELECT * FROM section WHERE wname ='$wname'";
}
else{
	$sql = "SELECT * FROM section";
}
if($result = $conn->query($sql))
{
	$i = 0;
	while($row = $result->fetch_assoc())
	{
		$sections[$i]['wname'] = $row['wname'];
		$sections[$i]['secName'] = $row['secName'];
        $sections[$i]['layout'] = $row['layout'];
        $sections[$i]['var'] = $row['var'];
        $sections[$i]['selectionOrder'] = $row['selectionOrder'];
        $sections[$i]['noOfFormFields'] = $row['noOfFormFields'];
        $sections[$i]['noOfTableFields'] = $row['noOfTableFields'];
		$i++;
	}
	echo json_encode($sections);
}
else
{
	echo "Error: " . $sql . "<br>" . $conn->error;
}
?>
