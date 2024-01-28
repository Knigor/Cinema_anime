let generate = document.getElementById("generateReportBtn");

generate.addEventListener("click", (event) => {
  event.preventDefault();

  async function f1() {
    let averageRatings = {};

    let response = await fetch("ratingAnimeConfig.php", {
      method: "GET",
    });

    console.log(response);

    let result = await response.json();

    result.forEach((movie) => {
      if (!averageRatings[movie.title_anime]) {
        averageRatings[movie.title_anime] = { sum: 0, count: 0 };
      }

      averageRatings[movie.title_anime].sum += movie.rating;
      averageRatings[movie.title_anime].count += 1;
    });

    for (let title in averageRatings) {
      averageRatings[title].average =
        averageRatings[title].sum / averageRatings[title].count;
    }

    const uniqueSet = new Set();

    const uniqueResult = result.filter((item) => {
      const key = item.title_anime;

      if (!uniqueSet.has(key)) {
        uniqueSet.add(key);
        return true;
      }

      return false;
    });

    let sortRating = {};

    console.log(averageRatings);

    uniqueResult.forEach((element) => {
      if (averageRatings[element.title_anime]) {


        let averageRating = averageRatings[element.title_anime].average;

        sortRating[element.title_anime] = Number(averageRating.toFixed(2));

      }
    });

    console.log(sortRating);

    console.log(uniqueResult[0].title_anime); // Здесь мы определяем ключ

    let ratingArray = Object.entries(sortRating);

    ratingArray.sort((a, b) => b[1] - a[1]);

    let sortedRating = Object.fromEntries(ratingArray);

    console.log(sortedRating);

    localStorage.setItem("averageRating", sortRating);


    console.log(localStorage);



    for (const [anime, rating] of Object.entries(sortedRating)) {
        
        let outputPanel = document.querySelector("ol");

        let newLi = document.createElement("li");


        newLi.textContent = `${anime}: ${rating}`;

        outputPanel.appendChild(newLi);

      }
    


  }

  f1();
});



