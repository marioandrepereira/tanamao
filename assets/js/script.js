// script.js

document.addEventListener("DOMContentLoaded", function () {
  const loginForm = document.getElementById("login-form");
  const cadastroForm = document.getElementById("cadastro-form");

  loginForm.addEventListener("submit", function (event) {
    event.preventDefault();
    // Implement API call for login
    const username = loginForm.querySelector('input[type="text"]').value;
    const password = loginForm.querySelector('input[type="password"]').value;

    // Example: Replace the following line with your actual API call
    fetch("/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    })
      .then(response => response.json())
      .then(data => {
        // Handle the response from the login API call
        console.log(data);
        if (data.message === "Login bem-sucedido!") {
          // Redirect to user.html after successful login
          window.location.href = "user.html";
        } else {
          // Handle other responses or display an error message
          alert("Usuário ou senha inválidos");
        }
      })
      .catch(error => {
        console.error("Error during login API call:", error);
      });
  });

  cadastroForm.addEventListener("submit", function (event) {
    event.preventDefault();
    // Implement API call for cadastro
    const formData = new FormData(cadastroForm);
    const formObject = {};
    formData.forEach((value, key) => {
      formObject[key] = value;
    });

    // Example: Replace the following line with your actual API call
    fetch("/cadastro", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formObject),
    })
      .then(response => response.json())
      .then(data => {
        // Handle the response from the cadastro API call
        console.log(data);
        if (data.message === "Usuário cadastrado com sucesso!") {
          // Display a success message or handle accordingly
          alert("Usuário cadastrado com sucesso!");
        } else {
          // Handle other responses or display an error message
          alert("Erro ao cadastrar usuário");
        }
      })
      .catch(error => {
        console.error("Error during cadastro API call:", error);
      });
  });
});
