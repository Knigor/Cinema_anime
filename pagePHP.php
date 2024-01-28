

<?php

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $starValue = intval($_POST["star-value"]);
    $emailValue = $_POST["email-value"];
    $titleAnimeValue = $_POST["titleAnime-value"];
    $yearRelease = intval($_POST["year-release"]);
    $pageID = $_POST["PageID"];

    // var_dump($starValue);
    // echo "<br>";
    // var_dump($emailValue);
    // echo "<br>";
    // var_dump($titleAnimeValue);
    // echo "<br>";
    // var_dump($yearRelease);
    // echo "<br>";


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


        $sql = "INSERT INTO rating_anime (email, title_anime, year_release, rating, date_rating)
        VALUES (:emailValue, :titleAnimeValue, :yearRelease, :starValue, :pgsqlDate)";

        $stmt = $conn->prepare($sql);
        $stmt->bindParam(':starValue', $starValue);
        $stmt->bindParam(':emailValue', $emailValue);
        $stmt->bindParam(':titleAnimeValue', $titleAnimeValue);
        $stmt->bindParam(':yearRelease', $yearRelease);
        $stmt->bindParam(':pgsqlDate', $pgsqlDate);

        $stmt->execute();


        header("Location: http://anime/page.html?id=$pageID");
        exit();

    } catch (PDOException $e) {
        echo json_encode(['error' => $e->getMessage()]);
    }
}
