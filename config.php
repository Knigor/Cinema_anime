<?php
$host = '127.0.0.1';
$port = '5433';
$dbname = 'anime_2.0';
$username = 'postgres';
$password = '123';

try {
    
    $conn = new PDO("pgsql:host=$host;port=$port;dbname=$dbname;user=$username;password=$password");
    
    $conn->exec("SET NAMES UTF8");

    $sql = "SELECT * 
            from anime";
    $result = $conn->query($sql);

    
    echo json_encode($result->fetchAll(PDO::FETCH_ASSOC));


    




} catch (PDOException $e) {
    
    echo json_encode(['error' => $e->getMessage()]);
}
