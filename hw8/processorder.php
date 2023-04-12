<html>
<head>
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
</head>
<body>
<h1>Two Owls Cafe</h1>
<h2>Open 8PM to 3AM Daily</h2>
<h2>Order Summary</h2>


<?php 

echo "<p> Hello, firstname lastname <p>";

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
        $sub_tot = 0;
        while ($row = $result->fetch_assoc()) 
        {

        $cur_quan = 2; // get the quantity associated with the ID

            if ($cur_quan != 0) {
                $cur_price = round($cur_quan * $row["cost"], 2);
                $sub_tot += $cur_price;
                echo "<p>". $cur_quan. " order";
                if ($cur_quan > 1) {
                    echo "s";
                }
                echo " of ". $row["name"];
                echo ": $". $cur_price. " </p>";
            }
        }

        echo "<p> Subtotal: $". $sub_tot. ".00 </p>";
        $tax = round($sub_tot * 0.0625, 2);
        echo "<p> Tax: $". $tax. " </p>";

    }

date_default_timezone_set('America/New_York');
$d=strtotime("+15 Minutes");
echo "<p> Your order will be available for pickup on ". date("m-d", $d). " at ". date("h:i", $d). "<p> <br />" ;



?>

</body>
</html>