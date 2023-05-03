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
  const formContainer = loginForm.closest(".forms-container");

  if (password) {
    window.location.href = "index.html";
  } else {
    formContainer.classList.add("shake");
    setTimeout(() => {
      formContainer.classList.remove("shake");
    }, 300);
  }
});
function formatCPF(cpf) {
  // remove qualquer caractere que não seja um número
  cpf.value = cpf.value.replace(/\D/g, '');

  // limita o número de dígitos ao número total de dígitos de um CPF
  if (cpf.value.length > 11) {
    cpf.value = cpf.value.slice(0, 11);
  }

  // adiciona os pontos e o traço conforme o usuário preenche
  cpf.value = cpf.value.replace(/^(\d{3})(\d)/g, '$1.$2');
  cpf.value = cpf.value.replace(/^(\d{3})\.(\d{3})(\d)/g, '$1.$2.$3');
  cpf.value = cpf.value.replace(/\.(\d{3})(\d)/g, '.$1-$2');
  return cpf;
}


