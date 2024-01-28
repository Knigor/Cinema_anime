<?php

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $email = $_POST["email"];
    $login = $_POST["login"];
    $password = $_POST["password"];

    $host = '127.0.0.1';
    $port = '5433';
    $dbname = 'anime_2.0';
    $username = 'postgres';
    $password = '123';

    try {

        $currentDateTime = new DateTime();

        
        $pgsqlDate = $currentDateTime->format('Y-m-d');


        $conn = new PDO("pgsql:host=$host;port=$port;dbname=$dbname;user=$username;password=$password");

        $conn->exec("SET NAMES UTF8");

        
        $sql = "INSERT INTO \"user\" (email, id_profile, name_user, hash_password, date_registration, type_user) 
                VALUES (:email, 1, :login, :password, '$pgsqlDate', 'Regular')";

    
        $stmt = $conn->prepare($sql);
        $stmt->bindParam(':email', $email);
        $stmt->bindParam(':login', $login);
        $stmt->bindParam(':password', $password);
        

        $stmt->execute();

        header("Location: index.html");
        exit();

        echo json_encode(['success' => 'Данные успешно занесены в таблицу']);
    } catch (PDOException $e) {
        echo json_encode(['error' => $e->getMessage()]);
    }
}
