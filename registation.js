let back = document.getElementById("back");

back.addEventListener("click", () => {
  window.location.href = "/index.html";
});

let body = document.querySelector("body");

console.log(body);

body.style.opacity = "0";

setTimeout(() => {
  body.style.opacity = "1";
}, 0);

let register = document.getElementById("register");

function convertDate(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  const datePGSQL = `${year}-${month}-${day}`;

  return datePGSQL;
}


// async function f2(){

//   let formData = {
//     email: 'test@mail.ru',
//     password: '123456'
//   }


//   const res = await fetch ("register.php", {
//     method: "POST",
//     body: formData
//   })

//   console.log(formData);
//   console.log(res)

//   if(!res.ok){
//     console.log(res.status);
//   }

//    let output = await res.json();

//    console.log(output);

//    return(output);
   

// }


// f2();
