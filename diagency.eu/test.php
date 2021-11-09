<?php

include "conn.php";

$name = $_POST['nume'];
$mesaj = $_POST['mesaj'];

$sql = mysqli_query($conn, "INSERT INTO `test`(`nume`, `mesaj`) VALUES ('$name','$mesaj')");

if($sql){
    echo "MERGE";
}
?>