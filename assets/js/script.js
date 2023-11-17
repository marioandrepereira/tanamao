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
    fetch("http://10.22.0.250:3000/login", {
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
          window.location.href = "perfil.html";
        } else {
          // Handle other responses or display an error message
          alert("Usuário ou senha inválidos");
        }
      })
      .catch(error => {
        console.error("Error during login API call:", error);
      });
  });

  cadastroForm.addEventListener("submit", async function (event) {
    event.preventDefault();
  
    const username = document.getElementById("username").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const cpf = document.getElementById("cpf").value;
  
    const formData = {
      username,
      email,
      password,
      cpf,
    };
  
    try {
      const response = await fetch("http://10.22.0.250:3000/cadastro", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
  
      const data = await response.json();
  
      console.log(data);
  
      if (data.message === "Usuário cadastrado com sucesso!") {
        alert("Usuário cadastrado com sucesso!");
      } else {
        alert("Erro ao cadastrar usuário");
      }
    } catch (error) {
      console.error("Error during cadastro API call:", error);
    }
  });  
});
