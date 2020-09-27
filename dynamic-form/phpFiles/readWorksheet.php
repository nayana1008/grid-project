<?php
require 'worksheet.php';
$worksheets = [];
$data = json_decode(file_get_contents("php://input"));
if($data){
	$wname = mysqli_real_escape_string($conn, $data->wname);
	$sql = "SELECT * FROM worksheet WHERE wname ='$wname'";
}
else{
	$sql = "SELECT * FROM worksheet";
}
if($result = $conn->query($sql))
{
	$i = 0;
	$count=1;
	while($row = $result->fetch_assoc())
	{
		$worksheets[$i]['wname'] = $row['wname'];
		$worksheets[$i]['type'] = $row['type'];
        $worksheets[$i]['revisionNo'] = $row['revisionNo'];
        $worksheets[$i]['var'] = $row['var'];
		$worksheets[$i]['noOfSections'] = $row['noOfSections'];
		$worksheets[$i]['no']=$count;
		$count++;
		$i++;
	}
	echo json_encode($worksheets);
}
else
{
	echo "Error: " . $sql . "<br>" . $conn->error;
}
?>
