class Rating {
  constructor(dom) {
    dom.innerHTML = '<svg width="440" height="40"></svg>';
    this.svg = dom.querySelector("svg");

    for (let i = 0; i < 10; i++) {
      this.svg.innerHTML += `<polygon data-value="${i + 1}"
           transform="translate(${i * 44},0)" 
           points="20,2 8,39.6 38,15.6 2,15.6 32,39.6">`;
    }

    this.svg.onclick = (e) => this.change(e);
    this.render();
  }

  change(e) {
    let value = e.target.dataset.value;

    value && (this.svg.parentNode.dataset.value = value);
    console.log("Выбранная звезда:", value);

    localStorage.setItem("star", value);

    this.render();
  }

  render() {
    this.svg.querySelectorAll("polygon").forEach((star) => {
      let on = +this.svg.parentNode.dataset.value >= +star.dataset.value;
      star.classList.toggle("active", on);
    });
  }
}

document.querySelectorAll(".rating").forEach((dom) => new Rating(dom));

let queryString = window.location.search;

let searchParams = new URLSearchParams(queryString);

let id = searchParams.get("id");

console.log("Это url со страницы: ", id);

localStorage.setItem("id", id);

console.log(localStorage.star);
console.log(localStorage);

let starPost = document.getElementById("starPOST");


// Отправка отзыва


let emailValue1 = document.getElementById("email-value1");

let titleAnimeValue1 = document.getElementById("titleAnime-value1");

let yearReleaseValue1 = document.getElementById("year-release1");

let pageID1 = document.getElementById("PageID1");


console.log(emailValue1)
console.log(titleAnimeValue1)
console.log(yearReleaseValue1)
console.log(pageID1)

emailValue1.value = localStorage.email;
titleAnimeValue1.value = localStorage.title_anime;
yearReleaseValue1.value = localStorage.year_release;
pageID1.value = localStorage.id










// Отправка рейтинга
starPost.addEventListener("click", () => {
  console.log(localStorage.star);

  let starValue = document.getElementById("star-value");

  starValue.value = localStorage.star;

  console.log(starValue.value);
});

async function fetchData() {
  let url = "config.php";

  let outReviewURL = "reviewConfout.php";



  try {
    let response = await fetch(url, { mode: "cors" });
    let menuItem = await response.json();





    for (let elem of menuItem) {
      if (elem.id == id) {
        
        console.log(elem.title_anime);


        let responseReview = await fetch(outReviewURL, {mode: "cors"});
        let reviewOut = await responseReview.json();


        

        for (let element of reviewOut){
          if (elem.title_anime == element.title_anime){
            console.log(element.text_review);

            let outReviews = document.getElementById("out-reviews")

            outReviews.insertAdjacentHTML("afterbegin", `
            <div class="block-reviews-user">
            <img src="img/avatarTest.png" class="block-user-avatar">

            <div class="block-right-reviews-user">
                <p class="footer-text-desc-user1">${element.email}</p>
                <p class="footer-text-desc-user2">${element.text_review}</p>
            </div>

        </div>
            `)

          }
        }


        let out = document.getElementById("out");

        

        localStorage.setItem("title_anime", elem.title_anime);
        localStorage.setItem("year_release", elem.year_release);
        

        
        let emailValue = document.getElementById("email-value");

        let titleAnimeValue = document.getElementById("titleAnime-value");

        let yearReleaseValue = document.getElementById("year-release");

        let pageID = document.getElementById("PageID");


        
        emailValue.value = localStorage.email;
        titleAnimeValue.value = localStorage.title_anime;
        yearReleaseValue.value = localStorage.year_release;
        pageID.value = localStorage.id;




        

        

        out.insertAdjacentHTML(
          "afterbegin",

          `
          <div class="header-main-desc">
          <p class="header-title-text">${elem.title_anime}</p>
          <p class="header-desc-text">${elem.discription_plot}</p>
    
          <div class="block-stars-director">
    
              <div class="average-rating">
                  <p>Средний рейтинг</p>
                  <p>9.66</p>
              </div>
    
              <div class="year-release">
                  <p>Год релиза</p>
                  <p>${elem.year_release}</p>
              </div>
    
              <div class="director-studio">
                  <p>Директор студии</p>
                  <p>${elem.director}</p>
              </div>
    
    
              <div class="studio">
                  <p>Студия</p>
                  <p>${elem.studio_manufacture}</p>
              </div>
    
          </div>
    
          <div class="view-button">
    
    
              <div class="button-block-header">
                  <div class="view-button-view">
                      <img src="/img/play.svg">
                      <p class="view-text">Просмотр</p>
    
                  </div>
    
                  <div class="view-button-reviews">
                      <p class="view-text1">Оставить отзыв</p>
                  </div>
              </div>
    
          </div>
    
    
    
      </div>
    
    
    
      <img class="header-main-right-img" src="/images/${elem.images}">
          
          `
        );
      }
    }
  } catch (error) {
    console.error("Ошибка при получении данных:", error);
  }
}

fetchData();
