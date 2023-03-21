const sign_in_btn = document.querySelector("#sign-in-btn");
const sign_up_btn = document.querySelector("#sign-up-btn");
const container = document.querySelector(".container");
const loginForm = document.querySelector(".sign-in-form");

sign_up_btn.addEventListener("click", () => {
  container.classList.add("sign-up-mode");
});

sign_in_btn.addEventListener("click", () => {
  container.classList.remove("sign-up-mode");
});

loginForm.addEventListener("submit", (event) => {
  event.preventDefault(); // evita que o formulário seja enviado

  const username = loginForm.querySelector("input[type='text']").value.trim();
  const password = loginForm.querySelector("input[type='password']").value.trim();

  if (username && password) {
    window.location.href = "index.html";
  } else {
    alert("Por favor, preencha ambos os campos de texto.");
  }
});


