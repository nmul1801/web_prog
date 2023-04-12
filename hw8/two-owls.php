<!doctype html>
<html>
<head>
<script src="https://code.jquery.com/jquery-3.6.4.js" integrity="sha256-a9jBBRygX1Bh5lt8GZjXDzyOB+bWve9EiO7tROUtj/E=" crossorigin="anonymous"></script>
<meta charset="utf-8">
<title>Two Owls</title>
<style type='text/css'>
	html,body {font-size: 20px;}
    td {padding: 10px 20px; width: auto}
    #pg-content {display: block; width: 80vw; margin: 20px auto;}
    table,form{margin: auto; width: 100%;}
    h1,h2,p,#btn-container {text-align: center}
    button {width: 150px; height: 30px; margin-top: 20px; font-size: 20px;}
    select {width: 100px; text-align: center;}
    input.name-info {float: right; width: 100px;}
    form {width: 40vw;}
    label.name {margin-top: 10px;}
    .info-ctn {margin: 10px;}
    #instruction {width: 100%; height: 100px; text-align: center;}
    #top-row {font-weight: bold;}
</style>
<script src="script.js"></script>
</head>

<body>
<div id="pg-content">
<h1>Two Owls Cafe</h1>
<h2>Open 8PM to 3AM Daily</h2>

<form name="order-form" action='processorder.php' method='get'>

<table>  
<tr id="top-row"> <td>Quantity</td> <td>Item</td> <td>Price</td> </tr>

<?php
function gen_options($max) {
    $i = 0;
    $out = "";
    while ($i <= 10) {
        $out .= "<option>". $i++. "</option>";
    }

    return $out;
}

function make_tr($id, $name, $price, $img) {
    echo "<td> 
    <select name=quan". $id. " id=quan". $id. ">". gen_options(10). 
    "<td>". $name. "</td>". 
    "<td> $". $price. "</td> 
    <td> <img src=". $img. " width='100'> </td>";
}

//establish connection info
$server = "localhost";
$userid = "root";
$pw = "Nickmax2000";
$db= "new_schema";

$conn = new mysqli($server, $userid, $pw);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
    }

    //select the database
    $conn->select_db($db);

    $sql = "SELECT * FROM menu_items";
    $result = $conn->query($sql);

    if ($result->num_rows > 0) 
    {
        while($row = $result->fetch_assoc()) 
       {
        $id = $row["item_id"];
        $name = $row["name"];
        $cost = $row["cost"];
        $img = $row["img_url"];

        make_tr($id, $name, $cost, $img);
        echo "<tr>";  
        echo "</tr>";  
       }
    }
?>


</table>

<div class="info-ctn">
    <label class="name">First Name*:</label><input class="name-info" type="text" name='fname'/> 
</div>

<div class="info-ctn">
    <label class="name">Last Name*:</label><input class="name-info" type="text" name='lname'/> 
</div>

<p style="margin:auto; text-align: center;">Instruction:</p> <br />
<input type="text" id="instruction" name='instruction'/>

<div id="btn-container"> <input type="submit" value="Submit Order" onclick="return validate_order()"></input> </div>

</form>

</div>
</body>
</html>