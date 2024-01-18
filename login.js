let registration = document.getElementById("registration")
let login = document.getElementById("login")
let back = document.getElementById("back")

back.addEventListener("click", () => {
    window.location.href = '/index.html';
});

console.log("ABOBA");

// Получение данных из PHP

async function fetchDataLogin() {

    try {

        let url = 'login.php';
        let response = await fetch(url);
        let userData = await response.json();

        let email = document.getElementById("email");
        let password = document.getElementById("password");

        login.addEventListener("click", (event) => {
            event.preventDefault();
            console.log("НАЖАТИЕ");

            console.log("Пользовательский ввод: ", email.value);
            console.log("Пользовательский ввод: ", password.value);

            let redirect = false;

            userData.forEach(item => {
                console.log(item.email);
                console.log(item.hash_password);

                if (item.email == email.value && item.hash_password == password.value) {
                    console.log("YES")
                    redirect = true
                } else {
                    console.log("NO")
                    redirect = false
                }

            });

            redirect ? window.location.href = '/index.html' : alert("Неправильно введен логин или пароль");

        });

    } catch (error) {
        console.log("Ошибка получения данных: ", error);
    }

}

fetchDataLogin();

let body = document.querySelector("body");

console.log(body);


body.style.opacity = '0';

setTimeout(() => {
    body.style.opacity = '1';
}, 500);