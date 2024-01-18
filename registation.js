let back = document.getElementById("back");

back.addEventListener("click", () => {
    window.location.href = '/index.html';
});

console.log("ABOBA");

let body = document.querySelector("body");

console.log(body);


body.style.opacity = '0';

setTimeout(() => {
    body.style.opacity = '1';
}, 500);