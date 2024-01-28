


let login = document.getElementById("login");

let registration = document.getElementById("registration");

let outLogin = document.getElementById("out-login")


login.addEventListener("click", ()=>{
  window.location.href = '/login.html';
})

registration.addEventListener("click", ()=>{
  window.location.href = '/registration.html';
})

outLogin.addEventListener("click", () =>{
  localStorage.clear();
  window.location.href = '/';
})






let loader = document.getElementById("loader");
let header = document.querySelector("header");
let main = document.querySelector("main");
let footer = document.querySelector("footer");
let cardBlock = document.getElementById("cardBlock")







console.log(cardBlock);
console.log(main);

header.style.opacity = '0';
main.style.opacity = '0';
footer.style.opacity = '0';
cardBlock.style.opacity = '0';



setTimeout(() => {
  
  header.style.opacity = '1';
  main.style.opacity = '1';
  footer.style.opacity = '1';
  cardBlock.style.opacity = '1';



  setTimeout(() => {
    loader.style.display = 'none';
  }, 2);
}, 500);



// Карточки






// Подключение к PHP конфигу FETCH




async function fetchData() {
  let url = 'config.php';

  
  try {
      let response = await fetch(url, { mode: 'cors' });
      let menuItem = await response.json();

      let cardItem = '';

      let out = document.getElementById('out');
      menuItem.forEach((menu) => {
        
        cardItem +=
        `
        <a href="page.html?id=${menu.id}">  <div class="card">
          <img class="card-img-top" src="/images/${menu.images}">  
            <div class="card-body">
              <h4 class="card-title">${menu.title_anime}</h4>

              <div class="container">
                <div class="row">
                  <div class="col-sm-4 metadata">
                    <p>Студия: <span>${menu.studio_manufacture}</span></p>
                  </div>
                  <div class="">Директор студии:<span> ${menu.director}</span></div>
                </div>
              </div>
             

              <p class="card-text"><span>${menu.discription_plot}</span></p>
            </div>
          </div> </a>   
        `;
      });


      out.insertAdjacentHTML('afterbegin', cardItem);



  } catch (error) {
      console.error('Ошибка при получении данных:', error);
  }
}

fetchData();


// Скрываем Админ панель


outLogin.style.display = 'none';

if (localStorage.length >= 1){
  outLogin.style.display = 'initial';
}



console.log(localStorage);

let adminView = document.getElementById("admin-panel");

console.log(adminView);

adminView.style.display = 'none';


if (localStorage.role == "Moderator"){
  adminView.style.display = 'initial';
}


