<?php

    include "includes/dbh.inc.php";

    $nume = $_POST["nume"];
    $comp = $_POST["companie"];
    $tel = $_POST["telefon"];
    $email = $_POST["email"];
    $site = $_POST["website"];
    $mesaj = $_POST["mesaj"];
    
    $sql = "INSERT INTO `contact_form` (`nume`,`companie`,`telefon`,`email`,`website`,`mesaj`) VALUES ('$nume','$comp','$tel','$email','$site','$mesaj')";

    $result = mysqli_query($conn, $sql);

    if($result){
        echo "trimis";
    }
    else{
        echo "esuat";
    }



?>