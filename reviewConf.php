

<?php

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $reviewValue = $_POST["review-text"];
    $emailValue = $_POST["email-value"];
    $titleAnimeValue = $_POST["titleAnime-value"];
    $yearRelease = intval($_POST["year-release"]);
    $pageID = $_POST["PageID"];



    $host = '127.0.0.1';
    $port = '5433';
    $dbname = 'anime_2.0';
    $username = 'postgres';
    $password = '123';


    try {

        $currentDateTime = new DateTime();


        $pgsqlDate = $currentDateTime->format('Y-m-d');

        $conn = new PDO("pgsql:host=$host;port=$port;dbname=$dbname;user=$username;password=$password");

        $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);


        $sql = "INSERT INTO review (email, title_anime, year_release, text_review, success_moderation, date_review)
        VALUES (:emailValue, :titleAnimeValue, :yearRelease, :reviewValue, false, :pgsqlDate)";

        $stmt = $conn->prepare($sql);
        $stmt->bindParam(':emailValue', $emailValue);
        $stmt->bindParam(':titleAnimeValue', $titleAnimeValue);
        $stmt->bindParam(':yearRelease', $yearRelease);
        $stmt->bindParam(':pgsqlDate', $pgsqlDate);
        $stmt->bindParam(':reviewValue', $reviewValue);

        $stmt->execute();


        header("Location: http://anime/page.html?id=$pageID");
        exit();



    } catch (PDOException $e) {
        echo json_encode(['error' => $e->getMessage()]);
    }
}
